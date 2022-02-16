import { resultsActionTypes as actionTypes } from '../../actionTypes';

const loadResults = () => ({
  type: actionTypes.LOAD_RESULTS
});

const updateResults = (payload) => ({
  type: actionTypes.UPDATE_RESULTS,
  payload
});

const clearResults = () => ({
  type: actionTypes.CLEAR_RESULTS
});

const mergeResults = (payload) => ({
  type: actionTypes.MERGE_RESULTS,
  payload
});

export default {
  loadResults,
  updateResults,
  clearResults,
  mergeResults
};
