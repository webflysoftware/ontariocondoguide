<script setup>
const route = useRoute();
const slug = route.params.slug ;
const { form, breadcrumbs, relatedGuideLinks, relatedTemplateLinks } = await useFormPage(slug);
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
    <Breadcrumbs :items="breadcrumbs" />
    <p class="text-xs font-medium uppercase tracking-wide text-brand-600">{{ form.frontmatter.category }}</p>
    <h1 class="mt-2 font-serif text-3xl font-bold text-brand-900">{{ form.frontmatter.title }}</h1>
    <p class="mt-3 text-lg leading-8 text-slate-600">{{ form.frontmatter.summary }}</p>

    <!-- Primary actions -->
    <div class="mt-6 flex flex-col gap-3 rounded-xl border border-border bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="text-sm text-slate-600">
        <p class="font-medium text-slate-900">Prefer to fill it out by hand?</p>
        <p class="mt-0.5">Download the official blank government PDF.</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <a
          :href="form.downloadUrl"
          class="inline-flex items-center gap-2 rounded-md border border-brand-700 px-4 py-2.5 text-sm font-semibold text-brand-800 no-underline hover:bg-brand-50"
        >
          Download official PDF
        </a>
        <a
          :href="form.officialSourceUrl"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 no-underline hover:text-brand-800"
        >
          View source ↗
        </a>
      </div>
    </div>

    <ProseContent :html="form.html" class="mt-8" />

    <!-- Guided filler -->
    <div class="mt-10">
      <h2 class="font-serif text-2xl font-bold text-brand-900">Fill it out online</h2>
      <p v-if="form.schema.intro" class="mt-2 text-sm leading-6 text-slate-600">{{ form.schema.intro }}</p>

      <div class="mt-6">
        <FormsFormFiller
          :schema="form.schema"
          :fill-url="form.fillUrl"
          :download-url="form.downloadUrl"
          :official-source-url="form.officialSourceUrl"
        />
      </div>
    </div>

    <RelatedContent :guide-links="relatedGuideLinks" :template-links="relatedTemplateLinks" />
    <DisclaimerBox />
  </div>
</template>
