import { render, screen, fireEvent } from '@testing-library/react';
import { Collection } from './collection';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router';

describe('Collection', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      image: '',
      price: 100,
      created_at: '2023-01-01T00:00:00Z',
    },
    {
      id: 2,
      name: 'Product 2',
      image: '',
      price: 200,
      created_at: '2023-01-02T00:00:00Z',
    },
  ];

  it('renders title and products', () => {
    render(
      <MemoryRouter>
        <Collection
          title="New Arrivals"
          products={mockProducts}
          onClick={() => {}}
        />
      </MemoryRouter>
    );
    expect(screen.getByText('New Arrivals')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('calls onClick when ProductButton is clicked', () => {
    const handleClick = vi.fn();
    render(
      <MemoryRouter>
        <Collection
          title="Featured"
          products={mockProducts}
          onClick={handleClick}
        />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: 'More' }));
    expect(handleClick).toHaveBeenCalled();
  });
});
