import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, within } from '@testing-library/react';
import { mount } from 'enzyme';

import App from './App';
import SearchScreen from './screens/search-screen/SearchScreen';
import English from './lang/en.json';

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

describe('App ', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={English}>
          <App />
        </IntlProvider>
      </Provider>
    );
  });
  it('renders learn react link', () => {
    expect(wrapper).not.toBe(undefined);
    expect(wrapper).not.toBe(null);
    expect(wrapper.find(SearchScreen)).not.toBe(null);
  });
});
