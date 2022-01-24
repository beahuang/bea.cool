import styles from './perspectiveGrid.module.scss';

// https://codepen.io/Lane/pen/lGJEH
export default function PerspectiveGrid() {
  return (
    <div className={styles.gridWrapper}>
      <div className={styles.grid}>
        <div className={styles.vertical}>
          {Array.from(Array(26)).map((x, i) => {
            return <div className={styles.line} key={i}></div>;
          })}
        </div>
        <div className={styles.horizontal}>
          {Array.from(Array(26)).map((x, i) => {
            return <div className={styles.line} key={i}></div>;
          })}
        </div>
      </div>
    </div>
  );
}
