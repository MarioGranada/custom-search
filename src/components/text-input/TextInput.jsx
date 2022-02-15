import * as React from 'react';
import { Box, TextField } from '@mui/material';

type Props = {
  onChange: (event) => void,
  placeholder?: string,
  disabled?: boolean,
  value: string
};

const TextInput = ({ onChange, placeholder, value, disabled }: Props): React.Node => {
  return (
    <Box display={{ xs: 'flex' }} minWidth={{ xs: '100%', sm: '50%' }}>
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
        fullWidth
        sx={{ m: 0 }}
      />
    </Box>
  );
};

export default TextInput;
