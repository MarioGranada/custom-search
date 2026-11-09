import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import ResultsList from './ResultsList';
import { resultsMock } from '../../mocks';
import English from '../../lang/en.json';

describe('ResultsList [Component]', () => {
  let container;

  beforeEach(() => {
    ({ container } = render(
      <IntlProvider locale="en" messages={English}>
        <ResultsList items={resultsMock.items} totalResults={resultsMock.items.length} />
      </IntlProvider>
    ));
  });

  it('should render', () => {
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should have the next props: items, totalResults', () => {
    expect(screen.getAllByRole('heading', { level: 6 }).length).toBeGreaterThan(0);
    expect(container.textContent).toContain(`${resultsMock.items.length}`);
  });

  it('should have a total results label displaying the total results value', () => {
    expect(container.textContent.includes('Total Results: ')).toBe(true);
    expect(container.textContent.includes(resultsMock.items.length)).toBe(true);
  });

  it('should have a list of single result items', () => {
    expect(screen.getAllByRole('heading', { level: 6 })).toHaveLength(resultsMock.items.length);
  });
});
