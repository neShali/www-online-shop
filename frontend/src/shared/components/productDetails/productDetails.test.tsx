import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductDetails } from './productDetails';

const mockProduct = {
  id: 1,
  name: 'Cool Jacket',
  price: 99.99,
  description: 'Warm and stylish',
  created_at: '2023-01-01T00:00:00Z',
  variants: [
    {
      id: 1,
      size: 'M',
      color: 'Red',
      color_hex: '#ff0000',
      product_id: 1,
      created_at: '2023-01-01T00:00:00Z',
    },
    {
      id: 2,
      size: 'M',
      color: 'Blue',
      color_hex: '#0000ff',
      product_id: 1,
      created_at: '2023-01-01T00:00:00Z',
    },
    {
      id: 3,
      size: 'L',
      color: 'Red',
      color_hex: '#ff0000',
      product_id: 1,
      created_at: '2023-01-01T00:00:00Z',
    },
  ],
};

describe('ProductDetails', () => {
  it('renders product name, price and description', () => {
    render(<ProductDetails product={mockProduct} />);

    expect(screen.getByText('Cool Jacket')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Warm and stylish')).toBeInTheDocument();
  });

  it('renders all unique color buttons', () => {
    render(<ProductDetails product={mockProduct} />);
    expect(screen.getByLabelText('Select color Red')).toBeInTheDocument();
    expect(screen.getByLabelText('Select color Blue')).toBeInTheDocument();
  });

  it('renders size tabs for unique sizes', () => {
    render(<ProductDetails product={mockProduct} />);
    // Sizes are 'M' and 'L'
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText('L')).toBeInTheDocument();
  });

  it('toggles color selection on click', () => {
    render(<ProductDetails product={mockProduct} />);
    const redButton = screen.getByLabelText('Select color Red');

    fireEvent.click(redButton);
    expect(redButton.className).toMatch(/selected/);

    fireEvent.click(redButton);
    expect(redButton.className).not.toMatch(/selected/);
  });

  it('toggles size selection on click', () => {
    render(<ProductDetails product={mockProduct} />);
    const sizeM = screen.getByText('M');
    fireEvent.click(sizeM);
    expect(sizeM.className).toMatch(/active/);

    fireEvent.click(sizeM);
    expect(sizeM.className).not.toMatch(/active/);
  });

  it('enables Add button if variant selected and user is logged in', () => {
    render(<ProductDetails product={mockProduct} isLoggedIn={true} />);

    // Select color Red and size M
    fireEvent.click(screen.getByLabelText('Select color Red'));
    fireEvent.click(screen.getByText('M'));

    const btn = screen.getByRole('button', { name: /add/i });
    expect(btn).toBeEnabled();
  });

  it('calls onAdd with correct variant id when Add clicked', () => {
    const onAdd = vi.fn();
    render(
      <ProductDetails product={mockProduct} isLoggedIn={true} onAdd={onAdd} />
    );

    fireEvent.click(screen.getByLabelText('Select color Blue'));
    fireEvent.click(screen.getByText('M'));

    const btn = screen.getByRole('button', { name: /add/i });
    fireEvent.click(btn);

    // Variant with size M and color Blue has id 2
    expect(onAdd).toHaveBeenCalledWith(2);
  });
});
