import tailwindcss from '@tailwindcss/vite';
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

function copyContentToOutput(rootDir: string, outputDir = join(rootDir, '.output')) {
  const source = join(rootDir, 'content');
  const outputContent = join(outputDir, 'content');

  if (!existsSync(source)) {
    return;
  }

  mkdirSync(outputDir, { recursive: true });
  cpSync(source, outputContent, { recursive: true });
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: true,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  hooks: {
    'build:done'() {
      copyContentToOutput(process.cwd());
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en-US' },
      title: 'NACARO',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/nacaro-logo.png' }],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Allow importing the repo-root shared/condo-forms package from the client.
      fs: { allow: ['..'] },
    },
  },
  runtimeConfig: {
    contactTo: process.env.NUXT_CONTACT_TO || '',
    smtpHost: process.env.NUXT_SMTP_HOST || '',
    contactLogDir: process.env.NUXT_CONTACT_LOG_DIR || '/var/lib/nacaro/contact',
  },
  nitro: {
    externals: {
      inline: ['gray-matter', 'markdown-it', 'pdf-lib'],
    },
    hooks: {
      compiled(nitro) {
        copyContentToOutput(nitro.options.rootDir, nitro.options.output.dir);
      },
    },
  },
});
