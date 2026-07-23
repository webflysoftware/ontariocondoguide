<script setup>
defineProps({});
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <h1 class="font-serif text-3xl font-bold text-brand-900">{{ title }}</h1>
    <p v-if="description" class="mt-4 text-lg leading-8 text-slate-600">{{ description }}</p>
    <p class="mt-6 rounded-lg border border-border bg-white p-6 text-sm leading-6 text-slate-600">
      This section is under development. Check back soon for new resources, or return to the
      <NuxtLink to="/" class="font-medium">homepage</NuxtLink>.
    </p>
  </div>
</template>
