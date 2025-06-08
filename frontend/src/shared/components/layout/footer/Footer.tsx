import React from 'react';
import styles from './footer.module.scss';

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={`${styles.container} container`}>
      <div className={styles.left}>
        <p className={styles.title}>Info</p>
        <ul className={styles.list}>
          <li>
            <a href="#" className={styles.link}>
              Pricing
            </a>
          </li>
          <li>
            <a href="#" className={styles.link}>
              About
            </a>
          </li>
          <li>
            <a href="#" className={styles.link}>
              Contacts
            </a>
          </li>
        </ul>

        <p className={styles.title}>Languages</p>
        <ul className={styles.langList}>
          {['Eng', 'Esp', 'Sve'].map((lng) => (
            <li key={lng}>
              <button className={styles.langBtn}>{lng}</button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.right}>
        <p className={styles.title}>Technologies</p>
        <div className={styles.tech}>
          <a href="#" className={styles.techLogo}>
            <svg width="47" height="47">
              <use href="./icons/main/symbol-defs.svg#icon-logo" />
            </svg>
          </a>
          <p className={styles.techName}>VR</p>
          <p className={styles.techName}>XIV</p>
          <p className={styles.techName}>QR</p>
        </div>
      </div>
    </div>
  </footer>
);
