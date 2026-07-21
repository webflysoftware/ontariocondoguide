import { buildLlmsFullTxtForSite } from '../utils/content-index';

export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8');
  setHeader(event, 'Cache-Control', 'public, max-age=3600');
  return buildLlmsFullTxtForSite();
});
