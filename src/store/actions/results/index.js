import { resultsActionTypes as actionTypes } from '../../actionTypes';

export const loadResults = () => ({
  type: actionTypes.LOAD_RESULTS
});

export const updateResults = (payload) => ({
  type: actionTypes.UPDATE_RESULTS,
  payload
});

export const clearResults = () => ({
  type: actionTypes.CLEAR_RESULTS
});

export const mergeResults = (payload) => ({
  type: actionTypes.MERGE_RESULTS,
  payload
});
