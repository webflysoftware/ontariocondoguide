<script setup lang="ts">
defineProps<{
  html: string;
}>();
</script>

<template>
  <article class="prose max-w-none" v-html="html" />
</template>
