# Custom Search

A React application that queries web search engines from one interface. Google (Custom Search JSON API) is the supported engine. Bing was removed when Microsoft retired the Bing Search APIs in August 2025.

Engine behaviour is configuration-driven: endpoints, pagination fields, and result mappings live in `src/searchEngineConfig.json`, so adding another engine does not require rewriting the search screen.

## Live demo

https://mariogranada.github.io/custom-search/

## Features

- Search with Google through the Custom Search JSON API.
- Configuration-driven engine definitions and result normalisation (add an engine via config).
- Redux store for form state and search results.
- Material UI layout with a top bar, engine dropdown, results list, and pagination.
- Embedded Google Programmable Search widget (`cse.js`) below the app.
- English copy through `react-intl`.
- Vitest + React Testing Library unit tests for components, reducers, actions, and utilities.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | React 17 + Vite 8 |
| State | Redux + React Redux |
| UI | Material UI 5 + Emotion |
| i18n | react-intl |
| HTTP | Fetch API |
| Testing | Vitest + React Testing Library + jsdom |

## Project structure

```text
custom-search/
├── index.html                # Vite entry
├── public/                   # Static assets copied to dist/
├── src/
│   ├── components/           # Button, Dropdown, form wrapper, results, pagination
│   ├── screens/search-screen/ # Search screen composition and fetching (TypeScript)
│   ├── store/                # Actions, reducers, action types
│   ├── utils/                # Engine config loading, URL building, result mapping
│   ├── lang/en.json          # UI copy
│   └── searchEngineConfig.json
├── .env_example
├── vite.config.mjs
└── package.json
```

## Getting started

### Requirements

- Node.js 22.12+ (or 20.19+).
- Yarn 1.x (a `yarn.lock` is committed).
- A Google API key with access to the Custom Search JSON API, and a Programmable Search Engine ID (cx).

> **Google API status:** Google closed the Custom Search JSON API to new customers and will shut it down on **1 January 2027**. Projects without existing access get `403 PERMISSION_DENIED`.

### 1. Install dependencies

```bash
yarn install
cp .env_example .env
```

### 2. Configure environment variables

Fill in `.env` (git-ignored):

```bash
VITE_GOOGLE_API_KEY=
VITE_GOOGLE_CX=
```

| Variable | Purpose | Required |
| --- | --- | --- |
| `VITE_GOOGLE_API_KEY` | Google Custom Search JSON API key (restrict it by HTTP referrer). | Yes |
| `VITE_GOOGLE_CX` | Google Programmable Search Engine ID (cx). | Yes |

Vite inlines `VITE_*` values into the client bundle at build time, so they are public. Restart the dev server after editing `.env`.

### 3. Run locally

```bash
yarn dev
```

Open http://localhost:3000/custom-search/.

### Available scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Run the Vite dev server on port 3000. |
| `yarn build` | Create a production build in `dist/`. |
| `yarn preview` | Serve the production build locally. |
| `yarn test` | Run the Vitest suite once. |
| `yarn test:watch` | Run Vitest in watch mode. |
| `yarn lint` | Run ESLint over the project. |
| `yarn lint:fix` | Run ESLint with automatic fixes. |
| `yarn format` | Format supported files with Prettier. |
| `yarn prettify` | Run ESLint fixes and Prettier together. |

## How it works

`SearchScreen` owns the selected engine, query text, and current page. On submit it builds a request through `utils/prepareSearch`, fetches the engine API, normalises the response through `utils/prepareDataBeforeStore`, and dispatches the result into Redux.

`src/searchEngineConfig.json` describes each engine: base URL, method, offset parameter, result path, and how to map provider fields onto the app model. `utils/loadEngines` merges that config with runtime credentials from the environment.

Presentational components under `src/components/` render the form, dropdown, result list, and pagination without knowing which engine produced the data.

## Deployment

- GitHub Actions (`.github/workflows/deploy.yml`) runs tests, builds with `base: '/custom-search/'`, copies `index.html` to `404.html`, and publishes `dist/` to the `gh-pages` branch on every push to `main`.
- Add `VITE_GOOGLE_API_KEY` and `VITE_GOOGLE_CX` as repository Actions secrets; the workflow passes them to `yarn build`.
- The key ships to the browser. Restrict it in Google Cloud Console to the HTTP referrers `https://mariogranada.github.io/custom-search/*` and `http://localhost:3000/*`, and to the Custom Search API only.

## Notes and limitations

- Only the first page of each provider response is displayed; deeper pagination is future work.
- The API is called directly from the browser, so provider CORS rules and key restrictions apply.
- `.env` must never be committed. `.env.test` is committed and holds dummy values for tests.

---

**Author:** Mario Granada
