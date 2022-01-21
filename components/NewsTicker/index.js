/* eslint-disable react/jsx-no-comment-textnodes */
import styles from './newsTicker.module.scss';

// creds to https://codepen.io/lewismcarey/pen/GJZVoG
export default function NewsTicker() {
  return (
    <section className={styles.tickerWrap}>
      <div className={styles.ticker}>
        <p className={styles.text}>
          <span>~welcome to my site~ i&apos;m bea</span>
          <span>// currently engineering @ Upstatement</span>
          <span>// send a note: to@bea.cool</span>
        </p>
      </div>
    </section>
  );
}
