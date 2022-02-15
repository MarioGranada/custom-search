import * as React from 'react';
import { FormControl, Select, InputLabel, Box, MenuItem } from '@mui/material';

import { DropdownItemProp } from './types';

type Props = {
  id: string,
  groupName: string,
  options: Array<DropdownItemProp>,
  disabled?: boolean,
  selected?: string,
  groupLabel: string,
  onChange: (event) => void
};
const Dropdown = ({ id, onChange, options, disabled, selected, groupLabel }: Props): React.Node => (
  <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id={`${id}-label`}>{groupLabel} </InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={selected}
        label={groupLabel}
        onChange={onChange}
        disabled={disabled}>
        {options.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);

export default Dropdown;
