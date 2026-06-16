import type { APIRoute } from 'astro';
import { getPublishedGuides, toIndexItem } from '../lib/content';

export const GET: APIRoute = async () => {
  const guides = await getPublishedGuides();
  const items = guides.map((entry) => toIndexItem('guides', entry));

  return new Response(JSON.stringify({ items }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
