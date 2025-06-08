import { useState } from 'react';
import styles from './sizeTabs.module.scss';

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2X'];

export const SizeTabs = () => {
  const [activeSize, setActiveSize] = useState<string>('M');

  return (
    <ul className={styles.wrapper}>
      {sizes.map((size) => (
        <li key={size}>
          <button
            className={`${styles.tab} ${activeSize === size ? styles.active : ''}`}
            onClick={() => setActiveSize(size)}
          >
            {size}
          </button>
        </li>
      ))}
    </ul>
  );
};
