import prepareDataBeforeStore, { propByPath } from './prepareDataBeforeStore';
import { resultsMock } from '../mocks';

const { items } = resultsMock;

const googleData = {
  searchInformation: { totalResults: 5 },
  items: resultsMock.items.map((item) => {
    const { title, overview, id, url, displayUrl, kind } = item;
    return {
      title,
      snippet: overview,
      link: url,
      displayLink: displayUrl,
      kind
    };
  })
};

const bingData = {
  webPages: {
    value: resultsMock.items.map((item) => {
      const { title, overview, id, url, displayUrl } = item;
      return { name: title, snippet: overview, id, url, displayUrl };
    }),
    totalEstimatedMatches: 5
  }
};

describe('prepareDataBeforeStore [Utils]', () => {
  it('should return the data correctly parsed before storing', () => {
    expect(prepareDataBeforeStore('google', googleData)).toEqual({ items, totalResults: 5 });
    expect(prepareDataBeforeStore('bing', bingData)).toEqual({ items, totalResults: 5 });
  });

  it('should return no items when empty data is passed', () => {
    expect(prepareDataBeforeStore('google', {})).toEqual({ totalResults: 0, items: [] });
  });

  it('should pars data when path is an array', () => {
    expect(propByPath(['searchInformation', 'totalResults'], googleData)).toEqual(
      googleData.searchInformation.totalResults
    );
  });
});
