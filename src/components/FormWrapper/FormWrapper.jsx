import * as React from 'react';
import Box from '@mui/material/Box';

type Props = {
  children: React.Node
};

const FormWrapper = () => (
  <Box
    component="form"
    noValidate
    autoComplete="off"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' }
    }}>
    {children}
  </Box>
);

export default FormWrapper;
