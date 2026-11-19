# Custom Search — Working Memory

_Last updated: 2026-11-19_

## Current status

- Live on Vercel: https://custom-search-seven.vercel.app (project `custom-search`). The old GitHub Pages URL redirects there.
- Brave Search API is the only engine, called through `api/search.js` (Vercel Function); the key is server-side.
- Pagination works: 1-based, 10 per page, next page revealed while Brave reports `hasMore` (max 10 pages).
- Quota guard in the shared Supabase Postgres (schema `custom_search`): 40/visitor/day, 900/month; CDN caches repeats for a day.

## Key decisions

- Google removed: Custom Search JSON API closed to new customers, shuts down 2027-01-01. Bing retired Aug 2025.
- Proxy instead of client keys: Pages could only ship keys in the public bundle.
- Brave is prepaid ($5 free credit/month, ~1,000 requests); the monthly cap keeps the demo inside it.
- Engine definitions stay data-driven in `searchEngineConfig.json`, now pointing at same-origin proxies.

## Known limitations and follow-ups

- UI/UX pass pending: long code snippets render as plain text, results disappear while the next page loads.
- Brave sometimes returns fewer than 10 results per page.
- The TS refactor WIP lives in `git stash@{0}`; rebase it onto the new SearchScreen before applying.

## Mistakes to avoid

- Never add a `VITE_`-prefixed secret; the client needs no env vars.
- `yarn dev` alone has no API; use `vercel dev` for end-to-end local runs.
- `yarn test` runs once; use `yarn test:watch` to watch.

## Next steps

- UI/UX improvements (loading state, snippet presentation, empty states).

---

Keep this file under ~60 lines. Summarise or delete notes that no longer add value.
