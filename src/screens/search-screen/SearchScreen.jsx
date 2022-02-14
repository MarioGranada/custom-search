import { useState, type Node, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/button/Button';
import RadioGroup from '../../components/RadioGroup/RadioGroup';
import ResultsList from '../../components/results-list/ResultsList';
import TextInput from '../../components/text-input/TextInput';
import enginesList from '../../searchEngineConfig.json';

import actions from '../../store/actions';
import { prepareDataBeforeStore, prepareSearch } from '../../utils';

type Props = {
  header?: Node
};

const SearchScreen = ({ header }: Props): Node => {
  const [selected, setSelected] = useState('google');
  const [textValue, setTextValue] = useState('');
  const formState = useSelector((state) => state.form);
  const resultsState = useSelector((state) => state.results);

  const dispatch = useDispatch();

  const onFetchResults = useCallback(
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
  const onSelect = useCallback(
    (event) => {
      setSelected(event.target.value);
    },
    [setSelected]
  );

  const onTextChange = useCallback(
    (event) => {
      setTextValue(event.target.value);
    },
    [setTextValue]
  );

  const onSubmit = useCallback(() => {
    dispatch(actions.clearResults());
    dispatch(actions.setIsLoading(true));
    const selectedEngines = selected.split('-');
    selectedEngines.map((item) => {
      onFetchResults(item, textValue);
    });
  }, [selected, textValue]);

  const enginesListDisplayItems = useMemo(() => {
    const engines = { ...enginesList.engines, ...enginesList.combinations };
    return Object.entries(engines).map(([, { label, value }]) => ({
      label,
      value
    }));
  }, [enginesList]);

  return (
    <>
      <h1>{header}</h1>
      <h2>{formState.inputQuery} </h2>

      <TextInput
        onChange={onTextChange}
        // to config file
        placeholder="Type your query"
      />
      {textValue}
      <Button onClick={onSubmit}>Search</Button>
      <RadioGroup
        options={enginesListDisplayItems}
        // to config file
        groupName="search-engines"
        // to config file
        groupLabel="Search Engines"
        onChange={onSelect}
        selected={selected}
      />
      {formState.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            <span>Total Results: </span>
            {resultsState.totalResults}
          </div>
          <ResultsList resultsDataItems={resultsState.items} />
        </div>
      )}
    </>
  );
};

export default SearchScreen;
