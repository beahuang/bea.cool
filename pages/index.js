import { Gallery } from 'components';
import styles from './home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Gallery />
      </main>
    </div>
  );
}
