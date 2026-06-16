import { SITE } from './site';

export interface SeoInput {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${normalized}`;
}

export function pageTitle(title: string): string {
  if (title === SITE.name) return SITE.name;
  return `${title} | ${SITE.name}`;
}

export function buildSeo(input: SeoInput) {
  const canonical = absoluteUrl(input.path);
  const fullTitle = pageTitle(input.title);

  return {
    title: fullTitle,
    description: input.description,
    canonical,
    og: {
      title: fullTitle,
      description: input.description,
      type: input.ogType ?? 'website',
      url: canonical,
      siteName: SITE.name,
    },
    robots: input.noindex ? 'noindex, nofollow' : 'index, follow',
  };
}
