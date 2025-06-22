import React from 'react';
import styles from './footer.module.scss';

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.left}>
        <p className={styles.title}>Info</p>
        <ul className={styles.langList}>
          {['Pricing', 'About', 'Contacts'].map((item) => (
            <li key={item}>
              <button onClick={() => {}} className={styles.langBtn}>
                {item}
              </button>
            </li>
          ))}
        </ul>

        <p className={styles.title}>Languages</p>
        <ul className={styles.langList}>
          {['Eng', 'Esp', 'Sve'].map((lng) => (
            <li key={lng}>
              <button onClick={() => {}} className={styles.langBtn}>
                {lng}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.right}>
        <p className={styles.title}>Technologies</p>
        <div className={styles.tech}>
          <a href="#" className={styles.techLogo}>
            <svg width="47" height="47">
              <use href="symbol-defs.svg#icon-logo" />
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
