import React, { type ChangeEventHandler, type FC } from 'react';
import styles from './searchInput.module.scss';
import { Icon } from '../icon';

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}

export const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search',
  className = '',
  ...props
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <Icon name="lupa" className={styles.icon} />
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
        {...props}
      />
    </div>
  );
};
