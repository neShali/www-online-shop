import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders with label and count', () => {
    render(<Checkbox id="cb" label="Test" count={5} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('(5)')).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(
      <Checkbox id="cb" label="Test" onChange={handleChange} checked={false} />
    );
    const input = screen.getByRole('checkbox');
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalled();
  });
});
