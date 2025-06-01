import { useState } from 'react';
import styles from './genderTabs.module.scss';

const genders = ['(All)', 'Men', 'Women', 'KID'];

const GenderTabs = () => {
  const [activeGender, setActiveGender] = useState<string>('(All)');

  return (
    <ul className={styles.collections_2324__gender}>
      {genders.map((gender) => (
        <li key={gender}>
          <button
            className={`${styles.collections_2324__gender__text} ${activeGender === gender ? styles.active : ''}`}
            onClick={() => setActiveGender(gender)}
          >
            {gender}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default GenderTabs;
