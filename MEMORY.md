# Custom Search — Working Memory

_Last updated: 2026-11-02_

## Current status

- Google, Bing, and combined search modes are implemented.
- Redux store, MUI layout, i18n copy, and unit tests are in place.
- Pagination is partially wired; the original README still lists result-count and deeper pagination as pending.

## Key decisions

- Kept engine definitions data-driven in `searchEngineConfig.json` so new providers are additive.
- Used CRA because the project originated as a challenge and its test setup was already in place.

## Known limitations and follow-ups

- API keys are exposed in the client bundle.
- Only the first provider page is shown.
- CRA 5 is legacy and can be awkward on modern Node versions.

## Mistakes to avoid

- Do not rename env vars without the `REACT_APP_` prefix; CRA will not expose them.
- Do not assume `yarn test` exits after one run — it watches by default.
- Restart the dev server after env changes.

## Next steps

- Finish result-count and pagination behaviour.
- Add a small server proxy to protect provider keys.
- Raise coverage on the search screen and combined-mode mapping.

---

Keep this file under ~60 lines. Summarise or delete notes that no longer add value.
