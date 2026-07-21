<script setup lang="ts">
import { SITE } from '~/utils/site';

const description = SITE.disclaimer;

usePageSeo({
  title: 'Disclaimer',
  description,
  path: '/disclaimer',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Disclaimer', path: '/disclaimer' },
  ],
});
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <h1 class="font-serif text-3xl font-bold text-brand-900">Disclaimer</h1>
    <div class="prose mt-6 max-w-none">
      <p>{{ SITE.disclaimer }}</p>
      <p>
        Association governance rules vary by state, community type, and governing documents. Always
        consult your declaration, bylaws, and applicable state statutes. For legal questions,
        consult a qualified attorney licensed in your jurisdiction.
      </p>
    </div>
  </div>
</template>
