import React from 'react';
import styles from './collection.module.scss';
import { ProductCard } from '../productCard';
import type { Product } from '../../api';
import { ProductButton } from '../buttons';

type Props = { products: Product[]; title: string; onClick: () => void };

export const Collection: React.FC<Props> = ({ products, title, onClick }) => {
  return (
    <section className={styles.seasonal}>
      <div className="container">
        <h2>{title}</h2>
        <div className={styles.grid}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className={styles.more}>
          <ProductButton text="More" onClick={onClick}></ProductButton>
        </div>
      </div>
    </section>
  );
};
