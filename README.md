# Custom Search

A React application that queries several search engines from one interface. Google and Bing are supported individually, plus a combined mode that merges both result sets.

Engine behaviour is configuration-driven: endpoints, pagination fields, and result mappings live in `src/searchEngineConfig.json`, so adding another engine does not require rewriting the search screen.

## Features

- Search with Google, Bing, or both combined.
- Configuration-driven engine definitions and result normalisation.
- Redux store for form state and search results.
- Material UI layout with a top bar, engine dropdown, results list, and pagination.
- Loading state and user-facing error handling.
- English copy through `react-intl`.
- Jest/Enzyme unit tests for components, reducers, actions, and utilities.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | React 17 (Create React App 5) |
| State | Redux + React Redux |
| UI | Material UI 5 + Emotion |
| i18n | react-intl |
| HTTP | Fetch API |
| Testing | Jest + Enzyme + Testing Library |

## Project structure

```text
custom-search/
├── public/
├── src/
│   ├── components/           # Button, Dropdown, form wrapper, results, pagination
│   ├── screens/search-screen/ # Search screen composition and fetching
│   ├── store/                # Actions, reducers, action types
│   ├── utils/                # Engine config loading, URL building, result mapping
│   ├── lang/en.json          # UI copy
│   └── searchEngineConfig.json
├── .env_example
└── package.json
```

## Getting started

### Requirements

- Node.js 18 or 20 (CRA 5 is legacy; newer Node versions may need `NODE_OPTIONS=--openssl-legacy-provider`).
- Yarn 1.x (a `yarn.lock` is committed) or npm.
- Google Custom Search API key and search-engine ID.
- Bing Custom Search subscription key and custom-config ID.

### 1. Install dependencies

```bash
yarn install
cp .env_example .env
```

### 2. Configure environment variables

Create a `.env` file in `custom-search/` and add the values below. Use the committed example file as a template when one exists.

```bash
REACT_APP_GOOGLE_API_KEY=
REACT_APP_GOOGLE_CX=
REACT_APP_BING_CUSTOM_CONFIG_ID=
REACT_APP_BING_SUBSCRIPTION_KEY=
```

| Variable | Purpose | Required |
| --- | --- | --- |
| `REACT_APP_GOOGLE_API_KEY` | Google Custom Search JSON API key. | Yes |
| `REACT_APP_GOOGLE_CX` | Google Programmable Search Engine ID (cx). | Yes |
| `REACT_APP_BING_CUSTOM_CONFIG_ID` | Bing Custom Search configuration ID. | Yes |
| `REACT_APP_BING_SUBSCRIPTION_KEY` | Bing Search subscription key. | Yes |

### 3. Run locally

**Start the development server**

```bash
yarn start
```

Open http://localhost:3000.

CRA reads `REACT_APP_*` variables at build time, so restart the server after editing `.env`.

### Available scripts

| Command | Description |
| --- | --- |
| `yarn start` | Run the development server on port 3000. |
| `yarn build` | Create a production build in `build/`. |
| `yarn test` | Run Jest in interactive watch mode. |
| `yarn printCoverage` | Run tests and print coverage. |
| `yarn lint` | Run ESLint over the project. |
| `yarn lint:fix` | Run ESLint with automatic fixes. |
| `yarn format` | Format supported files with Prettier. |
| `yarn prettify` | Run ESLint fixes and Prettier together. |

## How it works

`SearchScreen` owns the selected engine, query text, and current page. On submit it builds a request through `utils/prepareSearch`, fetches the engine API, normalises the response through `utils/prepareDataBeforeStore`, and dispatches the result into Redux.

`src/searchEngineConfig.json` describes each engine: base URL, method, offset parameter, result path, and how to map provider fields onto the app model. `utils/loadEngines` merges that config with runtime credentials from the environment.

Presentational components under `src/components/` render the form, dropdown, result list, and pagination without knowing which engine produced the data.

## Deployment

- Target: GitHub Actions builds the CRA app and publishes `build/` to GitHub Pages. Add the repository `homepage` (or configure the Pages base path) before deploying.
- Store the four API credentials as GitHub Actions secrets and expose them to the build step; CRA inlines `REACT_APP_*` values into the client bundle.
- Because the keys are client-side, treat this as a demo. A production version should proxy requests through a small server so keys are never shipped to the browser.

## Notes and limitations

- Only the first page of each provider response is displayed; result counts and deeper pagination are listed as future work in the original README.
- The APIs are called directly from the browser, so provider CORS rules and key restrictions apply.
- `.env` and `.env.test` exist locally but must never be committed.

---

**Author:** Mario Granada
