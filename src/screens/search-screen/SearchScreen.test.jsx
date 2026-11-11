import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import actions from '../../store/actions';
import SearchScreen from './SearchScreen';
import utils from '../../utils';
import English from '../../lang/en.json';

const mockStore = configureStore();

const defaultState = {
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
};

const renderScreen = (state = defaultState) =>
  render(
    <Provider store={mockStore(state)}>
      <IntlProvider locale="en" messages={English}>
        <SearchScreen>
          <div>this is a children test</div>
        </SearchScreen>
      </IntlProvider>
    </Provider>
  );

const typeQuery = (value) => fireEvent.change(screen.getByRole('searchbox'), { target: { value } });
const clickSearch = () => fireEvent.click(screen.getByRole('button', { name: 'Search' }));
const getForm = (container) => container.querySelector('form');

describe('Search [Screen]', () => {
  let container;

  beforeEach(() => {
    // never hit the real search APIs from tests
    window.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve([]) }));
    vi.spyOn(console, 'log').mockImplementation(() => {});
    ({ container } = renderScreen());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render', () => {
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should have the next wrapper components in the very beginning: Box, Container', () => {
    expect(container.querySelectorAll('.MuiContainer-root')).toHaveLength(1);
    expect(container.firstChild).toHaveClass('MuiContainer-root');
  });

  it('should have the next custom components: Button, Dropdown, FormWrapper, ResultsList, TextInput, TopBar', () => {
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(container.querySelector('[aria-haspopup="listbox"]')).toHaveTextContent('Google');

    expect(getForm(container)).toBeInTheDocument();
    expect(container.textContent).toContain('Total Results');

    expect(screen.getByRole('searchbox')).toHaveAttribute('placeholder', 'Type your query');
    expect(getForm(container).parentElement).not.toBeNull();
  });

  it('should call onSelect when selecting a value from dropdown', () => {
    fireEvent.mouseDown(container.querySelector('[aria-haspopup="listbox"]'));
    // Google is the only engine since Bing Search APIs were retired (Aug 2025)
    expect(screen.getAllByRole('option')).toHaveLength(1);
    fireEvent.click(screen.getByRole('option', { name: 'Google' }));

    expect(container.querySelector('[aria-haspopup="listbox"]')).toHaveTextContent('Google');
  });

  it('should call onTextChange when typing a query', () => {
    typeQuery('test');

    expect(screen.getByRole('searchbox')).toHaveValue('test');
  });

  it('should call onSubmit when Button clicked', () => {
    const clearResults = vi.spyOn(actions, 'clearResults');

    typeQuery('test');
    clickSearch();

    expect(clearResults).toHaveBeenCalledTimes(1);
  });

  it("should call onSubmit when hitting 'Enter' ", () => {
    const clearResults = vi.spyOn(actions, 'clearResults');

    fireEvent.keyDown(getForm(container), { key: 'Enter' });

    expect(clearResults).toHaveBeenCalledTimes(1);
  });

  it("should not call onSubmit when hitting other key different than 'Enter' ", () => {
    const clearResults = vi.spyOn(actions, 'clearResults');

    fireEvent.keyDown(getForm(container), { key: 'a' });

    expect(clearResults).not.toHaveBeenCalled();
  });

  it('should call onFetchResults when onSubmit is clicked', () => {
    const prepareSearch = vi.spyOn(utils, 'prepareSearch');

    typeQuery('custom search');
    clickSearch();

    expect(prepareSearch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledTimes(1);
  });

  it('should call prepareDataBeforeStore when fetch results', async () => {
    const prepareDataBeforeStore = vi.spyOn(utils, 'prepareDataBeforeStore');
    const mergeResults = vi.spyOn(actions, 'mergeResults');

    typeQuery('custom search');
    clickSearch();

    expect(window.fetch).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(prepareDataBeforeStore).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mergeResults).toHaveBeenCalledTimes(1));
  });

  it('should display a console log error when fetch is rejected', async () => {
    window.fetch = vi.fn(() => Promise.reject({ message: 'error' }));
    const setIsLoading = vi.spyOn(actions, 'setIsLoading');

    typeQuery('custom search');
    clickSearch();

    await waitFor(() => expect(setIsLoading).toHaveBeenCalledWith(false));
    expect(console.log).toHaveBeenCalledWith({ message: 'error' });
  });

  it('should display a loading bar while loading data', () => {
    renderScreen({ form: { isLoading: true }, results: { items: [] } });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
