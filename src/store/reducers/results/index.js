import initialState from './initialState';
import { resultsActionTypes as actionTypes } from '../../actionTypes';

export const LOAD_RESULTS = 'LOAD_RESULTS';
export const UPDATE_RESULTS = 'UPDATE_RESULTS';
export const CLEAR_RESULTS = 'CLEAR_RESULTS';
export const MERGE_RESULTS = 'MERGE_RESULTS';

const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_RESULTS:
      return state;
    case actionTypes.UPDATE_RESULTS:
      return { ...state, ...action.payload };
    case actionTypes.CLEAR_RESULTS:
      return initialState;
    case actionTypes.MERGE_RESULTS:
      const { query, currentEngine, items } = action.ayload;
      return { ...state, query, currentEngine, items: [...state.items, ...items] };
    default:
      return state;
  }
};

export default resultsReducer;
