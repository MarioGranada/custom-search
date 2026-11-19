// Server-only helpers for /api/search. Files under api/_lib are not exposed as routes.
import { createHash } from 'node:crypto';

export const BRAVE_ENDPOINT = 'https://api.search.brave.com/res/v1/web/search';
export const PER_PAGE = 10;
export const MAX_PAGES = 10; // Brave accepts offset 0-9 (zero-based page index)
export const MIN_QUERY = 3;
export const MAX_QUERY = 200;

export class HttpError extends Error {
  constructor(status, code) {
    super(code);
    this.status = status;
    this.code = code;
  }
}

/** Validates `q` and `page` from the request URL. Throws HttpError(400). */
export function parseParams(url) {
  const { searchParams } = new URL(url);
  const q = (searchParams.get('q') || '').trim().replace(/\s+/g, ' ');
  if (q.length < MIN_QUERY || q.length > MAX_QUERY) throw new HttpError(400, 'invalid_query');

  const rawPage = searchParams.get('page') ?? '1';
  const page = Number(rawPage);
  if (!Number.isInteger(page) || page < 1 || page > MAX_PAGES) {
    throw new HttpError(400, 'invalid_page');
  }
  return { q, page };
}

const ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#x27;': "'",
  '&nbsp;': ' '
};

/** Removes tags and decodes the handful of entities Brave snippets contain. */
export function toPlainText(value = '') {
  return String(value)
    .replace(/<[^>]*>/g, '')
    .replace(/&(?:amp|lt|gt|quot|nbsp|#39|#x27);/g, (m) => ENTITIES[m])
    .trim();
}

function displayUrl(url, metaUrl) {
  if (metaUrl?.hostname) return metaUrl.hostname;
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

/** Maps a Brave web-search payload to the app's result shape. */
export function normalizeBrave(payload, page) {
  const results = payload?.web?.results ?? [];
  const items = results
    .filter((r) => r && r.url && r.title)
    .map((r) => ({
      id: r.url,
      title: toPlainText(r.title),
      url: r.url,
      displayUrl: displayUrl(r.url, r.meta_url),
      overview: toPlainText(r.description)
    }));
  const hasMore = Boolean(payload?.query?.more_results_available) && page < MAX_PAGES;
  return { page, perPage: PER_PAGE, hasMore, items };
}

/** Calls the Brave Web Search API. Throws HttpError(502) on upstream failure. */
export async function searchBrave({ q, page, apiKey, fetchImpl = fetch }) {
  const params = new URLSearchParams({
    q,
    count: String(PER_PAGE),
    offset: String(page - 1),
    safesearch: 'moderate',
    text_decorations: 'false'
  });
  let response;
  try {
    response = await fetchImpl(`${BRAVE_ENDPOINT}?${params}`, {
      headers: { Accept: 'application/json', 'X-Subscription-Token': apiKey },
      signal: AbortSignal.timeout(8000)
    });
  } catch {
    throw new HttpError(502, 'upstream_unreachable');
  }
  if (response.status === 429) throw new HttpError(429, 'upstream_rate_limited');
  if (!response.ok) throw new HttpError(502, 'upstream_error');
  return normalizeBrave(await response.json(), page);
}

/** First client IP from the proxy headers, hashed so no raw IP is stored. */
export function clientHash(headers, salt) {
  const forwarded = headers.get('x-forwarded-for') || '';
  const ip = forwarded.split(',')[0].trim() || headers.get('x-real-ip') || 'unknown';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}

/**
 * Counts this request against the per-client daily and the global monthly caps.
 * Runs before calling Brave, so a capped request never spends credit.
 */
export async function consumeQuota(sql, { client, dailyLimit, monthlyLimit }) {
  const [daily] = await sql`
    insert into custom_search.daily_client_usage (client_hash, day, requests)
    values (${client}, current_date, 1)
    on conflict (client_hash, day)
      do update set requests = custom_search.daily_client_usage.requests + 1
    returning requests`;
  if (daily.requests > dailyLimit) throw new HttpError(429, 'daily_limit');

  const [monthly] = await sql`
    insert into custom_search.monthly_usage (month, requests)
    values (date_trunc('month', current_date)::date, 1)
    on conflict (month)
      do update set requests = custom_search.monthly_usage.requests + 1
    returning requests`;
  if (monthly.requests > monthlyLimit) throw new HttpError(429, 'monthly_limit');

  // Opportunistic cleanup: per-client rows only matter for the current day.
  if (Math.random() < 0.05) {
    await sql`delete from custom_search.daily_client_usage where day < current_date - 1`;
  }
}
