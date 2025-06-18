import styles from './iconButton.module.scss';

type IconButtonProps = {
  name: 'plus' | 'minus';
  onClick: () => void;
  disabled?: boolean;
};

export const IconButton = ({ name, onClick, disabled }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${disabled ? styles.disabled : null}`}
    >
      <svg width="12" height="12">
        <use xlinkHref={`symbol-defs.svg#icon-${name}`} />
      </svg>
    </button>
  );
};
