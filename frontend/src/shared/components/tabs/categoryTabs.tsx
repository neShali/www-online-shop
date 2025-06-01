import { useState } from 'react';
import styles from './categoryTabs.module.scss';

const categories = [
  'new',
  'best sellers',
  'shirts',
  't-shirts',
  'polo shirts',
  'jeans',
  'shorts',
  'lackets',
];

const CategoryTabs = () => {
  const [activeCategory, setActiveCategory] = useState<string>('new');

  return (
    <div className={styles.shop__categories}>
      <ul className={styles.shop__category__list}>
        {categories.map((category) => (
          <li key={category} className={styles.shop__category__item}>
            <button
              className={`${styles.shop__category__btn} ${
                activeCategory === category ? styles.active : ''
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryTabs;
