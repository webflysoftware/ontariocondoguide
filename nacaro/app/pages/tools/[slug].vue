<script setup>
import { AGM_READINESS_ITEMS, ELECTION_READINESS_ITEMS } from '~/utils/tools';

const route = useRoute();
const slug = route.params.slug;
const { tool, breadcrumbs, relatedGuideLinks, relatedTemplateLinks } = await useToolPage(slug);
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
    <Breadcrumbs :items="breadcrumbs" />
    <p class="text-xs font-medium uppercase tracking-wide text-brand-600">{{ tool.frontmatter.category }}</p>
    <h1 class="mt-2 font-serif text-3xl font-bold text-brand-900">{{ tool.frontmatter.title }}</h1>
    <p class="mt-3 text-lg leading-8 text-slate-600">{{ tool.frontmatter.summary }}</p>

    <ProseContent :html="tool.html" class="mt-8" />

    <div class="mt-8">
      <ToolsQuorumCalculator v-if="slug === 'quorum-calculator'" />
      <ToolsReadinessCheck
        v-else-if="slug === 'agm-readiness-check'"
        title="Annual meeting readiness"
        :items="AGM_READINESS_ITEMS"
      />
      <ToolsReadinessCheck
        v-else-if="slug === 'election-readiness-check'"
        title="Election readiness"
        :items="ELECTION_READINESS_ITEMS"
      />
    </div>

    <RelatedContent :guide-links="relatedGuideLinks" :template-links="relatedTemplateLinks" />
    <DisclaimerBox />
  </div>
</template>
