import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReviewItem } from './reviewItem';

describe('ReviewItem', () => {
  const baseProps = {
    name: 2,
    time: '2023-01-01T12:00:00Z',
  };

  it('renders user name based on name number', () => {
    render(<ReviewItem {...baseProps} />);
    expect(screen.getByText('Vasya Pupkin')).toBeInTheDocument();
  });

  it('renders comment if provided', () => {
    render(<ReviewItem {...baseProps} comment="Nice product!" />);
    expect(screen.getByText('Nice product!')).toBeInTheDocument();
  });

  it('does not render comment if not provided', () => {
    render(<ReviewItem {...baseProps} />);
    expect(screen.queryByText('Nice product!')).not.toBeInTheDocument();
  });

  it('renders formatted time string', () => {
    render(<ReviewItem {...baseProps} />);
    const formatted = new Date(baseProps.time).toLocaleString();
    expect(screen.getByText(formatted)).toBeInTheDocument();
  });

  it('renders rating if rating prop is provided', () => {
    render(<ReviewItem {...baseProps} rating={4} />);
    // There should be 4 filled stars (based on Rating tests)
    const stars = screen.getAllByRole('button');
    expect(stars.length).toBeGreaterThanOrEqual(4);
  });

  it('does not render rating if rating is null or undefined', () => {
    const { container } = render(<ReviewItem {...baseProps} rating={null} />);
    expect(container.querySelector('ul')).toBeNull();
  });
});
