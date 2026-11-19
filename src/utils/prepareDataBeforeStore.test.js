import prepareDataBeforeStore, { propByPath } from './prepareDataBeforeStore';
import { resultsMock } from '../mocks';

const { items } = resultsMock;
const apiResponse = { query: 'synack', page: 1, perPage: 10, hasMore: true, items };

describe('prepareDataBeforeStore [Utils]', () => {
  it('keeps the configured item props and the hasMore flag', () => {
    expect(prepareDataBeforeStore('brave', apiResponse)).toEqual({ items, hasMore: true });
  });

  it('drops props that are not configured', () => {
    const withExtra = { ...apiResponse, items: [{ ...items[0], raw: 'x' }] };
    expect(prepareDataBeforeStore('brave', withExtra).items[0]).not.toHaveProperty('raw');
  });

  it('returns no items when empty data is passed', () => {
    expect(prepareDataBeforeStore('brave', {})).toEqual({ items: [], hasMore: false });
  });

  it('reads nested values when the path is an array', () => {
    expect(propByPath(['a', 'b'], { a: { b: 3 } })).toEqual(3);
  });
});
