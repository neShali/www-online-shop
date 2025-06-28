import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchInput } from './searchInput';

describe('SearchInput', () => {
  it('renders input with correct placeholder and value', () => {
    render(
      <SearchInput value="test" onChange={() => {}} placeholder="Find..." />
    );
    const input = screen.getByPlaceholderText('Find...');
    expect(input).toBeInTheDocument();
    expect((input as HTMLInputElement).value).toBe('test');
  });

  it('applies additional className to container', () => {
    const { container } = render(
      <SearchInput value="" onChange={() => {}} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has input type search', () => {
    render(<SearchInput value="" onChange={() => {}} />);
    const input = screen.getByRole('searchbox');
    expect(input).toHaveAttribute('type', 'search');
  });
});
