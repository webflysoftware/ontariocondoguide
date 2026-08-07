import { getFormPagePayload } from '../../utils/forms';

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug');
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' });
  }

  const payload = getFormPagePayload(slug);
  if (!payload) {
    throw createError({ statusCode: 404, statusMessage: 'Form not found' });
  }

  return payload;
});
