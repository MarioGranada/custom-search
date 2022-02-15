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
      gap: '1rem',
      alignItems: 'center',
      width: '100%'
    }}
    display={{ xs: 'grid', sm: 'inline-flex' }}
    onKeyDown={onKeyDown}>
    {children}
  </Box>
);

export default FormWrapper;
