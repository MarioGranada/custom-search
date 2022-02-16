import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import sinon from 'sinon';

import SearchScreen from './SearchScreen';

const mockStore = configureStore();

const store = mockStore({
  form: {
    selectedEngine: '',
    inputQuery: '',
    isLoading: false
  },
  results: {
    query: '',
    currentEngine: '',
    items: [],
    totalResults: 0
  }
});

describe('Search [Screen]', () => {
  let wrapper;
  const children = <div>this is a children test</div>;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <SearchScreen>{children}</SearchScreen>
      </Provider>
    );
  });

  it('should render', () => {
    expect(wrapper).not.toBe(null);
    expect(wrapper).not.toBe(undefined);
  });
});
