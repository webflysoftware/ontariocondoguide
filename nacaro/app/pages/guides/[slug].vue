<script setup>
const route = useRoute();
const slug = route.params.slug;
const { guide, breadcrumbs, relatedGuideLinks, relatedTemplateLinks, relatedToolLinks } =
  await useGuidePage(slug);
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
    <Breadcrumbs :items="breadcrumbs" />
    <p class="text-xs font-medium uppercase tracking-wide text-brand-600">{{ guide.frontmatter.category }}</p>
    <h1 class="mt-2 font-serif text-3xl font-bold text-brand-900">{{ guide.frontmatter.title }}</h1>
    <p class="mt-3 text-lg leading-8 text-slate-600">{{ guide.frontmatter.summary }}</p>
    <p v-if="guide.frontmatter.lastUpdated" class="mt-2 text-sm text-muted">
      Updated {{ guide.frontmatter.lastUpdated }}
    </p>

    <ProseContent :html="guide.html" class="mt-8" />

    <FAQBlock :faqs="guide.frontmatter.faqs ?? []" />
    <RelatedContent
      :guide-links="relatedGuideLinks"
      :template-links="relatedTemplateLinks"
      :tool-links="relatedToolLinks"
    />
    <DisclaimerBox />
  </div>
</template>
