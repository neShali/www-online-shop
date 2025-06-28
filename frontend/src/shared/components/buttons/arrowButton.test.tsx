import { render, screen, fireEvent } from '@testing-library/react';
import { ArrowButton } from './arrowButton';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('ArrowButton', () => {
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<ArrowButton direction="left" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('is disabled when prop is passed', () => {
    render(<ArrowButton direction="left" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
