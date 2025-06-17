import { type FC } from 'react';
import styles from './sizeTabs.module.scss';

type SizeTabsProps = {
  sizes: string[];
  activeSize: string | null;
  onSizeClick: (size: string) => void;
};

export const SizeTabs: FC<SizeTabsProps> = ({
  sizes,
  activeSize,
  onSizeClick,
}) => (
  <ul className={styles.wrapper}>
    {sizes.map((size) => (
      <li key={size}>
        <button
          className={`${styles.tab} ${activeSize === size ? styles.active : ''}`}
          onClick={() => onSizeClick(size)}
          type="button"
        >
          {size}
        </button>
      </li>
    ))}
  </ul>
);
