import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { join } from 'node:path';
import * as pdfLib from 'pdf-lib';
import { getFormSchema } from '../shared/condo-forms/index.js';
import { generateFilledPdf } from '../shared/condo-forms/pdf.js';

const PORT = Number(process.env.PORT || 3091);
const HOST = process.env.HOST || '127.0.0.1';
const DATA_DIR = process.env.NEWSLETTER_DATA_DIR || join(process.cwd(), 'data', 'newsletter');
const SUBSCRIBERS_FILE = join(DATA_DIR, 'subscribers.jsonl');
const POSTMARK_TOKEN = process.env.POSTMARK_SERVER_TOKEN || '';
const NOTIFY_TO = process.env.NEWSLETTER_NOTIFY_TO || 'nick@webfly.io';
const NOTIFY_FROM =
  process.env.NEWSLETTER_FROM || process.env.POSTMARK_FROM || 'notifications@webfly.io';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(value, maxLength = 320) {
  return String(value ?? '')
    .trim()
    .slice(0, maxLength);
}

function readJsonBody(req, maxBytes = 16_384) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > maxBytes) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });

    req.on('error', reject);
  });
}

function subscriberExists(email) {
  if (!existsSync(SUBSCRIBERS_FILE)) return false;

  const normalized = email.toLowerCase();
  const lines = readFileSync(SUBSCRIBERS_FILE, 'utf8').split('\n').filter(Boolean);

  return lines.some((line) => {
    try {
      const entry = JSON.parse(line);
      return entry.email?.toLowerCase() === normalized;
    } catch {
      return false;
    }
  });
}

function saveSubscriber(entry) {
  mkdirSync(DATA_DIR, { recursive: true });
  appendFileSync(SUBSCRIBERS_FILE, `${JSON.stringify(entry)}\n`, 'utf8');
}

async function sendPostmarkNotification(entry) {
  if (!POSTMARK_TOKEN) {
    console.warn('[newsletter] POSTMARK_SERVER_TOKEN not set; skipping email notification');
    return;
  }

  const response = await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': POSTMARK_TOKEN,
    },
    body: JSON.stringify({
      From: NOTIFY_FROM,
      To: NOTIFY_TO,
      Subject: 'New Ontario Condo Guide newsletter subscriber',
      TextBody: [
        'A new mailing list subscription was received.',
        '',
        `Email: ${entry.email}`,
        `Source: ${entry.source}`,
        `Page: ${entry.page}`,
        `Time: ${entry.subscribedAt}`,
        `IP: ${entry.ip}`,
      ].join('\n'),
      HtmlBody: `
        <p>A new mailing list subscription was received.</p>
        <ul>
          <li><strong>Email:</strong> ${entry.email}</li>
          <li><strong>Source:</strong> ${entry.source}</li>
          <li><strong>Page:</strong> ${entry.page}</li>
          <li><strong>Time:</strong> ${entry.subscribedAt}</li>
          <li><strong>IP:</strong> ${entry.ip}</li>
        </ul>
      `.trim(),
      MessageStream: 'outbound',
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Postmark error (${response.status}): ${body}`);
  }
}

async function handleNewsletterSubscribe(req, res, ip) {
  let body;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    sendJson(res, 400, { ok: false, error: error.message || 'Invalid request body' });
    return;
  }

  if (body.website) {
    sendJson(res, 200, { ok: true });
    return;
  }

  const email = sanitize(body.email, 320).toLowerCase();
  const source = sanitize(body.source || 'modal', 100);
  const page = sanitize(body.page || '', 500);

  if (!email || !isValidEmail(email)) {
    sendJson(res, 400, { ok: false, error: 'Please enter a valid email address.' });
    return;
  }

  const entry = {
    email,
    source,
    page,
    subscribedAt: new Date().toISOString(),
    ip,
  };

  const isDuplicate = subscriberExists(email);

  if (!isDuplicate) {
    saveSubscriber(entry);
    try {
      await sendPostmarkNotification(entry);
    } catch (error) {
      console.error('[newsletter] Notification failed:', error);
    }
  }

  sendJson(res, 200, { ok: true, duplicate: isDuplicate });
}

async function handleFormFill(req, res, slug) {
  const schema = getFormSchema(slug);
  if (!schema) {
    sendJson(res, 404, { ok: false, error: 'Form not found' });
    return;
  }

  let body;
  try {
    // Answers can include long text areas and multi-selects; allow up to 256 KB.
    body = await readJsonBody(req, 262_144);
  } catch (error) {
    sendJson(res, 400, { ok: false, error: error.message || 'Invalid request body' });
    return;
  }

  const answers = body?.answers ?? {};

  try {
    const { bytes, fileName } = await generateFilledPdf(slug, answers, {
      pdfLib,
      brand: 'Ontario Condo Guide',
    });
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Cache-Control': 'no-store',
    });
    res.end(Buffer.from(bytes));
  } catch (error) {
    if (error && error.validation) {
      sendJson(res, 422, { ok: false, error: 'Validation failed', errors: error.validation });
      return;
    }
    console.error('[forms] Fill failed:', error);
    sendJson(res, 500, { ok: false, error: 'Could not generate the filled PDF.' });
  }
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(payload));
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }
  return req.socket.remoteAddress || 'unknown';
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const ip = getClientIp(req);

  if (req.method === 'GET' && url.pathname === '/api/health') {
    sendJson(res, 200, { ok: true, service: 'ontariocondoguide-api' });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/newsletter/subscribe') {
    await handleNewsletterSubscribe(req, res, ip);
    return;
  }

  const fillMatch = url.pathname.match(/^\/api\/forms\/([a-z0-9-]+)\/fill$/);
  if (req.method === 'POST' && fillMatch) {
    await handleFormFill(req, res, fillMatch[1]);
    return;
  }

  sendJson(res, 404, { ok: false, error: 'Not found' });
});

server.listen(PORT, HOST, () => {
  console.log(`ontariocondoguide-api listening on http://${HOST}:${PORT}`);
});
