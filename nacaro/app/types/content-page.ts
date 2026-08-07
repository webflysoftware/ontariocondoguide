import type { BreadcrumbItem } from '~/utils/schema';
import type { FormSchema } from '#shared/forms';
import type {
  FormFrontmatter,
  GlossaryFrontmatter,
  GuideFrontmatter,
  TemplateFrontmatter,
  ToolFrontmatter,
} from '~/types/content-frontmatter';

export interface RelatedLink {
  label: string;
  href: string;
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
