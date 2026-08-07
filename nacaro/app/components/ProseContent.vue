<script setup lang="ts">
defineProps({
  html: { type: String, required: true },
});
</script>

<template>
  <article class="prose max-w-none" v-html="html" />
</template>
