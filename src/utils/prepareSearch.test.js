import prepareSearch from './prepareSearch';

describe('prepareSearch url [Utils]', () => {
  it('should elaborate the proper search url before fetch', () => {
    expect(prepareSearch('google', 'test')).toEqual({
      searchURL: 'https://www.googleapis.com/customsearch/v1?key=google_key1&cx=google_key2&q=test',
      method: 'GET',
      headers: {}
    });

    expect(prepareSearch('bing', 'test')).toEqual({
      searchURL:
        'https://api.bing.microsoft.com/v7.0/custom/search?customconfig=bing_key1&mkt=en-US&q=test',
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': 'bing_key2'
      }
    });
  });
});
