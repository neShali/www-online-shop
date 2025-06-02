import React, { type ChangeEventHandler, type FC } from 'react';
import styles from './SearchInput.module.scss';

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
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M11 4a7 7 0 104.9 12.1l5 5a1 1 0 01-1.4 1.4l-5-5A7 7 0 0111 4zm0 2a5 5 0 110 10 5 5 0 010-10z"
          fill="currentColor"
        />
      </svg>
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
