// GET /api/search?q=<query>&page=<1-10>
// Proxies the Brave Web Search API so the API key stays on the server.
import { getSql } from './_lib/db.js';
import { HttpError, clientHash, consumeQuota, parseParams, searchBrave } from './_lib/search.js';

const json = (body, status, cacheControl) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': cacheControl }
  });

export async function GET(request) {
  try {
    const { q, page } = parseParams(request.url);

    const apiKey = process.env.BRAVE_SEARCH_API_KEY;
    const salt = process.env.RATE_LIMIT_SALT;
    const sql = getSql();
    if (!apiKey || !salt || !sql) throw new HttpError(503, 'not_configured');

    await consumeQuota(sql, {
      client: clientHash(request.headers, salt),
      dailyLimit: Number(process.env.DAILY_CLIENT_LIMIT || 40),
      monthlyLimit: Number(process.env.MONTHLY_QUERY_LIMIT || 900)
    });

    const data = await searchBrave({ q, page, apiKey });
    // Identical searches are served from Vercel's CDN for a day without spending quota.
    return json(
      { query: q, ...data },
      200,
      'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800'
    );
  } catch (error) {
    if (error instanceof HttpError) return json({ error: error.code }, error.status, 'no-store');
    console.error('search failed:', error?.message);
    return json({ error: 'internal_error' }, 500, 'no-store');
  }
}
