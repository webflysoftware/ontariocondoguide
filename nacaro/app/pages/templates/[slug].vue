<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;
const { template, breadcrumbs, relatedGuideLinks, relatedToolLinks } = await useTemplatePage(slug);
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
    <Breadcrumbs :items="breadcrumbs" />
    <p class="text-xs font-medium uppercase tracking-wide text-brand-600">{{ template.frontmatter.category }}</p>
    <h1 class="mt-2 font-serif text-3xl font-bold text-brand-900">{{ template.frontmatter.title }}</h1>
    <p class="mt-3 text-lg leading-8 text-slate-600">{{ template.frontmatter.summary }}</p>
    <p v-if="template.frontmatter.useCase" class="mt-4 rounded-lg border border-brand-100 bg-brand-50 p-4 text-sm leading-6 text-slate-700">
      {{ template.frontmatter.useCase }}
    </p>

    <ProseContent :html="template.html" class="mt-8" />

    <RelatedContent :guide-links="relatedGuideLinks" :tool-links="relatedToolLinks" />
    <DisclaimerBox />
  </div>
</template>
