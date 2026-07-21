import { SITE } from './site';
import { absoluteUrl } from './seo';

export type SchemaNode = Record<string, unknown>;

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface IndexListItem {
  title: string;
  summary: string;
  href: string;
  category?: string;
  type: 'guide' | 'template' | 'tool' | 'glossary';
  featured?: boolean;
  lastUpdated?: string;
}

const SCHEMA_CONTEXT = 'https://schema.org';

export function organizationId(): string {
  return `${SITE.url}/#organization`;
}

export function websiteId(): string {
  return `${SITE.url}/#website`;
}

export function webPageId(path: string): string {
  return `${absoluteUrl(path)}#webpage`;
}

export function organizationSchema(): SchemaNode {
  return {
    '@type': 'Organization',
    '@id': organizationId(),
    name: SITE.fullName,
    alternateName: SITE.name,
    url: SITE.url,
    description: SITE.description,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/nacaro-logo.png'),
      name: `${SITE.name} logo`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    knowsAbout: [
      'HOA governance',
      'Condominium association governance',
      'Board meetings',
      'Annual meetings',
      'Quorum',
      'Proxy voting',
      'Board elections',
    ],
  };
}

export function websiteSchema(): SchemaNode {
  return {
    '@type': 'WebSite',
    '@id': websiteId(),
    name: SITE.fullName,
    alternateName: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: 'en-US',
    publisher: { '@id': organizationId() },
  };
}

export function webPageSchema(input: {
  title: string;
  description: string;
  path: string;
  type?: string;
}): SchemaNode {
  return {
    '@type': input.type ?? 'WebPage',
    '@id': webPageId(input.path),
    url: absoluteUrl(input.path),
    name: input.title,
    description: input.description,
    isPartOf: { '@id': websiteId() },
    about: { '@id': organizationId() },
    inLanguage: 'en-US',
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]): SchemaNode | null {
  if (items.length === 0) return null;

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageSchema(faqs: FaqItem[]): SchemaNode | null {
  if (faqs.length === 0) return null;

  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function itemListSchema(input: {
  name: string;
  description: string;
  path: string;
  items: IndexListItem[];
}): SchemaNode | null {
  if (input.items.length === 0) return null;

  return {
    '@type': 'ItemList',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    numberOfItems: input.items.length,
    itemListElement: input.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      description: item.summary,
      url: absoluteUrl(item.href),
    })),
  };
}

export function collectionPageSchema(input: {
  title: string;
  description: string;
  path: string;
}): SchemaNode {
  return webPageSchema({
    ...input,
    type: 'CollectionPage',
  });
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  dateModified?: string;
}): SchemaNode {
  return {
    '@type': 'Article',
    '@id': `${absoluteUrl(input.path)}#article`,
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    dateModified: input.dateModified,
    author: { '@id': organizationId() },
    publisher: { '@id': organizationId() },
    isPartOf: { '@id': websiteId() },
    inLanguage: 'en-US',
  };
}

export function webApplicationSchema(input: {
  title: string;
  description: string;
  path: string;
}): SchemaNode {
  return {
    '@type': 'WebApplication',
    '@id': `${absoluteUrl(input.path)}#application`,
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    provider: { '@id': organizationId() },
  };
}

export function definedTermSchema(input: {
  term: string;
  definition: string;
  path: string;
}): SchemaNode {
  return {
    '@type': 'DefinedTerm',
    '@id': `${absoluteUrl(input.path)}#term`,
    name: input.term,
    description: input.definition,
    url: absoluteUrl(input.path),
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: `${SITE.name} Glossary`,
      url: absoluteUrl('/glossary'),
    },
  };
}

export function buildSchemaGraph(nodes: SchemaNode[]): SchemaNode {
  const filtered = nodes.filter(Boolean);
  return {
    '@context': SCHEMA_CONTEXT,
    '@graph': filtered,
  };
}

/** Pretty-printed JSON-LD for readable SSR page source. */
export function serializeJsonLd(graph: SchemaNode): string {
  return JSON.stringify(graph, null, 2);
}
