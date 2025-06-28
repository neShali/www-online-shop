import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCard } from './productCard';
import { MemoryRouter } from 'react-router';

const mockProduct = {
  id: 1,
  name: 'Cool Shirt',
  price: 29.99,
  image_url: 'https://example.com/shirt.jpg',
  created_at: '2023-01-01T00:00:00Z',
  variants: [
    {
      id: 101,
      sku: 'XL',
      size: 'XL',
      color: 'Red',
      color_hex: '#ff0000',
      product_id: 1,
      created_at: '2023-01-01T00:00:00Z',
    },
    {
      id: 102,
      sku: 'XL',
      size: 'XL',
      color: 'Blue',
      color_hex: '#0000ff',
      product_id: 1,
      created_at: '2023-01-01T00:00:00Z',
    },
  ],
};

describe('ProductCard', () => {
  it('renders product name and price', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText('Cool Shirt')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  it('renders image with correct src and alt', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockProduct.image_url);
    expect(img).toHaveAttribute('alt', mockProduct.name);
  });

  it('renders variant tag and color swatch', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText('XL')).toBeInTheDocument();
    const swatch = screen.getByLabelText('Color: Red');
    expect(swatch).toBeInTheDocument();
  });

  it('shows count of unique colors', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('renders fallback image when image_url is missing', () => {
    const noImageProduct = { ...mockProduct, image_url: null };
    render(
      <MemoryRouter>
        <ProductCard product={noImageProduct} />
      </MemoryRouter>
    );

    expect(screen.getByRole('img')).toHaveAttribute('src', '/placeholder.png');
  });
});
