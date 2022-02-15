import { type Node } from 'react';
import RadioButton from './RadioButton/RadioButton';
import { RadioButtonProp } from './types';

type Props = {
  id: string,
  groupName: string,
  options: Array<RadioButtonProp>,
  disabled?: boolean,
  selected?: string,
  groupLabel: string,
  onChange: (event) => void
};

const RadioGroup = ({
  groupName,
  id,
  options,
  onChange,
  disabled,
  selected,
  groupLabel
}: Props): Node => (
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
