import styles from './cardButtons.module.scss';

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
  const className =
    size === 'small' ? styles.main_card__btn__small : styles.main_card__btn;

  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
};
