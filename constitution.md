# Project Constitution — Custom Search

This document defines the non-negotiable foundations for this repository. Read it before adding or changing features.

## Guiding Principles

- **Simplicity first** — prefer the smallest solution that solves the problem. If a change needs a long explanation, it is probably over-engineered.
- **No hardcoded secrets or endpoints** — configuration belongs in environment variables; visual design tokens belong in styles, not in `.env` files.
- **Traceability** — every value, dependency, and route should make its origin and purpose obvious.
- **Debuggability** — fail loudly and visibly; avoid silent fallbacks that hide broken data.
- **Official patterns** — use the documented API of each framework and library before inventing a workaround.
- **Portfolio clarity** — this repository is part of a public portfolio. Code should read as clean, intentional, and easy for a reviewer to follow.

## Technology Stack Foundations

| Layer | Choice | Rationale |
| --- | --- | --- |
| Framework | React 17 + Vite 8 | Vite replaced the unmaintained Create React App for builds and the dev server. |
| State | Redux + React Redux | Keeps the search form and normalised results independent of the screen component. |
| UI | Material UI 5 + Emotion | Pre-built accessible inputs, buttons, and layout primitives. |
| i18n | react-intl | Keeps user-facing copy out of components. |
| HTTP | Fetch API | No extra HTTP dependency is needed for a JSON API. |
| Testing | Vitest + React Testing Library | Unit coverage for the store and UI pieces. |

**Rule of thumb:** a new dependency must solve a concrete problem that the current stack cannot solve cleanly. Justify it in the change that introduces it.

## Core Premises

### 1. Scope

A focused search-aggregator demo: one screen, a small Redux store, and a configurable provider layer. The goal is to show clean data normalisation and component structure, not to become a full search product.

### 2. Environment Isolation

- The app reads these values from the environment: `VITE_GOOGLE_API_KEY`, `VITE_GOOGLE_CX`.
- Keep real values in `.env` (gitignored) and document them in the example file and README.
- Never commit keys, tokens, database URLs, or credentials.
- Validate required values at the point of use and fail with a clear message.

### 3. Architecture

- Keep provider-specific details in `src/searchEngineConfig.json` and `src/utils/`; components should receive a uniform result shape.
- Redux owns shared form/results state; local component state is for transient UI only.
- Every component keeps its test next to it (`*.test.jsx`).

### 4. Data and State

- Search results are normalised before entering Redux; do not store raw provider payloads.
- Pagination state lives in the screen and is passed to the request builder.
- No persistence: refreshing the page clears results.

### 5. Styling and UX

- Material UI and Emotion provide the component styling.
- Keep layout primitives in components rather than scattering inline styles.
- User-facing strings belong in `src/lang/en.json` via `react-intl`.

### 6. Quality Gates

- `yarn lint`, `yarn test`, and `yarn build` are the quality gates.
- Add or update a test when changing reducers, actions, or result mapping.
- Manually verify each engine with real credentials.

### 7. Deployment

- Build with Vite and publish `dist/` to GitHub Pages through Actions.
- Keep API credentials in repository secrets, never in the workflow file.
- Document the client-side key exposure and the server-proxy alternative.

## What to Avoid

- Committing `.env` or `.env.test`.
- Adding provider-specific branching inside presentational components.
- Storing raw API responses in Redux.
- Assuming a provider always returns results or the same field names.

## Checklist Before Adding Anything New

- Does this solve a real problem for this project, or am I adding scope for its own sake?
- Is every new value configuration-driven rather than hardcoded?
- Does the change follow the existing folder and naming patterns?
- Is there a clear failure path when data, the network, or the environment is unavailable?
- Have I run the available lint/build/test command and fixed what it reports?
- Did I update `README.md` and `MEMORY.md` if behaviour or setup changed?

## Philosophy Statement

This repository exists to show thoughtful front-end engineering: clear structure, readable code, and deliberate trade-offs. The goal is not to use every tool available, but to make every file explain itself. Simplicity is the feature.
