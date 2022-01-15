import Image from 'next/image';
import styles from './gallery.module.scss';

export default function Gallery() {
  const gallery = [
    'https://placekitten.com/450/300',
    'https://placekitten.com/450/300',
    'https://placekitten.com/450/300',
    'https://placekitten.com/450/300',
    'https://placekitten.com/450/300',
    'https://placekitten.com/450/300',
  ];

  return (
    <section>
      <div className={styles.galleryHeadingContainer}>
        <h1 className={styles.galleryHeading}>Selected Work</h1>
      </div>
      <div className={styles.galleryContainer}>
        <div className={styles.galleryZoomIn}></div>
        <div className={styles.galleryZoomOut}></div>
        <div className={styles.galleryImageContainer}>
          {gallery.map((image, i) => (
            <div className={styles.galleryImage} key={i}>
              <Image src={image} alt="hey" width="450" height="300" />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.gallerySlider}>
        <input className={styles.galleryRange} type="range" min="0" max="0" />
      </div>
    </section>
  );
}
