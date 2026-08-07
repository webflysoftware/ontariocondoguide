# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                                      |
| :------------------------ | :---------------------------------------------------------- |
| `npm install`             | Installs dependencies                                       |
| `npm run dev`             | Starts local dev server at `localhost:4321`                 |
| `npm run dev:api`         | Runs the standalone API server (newsletter + forms) on 3091 |
| `npm run build`           | Build your production site to `./dist/`                     |
| `npm run build:api`       | Bundle the API server to `./server-dist/index.mjs`          |
| `npm run preview`         | Preview your build locally, before deploying               |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check`            |
| `npm run astro -- --help` | Get help using the Astro CLI                                |

## Ontario condo forms

Guided, pre-fillable Ontario condo forms live at `/forms`. The feature spans three
pieces:

- **`shared/condo-forms/`** — a framework-agnostic core (schemas, validation, and the
  `pdf-lib` PDF generator) shared by this Astro site **and** the Nuxt app (`nacaro/`).
  `pdf-lib` is injected by each caller so the package stays dependency-free.
- **Static pages + island** — `src/pages/forms/` render each form and a vanilla
  `FormFiller` island (`src/components/forms/FormFiller.astro`) that validates client-side
  and posts answers to the API. Blank official PDFs are served statically from
  `public/forms/`.
- **API** — `POST /api/forms/:slug/fill` in the standalone server (`server/index.mjs`)
  validates server-side and returns the generated PDF. In production the server is bundled
  (`npm run build:api`) into a single self-contained file, so no `node_modules` is required
  on the API host.

During local dev, run both `npm run dev` and `npm run dev:api` (the dev server proxies
`/api` to `localhost:3091`).

To add a form: add a schema in `shared/condo-forms/`, register it in `index.js`, drop the
blank PDF in `public/forms/`, and add a markdown file in `src/content/forms/`.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
