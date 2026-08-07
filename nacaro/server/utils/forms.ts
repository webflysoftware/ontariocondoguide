import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as pdfLib from 'pdf-lib';
import { getAllFields, getFormSchema, type FormAnswers, type FormSchema } from '../../shared/forms';
import { generateFilledPdf as coreGenerateFilledPdf } from '../../../shared/condo-forms/pdf.js';
import { CONTENT_ROOT, getForm, type FormFrontmatter } from './content';
import type { BreadcrumbItem, RelatedLink } from './content-page';
import { resolveRelatedLinks } from './content';

export interface FormPagePayload {
  slug: string;
  path: string;
  frontmatter: FormFrontmatter;
  html: string;
  breadcrumbs: BreadcrumbItem[];
  schema: FormSchema;
  officialSourceUrl: string;
  downloadUrl: string;
  fillUrl: string;
  relatedGuideLinks: RelatedLink[];
  relatedTemplateLinks: RelatedLink[];
}

/** Merge markdown metadata + machine schema into a single page payload. */
export function getFormPagePayload(slug: string): FormPagePayload | null {
  const entry = getForm(slug);
  const schema = getFormSchema(slug);
  if (!entry || !schema) return null;

  return {
    slug: entry.slug,
    path: entry.path,
    frontmatter: entry.frontmatter,
    html: entry.html,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Forms', path: '/forms' },
      { name: entry.frontmatter.title, path: entry.path },
    ],
    schema,
    officialSourceUrl: schema.officialSourceUrl,
    downloadUrl: `/api/forms/${slug}/download`,
    fillUrl: `/api/forms/${slug}/fill`,
    relatedGuideLinks: resolveRelatedLinks('guides', entry.frontmatter.relatedGuides),
    relatedTemplateLinks: resolveRelatedLinks('templates', entry.frontmatter.relatedTemplates),
  };
}

function officialPdfPath(schema: FormSchema): string {
  return join(CONTENT_ROOT, 'forms', 'pdf', schema.officialPdf);
}

export function readOfficialPdf(slug: string): { bytes: Buffer; filename: string } | null {
  const schema = getFormSchema(slug);
  if (!schema) return null;
  const path = officialPdfPath(schema);
  if (!existsSync(path)) return null;
  return { bytes: readFileSync(path), filename: schema.officialPdf };
}

/**
 * Generate a clean, filled PDF using the shared, framework-agnostic engine.
 * pdf-lib is injected so the shared package stays dependency-free.
 */
export async function generateFilledPdf(slug: string, answers: FormAnswers): Promise<Uint8Array> {
  const { bytes } = await coreGenerateFilledPdf(slug, answers, { pdfLib, brand: 'NACARO' });
  return bytes;
}

export function getFormSummary(slug: string) {
  const schema = getFormSchema(slug);
  if (!schema) return null;
  return {
    slug: schema.slug,
    title: schema.title,
    fieldCount: getAllFields(schema).length,
    sections: schema.sections.map((s) => s.title),
  };
}
