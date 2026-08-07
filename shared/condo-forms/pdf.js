import { getFormSchema, isFieldVisible, validateForm } from './index.js';

/**
 * @typedef {import('./types').FieldValue} FieldValue
 * @typedef {import('./types').FormAnswers} FormAnswers
 * @typedef {import('./types').FormField} FormField
 * @typedef {import('./types').FormSchema} FormSchema
 */

/**
 * @param {string} value
 * @returns {string}
 */
function formatDate(value) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? `${match[1]}/${match[2]}/${match[3]}` : value;
}

/**
 * Human-readable value(s) for a field, or null if nothing to show.
 * @param {FormField} field
 * @param {FieldValue | undefined} value
 * @returns {string[] | null}
 */
function displayValue(field, value) {
  if (field.fixedValue !== undefined) return [field.fixedValue];

  if (field.type === 'checkbox') {
    return value === true ? ['Yes'] : null;
  }

  if (field.type === 'checkbox-group') {
    if (!Array.isArray(value) || value.length === 0) return null;
    const labels = value
      .map((v) => field.options?.find((o) => o.value === v)?.label ?? v)
      .filter(Boolean);
    return labels.length ? labels : null;
  }

  if (field.type === 'radio' || field.type === 'select') {
    if (typeof value !== 'string' || value === '') return null;
    return [field.options?.find((o) => o.value === value)?.label ?? value];
  }

  if (typeof value !== 'string' || value.trim() === '') return null;
  if (field.type === 'date') return [formatDate(value)];
  return [value];
}

/**
 * @param {string} text
 * @param {import('pdf-lib').PDFFont} font
 * @param {number} size
 * @param {number} maxWidth
 * @returns {string[]}
 */
function wrapText(text, font, size, maxWidth) {
  const words = text.split(/\s+/).filter(Boolean);
  /** @type {string[]} */
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      if (font.widthOfTextAtSize(word, size) > maxWidth) {
        let chunk = '';
        for (const ch of word) {
          if (font.widthOfTextAtSize(chunk + ch, size) > maxWidth) {
            if (chunk) lines.push(chunk);
            chunk = ch;
          } else {
            chunk += ch;
          }
        }
        line = chunk;
      } else {
        line = word;
      }
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [''];
}

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 54;
const CONTENT_W = PAGE_W - MARGIN * 2;
const BOTTOM_LIMIT = MARGIN + 28;

/**
 * Generates a clean, filled PDF from collected answers for the given form slug.
 *
 * `pdf-lib` is injected by the caller so this package stays dependency-free and
 * portable across independently-installed apps (Astro + Nuxt).
 *
 * @param {string} slug
 * @param {FormAnswers} answers
 * @param {{ pdfLib: typeof import('pdf-lib'), brand?: string }} options
 * @returns {Promise<{ bytes: Uint8Array, fileName: string }>}
 */
export async function generateFilledPdf(slug, answers, options) {
  const { pdfLib, brand = 'this online tool' } = options ?? {};
  if (!pdfLib) throw new Error('generateFilledPdf requires options.pdfLib (the pdf-lib module).');
  const { PDFDocument, StandardFonts, rgb } = pdfLib;

  const NAVY = rgb(0.118, 0.286, 0.463);
  const INK = rgb(0.12, 0.14, 0.18);
  const MUTED = rgb(0.42, 0.45, 0.5);
  const RULE = rgb(0.82, 0.85, 0.89);

  const schema = getFormSchema(slug);
  if (!schema) throw new Error(`Unknown form: ${slug}`);

  const errors = validateForm(schema, answers);
  if (errors.length) {
    const err = new Error('Validation failed');
    err.validation = errors;
    throw err;
  }

  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const italic = await pdf.embedFont(StandardFonts.HelveticaOblique);

  const cur = { page: pdf.addPage([PAGE_W, PAGE_H]), y: PAGE_H - MARGIN };

  const addPage = () => {
    cur.page = pdf.addPage([PAGE_W, PAGE_H]);
    cur.y = PAGE_H - MARGIN;
  };
  /** @param {number} needed */
  const ensure = (needed) => {
    if (cur.y - needed < BOTTOM_LIMIT) addPage();
  };
  /**
   * @param {string} text
   * @param {{ font?: import('pdf-lib').PDFFont, size?: number, color?: import('pdf-lib').RGB, gapAfter?: number, indent?: number }} [opts]
   */
  const paragraph = (text, opts = {}) => {
    const f = opts.font ?? font;
    const size = opts.size ?? 11;
    const color = opts.color ?? INK;
    const indent = opts.indent ?? 0;
    const lineHeight = size * 1.32;
    for (const line of wrapText(text, f, size, CONTENT_W - indent)) {
      ensure(lineHeight);
      cur.page.drawText(line, { x: MARGIN + indent, y: cur.y - size, size, font: f, color });
      cur.y -= lineHeight;
    }
    if (opts.gapAfter) cur.y -= opts.gapAfter;
  };

  // ---- Header ----
  cur.page.drawRectangle({ x: 0, y: PAGE_H - 8, width: PAGE_W, height: 8, color: NAVY });
  paragraph(schema.title, { font: bold, size: 20, color: NAVY, gapAfter: 2 });
  paragraph(schema.authority, { font, size: 9.5, color: MUTED, gapAfter: 1 });
  if (schema.formNumber) paragraph(schema.formNumber, { font, size: 9.5, color: MUTED, gapAfter: 6 });
  paragraph(
    `Completed using ${brand}. This document reproduces the information required by the official form named above. The blank official form is available at ${schema.officialSourceUrl}`,
    { font: italic, size: 8, color: MUTED, gapAfter: 8 },
  );
  ensure(2);
  cur.page.drawRectangle({ x: MARGIN, y: cur.y, width: CONTENT_W, height: 1.4, color: NAVY });
  cur.y -= 16;

  // ---- Sections ----
  for (const section of schema.sections) {
    const visibleFields = section.fields.filter((f) => isFieldVisible(f, answers));
    const rendered = visibleFields
      .map((f) => ({ field: f, values: displayValue(f, answers[f.id]) }))
      .filter((r) => r.values !== null);
    if (rendered.length === 0) continue;

    ensure(40);
    paragraph(section.title, { font: bold, size: 13, color: NAVY, gapAfter: 1 });
    ensure(2);
    cur.page.drawRectangle({ x: MARGIN, y: cur.y + 4, width: CONTENT_W, height: 0.8, color: RULE });
    cur.y -= 8;

    for (const { field, values } of rendered) {
      ensure(30);
      paragraph(field.label.toUpperCase(), { font: bold, size: 8, color: MUTED, gapAfter: 1 });
      if (field.type === 'checkbox-group' && values) {
        for (const v of values) paragraph(`\u2022 ${v}`, { font, size: 11, color: INK, indent: 6 });
        cur.y -= 4;
      } else if (values) {
        paragraph(values.join(', '), { font, size: 11, color: INK, gapAfter: 4 });
      }
    }
    cur.y -= 10;
  }

  // ---- Signature block ----
  ensure(90);
  cur.y -= 6;
  cur.page.drawRectangle({ x: MARGIN, y: cur.y, width: CONTENT_W, height: 0.8, color: RULE });
  cur.y -= 16;
  paragraph('Signature', { font: bold, size: 13, color: NAVY, gapAfter: 8 });

  const lineY = cur.y - 14;
  cur.page.drawRectangle({ x: MARGIN, y: lineY, width: 250, height: 0.8, color: INK });
  cur.page.drawRectangle({ x: MARGIN + 300, y: lineY, width: 150, height: 0.8, color: INK });
  cur.page.drawText('Signature', { x: MARGIN, y: lineY - 12, size: 8, font, color: MUTED });
  cur.page.drawText('Date (yyyy/mm/dd)', { x: MARGIN + 300, y: lineY - 12, size: 8, font, color: MUTED });
  cur.y = lineY - 26;

  if (schema.signatureNote) {
    paragraph(schema.signatureNote, { font: italic, size: 9, color: MUTED, gapAfter: 4 });
  }

  // ---- Footers with page numbers ----
  const pages = pdf.getPages();
  const total = pages.length;
  const footer = `Generated by ${brand} \u2014 not legal advice. Verify against the official form before submitting.`;
  pages.forEach((p, i) => {
    p.drawText(footer, { x: MARGIN, y: MARGIN - 22, size: 7.5, font, color: MUTED });
    const label = `Page ${i + 1} of ${total}`;
    p.drawText(label, {
      x: PAGE_W - MARGIN - font.widthOfTextAtSize(label, 7.5),
      y: MARGIN - 22,
      size: 7.5,
      font,
      color: MUTED,
    });
  });

  const bytes = await pdf.save();
  return { bytes, fileName: `${schema.outputFileName}.pdf` };
}
