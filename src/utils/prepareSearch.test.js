import prepareSearch from './prepareSearch';

describe('prepareSearch url [Utils]', () => {
  it('should elaborate the proper search url before fetch', () => {
    // default Google offset is `start=1` (searchEngineConfig.json defaultOffset)
    expect(prepareSearch('google', 'test')).toEqual({
      searchURL:
        'https://www.googleapis.com/customsearch/v1?key=google_key1&cx=google_key2&q=test&start=1',
      method: 'GET',
      headers: {}
    });
  });
});
