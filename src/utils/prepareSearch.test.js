import prepareSearch from './prepareSearch';

describe('prepareSearch url [Utils]', () => {
  it('targets the same-origin proxy with no credentials and page 1 by default', () => {
    expect(prepareSearch('brave', 'test')).toEqual({
      searchURL: '/api/search?q=test&page=1',
      method: 'GET',
      headers: {}
    });
  });

  it('encodes and normalises the query so identical searches share a cache entry', () => {
    expect(prepareSearch('brave', '  React & Redux ', 2).searchURL).toBe(
      '/api/search?q=react+%26+redux&page=2'
    );
  });

  it('clamps the page to the engine maximum', () => {
    expect(prepareSearch('brave', 'test', 99).searchURL).toBe('/api/search?q=test&page=10');
  });
});
