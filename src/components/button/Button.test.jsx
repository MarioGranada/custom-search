import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchButton from './Button';

describe('Button [Component]', () => {
  const children = <div>this is a children test</div>;
  let onClick;

  beforeEach(() => {
    onClick = vi.fn();
    render(<SearchButton onClick={onClick}>{children}</SearchButton>);
  });

  it('should render', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should have the next props: disabled, children, onClick', () => {
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
    expect(button).toHaveTextContent('this is a children test');
  });

  it('should have a children as a React Node', () => {
    expect(screen.getByText('this is a children test').tagName).toBe('DIV');
  });

  it('should execute onClick when called', () => {
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
