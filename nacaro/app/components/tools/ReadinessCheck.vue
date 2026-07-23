<script setup>
const props = defineProps({});

const checked = ref(props.items.map(() => false));

const summary = computed(() => {
  const total = props.items.length;
  const completed = checked.value.filter(Boolean).length;
  const score = total === 0 ? 0 : Math.round((completed / total) * 100);
  const missing = props.items.filter((_, index) => !checked.value[index]);

  return { total, completed, score, missing };
});
</script>

<template>
  <div class="rounded-lg border border-border bg-white p-6">
    <h2 class="text-lg font-semibold">{{ title }}</h2>
    <fieldset class="mt-4 space-y-3">
      <legend class="sr-only">{{ title }} checklist</legend>
      <label
        v-for="(item, index) in items"
        :key="item"
        class="flex items-start gap-3 text-sm"
      >
        <input v-model="checked[index]" type="checkbox" class="mt-1" />
        <span>{{ item }}</span>
      </label>
    </fieldset>
    <div class="mt-6 rounded-lg bg-slate-50 p-4 text-sm leading-6" aria-live="polite">
      <p><strong>Readiness score:</strong> {{ summary.score }}%</p>
      <p><strong>Completed:</strong> {{ summary.completed }} of {{ summary.total }}</p>
      <p v-if="summary.missing.length">
        <strong>Missing items:</strong> {{ summary.missing.join('; ') }}
      </p>
      <p v-else><strong>Status:</strong> All listed items checked.</p>
    </div>
  </div>
</template>
