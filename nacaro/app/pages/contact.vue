<script setup lang="ts">
import { SITE } from '~/utils/site';

usePageSeo({
  title: 'Contact',
  description: `Contact ${SITE.fullName} with questions or feedback about HOA and condo governance resources.`,
  path: '/contact',
  pageType: 'ContactPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ],
});
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <h1 class="font-serif text-3xl font-bold text-brand-900">Contact</h1>
    <ContactForm class="mt-6" />
  </div>
</template>
