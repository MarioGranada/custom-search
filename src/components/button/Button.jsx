import * as React from "react";

const Button = ({ children, onClick, disabled }): React.Node => (
  <div>
    <button type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  </div>
);

export default Button;
