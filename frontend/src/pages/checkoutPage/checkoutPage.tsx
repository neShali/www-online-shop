import { useNavigate } from 'react-router';
import styles from './checkoutPage.module.scss';
import { CardButton } from '../../shared/components/buttons';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Thank you for your order!</h2>
        <p className={styles.text}>
          Our operator will contact you soon to confirm the details.
        </p>
        <CardButton
          onClick={() => navigate('/')}
          size="small"
          text="Back to Home"
        ></CardButton>
      </div>
    </div>
  );
};
