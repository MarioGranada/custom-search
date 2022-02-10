import * as React from "react";
import SingleResultItem from "./single-result-item/SingleResultItem";

// data item model:
// type DataItem = {
//     title: String,
//     overview: React.Node,
// }

const ResultsList = ({ resultsDataItems }): React.Node => (
  <div>
    {resultsDataItems.map((item, index) => (
      <SingleResultItem
        title={item.title}
        overview={item.overview}
        key={`${item.title}-${index}`}
      />
    ))}
  </div>
);

export default ResultsList;
