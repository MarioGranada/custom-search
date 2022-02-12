import { formActionTypes as actionTypes } from '../../actionTypes';

export const updateForm = (formValues) => ({
  type: actionTypes.UPDATE_FORM,
  payload: { ...formValues }
});

export const clearForm = () => ({
  tyoe: actionTypes.CLEAR_FORM
});

export const setIsLoading = (isLoading) => ({
  type: actionTypes.SET_LOADING,
  payload: isLoading
});
