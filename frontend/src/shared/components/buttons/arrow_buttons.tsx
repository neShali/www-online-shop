import styles from './arrow_buttons.module.scss';
type ArrowButtonProps = {
  direction: 'left' | 'right';
};

const ArrowButton = ({ direction }: ArrowButtonProps) => {
  const className =
    direction === 'left'
      ? styles.collection__arrow__left
      : styles.collection__arrow__right;

  const iconId =
    direction === 'left'
      ? 'icon-short_arrow_left'
      : 'icon-short_arrow_right_skim';

  return (
    <button className={className} type="button">
      <svg width="12" height="13">
        <use xlinkHref={`symbol-defs.svg#${iconId}`} />
      </svg>
    </button>
  );
};

export default ArrowButton;