import { type Node } from 'react';
import ButtonMui from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  disabled?: boolean,
  children: Node,
  onClick: (event) => void
};

const Button = ({ children, onClick, disabled = false }: Props): Node => (
  <div>
    <ButtonMui variant="contained" onClick={onClick} disabled={disabled} endIcon={<SearchIcon />}>
      {children}
    </ButtonMui>
  </div>
);

export default Button;
