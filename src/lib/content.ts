import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES, type Category } from './site';

export function slugFromEntry(entry: { id: string; data: { slug?: string } }): string {
  return entry.data.slug ?? entry.id.replace(/\.mdx?$/, '').split('/').pop() ?? entry.id;
}

export function contentPath(
  type: 'guides' | 'templates' | 'tools' | 'glossary' | 'forms',
  slug: string,
): string {
  return `/${type}/${slug}`;
}

export type GuideEntry = CollectionEntry<'guides'>;
export type TemplateEntry = CollectionEntry<'templates'>;
export type ToolEntry = CollectionEntry<'tools'>;
export type GlossaryEntry = CollectionEntry<'glossary'>;
export type FormEntry = CollectionEntry<'forms'>;
export type GuideKind = 'guide' | 'article';

export async function getPublishedGuides() {
  return (await getCollection('guides')).sort((a, b) =>
    a.data.title.localeCompare(b.data.title),
  );
}

export function isArticle(entry: GuideEntry): boolean {
  return entry.data.kind === 'article';
}

export function filterByKind(entries: GuideEntry[], kind: GuideKind): GuideEntry[] {
  return entries.filter((entry) => entry.data.kind === kind);
}

export function sortByLastUpdatedDesc(entries: GuideEntry[]): GuideEntry[] {
  return [...entries].sort(
    (a, b) => b.data.lastUpdated.getTime() - a.data.lastUpdated.getTime(),
  );
}

export async function getPublishedTemplates() {
  return (await getCollection('templates')).sort((a, b) =>
    a.data.title.localeCompare(b.data.title),
  );
}

export async function getPublishedTools() {
  return (await getCollection('tools')).sort((a, b) =>
    a.data.title.localeCompare(b.data.title),
  );
}

export async function getPublishedGlossary() {
  return (await getCollection('glossary')).sort((a, b) =>
    a.data.term.localeCompare(b.data.term),
  );
}

export async function getPublishedForms() {
  return (await getCollection('forms')).sort((a, b) =>
    a.data.title.localeCompare(b.data.title),
  );
}

export function groupByCategory<T extends { data: { category: Category } }>(entries: T[]) {
  return CATEGORIES.reduce<Record<string, T[]>>((acc, category) => {
    const items = entries.filter((entry) => entry.data.category === category);
    if (items.length > 0) acc[category] = items;
    return acc;
  }, {});
}

export interface ContentIndexItem {
  title: string;
  url: string;
  summary: string;
  category: Category;
  lastUpdated?: string;
  primaryKeyword?: string;
  kind?: GuideKind;
}

export function resolveRelatedLinks(
  slugs: string[],
  entries: { slug: string; title: string; href: string }[],
): { label: string; href: string }[] {
  return slugs
    .map((slug) => entries.find((entry) => entry.slug === slug))
    .filter((entry): entry is { slug: string; title: string; href: string } => Boolean(entry))
    .map((entry) => ({ label: entry.title, href: entry.href }));
}

export function toIndexItem(
  type: 'guides' | 'templates' | 'tools' | 'glossary',
  entry: GuideEntry | TemplateEntry | ToolEntry | GlossaryEntry,
): ContentIndexItem {
  const slug = slugFromEntry(entry);
  const base = {
    title: entry.data.title,
    url: contentPath(type, slug),
    summary: entry.data.summary,
    category: entry.data.category,
  };

  if (type === 'guides' && 'lastUpdated' in entry.data) {
    return {
      ...base,
      lastUpdated: entry.data.lastUpdated.toISOString().split('T')[0],
      primaryKeyword: entry.data.primaryKeyword,
      kind: entry.data.kind,
    };
  }

  if (type === 'templates' && 'lastUpdated' in entry.data) {
    return {
      ...base,
      lastUpdated: entry.data.lastUpdated.toISOString().split('T')[0],
    };
  }

  if (type === 'tools' && 'lastUpdated' in entry.data) {
    return {
      ...base,
      lastUpdated: entry.data.lastUpdated.toISOString().split('T')[0],
    };
  }

  return base;
}
