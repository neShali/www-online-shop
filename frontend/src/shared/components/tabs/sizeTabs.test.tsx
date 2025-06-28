import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SizeTabs } from './sizeTabs';

describe('SizeTabs', () => {
  const sizes = ['S', 'M', 'L', 'XL'];

  it('renders all size buttons', () => {
    render(<SizeTabs sizes={sizes} activeSize={null} onSizeClick={() => {}} />);
    sizes.forEach((size) => {
      expect(screen.getByText(size)).toBeInTheDocument();
    });
  });

  it('applies active class to the active size button', () => {
    render(<SizeTabs sizes={sizes} activeSize="M" onSizeClick={() => {}} />);
    const activeBtn = screen.getByText('M');
    expect(activeBtn.className).toMatch(/active/);

    const inactiveBtn = screen.getByText('S');
    expect(inactiveBtn.className).not.toMatch(/active/);
  });

  it('calls onSizeClick with correct size when button clicked', () => {
    const onSizeClick = vi.fn();
    render(
      <SizeTabs sizes={sizes} activeSize={null} onSizeClick={onSizeClick} />
    );

    const btn = screen.getByText('L');
    fireEvent.click(btn);
    expect(onSizeClick).toHaveBeenCalledWith('L');
  });
});
