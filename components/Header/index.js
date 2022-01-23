import { className } from 'utils';
import { GridIcon, GalleryIcon } from 'svgs';
import styles from './header.module.scss';

export default function Header({ theme, view, setView }) {
  const toggleView = () => {
    if (view === 'GALLERY') {
      setView('LIST');
    } else {
      setView('GALLERY');
    }
  };

  return (
    <header {...className(styles.header, theme === 'dark' && styles['header--dark'])}>
      <div className={styles.logo}>
        <button onClick={toggleView}>
          <p>
            🐝 <span className="visually-hidden">toggle between gallery and list view</span>
          </p>
        </button>
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
