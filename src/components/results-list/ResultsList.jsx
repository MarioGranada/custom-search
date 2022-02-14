import { type Node } from 'react';
import SingleResultItem from './single-result-item/SingleResultItem';
import DataItem from './types';

type Props = {
  resultsDataItems: Array<DataItem>
};

const ResultsList = ({ resultsDataItems }: Props): Node => (
  <div>
    {resultsDataItems.map((item: DataItem) => (
      <SingleResultItem title={item.title} overview={item.overview} key={item.id} />
    ))}
  </div>
);

export default ResultsList;
