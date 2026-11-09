# AGENTS.md — Custom Search

Compact guide for future OpenCode sessions. It records only the facts an agent is likely to miss or get wrong.

## Quickstart

| Command | Description |
| --- | --- |
| `yarn install` | Install dependencies. |
| `yarn start` | Start CRA at http://localhost:3000. |
| `yarn test` | Run the Jest suite. |
| `yarn lint` | Check ESLint. |

## Requirements

- Node.js 18 or 20 (CRA 5 is legacy; newer Node versions may need `NODE_OPTIONS=--openssl-legacy-provider`).
- Yarn 1.x (a `yarn.lock` is committed) or npm.
- Google Custom Search API key and search-engine ID.
- Bing Custom Search subscription key and custom-config ID.

## Environment

- Create a `.env` file (or `.env.local` where the framework expects it) and set the variables. Never commit real secrets.

  - `REACT_APP_GOOGLE_API_KEY` — Google Custom Search JSON API key.
  - `REACT_APP_GOOGLE_CX` — Google Programmable Search Engine ID (cx).
  - `REACT_APP_BING_CUSTOM_CONFIG_ID` — Bing Custom Search configuration ID.
  - `REACT_APP_BING_SUBSCRIPTION_KEY` — Bing Search subscription key.
- All browser-exposed variables must start with `REACT_APP_`.
- Restart the dev server after changing `.env`; CRA inlines values at build time.

## Architecture

- `src/screens/search-screen/SearchScreen.tsx` — orchestration and fetching.
- `src/store/` — Redux actions, reducers, and initial state.
- `src/components/` — presentational UI, each with a test file.
- `src/utils/` — engine config merging, URL building, result mapping.
- `src/searchEngineConfig.json` — provider definitions; add engines here first.

## Commands and build order

- Run `yarn lint` and `yarn test` before finishing a change.
- `yarn build` is the production gate; CRA fails the build on some lint errors.
- There is no separate typecheck script; TypeScript is used sparingly in the search screen.

## Conventions and gotchas

- CRA 5 is in maintenance mode; avoid adding new CRA-specific tooling.
- The combined `google-bing` mode is a config-level combination, not a separate API.
- Provider response shapes differ; keep normalisation in `prepareDataBeforeStore`.
- Do not log credentials or full API responses in production code.

## Memory

- Read `MEMORY.md` first to understand the current status and decisions.
- Before changing behaviour, read `constitution.md` and keep the change aligned with it.
- After a task, update `MEMORY.md` with status, decisions, and mistakes to avoid. Keep it short.
- If a rule becomes permanent, move it into this file instead of leaving it in memory.
- Never store secrets, tokens, or personal data in `MEMORY.md`.
