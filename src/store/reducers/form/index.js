import initialState from './initialState';
import { formActionTypes as actionTypes } from '../../actionTypes';

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_FORM:
      return state;
    case actionTypes.UPDATE_FORM:
      return {
        ...state,
        ...action.payload
      };
    case actionTypes.CLEAR_FORM:
      return { ...initialState };
    case actionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

export default formReducer;
