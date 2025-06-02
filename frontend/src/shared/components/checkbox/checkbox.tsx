import React, { type ChangeEventHandler, type ReactNode } from 'react';
import styles from './checkbox.module.scss';

interface CheckboxProps {
  id: string;
  label: string;
  count?: number;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  suffix?: ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  count,
  checked = false,
  onChange,
  className = '',
  suffix = null,
}) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <input
        id={id}
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className={styles.label}>
        <span className={styles.text}>{label}</span>
        {typeof count === 'number' && (
          <span className={styles.count}>({count})</span>
        )}
        {suffix}
      </label>
    </div>
  );
};
