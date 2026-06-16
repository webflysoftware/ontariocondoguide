import type { APIRoute } from 'astro';
import { getPublishedTools, toIndexItem } from '../lib/content';

export const GET: APIRoute = async () => {
  const tools = await getPublishedTools();
  const items = tools.map((entry) => toIndexItem('tools', entry));

  return new Response(JSON.stringify({ items }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
