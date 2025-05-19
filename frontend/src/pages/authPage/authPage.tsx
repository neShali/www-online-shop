import React, {
  useState,
  type ChangeEvent,
  type FormEvent,
  useEffect,
} from 'react';
import { Input } from '../../shared/components/input/input';
import styles from './AuthPage.module.scss';
import { useNavigate, useLocation } from 'react-router';
import { useLogin } from '../../shared/api/hooks/authenticationHooks';
import { useRegisterUser } from '../../shared/api/hooks/authenticationHooks';
import type { HTTPValidationError } from '../../shared/api';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    api?: string;
  }>({});

  const { mutate: login, isPending } = useLogin({
    mutation: {
      onSuccess() {
        navigate('/dashboard');
      },
      onError(error) {
        setErrors((prev) => ({
          ...prev,
          api: error.message || 'Login failed',
        }));
      },
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      newErrors.email = 'Invalid email';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    login({ data: { username: email, password } });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      {errors.email && <div className={styles.error}>{errors.email}</div>}

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      {errors.password && <div className={styles.error}>{errors.password}</div>}

      {errors.api && <div className={styles.error}>{errors.api}</div>}

      <button type="submit" className={styles.button} disabled={isPending}>
        {isPending ? 'Signing In…' : 'Sign In'}
      </button>
    </form>
  );
};

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    firstName?: string;
    username?: string;
    email?: string;
    password?: string;
    api?: string;
  }>({});

  const { mutate: register, isPending } = useRegisterUser({
    mutation: {
      onSuccess() {
        navigate('/login');
      },
      onError(error) {
        // Попробуем достать detail[0].msg
        const data = error.response?.data as HTTPValidationError;

        const msg = data?.detail?.[0]?.msg ?? 'Registration failed'; // fallback

        setErrors((prev) => ({ ...prev, api: msg }));
      },
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!username) newErrors.username = 'User name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      newErrors.email = 'Invalid email';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    register({
      data: { username, email, password },
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <Input
          placeholder="User Name"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          className={styles.half}
        />
        {errors.username && (
          <div className={styles.error}>{errors.username}</div>
        )}
      </div>

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      {errors.email && <div className={styles.error}>{errors.email}</div>}

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      {errors.password && <div className={styles.error}>{errors.password}</div>}

      {errors.api && <div className={styles.error}>{errors.api}</div>}

      <button type="submit" className={styles.button} disabled={isPending}>
        {isPending ? 'Signing Up…' : 'Sign Up'}
      </button>
    </form>
  );
};

export const AuthPage: React.FC = () => {
  const route = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(
    route.pathname.includes('register') ? 'register' : 'login'
  );

  useEffect(() => {
    setActiveTab(route.pathname.includes('register') ? 'register' : 'login');
  }, [route.pathname]);

  return (
    <div className={styles.container}>
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
    </div>
  );
};
