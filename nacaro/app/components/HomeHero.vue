<script setup>
import { SITE } from '~/utils/site';

const quickLinks = [
  { href: '/guides', label: 'Guides' },
  { href: '/templates', label: 'Templates' },
  { href: '/tools', label: 'Tools' },
  { href: '/glossary', label: 'Glossary' },
];
</script>

<template>
  <section class="relative isolate overflow-hidden bg-brand-900">
    <div class="absolute inset-0" aria-hidden="true">
      <div
        class="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,45,74,0.95)_0%,rgba(10,33,56,0.88)_50%,rgba(30,73,118,0.75)_100%)]"
      />
      <div
        class="absolute inset-0 opacity-[0.07]"
        style="
          background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
        "
      />
      <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-700 via-white/40 to-accent-700" />
    </div>

    <div
      class="relative mx-auto flex min-h-[20rem] max-h-[34rem] max-w-6xl flex-col justify-center px-4 py-12 sm:min-h-[24rem] sm:px-6 sm:py-14 md:min-h-[28rem] md:py-16 lg:min-h-[30rem]"
    >
      <div class="mb-6 flex items-center gap-4">
        <img
          src="/nacaro-logo.png"
          alt=""
          aria-hidden="true"
          class="h-16 w-auto sm:h-20"
          width="280"
          height="93"
        />
      </div>

      <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-100/90 sm:text-sm">
        Independent educational resource
      </p>
      <h1
        class="mt-2 max-w-3xl font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-tight"
      >
        Practical HOA &amp; condo governance resources
      </h1>
      <p class="mt-3 max-w-2xl text-base leading-7 text-slate-200 sm:mt-4 sm:text-lg sm:leading-8">
        {{ SITE.name }} helps boards, managers, and homeowners understand meetings, elections,
        quorum, proxies, and board duties — with clear guides, templates, and tools.
      </p>

      <nav aria-label="Primary sections" class="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
        <NuxtLink
          v-for="link in quickLinks"
          :key="link.href"
          :to="link.href"
          class="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white no-underline backdrop-blur-sm transition hover:border-white/35 hover:bg-white/15 sm:px-4"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </section>
</template>
