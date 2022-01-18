import { className } from 'utils';
import { GridIcon, GalleryIcon } from 'svgs';
import styles from './header.module.scss';

export default function Header({ theme, view, setView }) {
  return (
    <header {...className(styles.header, theme === 'dark' && styles['header--dark'])}>
      <div className={styles.logo}>
        <p>🐝🧊</p>
        <h1 className="visually-hidden">Logo</h1>
      </div>
      <ul className={styles.list}>
        <li {...className(styles.listItem, view === 'GALLERY' && styles.listActive)}>
          <button onClick={() => setView('GALLERY')}>
            <span>Gallery</span>
            <GalleryIcon />
          </button>
        </li>
        <li {...className(styles.listItem, view === 'LIST' && styles.listActive)}>
          <button onClick={() => setView('LIST')}>
            <span>List</span>
            <GridIcon />
          </button>
        </li>
      </ul>
    </header>
  );
}
