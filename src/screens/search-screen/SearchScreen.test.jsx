import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { form, results } from '../../store/reducers';
import SearchScreen from './SearchScreen';
import English from '../../lang/en.json';
import { resultsMock } from '../../mocks';

const page = (n, hasMore) => ({
  query: 'synack',
  page: n,
  perPage: 10,
  hasMore,
  items: resultsMock.items.map((item) => ({ ...item, id: `${item.id}#${n}` }))
});

const respond = (body, status = 200) =>
  Promise.resolve({ ok: status < 400, status, json: () => Promise.resolve(body) });

const renderScreen = () => {
  const store = createStore(combineReducers({ form, results }));
  const utils = render(
    <Provider store={store}>
      <IntlProvider locale="en" messages={English}>
        <SearchScreen />
      </IntlProvider>
    </Provider>
  );
  return { ...utils, store };
};

const typeQuery = (value) => fireEvent.change(screen.getByRole('searchbox'), { target: { value } });
const clickSearch = () => fireEvent.click(screen.getByRole('button', { name: 'Search' }));
const requestedUrl = (call) => window.fetch.mock.calls[call][0];

describe('Search [Screen]', () => {
  beforeEach(() => {
    window.fetch = vi.fn(() => respond(page(1, true)));
    window.scrollTo = vi.fn();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => vi.restoreAllMocks());

  it('renders the form with Brave as the engine', () => {
    const { container } = renderScreen();

    expect(container.firstChild).toHaveClass('MuiContainer-root');
    expect(screen.getByRole('searchbox')).toHaveAttribute('placeholder', 'Type your query');
    expect(container.querySelector('[aria-haspopup="listbox"]')).toHaveTextContent('Brave');
    expect(screen.getByText('Results by the Brave Search API.')).toBeInTheDocument();
  });

  it('keeps Search disabled until the query has 3 characters', () => {
    renderScreen();
    typeQuery('ab');
    expect(screen.getByRole('button', { name: 'Search' })).toBeDisabled();
    typeQuery('abc');
    expect(screen.getByRole('button', { name: 'Search' })).toBeEnabled();
  });

  it('does not search on Enter with a short query', () => {
    const { container } = renderScreen();
    fireEvent.keyDown(container.querySelector('form'), { key: 'Enter' });
    expect(window.fetch).not.toHaveBeenCalled();
  });

  it('searches page 1 through the proxy and lists the results', async () => {
    renderScreen();
    typeQuery('Synack');
    clickSearch();

    expect(requestedUrl(0)).toBe('/api/search?q=synack&page=1');
    expect(await screen.findByText('Results 1–5 · page 1')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 6 })).toHaveLength(5);
  });

  it('reveals the next page while more results exist and fetches it on click', async () => {
    window.fetch = vi
      .fn()
      .mockImplementationOnce(() => respond(page(1, true)))
      .mockImplementationOnce(() => respond(page(2, false)));
    renderScreen();
    typeQuery('synack');
    clickSearch();

    fireEvent.click(await screen.findByRole('button', { name: 'Go to page 2' }));

    await waitFor(() => expect(requestedUrl(1)).toBe('/api/search?q=synack&page=2'));
    expect(await screen.findByText('Results 11–15 · page 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'page 2' })).toHaveAttribute('aria-current', 'true');
    expect(screen.queryByRole('button', { name: 'Go to page 3' })).not.toBeInTheDocument();
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('pages with the submitted query, not the edited input', async () => {
    renderScreen();
    typeQuery('synack');
    clickSearch();
    const next = await screen.findByRole('button', { name: 'Go to page 2' });
    typeQuery('something else');
    fireEvent.click(next);

    await waitFor(() => expect(requestedUrl(1)).toBe('/api/search?q=synack&page=2'));
  });

  it('shows a friendly message when the demo quota is exhausted', async () => {
    window.fetch = vi.fn(() => respond({ error: 'daily_limit' }, 429));
    renderScreen();
    typeQuery('synack');
    clickSearch();

    expect(await screen.findByRole('alert')).toHaveTextContent("You reached today's search limit");
  });

  it('shows a generic message when the request fails', async () => {
    window.fetch = vi.fn(() => Promise.reject(new Error('offline')));
    renderScreen();
    typeQuery('synack');
    clickSearch();

    expect(await screen.findByRole('alert')).toHaveTextContent('Search failed');
  });

  it('says so when there are no results', async () => {
    window.fetch = vi.fn(() => respond({ ...page(1, false), items: [] }));
    renderScreen();
    typeQuery('zzzzqqq');
    clickSearch();

    expect(await screen.findByText('No results found.')).toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});
