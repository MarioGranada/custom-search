// @vitest-environment node
import {
  HttpError,
  MAX_PAGES,
  clientHash,
  consumeQuota,
  normalizeBrave,
  parseParams,
  searchBrave,
  toPlainText
} from './search';

const url = (qs) => `https://example.test/api/search?${qs}`;

describe('parseParams [api]', () => {
  it('accepts a trimmed query and defaults page to 1', () => {
    expect(parseParams(url('q=%20phoenix%20%20liveview%20'))).toEqual({
      q: 'phoenix liveview',
      page: 1
    });
  });

  it.each(['q=ab', `q=${'x'.repeat(201)}`, ''])('rejects invalid query "%s"', (qs) => {
    expect(() => parseParams(url(qs))).toThrow(HttpError);
  });

  it.each(['0', '11', '1.5', 'abc'])('rejects page %s', (p) => {
    expect(() => parseParams(url(`q=react&page=${p}`))).toThrow('invalid_page');
  });
});

describe('normalizeBrave [api]', () => {
  const payload = {
    query: { more_results_available: true },
    web: {
      results: [
        {
          title: 'Phoenix <strong>LiveView</strong>',
          url: 'https://hexdocs.pm/phoenix_live_view',
          description: 'Rich, real-time &amp; interactive &#x27;UX&#x27;',
          meta_url: { hostname: 'hexdocs.pm' }
        },
        { title: 'No url' }
      ]
    }
  };

  it('maps results to the app shape and drops incomplete ones', () => {
    expect(normalizeBrave(payload, 2)).toEqual({
      page: 2,
      perPage: 10,
      hasMore: true,
      items: [
        {
          id: 'https://hexdocs.pm/phoenix_live_view',
          title: 'Phoenix LiveView',
          url: 'https://hexdocs.pm/phoenix_live_view',
          displayUrl: 'hexdocs.pm',
          overview: "Rich, real-time & interactive 'UX'"
        }
      ]
    });
  });

  it('never reports more results past the last page Brave can serve', () => {
    expect(normalizeBrave(payload, MAX_PAGES).hasMore).toBe(false);
  });

  it('handles an empty payload', () => {
    expect(normalizeBrave({}, 1)).toEqual({ page: 1, perPage: 10, hasMore: false, items: [] });
  });

  it('strips tags', () => {
    expect(toPlainText('<b>a</b> &lt;b&gt;')).toBe('a <b>');
  });
});

describe('searchBrave [api]', () => {
  it('sends the key as a header and the page as a zero-based offset', async () => {
    const fetchImpl = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({}) }));
    await searchBrave({ q: 'react hooks', page: 3, apiKey: 'k', fetchImpl });

    const [calledUrl, options] = fetchImpl.mock.calls[0];
    const params = new URL(calledUrl).searchParams;
    expect(params.get('q')).toBe('react hooks');
    expect(params.get('offset')).toBe('2');
    expect(params.get('count')).toBe('10');
    expect(calledUrl).not.toContain('k&');
    expect(options.headers['X-Subscription-Token']).toBe('k');
  });

  it('maps upstream failures to HttpErrors', async () => {
    const failing = (status) => vi.fn(async () => ({ ok: false, status }));
    await expect(
      searchBrave({ q: 'abc', page: 1, apiKey: 'k', fetchImpl: failing(429) })
    ).rejects.toMatchObject({ status: 429 });
    await expect(
      searchBrave({ q: 'abc', page: 1, apiKey: 'k', fetchImpl: failing(500) })
    ).rejects.toMatchObject({ status: 502 });
  });
});

describe('quota [api]', () => {
  it('hashes the first forwarded IP with the salt', () => {
    const a = clientHash(new Headers({ 'x-forwarded-for': '1.2.3.4, 10.0.0.1' }), 's');
    const b = clientHash(new Headers({ 'x-forwarded-for': '1.2.3.4' }), 's');
    expect(a).toBe(b);
    expect(a).not.toContain('1.2.3.4');
    expect(clientHash(new Headers({ 'x-forwarded-for': '1.2.3.4' }), 'other')).not.toBe(a);
  });

  const fakeSql = (daily, monthly) => {
    const sql = vi.fn();
    sql
      .mockResolvedValueOnce([{ requests: daily }])
      .mockResolvedValueOnce([{ requests: monthly }])
      .mockResolvedValue([]);
    return sql;
  };
  const limits = { client: 'h', dailyLimit: 40, monthlyLimit: 900 };

  it('allows requests under both caps', async () => {
    await expect(consumeQuota(fakeSql(1, 1), limits)).resolves.toBeUndefined();
  });

  it('rejects over the daily cap without touching the monthly counter', async () => {
    const sql = fakeSql(41, 1);
    await expect(consumeQuota(sql, limits)).rejects.toMatchObject({
      status: 429,
      code: 'daily_limit'
    });
    expect(sql).toHaveBeenCalledTimes(1);
  });

  it('rejects over the monthly cap', async () => {
    await expect(consumeQuota(fakeSql(1, 901), limits)).rejects.toMatchObject({
      code: 'monthly_limit'
    });
  });
});
