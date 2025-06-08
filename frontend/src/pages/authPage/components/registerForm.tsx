import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { authHooks, type HTTPValidationError } from '../../../shared/api';
import { Input } from '../../../shared/components/input';

import styles from './form.module.scss';

export const RegisterForm: React.FC = () => {
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

  const { mutate: register, isPending } = authHooks.useRegisterUser({
    mutation: {
      onSuccess() {
        navigate('/login');
      },
      onError(error) {
        const data = error.response?.data as HTTPValidationError;

        const msg = data?.detail?.[0]?.msg ?? 'Registration failed';

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
