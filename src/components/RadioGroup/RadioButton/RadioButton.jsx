import * as React from "react";
import { RadioButtonProp } from "../types";

const RadioButton = ({
  id,
  label,
  value,
  selected,
  onSelect,
  groupName,
  disabled,
}: RadioButtonProp): React.Node => (
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
