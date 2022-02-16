import actions from '.';
import { resultsActionTypes as actionTypes } from '../../actionTypes';
import { resultsMock } from '../../../mocks';

describe('results [Actions]', () => {
  it('should load results when called', () => {
    const expectedAction = {
      type: actionTypes.LOAD_RESULTS
    };
    expect(actions.loadResults()).toEqual(expectedAction);
  });

  it('should update results when updated', () => {
    const expectedAction = {
      type: actionTypes.UPDATE_RESULTS,
      payload: resultsMock
    };
    expect(actions.updateResults(resultsMock)).toEqual(expectedAction);
  });

  it('should clear results when called', () => {
    const expectedAction = {
      type: actionTypes.CLEAR_RESULTS
    };
    expect(actions.clearResults()).toEqual(expectedAction);
  });

  it('should merge results when called', () => {
    const expectedAction = {
      type: actionTypes.MERGE_RESULTS,
      payload: resultsMock
    };
    expect(actions.mergeResults(resultsMock)).toEqual(expectedAction);
  });
});
