import * as React from 'react';
import SingleResultItem from './single-result-item/SingleResultItem';
import DataItem from './types';

type Props = {
  items: Array<DataItem>,
  totalResults: number
};

const ResultsList = ({ items, totalResults }: Props): React.Node => (
  <div>
    <div>
      <span>Total Results: </span>
      {totalResults}
    </div>
    {items.map((item: DataItem) => (
      <SingleResultItem {...item} key={item.id} />
    ))}
  </div>
);

export default ResultsList;
