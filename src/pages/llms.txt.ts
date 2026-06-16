import type { APIRoute } from 'astro';
import { SITE } from '../lib/site';
import {
  contentPath,
  getPublishedGuides,
  getPublishedGlossary,
  getPublishedTemplates,
  getPublishedTools,
  slugFromEntry,
} from '../lib/content';

export const GET: APIRoute = async () => {
  const [guides, templates, tools, glossary] = await Promise.all([
    getPublishedGuides(),
    getPublishedTemplates(),
    getPublishedTools(),
    getPublishedGlossary(),
  ]);

  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    '## Main sections',
    '- /guides — Educational guides',
    '- /templates — Checklists and templates',
    '- /tools — Calculators and readiness checks',
    '- /glossary — Term definitions',
    '',
    '## Featured guides',
    ...guides.slice(0, 5).map(
      (g) => `- [${g.data.title}](${contentPath('guides', slugFromEntry(g))}): ${g.data.summary}`,
    ),
    '',
    '## Featured templates',
    ...templates.slice(0, 5).map(
      (t) =>
        `- [${t.data.title}](${contentPath('templates', slugFromEntry(t))}): ${t.data.summary}`,
    ),
    '',
    '## Tools',
    ...tools.map(
      (t) => `- [${t.data.title}](${contentPath('tools', slugFromEntry(t))}): ${t.data.summary}`,
    ),
    '',
    '## Glossary',
    ...glossary.slice(0, 5).map(
      (t) =>
        `- [${t.data.term}](${contentPath('glossary', slugFromEntry(t))}): ${t.data.definition}`,
    ),
    '',
    '## Full index',
    '- /llms-full.txt',
    '- /guides.json',
    '- /templates.json',
    '- /tools.json',
    '- /glossary.json',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
