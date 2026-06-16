import type { APIRoute } from 'astro';
import { getPublishedGlossary, toIndexItem } from '../lib/content';

export const GET: APIRoute = async () => {
  const glossary = await getPublishedGlossary();
  const items = glossary.map((entry) => toIndexItem('glossary', entry));

  return new Response(JSON.stringify({ items }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
