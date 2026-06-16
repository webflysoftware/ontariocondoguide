import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIES } from './lib/site';

const categorySchema = z.enum(CATEGORIES);

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    summary: z.string(),
    category: categorySchema,
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    lastUpdated: z.coerce.date(),
    author: z.string().default('Ontario Condo Guide'),
    primaryKeyword: z.string().optional(),
    secondaryKeywords: z.array(z.string()).default([]),
    relatedGuides: z.array(z.string()).default([]),
    relatedTemplates: z.array(z.string()).default([]),
    relatedTools: z.array(z.string()).default([]),
    ctaType: z.enum(['none', 'digital-voting', 'contact']).default('none'),
    disclaimerType: z.enum(['general', 'legal']).default('general'),
    faqs: z.array(faqSchema).default([]),
  }),
});

const templates = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/templates' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    summary: z.string(),
    category: categorySchema,
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    lastUpdated: z.coerce.date(),
    useCase: z.string(),
    relatedGuides: z.array(z.string()).default([]),
    relatedTools: z.array(z.string()).default([]),
    ctaType: z.enum(['none', 'download', 'contact']).default('download'),
  }),
});

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/glossary' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    term: z.string(),
    definition: z.string(),
    summary: z.string(),
    category: categorySchema,
    relatedGuides: z.array(z.string()).default([]),
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tools' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    summary: z.string(),
    category: categorySchema,
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    lastUpdated: z.coerce.date(),
    toolType: z.enum(['calculator', 'checklist']),
    relatedGuides: z.array(z.string()).default([]),
    relatedTemplates: z.array(z.string()).default([]),
    ctaType: z.enum(['none', 'digital-voting']).default('none'),
  }),
});

export const collections = { guides, templates, glossary, tools };
