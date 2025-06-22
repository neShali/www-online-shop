import { Link } from 'react-router';
import styles from './header.module.scss';
import { cartHooks } from '../../../api';
import { useAuth } from '../../../../providers/authProvider';

export default function Header() {
  const { isLoggedIn } = useAuth();

  const { data } = cartHooks.useGetMyCart({
    query: { enabled: !!isLoggedIn },
  });

  const cartCount =
    data?.items?.reduce((acc, item) => acc + (item.quantity ?? 1), 0) || 0;

  return (
    <header className={styles.header}>
      <nav className={styles.links}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to={'/products'} className={styles.link}>
          Products
        </Link>
      </nav>

      <Link to="/" className="logo">
        <svg width="35" height="35">
          <use xlinkHref="symbol-defs.svg#icon-logo" />
        </svg>
      </Link>

      <nav className={styles.btns}>
        <Link className={`${styles.btn} ${styles.btnCart}`} to="/cart">
          <svg width="22" height="22">
            <use xlinkHref="symbol-defs.svg#icon-bag" />
          </svg>
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </Link>
        <Link className={styles.btn} to="/login">
          <svg width="17" height="17">
            <use xlinkHref="symbol-defs.svg#icon-user" />
          </svg>
        </Link>
      </nav>
    </header>
  );
}
