import { type ReactNode } from 'react';
import styles from './button.module.scss';

export function Button({ children }: { children: ReactNode }) {
  return <button className={styles.btn}>{children}</button>;
}
