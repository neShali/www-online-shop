import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { Input } from '../../../shared/components/input';
import { authHooks } from '../../../shared/api';

import styles from './form.module.scss';
import { saveToken } from '../../../shared/api/auth';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    api?: string;
  }>({});

  const {
    data,
    mutate: login,
    isPending,
  } = authHooks.useLogin({
    mutation: {
      onSuccess() {
        if (data?.access_token) saveToken(data.access_token);
        navigate('/');
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
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    login({ data: { username, password } });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Input
        type="username"
        placeholder="username"
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />
      {errors.username && <div className={styles.error}>{errors.username}</div>}

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
