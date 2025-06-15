import React, { useState } from 'react';
import styles from './ReviewForm.module.scss';

export const ReviewForm: React.FC = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);

  return (
    <div className={styles.formWrapper}>
      <div className={styles.photo} />
      <label className={styles.label}>
        Your name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={styles.nameInput}
        />
      </label>

      <label className={styles.label}>
        Reviews
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Reviews"
          className={styles.textInput}
        />
      </label>

      <div className={styles.bottomRow}>
        <p>Your Ratings:</p>
        <ul className={styles.stars}>
          {Array.from({ length: 5 }).map((_, i) => (
            <li
              key={i}
              onClick={() => setRating(i + 1)}
              className={styles.star}
            >
              <svg width="25" height="25">
                <use href="./icons/main/star.svg" />
              </svg>
            </li>
          ))}
        </ul>

        <button className={styles.submitBtn}>Post Review</button>
      </div>
    </div>
  );
};
