import React from 'react';
import { render, screen } from '@testing-library/react';
import TopBar from './TopBar';

describe('TopBar [Component]', () => {
  const children = <div>this is a children test</div>;
  let container;

  beforeEach(() => {
    ({ container } = render(<TopBar>{children}</TopBar>));
  });

  it('should render', () => {
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should have the next props: children', () => {
    expect(container.childNodes).toHaveLength(1);
    expect(container.firstChild).toContainElement(screen.getByText('this is a children test'));
  });

  it('should have a children as a React Node', () => {
    expect(screen.getByText('this is a children test').tagName).toBe('DIV');
  });
});
