import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import ResultsList from './ResultsList';
import { resultsMock } from '../../mocks';
import English from '../../lang/en.json';

const renderList = (props) =>
  render(
    <IntlProvider locale="en" messages={English}>
      <ResultsList items={resultsMock.items} page={1} perPage={10} {...props} />
    </IntlProvider>
  );

describe('ResultsList [Component]', () => {
  it('renders one item per result', () => {
    renderList();
    expect(screen.getAllByRole('heading', { level: 6 })).toHaveLength(resultsMock.items.length);
  });

  it('shows the result range for the current page', () => {
    const { container } = renderList({ page: 3 });
    expect(container.textContent).toContain('Results 21–25 · page 3');
  });

  it('renders nothing when there are no results', () => {
    const { container } = renderList({ items: [] });
    expect(container).toBeEmptyDOMElement();
  });
});
