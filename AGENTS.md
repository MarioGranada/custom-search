# AGENTS.md — Custom Search

Compact guide for future OpenCode sessions. It records only the facts an agent is likely to miss or get wrong.

## Quickstart

| Command | Description |
| --- | --- |
| `yarn install` | Install dependencies. |
| `yarn dev` | Start Vite at http://localhost:3000/custom-search/. |
| `yarn test` | Run the Vitest suite once (`yarn test:watch` to watch). |
| `yarn build` | Production build to `dist/`. |
| `yarn lint` | Check ESLint. |

## Requirements

- Node.js 22.12+ (or 20.19+).
- Yarn 1.x (a `yarn.lock` is committed).
- Google Custom Search API key and search-engine ID. The JSON API is closed to new customers and shuts down on 2027-01-01.

## Environment

- Create a `.env` file (or `.env.local` where the framework expects it) and set the variables. Never commit real secrets.

  - `VITE_GOOGLE_API_KEY` — Google Custom Search JSON API key.
  - `VITE_GOOGLE_CX` — Google Programmable Search Engine ID (cx).
- All browser-exposed variables must start with `VITE_`; Vite inlines them at build time (public).
- Restart the dev server after changing `.env`. `.env.test` (committed, dummy values) is loaded by Vitest.

## Architecture

- `src/screens/search-screen/SearchScreen.tsx` — orchestration and fetching.
- `src/store/` — Redux actions, reducers, and initial state.
- `src/components/` — presentational UI, each with a test file.
- `src/utils/` — engine config merging, URL building, result mapping.
- `src/searchEngineConfig.json` — provider definitions; add engines here first.

## Commands and build order

- Run `yarn lint` and `yarn test` before finishing a change.
- `yarn build` is the production gate.
- There is no typecheck script or tsconfig; Vite strips TypeScript without checking it.

## Conventions and gotchas

- Components use Flow annotations; `vite.config.mjs` strips them with `@rolldown/plugin-babel`. Type-only imports must use `import type`.
- Bing was removed (Bing Search APIs retired Aug 2025). `combinations` in the engine config is empty but still supported.
- Provider response shapes differ; keep normalisation in `prepareDataBeforeStore`.
- Do not log credentials or full API responses in production code.

## Memory

- Read `MEMORY.md` first to understand the current status and decisions.
- Before changing behaviour, read `constitution.md` and keep the change aligned with it.
- After a task, update `MEMORY.md` with status, decisions, and mistakes to avoid. Keep it short.
- If a rule becomes permanent, move it into this file instead of leaving it in memory.
- Never store secrets, tokens, or personal data in `MEMORY.md`.
