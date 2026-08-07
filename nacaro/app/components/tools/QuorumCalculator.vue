<script setup>
const totalUnits = ref(100);
const quorumPercent = ref(25);
const attendees = ref(10);
const proxies = ref(12);
const advanceVoters = ref(0);

const result = computed(() => {
  if (totalUnits.value <= 0 || quorumPercent.value <= 0) {
    return {
      valid: false,
      message: 'Enter valid total units and quorum percentage.',
    };
  }

  const required = Math.ceil(totalUnits.value * (quorumPercent.value / 100));
  const current = attendees.value + proxies.value + advanceVoters.value;
  const met = current >= required;
  const needed = Math.max(required - current, 0);
  const percent = Math.round((current / totalUnits.value) * 100);

  return {
    valid: true,
    required,
    current,
    met,
    needed,
    percent,
  };
});
</script>

<template>
  <div class="rounded-lg border border-border bg-white p-6">
    <form class="grid gap-4 sm:grid-cols-2" @submit.prevent>
      <div>
        <label for="total-units" class="block text-sm font-medium">Total eligible voting units</label>
        <input
          id="total-units"
          v-model.number="totalUnits"
          type="number"
          min="1"
          class="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </div>
      <div>
        <label for="quorum-percent" class="block text-sm font-medium">Required quorum (%)</label>
        <input
          id="quorum-percent"
          v-model.number="quorumPercent"
          type="number"
          min="1"
          max="100"
          class="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </div>
      <div>
        <label for="attendees" class="block text-sm font-medium">Confirmed attendees</label>
        <input
          id="attendees"
          v-model.number="attendees"
          type="number"
          min="0"
          class="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </div>
      <div>
        <label for="proxies" class="block text-sm font-medium">Valid proxies</label>
        <input
          id="proxies"
          v-model.number="proxies"
          type="number"
          min="0"
          class="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </div>
      <div class="sm:col-span-2">
        <label for="advance-voters" class="block text-sm font-medium">
          Advance / electronic voters (optional)
        </label>
        <input
          id="advance-voters"
          v-model.number="advanceVoters"
          type="number"
          min="0"
          class="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </div>
    </form>

    <div class="mt-6 rounded-lg bg-slate-50 p-4 text-sm leading-6" aria-live="polite">
      <p v-if="!result.valid">{{ result.message }}</p>
      <template v-else>
        <p><strong>Required for quorum:</strong> {{ result.required }} units</p>
        <p>
          <strong>Current participation:</strong> {{ result.current }} units ({{ result.percent }}% of all units)
        </p>
        <p>
          <strong>Quorum appears met:</strong>
          <span :class="result.met ? 'text-green-700' : 'text-amber-700'">
            {{ result.met ? 'Yes' : 'No' }}
          </span>
        </p>
        <p><strong>Additional units needed:</strong> {{ result.met ? 0 : result.needed }}</p>
        <p v-if="!result.met" class="mt-3 text-slate-600">
          <strong>Suggested next steps:</strong> Intensify proxy outreach, confirm advance votes, and review the
          <NuxtLink to="/guides/what-happens-if-quorum-not-met" class="font-medium">quorum failure guide</NuxtLink>.
        </p>
        <p v-else class="mt-3 text-slate-600">
          <strong>Status:</strong> Quorum appears satisfied based on current counts. Confirm all proxies and advance votes are valid before declaring the meeting open.
        </p>
      </template>
    </div>
  </div>
</template>
