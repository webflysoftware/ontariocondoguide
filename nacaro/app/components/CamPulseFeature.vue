<script setup>
const VOTE_DETAILS_PATH = '/cam-pulse-2026';

const highlights = [
  'Anonymous peer poll for CAMs',
  'Enforcement, boards, vendors & elections',
  'Research only — not an association vote',
];
</script>

<template>
  <section
    class="relative overflow-hidden rounded-2xl border border-brand-800/20 bg-brand-900 text-white shadow-md"
    aria-labelledby="cam-pulse-heading"
  >
    <div class="absolute inset-0" aria-hidden="true">
      <div
        class="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,33,56,0.98)_0%,rgba(15,45,74,0.95)_45%,rgba(30,73,118,0.88)_100%)]"
      />
      <div
        class="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5 blur-2xl"
      />
      <div
        class="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-accent-700/20 blur-3xl"
      />
      <div
        class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-700 via-white/35 to-accent-700"
      />
    </div>

    <div class="relative grid gap-8 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-12 lg:px-10 lg:py-14">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-100/90">
          Featured poll
        </p>
        <h2
          id="cam-pulse-heading"
          class="mt-3 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          2026 CAM Industry Pulse
        </h2>
        <p class="mt-4 max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
          How are community association managers weighing the hard calls — burnout,
          delinquent owners, vendor conflicts, and contested elections? Take a few minutes
          and see where peers land.
        </p>

        <ul class="mt-6 space-y-2.5 text-sm text-slate-200 sm:text-base">
          <li
            v-for="item in highlights"
            :key="item"
            class="flex items-start gap-2.5"
          >
            <span
              class="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600"
              aria-hidden="true"
            />
            <span>{{ item }}</span>
          </li>
        </ul>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <NuxtLink
            :to="VOTE_DETAILS_PATH"
            class="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-brand-900 no-underline transition hover:bg-brand-50"
          >
            Learn more &amp; vote
          </NuxtLink>
          <NuxtLink
            :to="`${VOTE_DETAILS_PATH}#results`"
            class="inline-flex items-center justify-center rounded-md border border-white/25 bg-white/5 px-5 py-3 text-sm font-medium text-white no-underline backdrop-blur-sm transition hover:border-white/40 hover:bg-white/10"
          >
            View results status
          </NuxtLink>
        </div>
      </div>

      <aside
        class="rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm sm:p-7"
      >
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-brand-100/80">
          Why it matters
        </p>
        <p class="mt-3 text-sm leading-7 text-slate-200">
          Boards and managers make the same tough calls every week. This pulse poll
          gathers anonymous input from CAMs so the industry can see patterns — not
          marketing talking points.
        </p>
        <dl class="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-sm">
          <div>
            <dt class="text-slate-400">Format</dt>
            <dd class="mt-1 font-medium text-white">Anonymous ballot</dd>
          </div>
          <div>
            <dt class="text-slate-400">Audience</dt>
            <dd class="mt-1 font-medium text-white">CAMs &amp; managers</dd>
          </div>
          <div>
            <dt class="text-slate-400">Topics</dt>
            <dd class="mt-1 font-medium text-white">7 peer questions</dd>
          </div>
          <div>
            <dt class="text-slate-400">Results</dt>
            <dd class="mt-1 font-medium text-white">After voting closes</dd>
          </div>
        </dl>
      </aside>
    </div>
  </section>
</template>
