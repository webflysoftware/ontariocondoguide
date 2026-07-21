<script setup>
import { collectionPageSchema, definedTermSchema } from '~/utils/schema';

const description = 'Definitions of common HOA and condo governance terms for boards, managers, and homeowners.';

const { terms } = await useGlossaryCatalog();

usePageSeo({
  title: 'Glossary',
  description,
  path: '/glossary',
  pageType: 'CollectionPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Glossary', path: '/glossary' },
  ],
  schema: [
    collectionPageSchema({ title: 'Glossary', description, path: '/glossary' }),
    ...terms.value.map((entry) =>
      definedTermSchema({
        term: entry.term,
        definition: entry.definition,
        path: entry.href,
      }),
    ),
  ],
});
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
    <h1 class="font-serif text-3xl font-bold text-brand-900">Glossary</h1>
    <p class="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
      Clear definitions of governance terms used in homeowner and condo associations.
    </p>

    <div class="mt-8 grid gap-4 sm:grid-cols-2">
      <article
        v-for="entry in terms"
        :key="entry.href"
        class="rounded-lg border border-border bg-white p-5 shadow-sm"
      >
        <p class="text-xs font-medium uppercase tracking-wide text-brand-600">{{ entry.category }}</p>
        <h2 class="mt-1 text-lg font-semibold">
          <NuxtLink :to="entry.href" class="text-brand-900 no-underline hover:text-brand-700">
            {{ entry.term }}
          </NuxtLink>
        </h2>
        <p class="mt-2 text-sm leading-6 text-slate-600">{{ entry.definition }}</p>
      </article>
    </div>
  </div>
</template>
