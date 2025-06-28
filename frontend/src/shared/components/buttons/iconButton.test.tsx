import { render, screen, fireEvent } from '@testing-library/react';
import { IconButton } from './iconButton';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('IconButton', () => {
  it('renders with correct icon name', () => {
    render(<IconButton name="plus" onClick={() => {}} />);
    const use = screen.getByRole('button').querySelector('use');
    expect(use?.getAttribute('xlink:href')).toContain('#icon-plus');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<IconButton name="minus" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
