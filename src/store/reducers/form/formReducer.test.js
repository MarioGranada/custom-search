import initialState from './initialState';
import formReducer from '.';
import actions from '../../actions';
import { formMock } from '../../../mocks';

describe('Form [Reducer]', () => {
  it('should return the state by default', () => {
    expect(formReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOAD_FORM', () => {
    expect(formReducer(formMock, actions.loadForm())).toEqual(formMock);
  });

  it('should handle UPDATE_FORM', () => {
    expect(formReducer(undefined, actions.updateForm(formMock))).toEqual(formMock);
  });

  it('should handle CLEAR_FORM', () => {
    expect(formReducer(formMock, actions.clearForm())).toEqual(initialState);
  });

  it('should handle SET_IS_LOADING', () => {
    expect(formReducer(formMock, actions.setIsLoading(true))).toEqual({
      ...formMock,
      isLoading: true
    });

    expect(formReducer({ ...formMock, isLoading: true }, actions.setIsLoading(false))).toEqual({
      ...formMock,
      isLoading: false
    });
  });
});
