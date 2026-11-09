import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormWrapper from './FormWrapper';

describe('FormWrapper [Component]', () => {
  const children = <div>this is a children test</div>;
  let container;
  let onKeyDown;

  beforeEach(() => {
    onKeyDown = vi.fn();
    ({ container } = render(<FormWrapper onKeyDown={onKeyDown}>{children}</FormWrapper>));
  });

  it('should render', () => {
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('should have the next props: disabled, children, onClick', () => {
    expect(container.querySelector('form')).toContainElement(
      screen.getByText('this is a children test')
    );
  });

  it('should have a children as a React Node', () => {
    expect(screen.getByText('this is a children test').tagName).toBe('DIV');
  });

  it('should execute onClick when called', () => {
    fireEvent.keyDown(container.querySelector('form'), { key: 'a' });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });
});
