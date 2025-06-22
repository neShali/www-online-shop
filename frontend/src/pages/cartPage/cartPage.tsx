import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { queryClient } from '../../queryClient';
import { cartHooks } from '../../shared/api';
import styles from './CartPage.module.scss';
import { CartItem } from './components/cartItem';
import { Checkbox } from '../../shared/components/checkbox';
import { useIsLoggedIn } from '../../shared/hooks/useIsLoggedIn';
import { CardButton } from '../../shared/components/buttons';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();

  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const {
    data: cart,
    isLoading,
    error,
  } = cartHooks.useGetMyCart({
    query: { enabled: !!isLoggedIn },
  });

  const removeItem = cartHooks.useRemoveCartItem({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: cartHooks.getMyCartQueryKey(),
        });
      },
    },
  });
  const updateItem = cartHooks.useUpdateCartItem({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: cartHooks.getMyCartQueryKey(),
        });
      },
    },
  });

  const handleQtyChange = useCallback(
    (itemId: number, newQty: number) => {
      if (newQty < 1) return;
      updateItem.mutate({ item_id: itemId, data: { quantity: newQty } });
    },
    [updateItem]
  );

  const handleRemove = useCallback(
    (itemId: number) => {
      removeItem.mutate({ item_id: itemId });
    },
    [removeItem]
  );

  const items = cart?.items ?? [];
  const subtotal = items.reduce(
    (sum, it) => sum + it.unit_price * (it.quantity ?? 1),
    0
  );
  const shipping = items.length ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <section className={styles.cart}>
      {isLoading && !error && isLoggedIn && (
        <p className={styles.loading}>Loading cart…</p>
      )}
      {error && !isLoading && (
        <p className={styles.error}>Failed to load cart</p>
      )}
      {!isLoggedIn && !isLoading && (
        <div className={styles.notLoggedIn}>
          Login or register to access your shopping cart
          <CardButton
            size="small"
            text="Log in"
            onClick={() => navigate('/login')}
          ></CardButton>
        </div>
      )}

      {isLoggedIn && !error && !isLoading && (
        <>
          <div className={styles.inner}>
            <div className={styles.left}>
              <h3 className={styles.tabActive}>SHOPPING BAG</h3>
              <hr className={styles.divider} />

              <ul className={styles.list}>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQtyChange={handleQtyChange}
                    onRemove={handleRemove}
                  />
                ))}
              </ul>
            </div>

            <aside className={styles.right}>
              <p className={styles.heading}>ORDER SUMMARY</p>
              <div className={styles.row}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.row}>
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <hr className={styles.dividerShort} />
              <div className={styles.rowTotal}>
                <span>Total (tax incl.)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <label className={styles.agree}>
                <Checkbox
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  id={'ds'}
                  label={'I agree to the Terms and Conditions'}
                />
              </label>
              <Link
                to="/checkout"
                className={`${styles.checkoutBtn} ${!isAgreed ? styles.disabled : null}`}
              >
                CONTINUE
              </Link>
            </aside>
          </div>
        </>
      )}
    </section>
  );
};
