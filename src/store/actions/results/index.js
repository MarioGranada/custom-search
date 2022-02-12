import { resultsActionTypes as actionTypes } from '../../actionTypes';

export const loadResults = () => ({
  type: actionTypes.LOAD_RESULTS
});

export const updateResults = (newItems) => ({
  type: actionTypes.UPDATE_RESULTS,
  payload: { items: newItems }
});

export const clearResults = () => ({
  tyoe: actionTypes.CLEAR_RESULTS
});

export const mergeResults = (items) => ({
  type: actionTypes.MERGE_RESULTS,
  payload: { items }
});
