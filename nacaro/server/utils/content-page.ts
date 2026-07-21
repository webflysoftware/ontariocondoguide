import {
  getGlossaryTerm,
  getGuide,
  getTemplate,
  getTool,
  resolveRelatedLinks,
  type ContentEntry,
  type GlossaryFrontmatter,
  type GuideFrontmatter,
  type TemplateFrontmatter,
  type ToolFrontmatter,
} from './content';

export interface RelatedLink {
  label: string;
  href: string;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface GuidePagePayload {
  slug: string;
  path: string;
  frontmatter: GuideFrontmatter;
  html: string;
  breadcrumbs: BreadcrumbItem[];
  relatedGuideLinks: RelatedLink[];
  relatedTemplateLinks: RelatedLink[];
  relatedToolLinks: RelatedLink[];
}

export interface TemplatePagePayload {
  slug: string;
  path: string;
  frontmatter: TemplateFrontmatter;
  html: string;
  breadcrumbs: BreadcrumbItem[];
  relatedGuideLinks: RelatedLink[];
  relatedToolLinks: RelatedLink[];
}

export interface ToolPagePayload {
  slug: string;
  path: string;
  frontmatter: ToolFrontmatter;
  html: string;
  breadcrumbs: BreadcrumbItem[];
  relatedGuideLinks: RelatedLink[];
  relatedTemplateLinks: RelatedLink[];
}

export interface GlossaryPagePayload {
  slug: string;
  path: string;
  frontmatter: GlossaryFrontmatter;
  html: string;
  breadcrumbs: BreadcrumbItem[];
  relatedGuideLinks: RelatedLink[];
}

function buildGuidePayload(entry: ContentEntry<GuideFrontmatter>): GuidePagePayload {
  return {
    slug: entry.slug,
    path: entry.path,
    frontmatter: entry.frontmatter,
    html: entry.html,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Guides', path: '/guides' },
      { name: entry.frontmatter.title, path: entry.path },
    ],
    relatedGuideLinks: resolveRelatedLinks('guides', entry.frontmatter.relatedGuides),
    relatedTemplateLinks: resolveRelatedLinks('templates', entry.frontmatter.relatedTemplates),
    relatedToolLinks: resolveRelatedLinks('tools', entry.frontmatter.relatedTools),
  };
}

function buildTemplatePayload(entry: ContentEntry<TemplateFrontmatter>): TemplatePagePayload {
  return {
    slug: entry.slug,
    path: entry.path,
    frontmatter: entry.frontmatter,
    html: entry.html,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Templates', path: '/templates' },
      { name: entry.frontmatter.title, path: entry.path },
    ],
    relatedGuideLinks: resolveRelatedLinks('guides', entry.frontmatter.relatedGuides),
    relatedToolLinks: resolveRelatedLinks('tools', entry.frontmatter.relatedTools),
  };
}

function buildToolPayload(entry: ContentEntry<ToolFrontmatter>): ToolPagePayload {
  return {
    slug: entry.slug,
    path: entry.path,
    frontmatter: entry.frontmatter,
    html: entry.html,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Tools', path: '/tools' },
      { name: entry.frontmatter.title, path: entry.path },
    ],
    relatedGuideLinks: resolveRelatedLinks('guides', entry.frontmatter.relatedGuides),
    relatedTemplateLinks: resolveRelatedLinks('templates', entry.frontmatter.relatedTemplates),
  };
}

function buildGlossaryPayload(entry: ContentEntry<GlossaryFrontmatter>): GlossaryPagePayload {
  return {
    slug: entry.slug,
    path: entry.path,
    frontmatter: entry.frontmatter,
    html: entry.html,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Glossary', path: '/glossary' },
      { name: entry.frontmatter.term, path: entry.path },
    ],
    relatedGuideLinks: resolveRelatedLinks('guides', entry.frontmatter.relatedGuides),
  };
}

export function getGuidePagePayload(slug: string): GuidePagePayload | null {
  const guide = getGuide(slug);
  return guide ? buildGuidePayload(guide) : null;
}

export function getTemplatePagePayload(slug: string): TemplatePagePayload | null {
  const template = getTemplate(slug);
  return template ? buildTemplatePayload(template) : null;
}

export function getToolPagePayload(slug: string): ToolPagePayload | null {
  const tool = getTool(slug);
  return tool ? buildToolPayload(tool) : null;
}

export function getGlossaryPagePayload(slug: string): GlossaryPagePayload | null {
  const term = getGlossaryTerm(slug);
  return term ? buildGlossaryPayload(term) : null;
}
