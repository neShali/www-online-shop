import styles from './categoryTabs.module.scss';
import type { Category } from '../../api';

type CategoryTabsProps = {
  categories?: Category[];
  onCategoryClick: (categoryId: number | null) => void;
  activeCategory?: number | null;
};

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  onCategoryClick,
  activeCategory,
}) => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.category__list}>
        {categories?.map((category) => (
          <li key={category.id} className={styles.category__item}>
            <button
              className={`${styles.category__btn} ${
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
