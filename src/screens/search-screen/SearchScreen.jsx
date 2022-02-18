import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, LinearProgress, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Button, Dropdown, FormWrapper, ResultsList, TextInput, TopBar } from '../../components';

import enginesList from '../../searchEngineConfig.json';

import actions from '../../store/actions';
import utils from '../../utils';

const SearchScreen = (): React.Node => {
  const [selected, setSelected] = React.useState('google');
  const [textValue, setTextValue] = React.useState('');
  const formState = useSelector((state) => state.form);
  const resultsState = useSelector((state) => state.results);

  const dispatch = useDispatch();

  const onFetchResults = React.useCallback(
    (selectedEngine: string, query: string) => {
      async function fetchSearchResults(selectedEngine: string) {
        try {
          const { searchURL, method, headers } = utils.prepareSearch(selectedEngine, query);
          const response = await fetch(searchURL, { method, headers });
          const jsonResponse = await response.json();

          const { totalResults, items } = utils.prepareDataBeforeStore(
            selectedEngine,
            jsonResponse
          );

          dispatch(actions.mergeResults({ totalResults, items }));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(actions.setIsLoading(false));
        }
      }
      fetchSearchResults(selectedEngine, query);
    },
    [dispatch]
  );

  // add event Syntetic type
  const onSelect = React.useCallback(
    (event) => {
      setSelected(event.target.value);
    },
    [setSelected]
  );

  const onTextChange = React.useCallback(
    (event) => {
      setTextValue(event.target.value);
    },
    [setTextValue]
  );

  const onSubmit = React.useCallback(() => {
    dispatch(actions.clearResults());
    dispatch(actions.setIsLoading(true));
    const selectedEngines = selected.split('-');
    selectedEngines.map((item) => {
      onFetchResults(item, textValue);
    });
  }, [selected, textValue]);

  const enginesListDisplayItems = React.useMemo(() => {
    const engines = { ...enginesList.engines, ...enginesList.combinations };
    return Object.entries(engines).map(([, { label, value }]) => ({
      label,
      value
    }));
  }, [enginesList]);

  const onKeyDown = React.useCallback(
    (event) => {
      if (event.key === 'Enter') {
        onSubmit();
      }
    },
    [onSubmit]
  );

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

            <Button onClick={onSubmit} disabled={textValue.length < 3 || formState.isLoading}>
              <FormattedMessage id="screens.search.searchButtonLabel" />
            </Button>
          </FormWrapper>
        </TopBar>

        {formState.isLoading ? <LinearProgress /> : <ResultsList {...resultsState} />}
      </Box>
    </Container>
  );
};

export default SearchScreen;
