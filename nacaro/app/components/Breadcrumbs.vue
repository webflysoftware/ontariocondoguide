<script setup>
defineProps({
  items: Array
});
</script>

<template>
  <nav aria-label="Breadcrumb" class="mb-6 text-sm text-slate-600">
    <ol class="flex flex-wrap items-center gap-2">
      <li v-for="(item, index) in items" :key="item.path" class="flex items-center gap-2">
        <span v-if="index > 0" aria-hidden="true">/</span>
        <NuxtLink
          v-if="index < items.length - 1"
          :to="item.path"
          class="no-underline hover:text-brand-700"
        >
          {{ item.name }}
        </NuxtLink>
        <span v-else class="font-medium text-slate-900">{{ item.name }}</span>
      </li>
    </ol>
  </nav>
</template>
