/* eslint-disable react/jsx-no-comment-textnodes */
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
      <div className={styles.beeWrapper}>
        <div className={styles.logo}>
          <button onClick={toggleView}>
            <p>
              🐝 <span className="visually-hidden">toggle between gallery and list view</span>
            </p>
          </button>
        </div>
        <p className={styles.aboutText}>
          <span className={styles.aboutLine}>✧°˖ welcome to my site ˖°✧ i&apos;m bea</span>
          <span className={styles.aboutLine}>// currently engineering @ Threadable</span>
          <span className={styles.aboutLine}>// based in the Hudson Valley, NY</span>
          <span className={styles.aboutLine}>// send a note: to@bea.cool</span>
        </p>
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
