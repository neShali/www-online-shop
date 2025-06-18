import { productsHooks } from '../../../shared/api';
import { IconButton } from '../../../shared/components/buttons';
import styles from './cartItem.module.scss';

interface CartItemProps {
  item: {
    id: number;
    product_id: number;
    quantity?: number;
    unit_price: number;
    variant_size: string;
    variant_color: string;
  };
  onQtyChange: (itemId: number, newQty: number) => void;
  onRemove: (itemId: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onQtyChange,
  onRemove,
}) => {
  const { data: product } = productsHooks.useGetProduct({
    product_id: item.product_id,
  });

  if (!product) return null;

  const qty = item.quantity ?? 1;

  return (
    <li className={styles.item}>
      <div className={styles.card}>
        <img
          src={product.image_url ?? undefined}
          alt={product.name ?? undefined}
          className={styles.image}
        />

        <div className={styles.titleAndPriceWrapper}>
          <div className={styles.title}>{product.name}</div>

          <div className={styles.price}>${product.price?.toFixed(2)}</div>
        </div>
      </div>
      <div className={styles.controls}>
        <button className={styles.removeBtn} onClick={() => onRemove(item.id)}>
          ×
        </button>

        <div className={styles.qtyControls}>
          <IconButton
            onClick={() => onQtyChange(item.id, qty + 1)}
            name={'plus'}
          />
          <div>{qty}</div>
          <IconButton
            onClick={() => onQtyChange(item.id, qty - 1)}
            disabled={qty <= 1}
            name="minus"
          />
        </div>
        <div
          className={styles.color}
          style={{ backgroundColor: item.variant_color }}
        />
        <div className={styles.size}>{item.variant_size}</div>
      </div>
    </li>
  );
};
