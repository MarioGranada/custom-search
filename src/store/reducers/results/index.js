import initialState from './initialState';
import { resultsActionTypes as actionTypes } from '../../actionTypes';

const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_RESULTS:
      return state;
    case actionTypes.UPDATE_RESULTS:
      return { ...state, ...action.payload };
    case actionTypes.CLEAR_RESULTS:
      return initialState;
    case actionTypes.MERGE_RESULTS: {
      const { query, currentEngine, items, totalResults } = action.payload;
      return {
        ...state,
        query,
        currentEngine,
        items: [...state.items, ...items],
        totalResults: state.totalResults + totalResults
      };
    }
    default:
      return state;
  }
};

export default resultsReducer;
