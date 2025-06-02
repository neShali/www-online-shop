import styles from './cardButtons.module.scss';

type CardButtonProps = {
  text?: string;
  link?: string;
  size?: 'default' | 'small';
};

export const CardButton = ({
  text = 'ADD',
  link = '',
  size = 'default',
}: CardButtonProps) => {
  const className =
    size === 'small' ? styles.main_card__btn__small : styles.main_card__btn;

  return (
    <a href={link} className={className}>
      <span>{text}</span>
    </a>
  );
};
