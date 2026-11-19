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
      const { query, currentEngine, items, page, hasMore } = action.payload;
      return {
        ...state,
        query,
        currentEngine,
        page,
        items: [...state.items, ...items],
        hasMore: state.hasMore || hasMore
      };
    }
    default:
      return state;
  }
};

export default resultsReducer;
