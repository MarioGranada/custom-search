import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';

import App from './App';
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
  it('renders the search screen', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale="en" messages={English}>
          <App />
        </IntlProvider>
      </Provider>
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Custom Search' })).toBeInTheDocument();
  });
});
