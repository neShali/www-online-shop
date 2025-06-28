import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GenderTabs } from './genderTabs';

describe('GenderTabs', () => {
  it('renders all gender buttons', () => {
    render(<GenderTabs />);
    ['(All)', 'Men', 'Women', 'KID'].forEach((gender) => {
      expect(screen.getByText(gender)).toBeInTheDocument();
    });
  });

  it('initially sets "(All)" as active', () => {
    render(<GenderTabs />);
    const allBtn = screen.getByText('(All)');
    expect(allBtn.className).toMatch(/active/);
  });

  it('changes active gender on button click', () => {
    render(<GenderTabs />);
    const menBtn = screen.getByText('Men');
    fireEvent.click(menBtn);
    expect(menBtn.className).toMatch(/active/);

    // "(All)" should no longer be active
    const allBtn = screen.getByText('(All)');
    expect(allBtn.className).not.toMatch(/active/);
  });
});
