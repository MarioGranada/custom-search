import { type Node } from 'react';
import { RadioButtonProp } from '../types';

const RadioButton = ({
  id,
  label,
  value,
  selected,
  onSelect,
  groupName,
  disabled
}: RadioButtonProp): Node => (
  <div>
    <label>{label}</label>
    <input
      type="radio"
      id={id}
      value={value}
      onChange={onSelect}
      name={groupName}
      checked={selected}
      disabled={disabled}
    />
  </div>
);

export default RadioButton;
