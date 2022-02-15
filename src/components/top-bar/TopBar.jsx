import * as React from 'react';
import { Box } from '@mui/material';

type Props = {
  children: React.Node
};

const TopBar = ({ children }: Props): React.Node => (
  <Box sx={{ display: 'flex', my: '2rem', alignItems: 'center' }}>{children}</Box>
);
export default TopBar;
