import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReviewForm } from './reviewForm';

describe('ReviewForm', () => {
  it('renders inputs and button', () => {
    render(<ReviewForm onSubmit={() => {}} />);
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Review')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /post review/i })
    ).toBeInTheDocument();
  });

  it('calls onSubmit with text and rating on button click', () => {
    const onSubmit = vi.fn();
    render(<ReviewForm onSubmit={onSubmit} />);

    const nameInput = screen.getByPlaceholderText('Your name');
    const reviewTextarea = screen.getByPlaceholderText('Review');
    const postButton = screen.getByRole('button', { name: /post review/i });

    // Заполняем форму
    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    fireEvent.change(reviewTextarea, { target: { value: 'Nice product!' } });

    // Меняем рейтинг — найдём звёзды и кликнем по третьей (оценка 3)
    const stars = screen.getAllByRole('button', { name: /star/ });
    fireEvent.click(stars[2]);

    fireEvent.click(postButton);

    expect(onSubmit).toHaveBeenCalledWith('Nice product!', 3);
  });

  it('disables button if error prop is passed', () => {
    render(<ReviewForm onSubmit={() => {}} error="Something went wrong" />);
    const postButton = screen.getByRole('button', { name: /post review/i });
    expect(postButton).toBeDisabled();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('button is enabled if no error', () => {
    render(<ReviewForm onSubmit={() => {}} />);
    const postButton = screen.getByRole('button', { name: /post review/i });
    expect(postButton).not.toBeDisabled();
  });

  it('updates name and review input values on user input', () => {
    render(<ReviewForm onSubmit={() => {}} />);

    const nameInput = screen.getByPlaceholderText(
      'Your name'
    ) as HTMLInputElement;
    const reviewTextarea = screen.getByPlaceholderText(
      'Review'
    ) as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: 'Bob' } });
    expect(nameInput.value).toBe('Bob');

    fireEvent.change(reviewTextarea, { target: { value: 'Good!' } });
    expect(reviewTextarea.value).toBe('Good!');
  });
});
