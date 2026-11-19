import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination [Components]', () => {
  it('renders one button per known page and marks the current one', () => {
    render(<Pagination page={2} pageCount={3} onChange={() => {}} />);

    expect(screen.getByRole('button', { name: 'page 2' })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('button', { name: 'Go to page 3' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Go to page 4' })).not.toBeInTheDocument();
  });

  it('reports the selected 1-based page', () => {
    const onChange = vi.fn();
    render(<Pagination page={1} pageCount={2} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Go to page 2' }));
    expect(onChange).toHaveBeenCalledWith(expect.anything(), 2);
  });

  it('can be disabled while loading', () => {
    render(<Pagination page={1} pageCount={2} onChange={() => {}} disabled />);
    expect(screen.getByRole('button', { name: 'Go to page 2' })).toBeDisabled();
  });
});
