import type { Product } from '../../api';
import { useEffect, useMemo, useState, type FC } from 'react';

import styles from './productDetails.module.scss';
import { SizeTabs } from '../tabs';
import { CardButton } from '../buttons';

interface ProductDetailsProps {
  product?: Product;
  onAdd?: (variant_id: number) => void;
}

export const ProductDetails: FC<ProductDetailsProps> = ({ product, onAdd }) => {
  const { variants = [], name, price, description } = product || {};

  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);

  const uniqueColors = useMemo(() => {
    const filtered = activeSize
      ? variants.filter((v) => v.size === activeSize)
      : variants;

    const map = new Map<string, string | undefined>();
    for (const v of filtered) {
      if (typeof v.color === 'string' && !map.has(v.color)) {
        map.set(v.color, v.color_hex ?? undefined);
      }
    }
    return Array.from(map.entries()).map(([color, color_hex]) => ({
      color,
      color_hex,
    }));
  }, [variants, activeSize]);

  const uniqueSizes = useMemo(() => {
    const filtered = activeColor
      ? variants.filter((v) => v.color === activeColor)
      : variants;

    return Array.from(new Set(filtered.map((v) => v.size)));
  }, [variants, activeColor]);

  useEffect(() => {
    if (activeColor && !uniqueColors.find((c) => c.color === activeColor)) {
      setActiveColor(uniqueColors[0]?.color ?? null);
    }
  }, [uniqueColors, activeColor]);

  useEffect(() => {
    if (activeSize && !uniqueSizes.includes(activeSize)) {
      setActiveSize(uniqueSizes[0] ?? null);
    }
  }, [uniqueSizes, activeSize]);

  const handleColorClick = (color: string) => {
    setActiveColor((prev) => (prev === color ? null : color));
  };

  const handleSizeClick = (size: string) => {
    setActiveSize((prev) => (prev === size ? null : size));
  };

  const selectedVariant = useMemo(() => {
    return variants.find(
      (v) => v.color === activeColor && v.size === activeSize
    );
  }, [variants, activeColor, activeSize]);

  console.log({ selectedVariant, activeColor, activeSize });

  return (
    <div className={styles.info}>
      <div className={styles.desc}>
        <p className={styles.title}>{name}</p>
        <p className={styles.price}>${price?.toFixed(2)}</p>
        <p className={styles.subtitle}>{description}</p>
      </div>

      <div className={styles.colorBlock}>
        <p className={styles.blockTitle}>Color</p>
        <ul className={styles.colorList}>
          {uniqueColors.map(({ color, color_hex }) => {
            const isSelected = color === activeColor;
            return (
              <li key={color}>
                <button
                  className={`${styles.colorTag} ${
                    isSelected ? styles.selected : ''
                  }`}
                  onClick={() => handleColorClick(color)}
                  style={{ backgroundColor: color_hex ?? '#fff' }}
                  aria-label={`Select color ${color}`}
                  type="button"
                >
                  {isSelected && (
                    <svg
                      className={styles.checkIcon}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.sizeBlock}>
        <p className={styles.blockTitle}>Size</p>
        <SizeTabs
          activeSize={activeSize}
          sizes={uniqueSizes}
          onSizeClick={handleSizeClick}
        />
      </div>

      <CardButton
        text="ADD"
        size="small"
        onClick={() => {
          if (selectedVariant && onAdd) {
            onAdd(selectedVariant.id);
          }
        }}
        disabled={!selectedVariant}
      />
    </div>
  );
};
