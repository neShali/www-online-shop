import { useState } from 'react';
import styles from './sizeTabs.module.scss';

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2X'];

const SizeTabs = () => {
  const [activeSize, setActiveSize] = useState<string>('M');

  return (
    <ul className={styles.shop__size__list}>
      {sizes.map((size) => (
        <li key={size} className={styles.shop__size__item}>
          <button
            className={`${styles.shop__size__btn} ${activeSize === size ? styles.active : ''}`}
            onClick={() => setActiveSize(size)}
          >
            {size}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SizeTabs;
