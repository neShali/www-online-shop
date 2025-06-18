import React, { useState } from 'react';
import styles from './ReviewForm.module.scss';
import { Rating } from '../rating';
import { Input } from '../input';
import { CardButton } from '../buttons';

interface ReviewFormProps {
  onSubmit: (text: string, rating: number) => void;
  error?: string;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, error }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);

  return (
    <div className={styles.formWrapper}>
      <label className={styles.label}>
        Your name:
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        ></Input>
      </label>

      <label className={styles.label}>
        Review:
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Review"
          className={styles.textInput}
        />
      </label>

      <div className={styles.bottomRow}>
        <p>Your Rating:</p>
        <Rating value={rating} onChange={setRating} />
        <div className={styles.buttonWrapper}></div>
        <CardButton
          size="small"
          text={'Post review'}
          onClick={() => onSubmit(text, rating)}
          disabled={!!error}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
