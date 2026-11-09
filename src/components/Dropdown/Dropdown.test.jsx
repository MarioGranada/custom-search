import * as React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';

import Dropdown from './Dropdown';

const options = [
  { label: 'test 1 ', value: 'test-1' },
  { label: 'test 2', value: 'test-2' },
  { label: 'test 3', value: 'test-3' }
];

const renderDropdown = (onChange = () => {}) =>
  render(
    <Dropdown
      id="test-id"
      groupName="test-group"
      options={options}
      selected="test-1"
      groupLabel="test-group"
      onChange={onChange}
    />
  );

// MUI 5 Select renders a div[aria-haspopup=listbox] trigger; mouseDown opens the menu
const openMenu = (container) =>
  fireEvent.mouseDown(container.querySelector('[aria-haspopup="listbox"]'));

describe('Dropdown [Component]', () => {
  it('should render', () => {
    const { container } = renderDropdown();
    expect(container.querySelector('#test-id')).toBeInTheDocument();
  });

  it('should have the next props: id, groupName, options, groupLabel, onChange, selected', () => {
    const { container } = renderDropdown();
    expect(container.querySelector('#test-id-label')).toHaveTextContent('test-group');
    expect(container.querySelector('#test-id')).toHaveTextContent('test 1');
    expect(container.querySelector('input')).toHaveValue('test-1');
  });

  it('should have a list of MenuItem elements', () => {
    const { container } = renderDropdown();
    openMenu(container);
    expect(within(screen.getByRole('listbox')).getAllByRole('option')).toHaveLength(3);
  });

  it('should execute onClick when called', () => {
    const onChange = vi.fn();
    const { container } = renderDropdown(onChange);
    openMenu(container);
    fireEvent.click(screen.getByRole('option', { name: 'test 2' }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
