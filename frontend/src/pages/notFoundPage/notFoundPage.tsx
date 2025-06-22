import { Link } from 'react-router';
import styles from './notFoundPage.module.scss';

export const NotFoundPage: React.FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.content}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Oops! Page not found.</p>
      <Link to="/" className={styles.button}>
        Go Home
      </Link>
    </div>
  </div>
);
