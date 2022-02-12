import * as React from 'react';

const TextInput = ({ onChange, placeholder, value, disabled }): React.Node => (
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
