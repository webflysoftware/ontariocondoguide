<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  href: { type: String, required: true },
});
</script>

<template>
  <aside class="rounded-xl border border-brand-200 bg-brand-50 p-6">
    <h2 class="text-lg font-semibold text-brand-900">{{ title }}</h2>
    <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-700">{{ description }}</p>
    <NuxtLink
      :to="href"
      class="mt-4 inline-block rounded-md bg-brand-800 px-4 py-2 text-sm font-medium text-white no-underline transition hover:bg-brand-700"
    >
      Learn more →
    </NuxtLink>
  </aside>
</template>
