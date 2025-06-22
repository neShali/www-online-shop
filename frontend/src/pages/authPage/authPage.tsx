import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { LoginForm } from './components/loginForm';
import { RegisterForm } from './components/registerForm';

import styles from './authPage.module.scss';
import { CardButton } from '../../shared/components/buttons';
import { useAuth } from '../../providers/authProvider';
import { queryClient } from '../../queryClient';
import { cartHooks } from '../../shared/api';

export const AuthPage: React.FC = () => {
  const route = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(
    route.pathname.includes('register') ? 'register' : 'login'
  );

  useEffect(() => {
    setActiveTab(route.pathname.includes('register') ? 'register' : 'login');
  }, [route.pathname]);

  const logOutHandle = () => {
    logout();
    queryClient.removeQueries({ queryKey: cartHooks.getMyCartQueryKey() });
    navigate('/');
  };

  return (
    <div className={styles.container}>
      {isLoggedIn && <CardButton text="Log out" onClick={logOutHandle} />}
      {!isLoggedIn && (
        <>
          <nav className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'login' ? styles.active : ''}`}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'register' ? styles.active : ''}`}
              onClick={() => navigate('/register')}
            >
              Registration
            </button>
          </nav>

          <div className={styles.content}>
            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>
        </>
      )}
    </div>
  );
};
