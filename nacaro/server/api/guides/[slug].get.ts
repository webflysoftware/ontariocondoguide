import { getGuidePagePayload } from '../../utils/content-page';

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug');
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' });
  }

  const guide = getGuidePagePayload(slug);
  if (!guide) {
    throw createError({ statusCode: 404, statusMessage: 'Guide not found' });
  }

  return guide;
});
