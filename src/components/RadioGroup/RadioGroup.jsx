import { type Node } from 'react';
import RadioButton from './RadioButton/RadioButton';
import { RadioButtonProp } from './types';

const RadioGroup = ({
  groupName,
  id,
  options,
  onChange,
  disabled,
  selected,
  groupLabel
}: RadioButtonProp): Node => (
  <div>
    <h2>{groupLabel}</h2>
    {options.map((option, index) => (
      <RadioButton
        id={`radio-group-${id}-${index}`}
        groupName={groupName}
        onSelect={onChange}
        disabled={disabled}
        value={option.value}
        selected={option.value === selected}
        label={option.label}
        key={`radio-group-${id}-${index}`}
      />
    ))}
  </div>
);

export default RadioGroup;
