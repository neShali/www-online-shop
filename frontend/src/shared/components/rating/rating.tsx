import { type FC } from 'react';
import styles from './rating.module.scss';

export interface RatingProps {
  value: number;
  max?: number;
  onChange?: (newValue: number) => void;
}

export const Rating: FC<RatingProps> = ({ value, max = 5, onChange }) => {
  const interactive = typeof onChange === 'function';

  return (
    <ul className={styles.rating}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < value;
        const idx = i + 1;

        return (
          <li key={i}>
            <button
              type="button"
              className={`${styles.star} ${filled ? styles.filled : styles.empty}`}
              onClick={() => interactive && onChange!(idx)}
              disabled={!interactive}
              aria-label={`${idx} star${idx > 1 ? 's' : ''}`}
            >
              ★
            </button>
          </li>
        );
      })}
    </ul>
  );
};
