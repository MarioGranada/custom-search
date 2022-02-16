import { formActionTypes as actionTypes } from '../../actionTypes';

const loadForm = () => ({
  type: actionTypes.LOAD_FORM
});

const updateForm = (formValues) => ({
  type: actionTypes.UPDATE_FORM,
  payload: { ...formValues }
});

const clearForm = () => ({
  type: actionTypes.CLEAR_FORM
});

const setIsLoading = (isLoading) => ({
  type: actionTypes.SET_IS_LOADING,
  payload: isLoading
});

export default {
  loadForm,
  updateForm,
  clearForm,
  setIsLoading
};
