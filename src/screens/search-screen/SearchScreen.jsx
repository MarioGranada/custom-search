import { useState, useEffect, type Node } from "react";
import Button from "../../components/button/Button";
import RadioGroup from "../../components/RadioGroup/RadioGroup";
import ResultsList from "../../components/results-list/ResultsList";
import TextInput from "../../components/text-input/TextInput";

const SearchScreen = ({ header, children }): Node => {
  const [selected, setSelected] = useState("google");
  const [textValue, setTextValue] = useState("");

  return (
    <>
      <h1>{header}</h1>

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
        onClick={(event) => {
          console.log("in here button click");
        }}
      >
        Search
      </Button>
      <RadioGroup
        // labels and values to config file
        options={[
          { label: "Google", value: "google" },
          { label: "Bing", value: "bing" },
          { label: "Google & Bing", value: "google-bing" },
        ]}
        // to config file
        groupName="search-engines"
        // to config file
        groupLabel="Search Engines"
        // add event Syntetic type
        onChange={(event) => {
          console.log("in here selected", event.target.value);
          setSelected(event.target.value);
        }}
        selected={selected}
      />
      <ResultsList
        resultsDataItems={[
          { title: "test result 1", overview: "test result 1 overview" },
          { title: "test result 2", overview: "test result 2 overview" },
          { title: "test result 3", overview: "test result 3 overview" },
        ]}
      />
    </>
  );
};

export default SearchScreen;
