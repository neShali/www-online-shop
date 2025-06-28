import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Rating } from './rating';

describe('Rating', () => {
  it('renders correct number of stars (default max=5)', () => {
    render(<Rating value={3} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('renders correct number of stars with custom max', () => {
    render(<Rating value={2} max={10} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(10);
  });

  it('renders filled and empty stars according to value', () => {
    render(<Rating value={3} max={5} />);
    const buttons = screen.getAllByRole('button');

    for (let i = 0; i < buttons.length; i++) {
      if (i < 3) {
        expect(buttons[i].className).toMatch(/filled/);
      } else {
        expect(buttons[i].className).toMatch(/empty/);
      }
    }
  });

  it('calls onChange with correct value when star clicked', () => {
    const onChange = vi.fn();
    render(<Rating value={2} onChange={onChange} />);
    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[3]); // 4th star, idx=4
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('buttons are disabled if onChange is not provided', () => {
    render(<Rating value={3} />);
    const buttons = screen.getAllByRole('button');

    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it('buttons are enabled if onChange is provided', () => {
    const onChange = vi.fn();
    render(<Rating value={3} onChange={onChange} />);
    const buttons = screen.getAllByRole('button');

    buttons.forEach((btn) => {
      expect(btn).not.toBeDisabled();
    });
  });

  it('has correct aria-label for each star button', () => {
    render(<Rating value={1} max={3} />);
    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).toHaveAttribute('aria-label', '1 star');
    expect(buttons[1]).toHaveAttribute('aria-label', '2 stars');
    expect(buttons[2]).toHaveAttribute('aria-label', '3 stars');
  });
});
