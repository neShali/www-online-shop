import styles from './icon.module.scss';

type IconName =
  | 'stars'
  | 'minus'
  | 'burger'
  | 'bag'
  | 'short_arrow_right_skim'
  | 'short_arrow_down'
  | 'plus'
  | 'short_arrow_right'
  | 'short_arrow_left'
  | 'arrow'
  | 'lupa'
  | 'user'
  | 'heart'
  | 'logo';

type IconProps = {
  name: IconName;
  className?: string;
};

export const Icon = ({ name, className }: IconProps) => {
  return (
    <svg className={`${styles.icon} ${className}`} width="7">
      <use href={`symbol-defs.svg#icon-${name}`}></use>
    </svg>
  );
};
