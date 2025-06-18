import React from 'react';
import styles from './arrowButton.module.scss';

export type ArrowButtonProps = {
  direction: 'left' | 'right';
  onClick?: () => void;
  disabled?: boolean;
};

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction,
  onClick,
  disabled,
}) => {
  const className =
    direction === 'left'
      ? styles.collection__arrow__left
      : styles.collection__arrow__right;

  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <svg width="12" height="13">
        <use xlinkHref={`symbol-defs.svg#icon-short_arrow_left`} />
      </svg>
    </button>
  );
};
