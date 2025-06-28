import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from './input';
import { vi } from 'vitest';

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('calls onChange', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'abc' },
    });
    expect(handleChange).toHaveBeenCalled();
  });
});
