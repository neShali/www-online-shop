import styles from './cardButton.module.scss';

type CardButtonProps = {
  text?: string;
  size?: 'default' | 'small';
  onClick?: () => void;
  disabled?: boolean;
};

export const CardButton = ({
  text = 'ADD',
  size = 'default',
  onClick,
  disabled,
}: CardButtonProps) => {
  const className = size === 'small' ? styles.btn__small : styles.btn;

  return (
    <button
      disabled={disabled}
      className={`${className} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
};
