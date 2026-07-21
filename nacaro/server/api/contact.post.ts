import { appendFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

interface ContactPayload {
  name: string;
  email: string;
  role: string;
  associationSize: string;
  topic: string;
  message: string;
  website?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(value: string, maxLength = 5000): string {
  return value.trim().slice(0, maxLength);
}

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' });
  }

  const body = await readBody<ContactPayload>(event);

  if (body.website) {
    return { ok: true };
  }

  const name = sanitize(body.name ?? '', 200);
  const email = sanitize(body.email ?? '', 320);
  const role = sanitize(body.role ?? '', 100);
  const associationSize = sanitize(body.associationSize ?? '', 100);
  const topic = sanitize(body.topic ?? '', 100);
  const message = sanitize(body.message ?? '', 5000);

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Name, email, and message are required.' });
  }

  if (!isValidEmail(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter a valid email address.' });
  }

  const config = useRuntimeConfig();
  const submission = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    role,
    associationSize,
    topic,
    message,
    ip: getRequestIP(event, { xForwardedFor: true }) ?? 'unknown',
  };

  const logDir = config.contactLogDir || join(process.cwd(), 'data', 'contact');
  mkdirSync(logDir, { recursive: true });
  appendFileSync(join(logDir, 'submissions.log'), `${JSON.stringify(submission)}\n`, 'utf-8');

  if (config.contactTo && config.smtpHost) {
    // SMTP delivery can be wired here when credentials are configured.
    // Submissions are always logged locally as a backup.
  }

  return { ok: true };
});
