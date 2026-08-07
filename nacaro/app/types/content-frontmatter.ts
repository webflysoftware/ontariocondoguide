import type { Category } from '~/utils/site';
import type { FaqItem } from '~/utils/schema';

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

export interface FormFrontmatter extends BaseFrontmatter {
  relatedGuides?: string[];
  relatedTemplates?: string[];
}
