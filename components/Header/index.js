import { className } from 'utils';

import styles from './header.module.scss';

export default function Header({ theme }) {
  return (
    <header {...className(styles.header, theme === 'dark' && styles['header--dark'])}>
      <div>
        <h1 className="visually-hidden">Logo</h1>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>Hey</li>
        </ul>
      </nav>
    </header>
  );
}
