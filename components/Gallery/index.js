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
    <section className={styles.gallery}>
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>Selected Work</h1>
      </div>
      <div className={styles.galleryContainer}>
        <div className={styles.zoomIn}></div>
        <div className={styles.zoomOut}></div>
        <div className={styles.imageContainer}>
          {gallery.map((image, i) => (
            <div className={styles.galleryImage} key={i}>
              <Image src={image} alt="hey" width="450" height="300" />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.slider}>
        <input className={styles.range} type="range" min="0" max="700" />
      </div>
    </section>
  );
}
