import styles from './plus_buttons.module.scss';

const PlusButton = () => {
  return (
    <button className={styles.shop__catalog__btn}>
      <svg width="12" height="12">
      <use xlinkHref="symbol-defs.svg#icon-plus" /> 
      </svg>
    </button>
  );
};

export default PlusButton;
