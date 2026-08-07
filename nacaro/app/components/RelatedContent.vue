<script setup lang="ts">
import type { PropType } from 'vue';

type RelatedLink = { label: string; href: string };

defineProps({
  guideLinks: {
    type: Array as PropType<RelatedLink[]>,
    required: false,
  },
  templateLinks: {
    type: Array as PropType<RelatedLink[]>,
    required: false,
  },
  toolLinks: {
    type: Array as PropType<RelatedLink[]>,
    required: false,
  },
});
</script>

<template>
  <aside
    v-if="(guideLinks?.length ?? 0) + (templateLinks?.length ?? 0) + (toolLinks?.length ?? 0) > 0"
    class="mt-12 rounded-xl border border-border bg-slate-50 p-6"
  >
    <h2 class="text-lg font-semibold text-brand-900">Related resources</h2>
    <div class="mt-4 grid gap-6 sm:grid-cols-3">
      <div v-if="guideLinks?.length">
        <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">Guides</h3>
        <ul class="mt-2 space-y-2">
          <li v-for="link in guideLinks" :key="link.href">
            <NuxtLink :to="link.href" class="text-sm font-medium no-underline">{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </div>
      <div v-if="templateLinks?.length">
        <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">Templates</h3>
        <ul class="mt-2 space-y-2">
          <li v-for="link in templateLinks" :key="link.href">
            <NuxtLink :to="link.href" class="text-sm font-medium no-underline">{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </div>
      <div v-if="toolLinks?.length">
        <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">Tools</h3>
        <ul class="mt-2 space-y-2">
          <li v-for="link in toolLinks" :key="link.href">
            <NuxtLink :to="link.href" class="text-sm font-medium no-underline">{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
