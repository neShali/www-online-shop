import { render, screen, fireEvent } from '@testing-library/react';
import { CardButton } from './cardButton';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('CardButton', () => {
  it('renders with default text', () => {
    render(<CardButton />);
    expect(screen.getByText('ADD')).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    render(<CardButton text="Купить" />);
    expect(screen.getByText('Купить')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<CardButton onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('is disabled when prop is passed', () => {
    render(<CardButton disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
