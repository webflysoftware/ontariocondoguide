<script setup>

defineProps({});
</script>

<template>
  <section v-if="faqs.length" class="mt-12">
    <h2 class="text-2xl font-semibold">Frequently asked questions</h2>
    <div class="mt-6 space-y-4">
      <details
        v-for="faq in faqs"
        :key="faq.question"
        class="rounded-xl border border-border bg-white shadow-sm"
      >
        <summary class="cursor-pointer list-none px-5 py-4 text-base font-semibold text-brand-900 marker:content-none">
          {{ faq.question }}
        </summary>
        <div class="border-t border-border px-5 py-4 text-sm leading-7 text-slate-700">
          {{ faq.answer }}
        </div>
      </details>
    </div>
  </section>
</template>

<style scoped>
details > summary::-webkit-details-marker {
  display: none;
}
</style>
