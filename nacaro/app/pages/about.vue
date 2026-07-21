<script setup lang="ts">
import { SITE } from '~/utils/site';

const description = `${SITE.fullName} (${SITE.name}) is an independent educational resource for HOA and condo governance in the United States.`;

usePageSeo({
  title: 'About',
  description,
  path: '/about',
  pageType: 'AboutPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ],
});
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <h1 class="font-serif text-3xl font-bold text-brand-900">About NACARO</h1>
    <div class="prose mt-6 max-w-none">
      <p>
        {{ SITE.fullName }} ({{ SITE.name }}) publishes practical, plain-language resources for HOA and
        condominium association governance across the United States.
      </p>
      <p>{{ SITE.tagline }}</p>
      <h2>What we publish</h2>
      <ul>
        <li>Guides on meetings, elections, quorum, proxies, and board duties</li>
        <li>Checklists and templates boards can adapt to their documents</li>
        <li>Interactive tools such as quorum calculators and readiness checks</li>
        <li>A glossary of common governance terms</li>
      </ul>
      <h2>What we are not</h2>
      <p>
        NACARO is an independent educational site. We are not a government agency, bar association, law firm,
        or management company. {{ SITE.disclaimer }}
      </p>
      <h2>Contact</h2>
      <p>
        Questions or feedback? Visit our <NuxtLink to="/contact">contact page</NuxtLink>.
      </p>
    </div>
  </div>
</template>
