<script setup lang="ts">
import { SITE } from '~/utils/site';

usePageSeo({
  title: 'Privacy Policy',
  description: `Privacy policy for ${SITE.fullName}.`,
  path: '/privacy',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Privacy', path: '/privacy' },
  ],
});
</script>

<template>
  <SectionPlaceholder
    title="Privacy Policy"
    description="Our privacy policy will describe how we collect, use, and protect information when you visit NACARO."
  />
</template>
