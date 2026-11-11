import React from 'react';
import { render, screen } from '@testing-library/react';
import SingleResultItem from './SingleResultItem';
import { resultsMock } from '../../../mocks';

describe('SingleResultItem [Component]', () => {
  const { title, overview, url, displayUrl } = resultsMock.items[0];
  let container;

  beforeEach(() => {
    ({ container } = render(
      <SingleResultItem title={title} overview={overview} url={url} displayUrl={displayUrl} />
    ));
  });

  it('should render', () => {
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should have the next props: title, overview, url, displayUrl ', () => {
    expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent(title);
    expect(container.textContent).toContain(overview);
    screen.getAllByRole('link').forEach((link) => expect(link).toHaveAttribute('href', url));
    expect(screen.getByText(displayUrl)).toBeInTheDocument();
  });

  it('should have two Links and a divider', () => {
    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(container.querySelectorAll('hr')).toHaveLength(1);
  });

  it('should have a title and an overview', () => {
    expect(container.textContent.includes(title)).toBe(true);
    expect(container.textContent.includes(overview)).toBe(true);
  });
});
