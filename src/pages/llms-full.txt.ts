import type { APIRoute } from 'astro';
import { SITE, CATEGORIES } from '../lib/site';
import {
  contentPath,
  getPublishedGuides,
  getPublishedGlossary,
  getPublishedTemplates,
  getPublishedTools,
  groupByCategory,
  slugFromEntry,
} from '../lib/content';

function section(title: string, lines: string[]) {
  if (lines.length === 0) return [];
  return [`## ${title}`, '', ...lines, ''];
}

export const GET: APIRoute = async () => {
  const [guides, templates, tools, glossary] = await Promise.all([
    getPublishedGuides(),
    getPublishedTemplates(),
    getPublishedTools(),
    getPublishedGlossary(),
  ]);

  const lines = [
    `# ${SITE.name} — Full content index`,
    '',
    SITE.description,
    '',
    '## Categories',
    ...CATEGORIES.map((c) => `- ${c}`),
    '',
  ];

  for (const [category, entries] of Object.entries(groupByCategory(guides))) {
    lines.push(
      ...section(
        `Guides — ${category}`,
        entries.map(
          (g) =>
            `- [${g.data.title}](${contentPath('guides', slugFromEntry(g))}): ${g.data.summary}`,
        ),
      ),
    );
  }

  for (const [category, entries] of Object.entries(groupByCategory(templates))) {
    lines.push(
      ...section(
        `Templates — ${category}`,
        entries.map(
          (t) =>
            `- [${t.data.title}](${contentPath('templates', slugFromEntry(t))}): ${t.data.summary}`,
        ),
      ),
    );
  }

  for (const [category, entries] of Object.entries(groupByCategory(tools))) {
    lines.push(
      ...section(
        `Tools — ${category}`,
        entries.map(
          (t) =>
            `- [${t.data.title}](${contentPath('tools', slugFromEntry(t))}): ${t.data.summary}`,
        ),
      ),
    );
  }

  for (const [category, entries] of Object.entries(groupByCategory(glossary))) {
    lines.push(
      ...section(
        `Glossary — ${category}`,
        entries.map(
          (t) =>
            `- [${t.data.term}](${contentPath('glossary', slugFromEntry(t))}): ${t.data.definition}`,
        ),
      ),
    );
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
