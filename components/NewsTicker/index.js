import styles from './newsTicker.module.scss';

// creds to https://codepen.io/lewismcarey/pen/GJZVoG
export default function NewsTicker() {
  return (
    <section className={styles.tickerWrap}>
      <div className={styles.ticker}>
        <p className={styles.text}>
          welcome to my site~~ i&apos;m bea, currently engineering @ Upstatement
        </p>
      </div>
    </section>
  );
}
