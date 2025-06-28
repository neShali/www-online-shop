import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './pagination';

const createProps = (page: number, pages: number, onPageChange = vi.fn()) => ({
  page,
  pages,
  onPageChange,
});

describe('Pagination', () => {
  it('renders correct number of page buttons', () => {
    render(<Pagination {...createProps(1, 3)} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('disables prev button on first page', () => {
    render(<Pagination {...createProps(1, 3)} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled(); // left arrow
  });

  it('disables next button on last page', () => {
    render(<Pagination {...createProps(3, 3)} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[buttons.length - 1]).toBeDisabled(); // right arrow
  });

  it('calls onPageChange when a page number is clicked', () => {
    const mockFn = vi.fn();
    render(<Pagination {...createProps(1, 3, mockFn)} />);
    fireEvent.click(screen.getByText('2'));
    expect(mockFn).toHaveBeenCalledWith(2);
  });

  it('navigates to next and previous pages', () => {
    const mockFn = vi.fn();
    render(<Pagination {...createProps(2, 3, mockFn)} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]); // prev
    expect(mockFn).toHaveBeenCalledWith(1);
    fireEvent.click(buttons[buttons.length - 1]); // next
    expect(mockFn).toHaveBeenCalledWith(3);
  });
});
