import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, LinearProgress, Typography } from '@mui/material';

import { Button, Dropdown, FormWrapper, ResultsList, TextInput, TopBar } from '../../components';

import enginesList from '../../searchEngineConfig.json';

import actions from '../../store/actions';
import { prepareDataBeforeStore, prepareSearch } from '../../utils';

type Props = {
  header?: Node
};

const SearchScreen = ({ header }: Props): React.Node => {
  const [selected, setSelected] = React.useState('google');
  const [textValue, setTextValue] = React.useState('');
  const formState = useSelector((state) => state.form);
  const resultsState = useSelector((state) => state.results);

  const dispatch = useDispatch();

  const onFetchResults = React.useCallback(
    (selectedEngine: string, query: string) => {
      async function fetchSearchResults(selectedEngine: string) {
        try {
          const { searchURL, method, headers } = prepareSearch(selectedEngine, query);
          const response = await fetch(searchURL, { method, headers });
          const jsonResponse = await response.json();

          const { totalResults, items } = prepareDataBeforeStore(selectedEngine, jsonResponse);

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
          {header}
        </Typography>
        <TopBar>
          <FormWrapper onKeyDown={onKeyDown}>
            <TextInput
              onChange={onTextChange}
              // to config file
              placeholder="Type your query"
            />
            <Dropdown
              options={enginesListDisplayItems}
              // to config file
              groupName="search-engines"
              // to config file
              groupLabel="Search Engines"
              onChange={onSelect}
              selected={selected}
            />
            <Button onClick={onSubmit} disabled={textValue.length < 3 || formState.isLoading}>
              Search
            </Button>
          </FormWrapper>
        </TopBar>

        {formState.isLoading ? <LinearProgress /> : <ResultsList {...resultsState} />}
      </Box>
    </Container>
  );
};

export default SearchScreen;
