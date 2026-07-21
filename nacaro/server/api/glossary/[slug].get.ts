import { getGlossaryPagePayload } from '../../utils/content-page';

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug');
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' });
  }

  const term = getGlossaryPagePayload(slug);
  if (!term) {
    throw createError({ statusCode: 404, statusMessage: 'Glossary term not found' });
  }

  return term;
});
