import React from 'react';
import styles from './reviewItem.module.scss';
import { Rating } from '../rating';

type Props = {
  avatarUrl?: string;
  name: number;
  comment?: string | null;
  time: string;
  rating?: number | null;
};

export const ReviewItem: React.FC<Props> = ({
  avatarUrl,
  name,
  comment,
  time,
  rating,
}) => {
  return (
    <div className={styles.review}>
      <div className={styles.topBlock}>
        <div
          className={styles.photo}
          style={{ backgroundImage: `url(${avatarUrl || ''})` }}
        />
        <div>
          <p className={styles.name}>
            {
              ['Mike Johnson', 'Vasya Pupkin', 'John Doe', 'Kris', 'You'][
                name - 1
              ]
            }
          </p>
          <p className={styles.comment}>{comment}</p>
        </div>
        <div className={styles.ratingWrapper}>
          {rating && <Rating value={rating} />}
        </div>
      </div>
      <span className={styles.time}>{new Date(time).toLocaleString()}</span>
    </div>
  );
};
