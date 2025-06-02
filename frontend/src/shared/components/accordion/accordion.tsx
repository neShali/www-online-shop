import { type FC, type ReactNode, useState } from 'react';
import { Icon } from '../icon';

import styles from './accordion.module.scss';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export const Accordion: FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.section}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={styles.title}>{title}</span>
        <Icon
          name="short_arrow_right"
          className={isOpen ? styles.chevronOpen : styles.chevronClose}
        />
      </button>
      {isOpen && <div className={styles.body}>{children}</div>}
    </div>
  );
};
