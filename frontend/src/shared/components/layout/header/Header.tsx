import { Link } from 'react-router';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.links}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to={'/products'} className={styles.link}>
          Products
        </Link>
        <Link to="#" className={styles.link}>
          New
        </Link>
      </nav>

      <Link to="/" className="logo">
        <svg width="35" height="35">
          <use xlinkHref="symbol-defs.svg#icon-logo" />
        </svg>
      </Link>

      <nav className={styles.btns}>
        <Link to="/favorites" className={styles.btn}>
          <svg width="22" height="22">
            <use xlinkHref="symbol-defs.svg#icon-heart" />
          </svg>
        </Link>
        <Link className={styles.btn} to="/cart">
          <svg width="22" height="22">
            <use xlinkHref="symbol-defs.svg#icon-bag" />
          </svg>
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
