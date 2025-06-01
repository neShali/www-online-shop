import styles from './productButtons.module.scss';

type ProductsButtonProps = {
  text?: string;
  link?: string;
  size?: 'default' | 'small';
};

const ProductButton = ({
  text = 'Go To Shop',
  link = '',
  size = 'default',
}: ProductsButtonProps) => {
  const className =
    size === 'small'
      ? styles.collection__left__link__small
      : styles.collection__left__link;

  return (
    <a href={link} className={className}>
      <span>{text}</span>
      <svg width="47">
        <use xlinkHref="symbol-defs.svg#icon-arrow" />
      </svg>
    </a>
  );
};

export default ProductButton;
