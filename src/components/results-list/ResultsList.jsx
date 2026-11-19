import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Typography } from '@mui/material';
import SingleResultItem from './single-result-item/SingleResultItem';
import type { DataItem } from './types';

type Props = {
  items: Array<DataItem>,
  page: number,
  perPage: number
};

const ResultsList = ({ items, page, perPage }: Props): React.Node => {
  if (items.length === 0) return null;
  const from = (page - 1) * perPage + 1;

  return (
    <div>
      <Typography color="text.secondary" variant="body2">
        <FormattedMessage
          id="components.resultsList.range"
          values={{ from, to: from + items.length - 1, page }}
        />
      </Typography>
      {items.map((item: DataItem) => (
        <SingleResultItem {...item} key={item.id} />
      ))}
    </div>
  );
};

export default ResultsList;
