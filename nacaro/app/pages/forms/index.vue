<script setup>
import { collectionPageSchema, itemListSchema } from '~/utils/schema';

const description =
  'Mandatory Ontario condominium forms under the Condominium Act, 1998. Download the official PDF or fill it out online with plain-language guidance, then generate a completed PDF.';

const { forms } = await useFormsCatalog();

usePageSeo({
  title: 'Ontario Condo Forms',
  description,
  path: '/forms',
  pageType: 'CollectionPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Forms', path: '/forms' },
  ],
  schema: [
    collectionPageSchema({ title: 'Ontario Condo Forms', description, path: '/forms' }),
    itemListSchema({
      name: 'Ontario Condo Forms',
      description,
      path: '/forms',
      items: forms.value,
    }),
  ],
});
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
    <h1 class="font-serif text-3xl font-bold text-brand-900">Ontario Condo Forms</h1>
    <p class="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
      Mandatory forms under the Condominium Act, 1998. Download the official PDF, or fill it out online with
      step-by-step guidance and generate a completed PDF to print and sign.
    </p>

    <div class="mt-6 rounded-lg border border-brand-100 bg-brand-50 p-4 text-sm leading-6 text-slate-700">
      The official government forms are dynamic PDFs that work best in older desktop software. Our guided filler
      works on any device and explains each field in plain language.
    </div>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ArticleCard
        v-for="form in forms"
        :key="form.href"
        :title="form.title"
        :href="form.href"
        :summary="form.summary"
        :category="form.category"
        meta="Download + fill online"
      />
    </div>

    <p v-if="!forms.length" class="mt-8 text-slate-600">No forms are available yet.</p>

    <DisclaimerBox />
  </div>
</template>
