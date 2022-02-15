import * as React from 'react';
import { Box, Link, Divider, Typography } from '@mui/material';

import DataItem from '../types';

const SingleResultItem = ({ title, overview, url, displayUrl }: DataItem): React.Node => (
  <Box sx={{ my: '2rem' }}>
    <Link href={url} underline="hover" target="_blank" rel="noopener">
      <Typography variant="h6">{title}</Typography>
    </Link>
    <Typography color="text.secondary">{displayUrl}</Typography>
    <Typography variant="body2">{overview}</Typography>
    <Divider sx={{ mt: '1rem' }} />
  </Box>
);

export default SingleResultItem;
