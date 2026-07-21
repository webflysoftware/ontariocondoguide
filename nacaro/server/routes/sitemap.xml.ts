import { getSitemapPaths } from '../utils/content-index';
import { absoluteUrl } from '../../app/utils/seo';

export default defineEventHandler((event) => {
  const urls = getSitemapPaths().map((path) => {
    const priority = path === '/' ? '1.0' : path.endsWith('.json') || path.endsWith('.txt') ? '0.5' : '0.8';
    const changefreq = path === '/' ? 'weekly' : 'monthly';

    return `  <url>
    <loc>${absoluteUrl(path)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8');
  setHeader(event, 'Cache-Control', 'public, max-age=3600');
  return xml;
});
