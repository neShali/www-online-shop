import React, { type ChangeEventHandler, type FC } from 'react';
import styles from './SearchInput.module.scss';
import { Icon } from '../icon';

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** Текущее значение */
  value: string;
  /** Обработчик изменения */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /** Плейсхолдер */
  placeholder?: string;
  /** Дополнительный CSS-класс для контейнера */
  className?: string;
}

/**
 * Поле поиска с иконкой.
 */
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
