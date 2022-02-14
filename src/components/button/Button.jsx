import { type Node } from 'react';

type Props = {
  disabled?: boolean,
  children: Node,
  onClick: (event) => void
};

const Button = ({ children, onClick, disabled = false }: Props): Node => (
  <div>
    <button type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  </div>
);

export default Button;
