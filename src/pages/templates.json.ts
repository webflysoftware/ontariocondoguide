import type { APIRoute } from 'astro';
import { getPublishedTemplates, toIndexItem } from '../lib/content';

export const GET: APIRoute = async () => {
  const templates = await getPublishedTemplates();
  const items = templates.map((entry) => toIndexItem('templates', entry));

  return new Response(JSON.stringify({ items }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
