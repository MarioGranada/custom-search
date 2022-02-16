import initialState from './initialState';
import resultsReducer from '.';
import actions from '../../actions';
import { resultsMock } from '../../../mocks';

describe('Results [Reducer]', () => {
  it('should return the state by default', () => {
    expect(resultsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOAD_RESULTS', () => {
    expect(resultsReducer(resultsMock, actions.loadForm())).toEqual(resultsMock);
  });

  it('should handle UPDATE_RESULTS', () => {
    expect(resultsReducer(undefined, actions.updateResults(resultsMock))).toEqual(resultsMock);
  });

  it('should handle CLEAR_RESULTS', () => {
    expect(resultsReducer(resultsMock, actions.clearResults())).toEqual(initialState);
  });

  it('should handle MERGE_RESULTS', () => {
    const aggregatedMock = {
      ...resultsMock,
      items: [
        {
          title: 'Test result',
          overview: 'test mock result',
          url: 'https://www.example.com/',
          displayUrl: 'www.example.com',
          id: 'https://www.example.com/',
          kind: 'customsearch#result'
        }
      ]
    };

    expect(
      resultsReducer({ ...resultsMock, isLoading: true }, actions.mergeResults(aggregatedMock))
        .items.length
    ).toEqual(resultsMock.items.length + 1);
  });
});
