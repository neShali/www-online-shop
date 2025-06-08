import type { Product } from '../../api';
import type { FC } from 'react';

import styles from './productDetails.module.scss';
import { SizeTabs } from '../tabs';

interface ProductDetailsProps {
  product: Product;
  onAdd?: () => void;
}

export const ProductDetails: FC<ProductDetailsProps> = ({ product, onAdd }) => {
  const { variants, name, price, description } = product;

  const uniqueColors = variants?.reduce<
    { color: string; color_hex?: string }[]
  >((acc, curr) => {
    if (!acc.some((item) => item.color === curr.color)) {
      acc.push({ color: curr.color, color_hex: curr.color_hex ?? undefined });
    }
    return acc;
  }, []);

  const uniqueSizes = [...new Set(variants?.map((item) => item.size))];

  const onSizeClick = () => {};

  return (
    <div className={styles.info}>
      <button className={styles.likeBtn} aria-label="Like">
        <svg width="18" height="18">
          <use href="./icons/main/symbol-defs.svg#icon-heart" />
        </svg>
      </button>
      <div className={styles.desc}>
        <p className={styles.title}>{name}</p>
        <p className={styles.price}>${price}</p>
        <p className={styles.subtitle}>{description}</p>
      </div>

      <div className={styles.colorBlock}>
        <p>Color</p>
        <ul className={styles.colorList}>
          {uniqueColors?.map((variant, i) => (
            <li key={i}>
              <button
                style={{ backgroundColor: variant.color_hex ?? '#ffffff' }}
              />
            </li>
          ))}
        </ul>
      </div>
      <SizeTabs sizes={uniqueSizes} onSizeClick={onSizeClick}></SizeTabs>

      <button className={styles.addBtn} onClick={onAdd}>
        ADD
      </button>
    </div>
  );
};
