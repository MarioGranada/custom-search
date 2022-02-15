import * as React from 'react';
import { Box, Button as ButtonMui } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  disabled?: boolean,
  children: React.tNode,
  onClick: (event) => void
};

const Button = ({ children, onClick, disabled = false }: Props): React.Node => (
  <Box>
    <ButtonMui variant="contained" onClick={onClick} disabled={disabled} endIcon={<SearchIcon />}>
      {children}
    </ButtonMui>
  </Box>
);

export default Button;
