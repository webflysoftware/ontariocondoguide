<script setup>
import { SITE } from '~/utils/site';

const VOTE_URL = 'https://vote.electosense.com/cam-pulse-2026';

const description =
  'Anonymous 2026 CAM Industry Pulse poll for community association managers — overview, how to vote, and results status.';

usePageSeo({
  title: '2026 CAM Industry Pulse',
  description,
  path: '/cam-pulse-2026',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: '2026 CAM Industry Pulse', path: '/cam-pulse-2026' },
  ],
});

const topics = [
  {
    title: 'CAM burnout drivers',
    detail: 'What drains the most time or patience across a typical portfolio.',
  },
  {
    title: 'Walking away from difficult boards',
    detail: 'When managers should resign versus document and stay.',
  },
  {
    title: 'Delinquency posture',
    detail: 'How hard associations should push before attorneys get involved.',
  },
  {
    title: 'Vendor conflicts',
    detail: 'Whether management-owned vendors are an acceptable practice.',
  },
  {
    title: 'Who counts contested ballots',
    detail: 'Who CAMs trust to run the count in a contested board election.',
  },
  {
    title: 'Delinquent candidates',
    detail: 'Whether owners behind on assessments should run for the board.',
  },
  {
    title: 'Anonymous complaints',
    detail: 'When managers should act on owner complaints without a name attached.',
  },
];
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
    <Breadcrumbs
      :items="[
        { name: 'Home', path: '/' },
        { name: '2026 CAM Industry Pulse', path: '/cam-pulse-2026' },
      ]"
    />

    <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
      Featured poll
    </p>
    <h1 class="mt-2 font-serif text-3xl font-bold text-brand-900 sm:text-4xl">
      2026 CAM Industry Pulse
    </h1>
    <p class="mt-4 text-lg leading-8 text-slate-700">
      An anonymous peer poll for community association managers. See how other CAMs weigh
      the issues that actually show up in the portfolio — enforcement, boards, vendors,
      elections, and owner conflict.
    </p>

    <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a
        :href="VOTE_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center rounded-md bg-brand-800 px-5 py-3 text-sm font-semibold text-white no-underline transition hover:bg-brand-700"
      >
        Cast your vote
      </a>
      <a
        href="#results"
        class="inline-flex items-center justify-center rounded-md border border-border bg-white px-5 py-3 text-sm font-medium text-brand-800 no-underline transition hover:bg-slate-50"
      >
        Results status
      </a>
    </div>

    <section class="mt-12" aria-labelledby="overview-heading">
      <h2 id="overview-heading" class="text-2xl font-semibold text-brand-900">
        Quick overview
      </h2>
      <div class="prose mt-4 max-w-none">
        <p>
          The 2026 CAM Industry Pulse is research for managers who want a read on what peers
          are thinking — not an official association vote, and not product marketing.
          Answers are anonymous.
        </p>
        <p>
          It takes a few minutes. You will answer seven practical questions drawn from day-to-day
          portfolio work: burnout, board friction, collections, vendor relationships, election
          administration, candidate eligibility, and anonymous complaints.
        </p>
      </div>

      <dl class="mt-6 grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border border-border bg-white p-5 shadow-sm">
          <dt class="text-xs font-semibold uppercase tracking-wide text-slate-500">Who it's for</dt>
          <dd class="mt-2 text-sm leading-6 text-slate-700">
            Community association managers and CAM firm professionals across the United States.
          </dd>
        </div>
        <div class="rounded-xl border border-border bg-white p-5 shadow-sm">
          <dt class="text-xs font-semibold uppercase tracking-wide text-slate-500">Privacy</dt>
          <dd class="mt-2 text-sm leading-6 text-slate-700">
            Secret ballot — responses are anonymous and meant for peer benchmarking only.
          </dd>
        </div>
        <div class="rounded-xl border border-border bg-white p-5 shadow-sm">
          <dt class="text-xs font-semibold uppercase tracking-wide text-slate-500">Hosted by</dt>
          <dd class="mt-2 text-sm leading-6 text-slate-700">
            Voting runs on ElectoSense. {{ SITE.name }} features the poll as an industry resource.
          </dd>
        </div>
        <div class="rounded-xl border border-border bg-white p-5 shadow-sm">
          <dt class="text-xs font-semibold uppercase tracking-wide text-slate-500">Not a legal vote</dt>
          <dd class="mt-2 text-sm leading-6 text-slate-700">
            Research only. This is not a vote for any association you manage and is not legal advice.
          </dd>
        </div>
      </dl>
    </section>

    <section class="mt-12" aria-labelledby="topics-heading">
      <h2 id="topics-heading" class="text-2xl font-semibold text-brand-900">
        Topics on the ballot
      </h2>
      <p class="mt-2 text-slate-600">
        A sample of the peer questions you’ll see when you open the ballot.
      </p>
      <ul class="mt-6 space-y-3">
        <li
          v-for="topic in topics"
          :key="topic.title"
          class="rounded-xl border border-border bg-white px-5 py-4 shadow-sm"
        >
          <h3 class="text-base font-semibold text-brand-900">{{ topic.title }}</h3>
          <p class="mt-1 text-sm leading-6 text-slate-600">{{ topic.detail }}</p>
        </li>
      </ul>
    </section>

    <section
      class="mt-12 rounded-xl border border-brand-200 bg-brand-50 p-6 sm:p-8"
      aria-labelledby="vote-cta-heading"
    >
      <h2 id="vote-cta-heading" class="text-xl font-semibold text-brand-900">
        Ready to weigh in?
      </h2>
      <p class="mt-2 max-w-2xl text-sm leading-7 text-slate-700 sm:text-base">
        Open the anonymous ballot, answer the seven questions, and help build a clearer picture
        of where CAMs stand on the issues that dominate portfolio work.
      </p>
      <a
        :href="VOTE_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-5 inline-flex w-full items-center justify-center rounded-md bg-brand-800 px-5 py-3 text-sm font-semibold text-white no-underline transition hover:bg-brand-700 sm:w-auto"
      >
        Go to the vote →
      </a>
      <p class="mt-3 text-xs text-slate-500">
        Opens on vote.electosense.com in a new tab.
      </p>
    </section>

    <section id="results" class="mt-12 scroll-mt-24" aria-labelledby="results-heading">
      <h2 id="results-heading" class="text-2xl font-semibold text-brand-900">
        Results
      </h2>
      <div class="mt-4 rounded-xl border border-dashed border-border bg-white p-6 sm:p-8">
        <p class="text-sm font-semibold uppercase tracking-wide text-brand-700">
          Coming soon
        </p>
        <p class="mt-3 text-base leading-7 text-slate-700">
          Aggregated results will be published here after voting is completed. Check back once
          the poll closes for a summary of how peer managers answered each question.
        </p>
        <p class="mt-3 text-sm text-slate-500">
          No individual responses will be shown — only overall tallies suitable for industry discussion.
        </p>
      </div>
    </section>

    <DisclaimerBox class="mt-12" />
  </div>
</template>
