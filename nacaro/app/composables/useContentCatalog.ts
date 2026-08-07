import type { IndexListItem } from '~/utils/schema';

export interface GlossaryIndexItem {
  term: string;
  definition: string;
  href: string;
  category?: string;
}

interface ContentIndexResponse {
  items: IndexListItem[];
}

interface GlossaryIndexResponse {
  items: GlossaryIndexItem[];
}

export interface ContentCatalog {
  guides: IndexListItem[];
  templates: IndexListItem[];
  tools: IndexListItem[];
  glossary: GlossaryIndexItem[];
}

function groupIndexItemsByCategory(items: IndexListItem[]) {
  return items.reduce<Record<string, IndexListItem[]>>((acc, item) => {
    const category = item.category ?? 'Other';
    (acc[category] ??= []).push(item);
    return acc;
  }, {});
}

function glossaryToIndexItems(items: GlossaryIndexItem[]): IndexListItem[] {
  return items.map((item) => ({
    title: item.term,
    summary: item.definition,
    href: item.href,
    category: item.category,
    type: 'glossary' as const,
  }));
}

async function fetchContentCatalog(): Promise<ContentCatalog> {
  const [guides, templates, tools, glossary] = await Promise.all([
    $fetch<ContentIndexResponse>('/guides.json'),
    $fetch<ContentIndexResponse>('/templates.json'),
    $fetch<ContentIndexResponse>('/tools.json'),
    $fetch<GlossaryIndexResponse>('/glossary.json'),
  ]);

  return {
    guides: guides.items,
    templates: templates.items,
    tools: tools.items,
    glossary: glossary.items,
  };
}

export async function useContentCatalog() {
  const { data } = await useAsyncData('content-catalog', fetchContentCatalog);

  const catalog = computed(() => data.value ?? { guides: [], templates: [], tools: [], glossary: [] });
  const allIndexItems = computed(() => [
    ...catalog.value.guides,
    ...catalog.value.templates,
    ...catalog.value.tools,
    ...glossaryToIndexItems(catalog.value.glossary),
  ]);
  const featuredGuides = computed(() => {
    const featured = catalog.value.guides.filter((guide) => guide.featured);
    return featured.length ? featured : catalog.value.guides.slice(0, 3);
  });

  return {
    catalog,
    allIndexItems,
    featuredGuides,
  };
}

export async function useGuidesCatalog() {
  const { data } = await useAsyncData('guides-catalog', () => $fetch<ContentIndexResponse>('/guides.json'));
  const guides = computed(() => data.value?.items ?? []);
  const grouped = computed(() => groupIndexItemsByCategory(guides.value));

  return { guides, grouped };
}

export async function useTemplatesCatalog() {
  const { data } = await useAsyncData('templates-catalog', () =>
    $fetch<ContentIndexResponse>('/templates.json'),
  );
  const templates = computed(() => data.value?.items ?? []);

  return { templates };
}

export async function useToolsCatalog() {
  const { data } = await useAsyncData('tools-catalog', () => $fetch<ContentIndexResponse>('/tools.json'));
  const tools = computed(() => data.value?.items ?? []);

  return { tools };
}

export async function useFormsCatalog() {
  const { data } = await useAsyncData('forms-catalog', () => $fetch<ContentIndexResponse>('/forms.json'));
  const forms = computed(() => data.value?.items ?? []);

  return { forms };
}

export async function useGlossaryCatalog() {
  const { data } = await useAsyncData('glossary-catalog', () =>
    $fetch<GlossaryIndexResponse>('/glossary.json'),
  );
  const terms = computed(() => data.value?.items ?? []);

  return { terms };
}
