<script setup lang="ts">
import { collectionPageSchema, itemListSchema } from '~/utils/schema';

const description =
  'Checklists, agenda templates, notice forms, and election planning documents for HOA and condo boards.';

const { templates } = await useTemplatesCatalog();

usePageSeo({
  title: 'Templates',
  description,
  path: '/templates',
  pageType: 'CollectionPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Templates', path: '/templates' },
  ],
  schema: [
    collectionPageSchema({ title: 'Templates', description, path: '/templates' }),
    itemListSchema({
      name: 'NACARO Templates',
      description,
      path: '/templates',
      items: templates.value,
    }),
  ],
});
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
    <h1 class="font-serif text-3xl font-bold text-brand-900">Templates</h1>
    <p class="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
      Downloadable checklists, agenda templates, notice forms, and election planning documents.
    </p>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ArticleCard
        v-for="template in templates"
        :key="template.href"
        :title="template.title"
        :href="template.href"
        :summary="template.summary"
        :category="template.category"
      />
    </div>
  </div>
</template>
