import React from 'react';
import { Link } from 'react-router';

import styles from './ProductCard.module.scss';
import type { Product } from '../../api';

type ProductCardProps = {
  product: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { sku: tagName, color, color_hex } = product.variants?.[0] ?? {};

  const uniqueColors = new Set(product.variants?.map((item) => item.color));
  const countUniqueColors = uniqueColors.size;

  return (
    <Link
      to={`/products/${product.id}`}
      className={styles.cardWrapper}
      aria-label={`View details for ${product.name}`}
    >
      <div className={styles.imageContainer}>
        <img
          src={product.image_url ?? '/placeholder.png'}
          alt={product.name ?? 'Product'}
          className={styles.productImage}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.tagRow}>
          <span className={styles.tagName}>{tagName}</span>
          {color && color_hex && (
            <span
              className={styles.tagColor}
              style={{ backgroundColor: color_hex }}
              aria-label={`Color: ${color}`}
            />
          )}

          {countUniqueColors > 0 && (
            <span className={styles.tagVariants}>+{countUniqueColors}</span>
          )}
        </div>

        <div className={styles.titleAndPriceWrapper}>
          <div className={styles.title}>{product.name}</div>

          <div className={styles.price}>${product.price?.toFixed(2)}</div>
        </div>
      </div>
    </Link>
  );
};
