import { useState, useEffect, useRef } from 'react';
import { useWindowDimensions } from 'hooks';
import Image from 'next/image';
import styles from './gallery.module.scss';

const getRandomInt = (min, max) => {
  return Math.random() * (max - min) + min;
};

export default function Gallery() {
  const { width } = useWindowDimensions();
  const sliderRef = useRef();
  const galleryRef = useRef();

  const [zMax, setZMax] = useState(0);
  const [zStart, setZStart] = useState(0);
  const [zEnd, setZEnd] = useState(0);
  const [imageAttrObjs, setImageAttrObjs] = useState([]);

  const gallery = [
    'https://placekitten.com/450/300',
    'https://placekitten.com/450/300',
    'https://placekitten.com/450/300',
    'https://placekitten.com/450/300',
    'https://placekitten.com/450/300',
    'https://placekitten.com/450/300',
  ];

  const setUpGallery = () => {
    const totalImages = gallery.length;

    setZMax(width * 10 > 10000 ? 10000 : width * 10);
    setImageAttrObjs(
      gallery.map((item, index) => {
        // TODO: this should be item height, width
        const posObj = calculatePosition(index, 300, 450);

        return {
          translateZ: (index / totalImages) * (zMax * -1),
          opacity: 1 - index / totalImages,
          zIndex: totalImages + 1 - index,
          top: posObj.top,
          left: posObj.left,
        };
      }),
    );
  };

  const calculatePosition = (index, height, width) => {
    const quadrant = index % 4;
    const { height: galleryHeight, width: galleryWidth } =
      galleryRef.current.getBoundingClientRect();

    const bottomBound = galleryHeight - height,
      rightBound = galleryWidth - width,
      randomTop = 0,
      randomLeft = 0;

    switch (quadrant) {
      case 0:
        randomTop = getRandomInt(0, bottomBound / 2);
        randomLeft = getRandomInt(0, rightBound / 2);
        break;
      case 1:
        randomTop = getRandomInt(0, bottomBound / 2);
        randomLeft = getRandomInt(rightBound / 2, rightBound);
        break;
      case 2:
        randomTop = getRandomInt(bottomBound / 2, bottomBound);
        randomLeft = getRandomInt(rightBound / 2, rightBound);
        break;
      case 3:
        randomTop = getRandomInt(bottomBound / 2, bottomBound);
        randomLeft = getRandomInt(0, rightBound / 2);
        break;
    }

    return {
      top: randomTop,
      left: randomLeft,
    };
  };

  useEffect(() => {
    setUpGallery();
  }, []);

  useEffect(() => {
    if (!imageAttrObjs.length) {
      return;
    }

    setZStart(imageAttrObjs[imageAttrObjs.length - 1].translateZ);
    setZEnd(imageAttrObjs[imageAttrObjs.length - 1].translateZ);
  }, [imageAttrObjs]);

  return (
    <section className={styles.gallery}>
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>Selected Work</h1>
      </div>
      <div className={styles.galleryContainer} ref={galleryRef}>
        <div className={styles.zoomIn}></div>
        <div className={styles.zoomOut}></div>
        <div className={styles.imageContainer}>
          {imageAttrObjs.map(
            (image, i) =>
              console.log(image) || (
                <div
                  className={styles.galleryImage}
                  key={i}
                  style={{
                    transform: `translate3d(${image.left}px, ${image.top}px, ${image.translateZ}px)`,
                    opacity: image.opacity,
                    zIndex: image.zIndex,
                  }}
                >
                  <Image src={gallery[i]} alt="hey" width="450" height="300" />
                </div>
              ),
          )}
        </div>
      </div>

      <div className={styles.slider}>
        <input
          ref={sliderRef}
          className={styles.range}
          type="range"
          min="0"
          max={((gallery.length - 1) / gallery.length) * zMax}
        />
      </div>
    </section>
  );
}
