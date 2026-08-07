<script setup>
import { FOOTER_LINKS, SITE } from '~/utils/site';
</script>

<template>
  <footer class="mt-16 border-t border-border bg-slate-50">
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div class="grid gap-8 md:grid-cols-2">
        <div>
          <p class="font-serif text-lg font-semibold text-brand-900">{{ SITE.name }}</p>
          <p class="mt-1 text-sm text-slate-600">{{ SITE.fullName }}</p>
          <p class="mt-3 max-w-md text-sm leading-6 text-slate-600">{{ SITE.tagline }}</p>
          <p class="mt-4 max-w-md text-sm leading-6 text-slate-600">{{ SITE.disclaimer }}</p>
        </div>
        <nav aria-label="Footer navigation">
          <ul class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <li v-for="link in FOOTER_LINKS" :key="link.href">
              <NuxtLink
                :to="link.href"
                class="text-slate-700 no-underline hover:text-brand-700"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <p class="mt-8 text-xs text-muted">
        &copy; {{ new Date().getFullYear() }} {{ SITE.fullName }}. All rights reserved.
      </p>
    </div>
  </footer>
</template>
