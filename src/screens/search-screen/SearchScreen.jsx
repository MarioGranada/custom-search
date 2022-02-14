import { useState, useEffect, type Node } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/button/Button';
import RadioGroup from '../../components/RadioGroup/RadioGroup';
import ResultsList from '../../components/results-list/ResultsList';
import TextInput from '../../components/text-input/TextInput';

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

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const { searchURL, method, headers } = prepareSearch(selected, 'immiland');
        // setIsLoading(true);
        const response = await fetch(searchURL, { method, headers });
        const jsonResponse = await response.json();

        const resultsTest = prepareDataBeforeStore(selected, jsonResponse);

        dispatch(actions.updateResults(resultsTest.items));
      } catch (error) {
        console.log(error);
      } finally {
        // setIsLoading(false);
      }
    }
    fetchSearchResults();
  }, [dispatch]);

  return (
    <>
      <h1>{header}</h1>
      <h2>{formState.inputQuery} </h2>

      <TextInput
        onChange={(event) => {
          setTextValue(event.target.value);
        }}
        // to config file
        placeholder="Type your query"
      />
      {textValue}
      <Button
        // add event Syntetic type
        onClick={() => {
          console.log('in here button click');
        }}>
        Search
      </Button>
      <RadioGroup
        // labels and values to config file
        options={[
          { label: 'Google', value: 'google' },
          { label: 'Bing', value: 'bing' },
          { label: 'Google & Bing', value: 'google-bing' }
        ]}
        // to config file
        groupName="search-engines"
        // to config file
        groupLabel="Search Engines"
        // add event Syntetic type
        onChange={(event) => {
          console.log('in here selected', event.target.value);
          setSelected(event.target.value);
        }}
        selected={selected}
      />
      <ResultsList resultsDataItems={resultsState.items} />
    </>
  );
};

export default SearchScreen;
