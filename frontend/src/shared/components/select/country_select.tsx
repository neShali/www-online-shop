// import { useState } from 'react';
// import styles from './country_select.module.scss';

// const countries = ['Russia', 'Germany', 'France', 'Spain', 'Italy'];

// const CountrySelect = () => {
//   const [selectedCountry, setSelectedCountry] = useState('');

//   return (
//     <div className={styles.checkout__form__country}>
//       <select
//         className={styles.checkout__input}
//         value={selectedCountry}
//         onChange={(e) => setSelectedCountry(e.target.value)}
//       >
//         <option value="" disabled>
//           Country
//         </option>
//         {countries.map((country) => (
//           <option key={country} value={country}>
//             {country}
//           </option>
//         ))}
//       </select>
//       <button className={styles.checkout__form__btn} type="button">
//         <svg width="15" height="16">
//           <use href="./icons/main/symbol-defs.svg#icon-short_arrow_down" />
//         </svg>
//       </button>
//     </div>
//   );
// };

// export default CountrySelect;
