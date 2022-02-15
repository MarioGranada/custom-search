import * as React from 'react';
import Box from '@mui/material/Box';

type Props = {
  children: React.Node,
  onKeyDown?: (event) => void
};

const FormWrapper = ({ children, onKeyDown }: Props): React.Node => (
  <Box
    component="form"
    noValidate
    autoComplete="off"
    sx={{
      display: 'inline-flex',
      gap: '1rem',
      alignItems: 'center'
    }}
    onKeyDown={onKeyDown}>
    {children}
  </Box>
);

export default FormWrapper;
