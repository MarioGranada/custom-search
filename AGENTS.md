# AGENTS.md — Custom Search

Compact guide for future OpenCode sessions. It records only the facts an agent is likely to miss or get wrong.

## Quickstart

| Command | Description |
| --- | --- |
| `yarn install` | Install dependencies. |
| `vercel dev` | Run the UI and `api/search.js` together (needs `vercel link` + `vercel env pull .env.local`). |
| `yarn dev` | Vite UI only at http://localhost:3000 (searches need the API). |
| `yarn db:migrate` | Create the `custom_search` usage-counter schema. |
| `yarn test` | Run the Vitest suite once (`yarn test:watch` to watch). |
| `yarn build` | Production build to `dist/`. |
| `yarn lint` | Check ESLint. |

## Requirements

- Node.js 22.12+ (or 20.19+).
- Yarn 1.x (a `yarn.lock` is committed).
- A Brave Search API key (server-side env var `BRAVE_SEARCH_API_KEY`).

## Environment

- Server-side only (read by `api/`): `BRAVE_SEARCH_API_KEY`, `RATE_LIMIT_SALT`, `POSTGRES_URL` (Supabase integration), optional `DAILY_CLIENT_LIMIT` (40) and `MONTHLY_QUERY_LIMIT` (900). See `.env.example`.
- Never give provider keys a `VITE_` prefix: Vite inlines `VITE_*` into the public bundle. The client has no env vars at all.
- `vercel env pull .env.local` fetches the values; `.env*` is gitignored except `.env.example`.

## Architecture

- `src/screens/search-screen/SearchScreen.tsx` — orchestration and fetching.
- `src/store/` — Redux actions, reducers, and initial state.
- `src/components/` — presentational UI, each with a test file.
- `src/utils/` — request building (`prepareSearch`) and result mapping (`prepareDataBeforeStore`).
- `api/search.js` — Vercel Function proxying Brave; helpers in `api/_lib/` (underscore = not a route).
- `src/searchEngineConfig.json` — provider definitions; add engines here first.

## Commands and build order

- Run `yarn lint` and `yarn test` before finishing a change.
- `yarn build` is the production gate.
- There is no typecheck script or tsconfig; Vite strips TypeScript without checking it.

## Conventions and gotchas

- Components use Flow annotations; `vite.config.mjs` strips them with `@rolldown/plugin-babel`. Type-only imports must use `import type`.
- Google (JSON API closed, shuts down 2027-01-01) and Bing (retired Aug 2025) were removed. `combinations` in the engine config is empty but still supported.
- Engines are reached through same-origin proxies under `api/`; a new engine needs a proxy plus a config entry.
- The quota check runs before calling Brave; keep it that way so capped requests never spend credit.
- Brave has no total-results count: pagination reveals the next page only while `hasMore` is true (max 10 pages).
- Provider response shapes differ; keep normalisation in `prepareDataBeforeStore`.
- Do not log credentials or full API responses in production code.

## Memory

- Read `MEMORY.md` first to understand the current status and decisions.
- Before changing behaviour, read `constitution.md` and keep the change aligned with it.
- After a task, update `MEMORY.md` with status, decisions, and mistakes to avoid. Keep it short.
- If a rule becomes permanent, move it into this file instead of leaving it in memory.
- Never store secrets, tokens, or personal data in `MEMORY.md`.
