import styles from './productButton.module.scss';

type ProductsButtonProps = {
  text?: string;
  size?: 'default' | 'small';
  onClick?: () => void;
};

export const ProductButton = ({
  text = 'Go To Shop',
  size = 'default',
  onClick,
}: ProductsButtonProps) => {
  const className =
    size === 'small'
      ? styles.collection__left__link__small
      : styles.collection__left__link;

  return (
    <button onClick={onClick} className={className}>
      <span>{text}</span>
      <svg width="47">
        <use xlinkHref="symbol-defs.svg#icon-arrow" />
      </svg>
    </button>
  );
};
