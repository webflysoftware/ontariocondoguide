import type { SchemaNode, BreadcrumbItem } from '~/utils/schema';
import {
  breadcrumbSchema,
  buildSchemaGraph,
  organizationSchema,
  serializeJsonLd,
  websiteSchema,
  webPageSchema,
} from '~/utils/schema';
import { buildSeo } from '~/utils/seo';

export interface PageSeoOptions {
  title: string;
  description: string;
  path?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  pageType?: string;
  breadcrumbs?: BreadcrumbItem[];
  schema?: SchemaNode | SchemaNode[] | null;
}

export function usePageSeo(options: PageSeoOptions) {
  const route = useRoute();
  const path = options.path ?? route.path;
  const seo = buildSeo({
    title: options.title,
    description: options.description,
    path,
    ogType: options.ogType,
    noindex: options.noindex,
  });

  useSeoMeta({
    title: seo.title,
    description: seo.description,
    ogTitle: seo.og.title,
    ogDescription: seo.og.description,
    ogType: seo.og.type,
    ogUrl: seo.og.url,
    ogSiteName: seo.og.siteName,
    ogImage: seo.og.image,
    twitterCard: 'summary_large_image',
    twitterTitle: seo.og.title,
    twitterDescription: seo.og.description,
    twitterImage: seo.og.image,
    robots: seo.robots,
  });

  const baseNodes: SchemaNode[] = [
    organizationSchema(),
    websiteSchema(),
    webPageSchema({
      title: options.title,
      description: options.description,
      path,
      type: options.pageType,
    }),
  ];

  if (options.breadcrumbs?.length) {
    const crumbs = breadcrumbSchema(options.breadcrumbs);
    if (crumbs) baseNodes.push(crumbs);
  }

  const extraNodes = options.schema
    ? Array.isArray(options.schema)
      ? options.schema
      : [options.schema]
    : [];

  const graph = buildSchemaGraph([...baseNodes, ...extraNodes.filter(Boolean)]);

  useHead({
    link: [{ rel: 'canonical', href: seo.canonical }],
    script: [
      {
        key: 'json-ld',
        type: 'application/ld+json',
        innerHTML: serializeJsonLd(graph),
      },
    ],
  });

  return { seo, schema: graph };
}
