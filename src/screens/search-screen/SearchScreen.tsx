import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Box, Container, LinearProgress, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Dropdown,
  FormWrapper,
  ResultsList,
  TextInput,
  TopBar,
  Pagination
} from '../../components';

import enginesList from '../../searchEngineConfig.json';

import actions from '../../store/actions';
import utils from '../../utils';

const MIN_QUERY_LENGTH = 3;
// Error codes returned by the /api proxies that have a dedicated message.
const KNOWN_ERRORS = new Set([
  'daily_limit',
  'monthly_limit',
  'upstream_rate_limited',
  'not_configured'
]);

class SearchError extends Error {
  code: string;

  constructor(code: string) {
    super(code);
    this.code = code;
  }
}

const SearchScreen = (): React.ReactNode => {
  const [selected, setSelected] = React.useState('brave');
  const [textValue, setTextValue] = React.useState('');
  const [submittedQuery, setSubmittedQuery] = React.useState('');
  const formState = useSelector((state) => state.form);
  const resultsState = useSelector((state) => state.results);

  const dispatch = useDispatch();

  const selectedEngines = React.useMemo(() => selected.split('-'), [selected]);

  /** Fetches one page from every selected engine and stores the merged results. */
  const runSearch = React.useCallback(
    async (query: string, page: number) => {
      dispatch(actions.clearResults());
      dispatch(actions.setIsLoading(true));
      try {
        await Promise.all(
          selectedEngines.map(async (engine) => {
            const { searchURL, method, headers } = utils.prepareSearch(engine, query, page);
            const response = await fetch(searchURL, { method, headers });
            const body = await response.json().catch(() => ({}));
            if (!response.ok) throw new SearchError(body?.error || 'generic');

            const { items, hasMore } = utils.prepareDataBeforeStore(engine, body);
            dispatch(actions.mergeResults({ query, currentEngine: engine, page, items, hasMore }));
          })
        );
      } catch (error) {
        console.error(error);
        const code = KNOWN_ERRORS.has(error?.code) ? error.code : 'generic';
        dispatch(actions.updateResults({ error: code }));
      } finally {
        dispatch(actions.setIsLoading(false));
      }
    },
    [dispatch, selectedEngines]
  );

  const onSubmit = React.useCallback(() => {
    const query = textValue.trim();
    if (query.length < MIN_QUERY_LENGTH || formState.isLoading) return;
    setSubmittedQuery(query);
    runSearch(query, 1);
  }, [textValue, formState.isLoading, runSearch]);

  const onPageChange = React.useCallback(
    (_event, page: number) => {
      runSearch(submittedQuery, page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [runSearch, submittedQuery]
  );

  const onSelect = React.useCallback((event) => setSelected(event.target.value), []);
  const onTextChange = React.useCallback((event) => setTextValue(event.target.value), []);

  const onKeyDown = React.useCallback(
    (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onSubmit();
      }
    },
    [onSubmit]
  );

  const enginesListDisplayItems = React.useMemo(() => {
    const engines = { ...enginesList.engines, ...enginesList.combinations };
    return Object.values(engines).map(({ label, value }) => ({ label, value }));
  }, []);

  const { maxPages, perPage } = React.useMemo(() => {
    const configs = selectedEngines.map((engine) => enginesList.engines[engine]);
    return {
      maxPages: Math.min(...configs.map((c) => parseInt(c.maxPages, 10))),
      perPage: configs.reduce((sum, c) => sum + parseInt(c.itemsPerPage, 10), 0)
    };
  }, [selectedEngines]);

  const { items, page, hasMore, error } = resultsState;
  // No provider reports a total, so reveal one page ahead while more results exist.
  const pageCount = Math.min(maxPages, page + (hasMore ? 1 : 0));
  const showNoResults =
    submittedQuery !== '' && !formState.isLoading && !error && items.length === 0;

  return (
    <Container maxWidth="lg">
      <Box>
        <Typography variant="h1" sx={{ my: '1rem' }}>
          <FormattedMessage description="app header" id="screens.search.header" />
        </Typography>
        <TopBar>
          <FormWrapper onKeyDown={onKeyDown}>
            <FormattedMessage id="screens.search.textInputPlaceholder">
              {(formattedString) => (
                <TextInput
                  onChange={onTextChange}
                  placeholder={formattedString[0]}
                  value={textValue}
                />
              )}
            </FormattedMessage>
            <FormattedMessage id="screens.search.dropdownLabel">
              {(formattedString) => (
                <Dropdown
                  options={enginesListDisplayItems}
                  groupName="search-engines"
                  groupLabel={formattedString[0]}
                  onChange={onSelect}
                  selected={selected}
                />
              )}
            </FormattedMessage>

            <Button
              onClick={onSubmit}
              disabled={textValue.trim().length < MIN_QUERY_LENGTH || formState.isLoading}
            >
              <FormattedMessage id="screens.search.searchButtonLabel" />
            </Button>
          </FormWrapper>
        </TopBar>

        {formState.isLoading && <LinearProgress />}

        {error && (
          <Alert severity="warning" sx={{ my: '1rem' }}>
            <FormattedMessage id={`errors.${error}`} />
          </Alert>
        )}

        {showNoResults && (
          <Typography sx={{ my: '1rem' }}>
            <FormattedMessage id="screens.search.noResults" />
          </Typography>
        )}

        {!formState.isLoading && <ResultsList items={items} page={page} perPage={perPage} />}

        {items.length > 0 && (
          <Pagination
            page={page}
            pageCount={pageCount}
            onChange={onPageChange}
            disabled={formState.isLoading}
          />
        )}

        <Typography variant="caption" color="text.secondary" component="p" sx={{ my: '2rem' }}>
          <FormattedMessage id="screens.search.poweredBy" />
        </Typography>
      </Box>
    </Container>
  );
};

export default SearchScreen;
