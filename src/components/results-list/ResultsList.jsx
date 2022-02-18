import * as React from 'react';
import SingleResultItem from './single-result-item/SingleResultItem';
import DataItem from './types';
import { FormattedMessage } from 'react-intl';

type Props = {
  items: Array<DataItem>,
  totalResults: number
};

const ResultsList = ({ items, totalResults }: Props): React.Node => (
  <div>
    <div>
      <span>
        <FormattedMessage id="components.resultsList.totalResults" />:{' '}
      </span>

      {totalResults}
    </div>
    {items.map((item: DataItem) => (
      <SingleResultItem {...item} key={item.id} />
    ))}
  </div>
);

export default ResultsList;
