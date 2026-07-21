<script setup>
defineProps({});
</script>

<template>
  <NuxtLink
    :to="href"
    class="group flex flex-col rounded-xl border border-border bg-white p-5 no-underline shadow-sm transition hover:border-brand-200 hover:shadow-md"
  >
    <div class="flex items-start justify-between gap-3">
      <h3 class="text-base font-semibold text-slate-900 group-hover:text-brand-800">{{ title }}</h3>
      <span
        v-if="count !== undefined && count > 0"
        class="shrink-0 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700"
      >
        {{ count }}
      </span>
    </div>
    <p class="mt-2 flex-1 text-sm leading-6 text-slate-600">{{ description }}</p>
    <span class="mt-3 text-sm font-medium text-brand-700 group-hover:text-brand-800">
      Browse resources →
    </span>
  </NuxtLink>
</template>
