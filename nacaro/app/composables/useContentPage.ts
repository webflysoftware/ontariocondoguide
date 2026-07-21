import {
  articleSchema,
  faqPageSchema,
  webApplicationSchema,
  definedTermSchema,
} from '~/utils/schema';
import type {
  GlossaryPagePayload,
  GuidePagePayload,
  TemplatePagePayload,
  ToolPagePayload,
} from '~/types/content-page';

export async function useGuidePage(slug: string) {
  const nuxtApp = useNuxtApp();
  const { data, error } = await useAsyncData(`guide-${slug}`, () =>
    $fetch<GuidePagePayload>(`/api/guides/${slug}`),
  );

  if (error.value || !data.value) {
    throw createError({ statusCode: 404, statusMessage: 'Guide not found' });
  }

  const guide = data.value;

  nuxtApp.runWithContext(() => {
    usePageSeo({
      title: guide.frontmatter.title,
      description: guide.frontmatter.summary,
      path: guide.path,
      ogType: 'article',
      breadcrumbs: guide.breadcrumbs,
      schema: [
        articleSchema({
          title: guide.frontmatter.title,
          description: guide.frontmatter.summary,
          path: guide.path,
          dateModified: guide.frontmatter.lastUpdated,
        }),
        faqPageSchema(guide.frontmatter.faqs ?? []),
      ],
    });
  });

  return {
    guide,
    breadcrumbs: guide.breadcrumbs,
    relatedGuideLinks: guide.relatedGuideLinks,
    relatedTemplateLinks: guide.relatedTemplateLinks,
    relatedToolLinks: guide.relatedToolLinks,
  };
}

export async function useTemplatePage(slug: string) {
  const nuxtApp = useNuxtApp();
  const { data, error } = await useAsyncData(`template-${slug}`, () =>
    $fetch<TemplatePagePayload>(`/api/templates/${slug}`),
  );

  if (error.value || !data.value) {
    throw createError({ statusCode: 404, statusMessage: 'Template not found' });
  }

  const template = data.value;

  nuxtApp.runWithContext(() => {
    usePageSeo({
      title: template.frontmatter.title,
      description: template.frontmatter.summary,
      path: template.path,
      pageType: 'Article',
      breadcrumbs: template.breadcrumbs,
      schema: articleSchema({
        title: template.frontmatter.title,
        description: template.frontmatter.summary,
        path: template.path,
        dateModified: template.frontmatter.lastUpdated,
      }),
    });
  });

  return {
    template,
    breadcrumbs: template.breadcrumbs,
    relatedGuideLinks: template.relatedGuideLinks,
    relatedToolLinks: template.relatedToolLinks,
  };
}

export async function useToolPage(slug: string) {
  const nuxtApp = useNuxtApp();
  const { data, error } = await useAsyncData(`tool-${slug}`, () =>
    $fetch<ToolPagePayload>(`/api/tools/${slug}`),
  );

  if (error.value || !data.value) {
    throw createError({ statusCode: 404, statusMessage: 'Tool not found' });
  }

  const tool = data.value;

  nuxtApp.runWithContext(() => {
    usePageSeo({
      title: tool.frontmatter.title,
      description: tool.frontmatter.summary,
      path: tool.path,
      breadcrumbs: tool.breadcrumbs,
      schema: webApplicationSchema({
        title: tool.frontmatter.title,
        description: tool.frontmatter.summary,
        path: tool.path,
      }),
    });
  });

  return {
    tool,
    breadcrumbs: tool.breadcrumbs,
    relatedGuideLinks: tool.relatedGuideLinks,
    relatedTemplateLinks: tool.relatedTemplateLinks,
  };
}

export async function useGlossaryPage(slug: string) {
  const nuxtApp = useNuxtApp();
  const { data, error } = await useAsyncData(`glossary-${slug}`, () =>
    $fetch<GlossaryPagePayload>(`/api/glossary/${slug}`),
  );

  if (error.value || !data.value) {
    throw createError({ statusCode: 404, statusMessage: 'Glossary term not found' });
  }

  const term = data.value;

  nuxtApp.runWithContext(() => {
    usePageSeo({
      title: term.frontmatter.term,
      description: term.frontmatter.definition,
      path: term.path,
      breadcrumbs: term.breadcrumbs,
      schema: definedTermSchema({
        term: term.frontmatter.term,
        definition: term.frontmatter.definition,
        path: term.path,
      }),
    });
  });

  return {
    term,
    breadcrumbs: term.breadcrumbs,
    relatedGuideLinks: term.relatedGuideLinks,
  };
}
