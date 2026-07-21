import { getToolPagePayload } from '../../utils/content-page';

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug');
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' });
  }

  const tool = getToolPagePayload(slug);
  if (!tool) {
    throw createError({ statusCode: 404, statusMessage: 'Tool not found' });
  }

  return tool;
});
