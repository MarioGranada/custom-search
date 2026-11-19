import initConfig from '../searchEngineConfig.json';

/**
 * Builds the request for one engine. Engines are reached through same-origin
 * proxies (see `api/`), so no credentials are added on the client.
 * `page` is 1-based and clamped to the engine's `maxPages`.
 */
const prepareSearch = (engine, query, page) => {
  const { baseURL, method, queryParams, headers, defaultOffset, offsetParam, maxPages } =
    initConfig.engines[engine];

  const requested = Number.isInteger(page) && page > 0 ? page : parseInt(defaultOffset, 10);
  const validatedPage = Math.min(requested, parseInt(maxPages, 10));

  const params = new URLSearchParams(queryParams);
  params.set('q', query.trim().toLowerCase());
  params.set(offsetParam, String(validatedPage));

  return {
    searchURL: `${baseURL}${params}`,
    method,
    headers
  };
};

export default prepareSearch;
