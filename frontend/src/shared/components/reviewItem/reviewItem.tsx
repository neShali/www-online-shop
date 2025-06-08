import React from 'react';
import styles from './ReviewItem.module.scss';

type Props = {
  avatarUrl?: string;
  name: string;
  comment?: string | null;
  time: string;
  rating?: number | null;
  onLike?: () => void;
};

export const ReviewItem: React.FC<Props> = ({
  avatarUrl,
  name,
  comment,
  time,
  rating,
  onLike,
}) => (
  <div className={styles.review}>
    <div
      className={styles.photo}
      style={{ backgroundImage: `url(${avatarUrl || ''})` }}
    />
    <p className={styles.name}>{name}</p>
    <p className={styles.comment}>{comment}</p>
    <div className={styles.actions}>
      <button className={styles.likeBtn} onClick={onLike}>
        Like
      </button>
      <span className={styles.time}>{time}</span>
    </div>
    <ul className={styles.stars}>
      {Array.from({ length: rating ?? 0 }).map((_, i) => (
        <li key={i} className={styles.star}>
          <svg width="25" height="25">
            <use href="./icons/main/star.svg" />
          </svg>
        </li>
      ))}
    </ul>
  </div>
);
