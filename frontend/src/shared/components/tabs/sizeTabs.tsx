import { useState } from 'react';
import styles from './sizeTabs.module.scss';

interface SizeTabsProps {
  sizes: string[];
  onSizeClick: (size: string) => void;
}

export const SizeTabs = ({ sizes, onSizeClick }: SizeTabsProps) => {
  const [activeSize, setActiveSize] = useState<string>('');

  const handleSizeClick = (size: string) => {
    setActiveSize(size);
    onSizeClick(size);
  };

  return (
    <ul className={styles.wrapper}>
      {sizes.map((size) => (
        <li key={size}>
          <button
            className={`${styles.tab} ${activeSize === size ? styles.active : ''}`}
            onClick={() => handleSizeClick(size)}
          >
            {size}
          </button>
        </li>
      ))}
    </ul>
  );
};
