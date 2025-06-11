import React from 'react';
import styles from './Pagination.module.scss';
import { ArrowButton } from '../buttons/arrowButtons';

export type PaginationProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  page,
  pages,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  const goPrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const goNext = () => {
    if (page < pages) onPageChange(page + 1);
  };

  return (
    <div className={styles.pagination}>
      <ArrowButton direction="left" onClick={goPrev} disabled={page === 1} />

      <ul className={styles.list}>
        {pageNumbers.map((num) => (
          <li key={num} className={styles.item}>
            <button
              type="button"
              className={`${styles.button} ${
                num === page ? styles.active : ''
              }`}
              onClick={() => onPageChange(num)}
              disabled={num === page}
            >
              {num}
            </button>
          </li>
        ))}
      </ul>

      <ArrowButton
        direction="right"
        onClick={goNext}
        disabled={page === pages}
      />
    </div>
  );
};
