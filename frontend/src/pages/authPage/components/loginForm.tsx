import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { Input } from '../../../shared/components/input';
import { authHooks } from '../../../shared/api';

import styles from './form.module.scss';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    api?: string;
  }>({});

  const { mutate: login, isPending } = authHooks.useLogin({
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
