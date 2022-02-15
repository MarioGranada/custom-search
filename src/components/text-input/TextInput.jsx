import { type Node } from 'react';
import TextField from '@mui/material/TextField';

type Props = {
  onChange: (event) => void,
  placeholder?: string,
  disabled?: boolean,
  value: string
};

const TextInput = ({ onChange, placeholder, value, disabled }: Props): Node => (
  <div>
    <TextField
      id="outlined-search"
      label="Search field"
      type="search"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  </div>
);

export default TextInput;
