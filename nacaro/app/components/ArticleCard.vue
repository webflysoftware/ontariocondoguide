<script setup lang="ts">
import type { Category } from '~/utils/site';

defineProps<{
  title: string;
  summary: string;
  href: string;
  category: Category;
  meta?: string;
}>();
</script>

<template>
  <article class="rounded-lg border border-border bg-white p-4 shadow-sm">
    <p class="text-xs font-medium uppercase tracking-wide text-brand-600">{{ category }}</p>
    <h3 class="mt-1 text-base font-semibold">
      <NuxtLink :to="href" class="text-slate-900 no-underline hover:text-brand-800">
        {{ title }}
      </NuxtLink>
    </h3>
    <p class="mt-2 text-sm leading-6 text-slate-600">{{ summary }}</p>
    <p v-if="meta" class="mt-2 text-xs text-muted">{{ meta }}</p>
  </article>
</template>
