import { type Node } from 'react';

type Props = {
  onChange: (event) => void,
  placeholder?: string,
  disabled?: boolean,
  value: string
};

const TextInput = ({ onChange, placeholder, value, disabled }: Props): Node => (
  <div>
    <input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  </div>
);

export default TextInput;
