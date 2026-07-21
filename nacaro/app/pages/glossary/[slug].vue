<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;
const { term, breadcrumbs, relatedGuideLinks } = await useGlossaryPage(slug);
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
    <Breadcrumbs :items="breadcrumbs" />
    <p class="text-xs font-medium uppercase tracking-wide text-brand-600">{{ term.frontmatter.category }}</p>
    <h1 class="mt-2 font-serif text-3xl font-bold text-brand-900">{{ term.frontmatter.term }}</h1>
    <p class="mt-3 text-lg leading-8 text-slate-600">{{ term.frontmatter.definition }}</p>

    <ProseContent :html="term.html" class="mt-8" />

    <RelatedContent :guide-links="relatedGuideLinks" />
    <DisclaimerBox />
  </div>
</template>
