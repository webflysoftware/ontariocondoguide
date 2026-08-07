<script setup>
defineProps({
  html: { type: String, required: true },
});
</script>

<template>
  <article class="prose max-w-none" v-html="html" />
</template>
