import { useEffect, useState } from 'react';
import { className } from 'utils';

import styles from './grid.module.scss';
const GRID_KEYCODE = '0';

export default function Grid() {
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', toggleGrid);

    return () => {
      document.removeEventListener('keydown', toggleGrid);
    };
  });

  function toggleGrid(e) {
    if (e.key === GRID_KEYCODE) {
      setShowGrid(!showGrid);
    }
  }

  return (
    <div {...className(styles.grid, showGrid && styles['show-grid'])}>
      <div className={styles.column}>
        <span className={styles.inner}></span>
      </div>
      <div className={styles.column}>
        <span className={styles.inner}></span>
      </div>
      <div className={styles.column}>
        <span className={styles.inner}></span>
      </div>
      <div className={styles.column}>
        <span className={styles.inner}></span>
      </div>
      <div className={styles.column}>
        <span className={styles.inner}></span>
      </div>
      <div className={styles.column}>
        <span className={styles.inner}></span>
      </div>
      <div className={styles.column}>
        <span className={styles.inner}></span>
      </div>
      <div className={styles.column}>
        <span className={styles.inner}></span>
      </div>
      <div className={styles.column}>
        <span className={styles.inner}></span>
      </div>
      <div className={styles.column}>
        <span className={styles.inner}></span>
      </div>
      <div className={styles.column}>
        <span className={styles.inner}></span>
      </div>
      <div className={styles.column}>
        <span className={styles.inner}></span>
      </div>
    </div>
  );
}
