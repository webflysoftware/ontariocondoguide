<script setup>
import { CATEGORIES, CATEGORY_META } from '~/utils/site';
import { collectionPageSchema, itemListSchema } from '~/utils/schema';

const description =
  'Educational guides on U.S. HOA and condo governance topics including meetings, elections, quorum, proxies, and board duties.';

const { guides, grouped } = await useGuidesCatalog();

usePageSeo({
  title: 'Guides',
  description,
  path: '/guides',
  pageType: 'CollectionPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
  ],
  schema: [
    collectionPageSchema({ title: 'Guides', description, path: '/guides' }),
    itemListSchema({
      name: 'NACARO Guides',
      description,
      path: '/guides',
      items: guides.value,
    }),
  ],
});
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
    <h1 class="font-serif text-3xl font-bold text-brand-900">Guides</h1>
    <p class="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
      Practical guides on meetings, elections, quorum, proxies, and board governance for HOA and condo associations.
    </p>

    <div v-for="category in CATEGORIES.filter((cat) => cat !== 'Templates & Tools')" :key="category" class="mt-12">
      <h2 :id="CATEGORY_META[category].slug" class="scroll-mt-24 text-2xl font-semibold">
        {{ category }}
      </h2>
      <p class="mt-2 max-w-2xl text-slate-600">{{ CATEGORY_META[category].description }}</p>
      <div v-if="grouped[category]?.length" class="mt-6 grid gap-4 sm:grid-cols-2">
        <ArticleCard
          v-for="guide in grouped[category]"
          :key="guide.href"
          :title="guide.title"
          :href="guide.href"
          :summary="guide.summary"
          :category="guide.category"
          :meta="guide.lastUpdated ? `Updated ${guide.lastUpdated}` : undefined"
        />
      </div>
    </div>
  </div>
</template>
