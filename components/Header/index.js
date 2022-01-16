import { className } from 'utils';

import styles from './header.module.scss';

export default function Header({ theme }) {
  return (
    <header {...className(styles.header, theme === 'dark' && styles['header--dark'])}>
      <div className={styles.logo}>
        <p>🐝🧊</p>
        <h1 className="visually-hidden">Logo</h1>
      </div>
    </header>
  );
}
