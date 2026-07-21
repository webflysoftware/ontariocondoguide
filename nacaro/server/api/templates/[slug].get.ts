import { getTemplatePagePayload } from '../../utils/content-page';

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug');
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' });
  }

  const template = getTemplatePagePayload(slug);
  if (!template) {
    throw createError({ statusCode: 404, statusMessage: 'Template not found' });
  }

  return template;
});
