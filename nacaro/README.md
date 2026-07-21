# NACARO

**National Association & Condo Resource Organization** — a Nuxt SSR website with practical governance resources for HOA and condo boards across the United States.

## Stack

- Nuxt 4 (SSR enabled)
- Vue 3 + TypeScript
- Tailwind CSS v4

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm run preview
```

The SSR build outputs to `.output/` for Node.js deployment.

## Project structure

```
app/
  assets/css/        # Tailwind theme and base styles
  components/        # Header, footer, hero, cards
  composables/       # usePageSeo — SEO meta + JSON-LD injection
  pages/             # Routes (landing page + section placeholders)
  utils/
    site.ts          # Site config, categories, nav links, FAQs
    seo.ts           # Title, canonical, Open Graph helpers
    schema.ts        # JSON-LD schema builders (@graph, @id linking)
    content-index.ts # LLM/JSON index data generators
server/routes/       # SSR endpoints for AEO/LLMO discovery
public/
  nacaro-logo.png
  robots.txt
```

## SEO, AEO, and LLMO

Every page uses the `usePageSeo()` composable, which server-renders:

- Canonical URL, meta description, Open Graph, and Twitter cards
- Pretty-printed JSON-LD in a `<script type="application/ld+json">` block

Schema helpers in `app/utils/schema.ts` build linked `@graph` nodes for Organization, WebSite, WebPage, BreadcrumbList, FAQPage, ItemList, DefinedTerm, Article, and WebApplication.

Machine-readable discovery endpoints (server-rendered):

| Route | Format |
|-------|--------|
| `/llms.txt` | Plain-text site index for LLMs |
| `/llms-full.txt` | Full content index |
| `/guides.json` | Guide index |
| `/templates.json` | Template index |
| `/tools.json` | Tool index |
| `/glossary.json` | Glossary index |
| `/sitemap.xml` | XML sitemap |

`public/robots.txt` references the sitemap and LLM discovery URLs.

## Deployment (hh3)

NACARO runs as a Nuxt SSR app on hh3 behind nginx:

- **App:** `systemd` service `nacaro.service` → `127.0.0.1:3090`
- **Build output:** `/var/www/nacaro` (contents of `.output/`)
- **nginx:** reverse proxy with TLS for `nacaro.org`

Deploy configs live in `nacaro/deploy/`:

| File | Purpose |
|------|---------|
| `nginx.conf` | Production HTTPS reverse proxy |
| `nginx-http-only.conf` | Initial HTTP config for certbot |
| `nacaro.service` | systemd unit |
| `on-server.sh` | Post-rsync reload script |
| `sudoers-nacaro` | Passwordless sudo for CI deploy user |

### CI

GitHub Actions workflow `.github/workflows/deploy-nacaro.yml` builds on push to `main` (when `nacaro/**` changes) and rsyncs to hh3. Uses the same `SSH_HOST`, `SSH_USER`, and `SSH_PRIVATE_KEY` secrets as the Ontario Condo Guide deploy.

### Manual deploy

```bash
cd nacaro
npm ci && npm run build
rsync -avz --delete .output/ user@hh3:/var/www/nacaro/
scp deploy/nginx.conf user@hh3:/tmp/nacaro.nginx
scp deploy/nacaro.service user@hh3:/tmp/nacaro.service
scp deploy/on-server.sh user@hh3:/tmp/nacaro-deploy.sh
ssh user@hh3 'chmod +x /tmp/nacaro-deploy.sh && /tmp/nacaro-deploy.sh'
```
