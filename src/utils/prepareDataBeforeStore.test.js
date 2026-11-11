import prepareDataBeforeStore, { propByPath } from './prepareDataBeforeStore';
import { resultsMock } from '../mocks';

const { items } = resultsMock;

const googleData = {
  searchInformation: { totalResults: 5 },
  items: resultsMock.items.map((item) => {
    const { title, overview, url, displayUrl, kind } = item;
    return {
      title,
      snippet: overview,
      link: url,
      displayLink: displayUrl,
      kind
    };
  })
};

describe('prepareDataBeforeStore [Utils]', () => {
  it('should return the data correctly parsed before storing', () => {
    expect(prepareDataBeforeStore('google', googleData)).toEqual({ items, totalResults: 5 });
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
