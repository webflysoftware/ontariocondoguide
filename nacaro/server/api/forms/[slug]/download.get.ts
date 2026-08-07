import { readOfficialPdf } from '../../../utils/forms';

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug');
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' });
  }

  const official = readOfficialPdf(slug);
  if (!official) {
    throw createError({ statusCode: 404, statusMessage: 'Official form PDF not found' });
  }

  setHeader(event, 'Content-Type', 'application/pdf');
  setHeader(event, 'Content-Disposition', `attachment; filename="${official.filename}"`);
  setHeader(event, 'Cache-Control', 'public, max-age=86400');
  return official.bytes;
});
