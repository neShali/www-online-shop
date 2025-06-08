import { useMemo, useState } from 'react';
import { categoriesHooks, productsHooks } from '../../shared/api';
import { Accordion } from '../../shared/components/accordion';
import { SearchInput } from '../../shared/components/searchInput';
import { CategoryTabs, SizeTabs } from '../../shared/components/tabs';
import { ProductCard } from '../../shared/components/productCard';

import styles from './productsPage.module.scss';
import { Checkbox } from '../../shared/components/checkbox';
import { useGetAllVariants } from '../../shared/hooks/useGetAllVariants';

export function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<number | null>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stock, setStock] = useState<'In stock' | 'Out of stock'>();
  const [activeColor, setActiveColor] = useState<string>('');
  const [activeSize, setActiveSize] = useState<string>('');
  const [activeMinPrice, setActiveMinPrice] = useState<string>('');
  const [activeMaxPrice, setActiveMaxPrice] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, isError, error } =
    productsHooks.useListProductsSuspense({
      page: currentPage,
      size: 9,
      category_id: activeCategory,
      search: searchQuery,
    });

  const { items: products, page, size, pages, total } = data;

  const { data: rawCategories } = categoriesHooks.useListCategories();

  const categories = useMemo(() => {
    if (!rawCategories) return [];
    return [{ id: null, name: 'All' }, ...rawCategories];
  }, [rawCategories]);

  const { colors, sizes, priceRange } = useGetAllVariants();

  const handleCategoryChange = (categoryId: number | null) => {
    setActiveCategory(categoryId);
  };

  console.log({
    isLoading,
    isError,
    error,
    page,
    size,
    pages,
    total,
    activeSize,
  });

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <h3 className={styles.filterTitle}>Filters</h3>
        <span className={styles.label}>Size</span>
        <SizeTabs sizes={sizes} onSizeClick={setActiveSize} />
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
          {colors?.map(({ color }, idx) => (
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
              placeholder={priceRange.min}
              className={styles.smallInput}
              value={activeMinPrice}
              onChange={(e) => setActiveMinPrice(e.target.value)}
            />{' '}
            –
            <input
              type="number"
              placeholder={priceRange.max}
              className={styles.smallInput}
              value={activeMaxPrice}
              onChange={(e) => setActiveMaxPrice(e.target.value)}
            />
          </div>
        </Accordion>
      </aside>

      <div className={styles.main}>
        <div className={styles.breadcrumb}>
          Home / <span className={styles.current}>Products</span>
        </div>

        <h1 className={styles.title}>PRODUCTS</h1>
        <div className={styles.searchAndTabsContainer}>
          <SearchInput
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />

          <CategoryTabs
            categories={categories}
            onCategoryClick={handleCategoryChange}
            activeCategory={activeCategory}
          />
        </div>
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
