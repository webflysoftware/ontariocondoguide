<script setup>

defineProps({
  faqs: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <section class="mt-14">
    <h2 class="text-2xl font-semibold">Frequently asked questions</h2>
    <p class="mt-2 max-w-2xl text-slate-600">
      Quick answers about NACARO and how to use these governance resources.
    </p>
    <div class="mt-6 space-y-4">
      <details
        v-for="faq in faqs"
        :key="faq.question"
        class="group rounded-xl border border-border bg-white shadow-sm"
      >
        <summary
          class="cursor-pointer list-none px-5 py-4 text-base font-semibold text-brand-900 marker:content-none"
        >
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
