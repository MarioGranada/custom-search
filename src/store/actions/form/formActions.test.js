import actions from '.';
import { formActionTypes as actionTypes } from '../../actionTypes';
import { formMock } from '../../../mocks';

describe('form [Actions]', () => {
  it('should load form when called', () => {
    const expectedAction = {
      type: actionTypes.LOAD_FORM
    };
    expect(actions.loadForm()).toEqual(expectedAction);
  });

  it('should update form when updated', () => {
    const expectedAction = {
      type: actionTypes.UPDATE_FORM,
      payload: formMock
    };
    expect(actions.updateForm(formMock)).toEqual(expectedAction);
  });

  it('should clear the form when clear call is called', () => {
    const expectedAction = {
      type: actionTypes.CLEAR_FORM
    };
    expect(actions.clearForm()).toEqual(expectedAction);
  });

  it('should set is loading value when called', () => {
    const expectedAction = {
      type: actionTypes.SET_IS_LOADING,
      payload: true
    };
    expect(actions.setIsLoading(true)).toEqual(expectedAction);
  });
});
