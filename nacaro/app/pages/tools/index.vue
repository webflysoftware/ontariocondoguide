<script setup lang="ts">
import { collectionPageSchema, itemListSchema } from '~/utils/schema';

const description =
  'Interactive planning tools for HOA and condo boards including quorum calculators and readiness checks.';

const { tools } = await useToolsCatalog();

usePageSeo({
  title: 'Tools',
  description,
  path: '/tools',
  pageType: 'CollectionPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
  ],
  schema: [
    collectionPageSchema({ title: 'Tools', description, path: '/tools' }),
    itemListSchema({
      name: 'NACARO Tools',
      description,
      path: '/tools',
      items: tools.value,
    }),
  ],
});
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
    <h1 class="font-serif text-3xl font-bold text-brand-900">Tools</h1>
    <p class="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
      Quorum calculators, meeting readiness checks, and election planning tools.
    </p>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ArticleCard
        v-for="tool in tools"
        :key="tool.href"
        :title="tool.title"
        :href="tool.href"
        :summary="tool.summary"
        :category="tool.category"
      />
    </div>
  </div>
</template>
