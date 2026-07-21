import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import type { Category } from '../../app/utils/site';
import type { FaqItem, IndexListItem } from '../../app/utils/schema';

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

export type ContentType = 'guides' | 'templates' | 'tools' | 'glossary';

interface BaseFrontmatter {
  title: string;
  summary: string;
  category: Category;
  lastUpdated?: string;
  slug?: string;
}

export interface GuideFrontmatter extends BaseFrontmatter {
  author?: string;
  featured?: boolean;
  relatedGuides?: string[];
  relatedTemplates?: string[];
  relatedTools?: string[];
  faqs?: FaqItem[];
}

export interface TemplateFrontmatter extends BaseFrontmatter {
  useCase?: string;
  relatedGuides?: string[];
  relatedTools?: string[];
}

export interface ToolFrontmatter extends BaseFrontmatter {
  toolType?: 'calculator' | 'checklist';
  relatedGuides?: string[];
  relatedTemplates?: string[];
}

export interface GlossaryFrontmatter extends BaseFrontmatter {
  term: string;
  definition: string;
  relatedGuides?: string[];
}

export interface ContentEntry<T> {
  slug: string;
  path: string;
  frontmatter: T;
  body: string;
  html: string;
}

function resolveContentRoot(): string {
  const candidates = [
    join(process.cwd(), 'content'),
    join(process.cwd(), '..', 'content'),
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }

  throw new Error('Content directory not found.');
}

const CONTENT_ROOT = resolveContentRoot();

function slugFromPath(filePath: string): string {
  const match = filePath.match(/\/([^/]+)\.md$/);
  return match?.[1] ?? filePath;
}

function parseEntry<T>(filePath: string, raw: string, type: ContentType): ContentEntry<T> {
  const parsed = matter(raw);
  const slug = (parsed.data as { slug?: string }).slug ?? slugFromPath(filePath);

  return {
    slug,
    path: `/${type}/${slug}`,
    frontmatter: parsed.data as T,
    body: parsed.content.trim(),
    html: md.render(parsed.content),
  };
}

function loadCollection<T>(type: ContentType): ContentEntry<T>[] {
  const dir = join(CONTENT_ROOT, type);
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => parseEntry<T>(join(dir, file), readFileSync(join(dir, file), 'utf-8'), type))
    .sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));
}

function getBySlug<T>(entries: ContentEntry<T>[], slug: string): ContentEntry<T> | null {
  return entries.find((entry) => entry.slug === slug) ?? null;
}

const guidesCache = loadCollection<GuideFrontmatter>('guides');
const templatesCache = loadCollection<TemplateFrontmatter>('templates');
const toolsCache = loadCollection<ToolFrontmatter>('tools');
const glossaryCache = loadCollection<GlossaryFrontmatter>('glossary');

export function getAllGuides() { return guidesCache; }
export function getGuide(slug: string) { return getBySlug(guidesCache, slug); }
export function getFeaturedGuides() { return guidesCache.filter((g) => g.frontmatter.featured); }
export function getAllTemplates() { return templatesCache; }
export function getTemplate(slug: string) { return getBySlug(templatesCache, slug); }
export function getAllTools() { return toolsCache; }
export function getTool(slug: string) { return getBySlug(toolsCache, slug); }
export function getAllGlossaryTerms() { return glossaryCache; }
export function getGlossaryTerm(slug: string) { return getBySlug(glossaryCache, slug); }

export function resolveRelatedLinks(type: ContentType, slugs: string[] | undefined) {
  if (!slugs?.length) return [];
  const lookup = (slug: string) => {
    if (type === 'guides') return getGuide(slug);
    if (type === 'templates') return getTemplate(slug);
    if (type === 'tools') return getTool(slug);
    return getGlossaryTerm(slug);
  };
  return slugs.flatMap((slug) => {
    const entry = lookup(slug);
    if (!entry) return [];
    const label = type === 'glossary' ? (entry.frontmatter as GlossaryFrontmatter).term : entry.frontmatter.title;
    return [{ label, href: entry.path }];
  });
}

export function toIndexItem(type: ContentType, entry: ContentEntry<BaseFrontmatter>): IndexListItem {
  const glossaryEntry = entry.frontmatter as GlossaryFrontmatter;
  const guideEntry = entry.frontmatter as GuideFrontmatter;

  return {
    title: type === 'glossary' ? glossaryEntry.term : entry.frontmatter.title,
    summary: type === 'glossary' ? glossaryEntry.definition : entry.frontmatter.summary,
    href: entry.path,
    category: entry.frontmatter.category,
    type: type === 'guides' ? 'guide' : type === 'templates' ? 'template' : type === 'tools' ? 'tool' : 'glossary',
    featured: type === 'guides' ? guideEntry.featured : undefined,
    lastUpdated: entry.frontmatter.lastUpdated,
  };
}

export function getGuideIndex() { return { items: getAllGuides().map((e) => toIndexItem('guides', e)) }; }
export function getTemplateIndex() { return { items: getAllTemplates().map((e) => toIndexItem('templates', e)) }; }
export function getToolIndex() { return { items: getAllTools().map((e) => toIndexItem('tools', e)) }; }
export function getGlossaryIndex() {
  return { items: getAllGlossaryTerms().map((e) => ({ term: e.frontmatter.term, definition: e.frontmatter.definition, href: e.path, category: e.frontmatter.category })) };
}
export function getAllIndexItems(): IndexListItem[] {
  return [...getGuideIndex().items, ...getTemplateIndex().items, ...getToolIndex().items, ...getGlossaryIndex().items.map((item) => ({ title: item.term, summary: item.definition, href: item.href, category: item.category, type: 'glossary' as const }))];
}
export function getAllContentPaths(): string[] {
  return ['/', '/guides', '/templates', '/tools', '/glossary', '/about', '/contact', '/disclaimer', '/privacy', ...getAllGuides().map((g) => g.path), ...getAllTemplates().map((t) => t.path), ...getAllTools().map((t) => t.path), ...getAllGlossaryTerms().map((t) => t.path)];
}
export function groupByCategory<T extends BaseFrontmatter>(entries: ContentEntry<T>[]) {
  return entries.reduce<Record<string, ContentEntry<T>[]>>((acc, entry) => {
    (acc[entry.frontmatter.category] ??= []).push(entry);
    return acc;
  }, {});
}

export function buildLlmsTxt(site: { name: string; fullName: string; description: string }, categories: readonly string[], categoryMeta: Record<string, { description: string }>) {
  const guides = getGuideIndex().items;
  const templates = getTemplateIndex().items;
  const tools = getToolIndex().items;
  const glossary = getGlossaryIndex().items;
  return [`# ${site.name}`, '', `> ${site.fullName}`, '', `> ${site.description}`, '', '## Guides', ...guides.map((i) => `- [${i.title}](${i.href}): ${i.summary}`), '', '## Templates', ...templates.map((i) => `- [${i.title}](${i.href}): ${i.summary}`), '', '## Tools', ...tools.map((i) => `- [${i.title}](${i.href}): ${i.summary}`), '', '## Glossary', ...glossary.map((i) => `- [${i.term}](${i.href}): ${i.definition}`)].join('\n');
}

export function buildLlmsFullTxt(site: { name: string; fullName: string; description: string; disclaimer: string }, categories: readonly string[]) {
  const lines = [`# ${site.name} — Full content index`, '', site.description, '', '## Categories', ...categories.map((c) => `- ${c}`), ''];
  for (const section of [{ title: 'Guides', items: getGuideIndex().items }, { title: 'Templates', items: getTemplateIndex().items }, { title: 'Tools', items: getToolIndex().items }]) {
    lines.push(`## ${section.title}`, '', ...section.items.map((i) => `- [${i.title}](${i.href}): ${i.summary}`), '');
  }
  lines.push('## Legal notice', site.disclaimer);
  return lines.join('\n');
}
