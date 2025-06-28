import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryTabs } from './categoryTabs';

const categoriesMock = [
  { id: 1, name: 'Clothing' },
  { id: 2, name: 'Accessories' },
  { id: 3, name: 'Shoes' },
];

describe('CategoryTabs', () => {
  it('renders buttons for each category', () => {
    render(
      <CategoryTabs
        categories={categoriesMock}
        onCategoryClick={() => {}}
        activeCategory={null}
      />
    );

    categoriesMock.forEach((cat) => {
      expect(screen.getByText(cat.name)).toBeInTheDocument();
    });
  });

  it('calls onCategoryClick with correct id when button clicked', () => {
    const onCategoryClick = vi.fn();
    render(
      <CategoryTabs
        categories={categoriesMock}
        onCategoryClick={onCategoryClick}
        activeCategory={null}
      />
    );

    fireEvent.click(screen.getByText('Accessories'));
    expect(onCategoryClick).toHaveBeenCalledWith(2);
  });

  it('applies active class to the active category button', () => {
    render(
      <CategoryTabs
        categories={categoriesMock}
        onCategoryClick={() => {}}
        activeCategory={3}
      />
    );

    const activeButton = screen.getByText('Shoes');
    expect(activeButton.className).toMatch(/active/);

    const inactiveButton = screen.getByText('Clothing');
    expect(inactiveButton.className).not.toMatch(/active/);
  });

  it('renders nothing if categories is undefined or empty', () => {
    const { container: c1 } = render(
      <CategoryTabs categories={undefined} onCategoryClick={() => {}} />
    );
    expect(c1.querySelector('button')).toBeNull();

    const { container: c2 } = render(
      <CategoryTabs categories={[]} onCategoryClick={() => {}} />
    );
    expect(c2.querySelector('button')).toBeNull();
  });
});
