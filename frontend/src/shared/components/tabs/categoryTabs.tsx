import styles from './categoryTabs.module.scss';
import type { Category } from '../../api';

type CategoryTabsProps = {
  categories?: Category[];
  onCategoryClick: (categoryName: number) => void;
  activeCategory?: number;
};

export const CategoryTabs = ({
  categories,
  onCategoryClick,
  activeCategory,
}: CategoryTabsProps) => {
  return (
    <div className={styles.shop__categories}>
      <ul className={styles.shop__category__list}>
        {categories?.map((category) => (
          <li key={category.id} className={styles.shop__category__item}>
            <button
              className={`${styles.shop__category__btn} ${
                activeCategory === category.id ? styles.active : ''
              }`}
              onClick={() => onCategoryClick(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
