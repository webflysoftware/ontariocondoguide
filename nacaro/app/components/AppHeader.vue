<script setup>
import { NAV_LINKS, SITE } from '~/utils/site';

const route = useRoute();
const mobileOpen = ref(false);

function isActive(href) {
  if (href === '/') return route.path === '/';
  return route.path === href || route.path.startsWith(`${href}/`);
}

watch(
  () => route.path,
  () => {
    mobileOpen.value = false;
  },
);
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-brand-900/20 bg-brand-900 shadow-md"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 sm:py-3">
      <NuxtLink
        to="/"
        class="group flex min-w-0 items-center gap-3 no-underline sm:gap-3.5"
        :aria-label="`${SITE.name} home`"
      >
        <img
          src="/nacaro-logo.png"
          alt=""
          aria-hidden="true"
          class="h-10 w-auto shrink-0 sm:h-11 md:h-12"
          width="240"
          height="80"
        />
        <span class="hidden min-w-0 border-l border-white/15 pl-3 sm:block">
          <span class="block truncate text-sm font-semibold leading-tight text-white group-hover:text-brand-100">
            {{ SITE.name }}
          </span>
          <span class="mt-0.5 block truncate text-xs leading-snug text-slate-300">
            {{ SITE.fullName }}
          </span>
        </span>
      </NuxtLink>

      <nav aria-label="Main navigation" class="hidden items-center md:flex">
        <ul class="flex items-center gap-0.5">
          <li v-for="link in NAV_LINKS" :key="link.href">
            <NuxtLink
              :to="link.href"
              class="rounded-md px-3 py-2 text-sm font-medium no-underline transition"
              :class="
                isActive(link.href)
                  ? 'bg-white/10 text-white'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              "
              :aria-current="isActive(link.href) ? 'page' : undefined"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        class="flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white md:hidden"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-nav"
        @click="mobileOpen = !mobileOpen"
      >
        <span aria-hidden="true" class="flex flex-col gap-1">
          <span class="block h-0.5 w-4 rounded-full bg-current" />
          <span class="block h-0.5 w-4 rounded-full bg-current" />
          <span class="block h-0.5 w-4 rounded-full bg-current" />
        </span>
        Menu
      </button>
    </div>

    <nav
      v-if="mobileOpen"
      id="mobile-nav"
      aria-label="Mobile navigation"
      class="border-t border-white/10 bg-brand-900 px-4 py-3 md:hidden"
    >
      <ul class="space-y-1">
        <li v-for="link in NAV_LINKS" :key="link.href">
          <NuxtLink
            :to="link.href"
            class="block rounded-md px-3 py-2.5 text-sm font-medium no-underline"
            :class="
              isActive(link.href)
                ? 'bg-white/10 text-white'
                : 'text-slate-300 hover:bg-white/10 hover:text-white'
            "
            :aria-current="isActive(link.href) ? 'page' : undefined"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
