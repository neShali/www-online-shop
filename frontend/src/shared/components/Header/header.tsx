// import { type ReactNode } from 'react';
import styles from './header.module.scss';


export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <a href="#">Home</a>
            </li>
            <li className={styles.menu__item}>
              <a href="#">Collections</a>
            </li>
            <li className={styles.menu__item}>
              <a href="#">New</a>
            </li>
          </ul>
        </nav>

        <a href="#" className="logo">
          <svg width="35" height="35">
            <use xlinkHref="" />
          </svg>
        </a>

        <ul className={styles.header__btns}>
          <li className={styles.header__btn}>
            <a href="./cart.html">
              <svg width="22" height="22">
                <use xlinkHref="./icons/main/symbol-defs.svg#icon-heart" />
              </svg>
            </a>
          </li>
          <li className={styles.header__btn}>
            <a href="./cart.html">Cart</a>
          </li>
          <li className={styles.header__btn}>
            <a href="./checkout.html">
              <svg width="12" height="13">
                <use xlinkHref="./icons/main/symbol-defs.svg#icon-user" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
