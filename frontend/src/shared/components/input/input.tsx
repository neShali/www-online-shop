import { forwardRef, type InputHTMLAttributes, type ReactElement } from 'react';
import styles from './Input.module.scss';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type = 'text', placeholder = '', className = '', ...props },
    ref
  ): ReactElement => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`${styles.input} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
