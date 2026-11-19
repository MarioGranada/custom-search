# Custom Search

A React application that queries web search engines from one interface. The [Brave Search API](https://brave.com/search/api/) is the supported engine, reached through a small serverless proxy so the API key never reaches the browser. Google was removed because its Custom Search JSON API is closed to new customers and shuts down on 1 January 2027. Bing was removed when Microsoft retired the Bing Search APIs in August 2025.

Engine behaviour is configuration-driven: endpoints, pagination fields, and result mappings live in `src/searchEngineConfig.json`, so adding another engine does not require rewriting the search screen.

## Live demo

| | |
| --- | --- |
| **Live site** | https://custom-search-seven.vercel.app |
| **Repository** | https://github.com/MarioGranada/custom-search |
| **Portfolio summary** | Config-driven web search UI in React and Redux backed by the Brave Search API through a Vercel serverless proxy, with paginated results, quota guards and CDN-cached responses. |

The demo has a shared monthly search budget and a per-visitor daily limit; when either is reached the page says so instead of searching.

## Features

- Web search through the Brave Search API, proxied by `api/search.js` (a Vercel Function).
- Paginated results (10 per page, up to 10 pages). Brave reports no total, so the next page appears while more results exist.
- Configuration-driven engine definitions and result normalisation (add an engine via config).
- Quota guard: per-visitor daily cap and global monthly cap, stored in Postgres and checked before calling Brave.
- Identical searches are served from Vercel's CDN cache for a day without spending quota.
- Redux store for form state and search results; Material UI layout; English copy through `react-intl`.
- Vitest + React Testing Library tests for components, reducers, utilities and the proxy helpers.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | React 17 + Vite 8 |
| State | Redux + React Redux |
| UI | Material UI 5 + Emotion |
| i18n | react-intl |
| API | Vercel Function (`api/search.js`) → Brave Web Search API |
| Database | Supabase Postgres via postgres.js (usage counters only) |
| Hosting | Vercel |
| Testing | Vitest + React Testing Library + jsdom |

## Project structure

```text
custom-search/
├── api/
│   ├── search.js             # GET /api/search?q=&page= (Vercel Function)
│   └── _lib/                 # Validation, Brave client, normalisation, quota (not routes)
├── scripts/db-migrate.mjs    # Creates the custom_search schema (usage counters)
├── src/
│   ├── components/           # Button, Dropdown, form wrapper, results, pagination
│   ├── screens/search-screen/ # Search screen composition and fetching (TypeScript)
│   ├── store/                # Actions, reducers, action types
│   ├── utils/                # Request building and result mapping
│   ├── lang/en.json          # UI copy and error messages
│   └── searchEngineConfig.json
├── .env.example
├── vite.config.mjs
└── package.json
```

## Getting started

### Requirements

- Node.js 22.12+ and Yarn 1.x (a `yarn.lock` is committed).
- The Vercel CLI, linked to the project (`vercel link`), to run the API locally and pull env vars.
- A Brave Search API key (see below).

### 1. Install and configure

```bash
yarn install
vercel env pull .env.local   # POSTGRES_URL, RATE_LIMIT_SALT, BRAVE_SEARCH_API_KEY
yarn db:migrate              # idempotent: creates the custom_search schema
```

| Variable | Purpose | Required |
| --- | --- | --- |
| `BRAVE_SEARCH_API_KEY` | Brave Search API key. Server-side only. | Yes |
| `RATE_LIMIT_SALT` | Random string used to hash client IPs (`openssl rand -hex 32`). | Yes |
| `POSTGRES_URL` | Pooled Postgres URL (set by the Supabase integration on Vercel). | Yes |
| `POSTGRES_URL_NON_POOLING` | Direct URL used by `yarn db:migrate`. | No |
| `DAILY_CLIENT_LIMIT` | Searches per visitor per day (default 40). | No |
| `MONTHLY_QUERY_LIMIT` | Searches per month for the whole demo (default 900). | No |

None of these use the `VITE_` prefix, so none are bundled into the client. Without the key the API answers `503 not_configured` and the UI shows a message.

**Getting a Brave key:** sign up at https://api-dashboard.search.brave.com, subscribe to the **Search** plan (a card is required; every plan includes $5 of free credit a month, about 1,000 requests, and credits are prepaid), then create a key under **API Keys**.

### 2. Run locally

```bash
vercel dev
```

`vercel dev` serves the Vite app and `api/search.js` together on one origin. `yarn dev` alone runs only the UI, so searches fail without the API.

### Available scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Vite dev server on port 3000 (UI only). |
| `yarn build` | Production build in `dist/`. |
| `yarn test` | Run the Vitest suite once. |
| `yarn lint` | Run ESLint over the project. |
| `yarn db:migrate` | Create the usage-counter tables. |
| `yarn format` / `yarn prettify` | Prettier, or ESLint fixes plus Prettier. |

## How it works

`SearchScreen` owns the selected engine, the query text, and the submitted query. Submitting fetches page 1; changing page fetches that page for the submitted query. Each request goes through `utils/prepareSearch` (builds `/api/search?q=&page=`, lower-cased so identical searches share a cache entry), then `utils/prepareDataBeforeStore` maps the response onto the app model before it enters Redux.

`api/search.js` validates `q` (3–200 characters) and `page` (1–10), counts the request against the daily and monthly caps (`api/_lib/search.js` → `consumeQuota`), calls Brave with the key in the `X-Subscription-Token` header, strips markup from titles and snippets, and returns `{ items, page, perPage, hasMore }`. Successful responses carry `s-maxage=86400`, so Vercel's CDN answers repeats; errors are `no-store` and return only a code (`invalid_query`, `daily_limit`, `monthly_limit`, `not_configured`, ...).

## Deployment

- **Live:** https://custom-search-seven.vercel.app (Vercel project `custom-search`). Pushing to `main` deploys production.
- Vercel detects Vite for the UI and turns `api/search.js` into a function; no `vercel.json` is needed.
- `POSTGRES_URL` comes from the shared Supabase integration (`portfolio-db`, schema `custom_search`). `BRAVE_SEARCH_API_KEY` and `RATE_LIMIT_SALT` are project env vars.
- The old GitHub Pages URL (https://mariogranada.github.io/custom-search/) redirects here.

## Notes and limitations

- Brave allows at most 10 pages and sometimes returns fewer than 10 results on a page.
- The caps protect the free monthly credit; raise `MONTHLY_QUERY_LIMIT` only if you add credit.
- Long snippets (for example code) are shown as plain text; presentation is future work.
- `.env` and `.env.local` must never be committed.

---

**Author:** Mario Granada
