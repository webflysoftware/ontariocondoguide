// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Shared, framework-agnostic Ontario condo forms core (schemas + validation).
// Also consumed by the Nuxt app and the standalone API server.
const formsCore = fileURLToPath(new URL('./shared/condo-forms/index.js', import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://ontariocondoguide.ca',
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@forms': formsCore,
      },
    },
    server: {
      proxy: {
        '/api': 'http://127.0.0.1:3091',
      },
    },
  },
  integrations: [mdx(), sitemap()],
});
