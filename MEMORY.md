# Custom Search — Working Memory

_Last updated: 2026-11-12_

## Current status

- Google is the only engine; Bing was removed (APIs retired Aug 2025).
- Migrated from CRA to Vite 8 + Vitest 5 (2026-11); deployed to GitHub Pages via Actions.
- Redux store, MUI layout, i18n copy, and unit tests are in place.
- Pagination is partially wired; the original README still lists result-count and deeper pagination as pending.

## Key decisions

- Kept engine definitions data-driven in `searchEngineConfig.json` so new providers are additive.
- Moved off CRA to Vite; enzyme tests were ported to React Testing Library.

## Known limitations and follow-ups

- API keys are exposed in the client bundle.
- Only the first provider page is shown.
- Google Custom Search JSON API is closed to new customers and shuts down 2027-01-01; this project's key gets 403 ACCESS_DENIED. Needs a replacement provider.

## Mistakes to avoid

- Browser env vars need the `VITE_` prefix.
- `yarn test` runs once; use `yarn test:watch` to watch.
- Restart the dev server after env changes.

## Next steps

- Finish result-count and pagination behaviour.
- Add a small server proxy to protect provider keys.
- Replace the Google JSON API before 2027-01-01.

---

Keep this file under ~60 lines. Summarise or delete notes that no longer add value.
