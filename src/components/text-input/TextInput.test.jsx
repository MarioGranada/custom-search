import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';

describe('TextInput [Component]', () => {
  it('should render', () => {
    render(<TextInput onChange={() => {}} placeholder="test placeholder" value="test" />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('should have the next props: onChange, placeholder, value', () => {
    render(<TextInput onChange={() => {}} placeholder="test placeholder" value="test" />);
    const input = screen.getByRole('searchbox');
    expect(input).toHaveAttribute('placeholder', 'test placeholder');
    expect(input).toHaveValue('test');
  });

  it('should have a Box and a TextInput', () => {
    const { container } = render(
      <TextInput onChange={() => {}} placeholder="test placeholder" value="test" />
    );
    expect(container.querySelectorAll('.MuiTextField-root')).toHaveLength(1);
    expect(screen.getByLabelText('Search field')).toBe(screen.getByRole('searchbox'));
  });

  it('should execute onClick when called', () => {
    const onChange = vi.fn();
    render(<TextInput onChange={onChange} value="" />);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'a' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
