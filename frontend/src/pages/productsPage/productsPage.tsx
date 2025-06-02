import { useState } from 'react';
import { categoriesHooks, productsHooks } from '../../shared/api';
import { Accordion } from '../../shared/components/accordion';
import { SearchInput } from '../../shared/components/searchInput';
import { CategoryTabs, SizeTabs } from '../../shared/components/tabs';
import { ProductCard } from '../../shared/components/productCard';

import styles from './productsPage.module.scss';
import { Checkbox } from '../../shared/components/checkbox';

export function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<number>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stock, setStock] = useState<'In stock' | 'Out of stock'>();
  const [activeColor, setActiveColor] = useState<string>('');

  const { data, isLoading, isError, error } =
    productsHooks.useListProductsSuspense({
      category_id: activeCategory,
      search: searchQuery,
    });

  const { items: products, page, size, pages, total } = data;

  const { data: categories } = categoriesHooks.useListCategories();

  const colors = ['red', 'black', 'white'];

  const handleCategoryChange = (categoryId: number) => {
    setActiveCategory(categoryId);
  };

  const handleAddToCart = () => {};

  console.log({ isLoading, isError, error, page, size, pages, total });

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <h3 className={styles.title}>Filters</h3>
        <span className={styles.label}>Size</span>
        <SizeTabs />
        <Accordion title="Availability">
          <Checkbox
            id={'In stock'}
            label={'In stock'}
            checked={stock === 'In stock'}
            onChange={() => setStock('In stock')}
          />
          <Checkbox
            id={'Out of stock'}
            label={'Out of stock'}
            checked={stock === 'Out of stock'}
            onChange={() => setStock('Out of stock')}
          />
        </Accordion>
        <Accordion title="Category">
          {categories?.map(
            (category) =>
              category.name && (
                <Checkbox
                  key={category.id}
                  id={String(category.id)}
                  label={category.name}
                  checked={activeCategory === category.id}
                  onChange={() => setActiveCategory(category.id)}
                />
              )
          )}
        </Accordion>

        <Accordion title="Colors">
          {colors.map((color, idx) => (
            <Checkbox
              key={idx}
              id={color}
              label={color}
              checked={color === activeColor}
              onChange={() => setActiveColor(color)}
            />
          ))}
        </Accordion>

        <Accordion title="Price Range">
          <div>
            <input
              type="number"
              placeholder="Min"
              className={styles.smallInput}
            />{' '}
            –
            <input
              type="number"
              placeholder="Max"
              className={styles.smallInput}
            />
          </div>
        </Accordion>
      </aside>
      <div className={styles.main}>
        <div className={styles.breadcrumb}>
          Home / <span className={styles.current}>Products</span>
        </div>

        <h1 className={styles.title}>PRODUCTS</h1>

        <div className={styles.searchWrapper}>
          <SearchInput
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.tabsWrapper}>
          <CategoryTabs
            categories={categories}
            onCategoryClick={handleCategoryChange}
            activeCategory={activeCategory}
          />
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
