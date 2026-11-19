import * as React from 'react';
import { Stack, Pagination as PaginationMui } from '@mui/material';

type Props = {
  page: number,
  pageCount: number,
  onChange: (event: SyntheticEvent<>, value: number) => void,
  disabled?: boolean
};

/**
 * 1-based page selector. Providers do not report a total, so `pageCount`
 * grows as pages are discovered (current page + 1 while more results exist).
 */
const Pagination = ({ page, pageCount, onChange, disabled = false }: Props): React.Node => (
  <Stack spacing={2} alignItems="center" sx={{ my: '1.5rem' }}>
    <PaginationMui
      count={pageCount}
      page={page}
      onChange={onChange}
      disabled={disabled}
      color="primary"
      siblingCount={1}
    />
  </Stack>
);

export default Pagination;
