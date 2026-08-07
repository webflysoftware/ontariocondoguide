<script setup>

defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  href: { type: String, required: true },
  guides: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <article class="flex flex-col rounded-xl border border-border bg-white p-6 shadow-sm">
    <h3 class="text-lg font-semibold text-brand-900">
      <NuxtLink :to="href" class="no-underline hover:text-brand-700">{{ title }}</NuxtLink>
    </h3>
    <p class="mt-2 text-sm leading-6 text-slate-600">{{ description }}</p>
    <ul class="mt-4 flex-1 space-y-2 border-t border-border pt-4">
      <li v-for="guide in guides" :key="guide.href">
        <NuxtLink
          :to="guide.href"
          class="text-sm font-medium text-brand-700 no-underline hover:text-brand-800 hover:underline"
        >
          {{ guide.label }}
        </NuxtLink>
      </li>
    </ul>
  </article>
</template>
