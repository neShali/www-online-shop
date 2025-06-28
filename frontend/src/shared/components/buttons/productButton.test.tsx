import { render, screen, fireEvent } from '@testing-library/react';
import { ProductButton } from './productButton';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('ProductButton', () => {
  it('renders with default text', () => {
    render(<ProductButton />);
    expect(screen.getByText('Go To Shop')).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    render(<ProductButton text="К каталогу" />);
    expect(screen.getByText('К каталогу')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<ProductButton onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
