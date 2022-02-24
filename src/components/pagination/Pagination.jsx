import * as React from 'react';
import { Stack, Pagination as PaginationMui } from '@mui/material';

type Props = {
  currentPage: number,
  onChange: (event, value: number) => void,
  maxPages: number
};

const Pagination = ({ currentPage, onChange, maxPages }: Props): React.Node => (
  <Stack spacing={2}>
    <PaginationMui count={maxPages} page={currentPage} onChange={onChange} />
  </Stack>
);

export default Pagination;
