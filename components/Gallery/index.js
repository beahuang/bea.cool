import { useState, useEffect, useRef } from 'react';
import { useWindowDimensions } from 'hooks';
import { Tween } from 'react-gsap';
import Image from 'next/image';

import styles from './gallery.module.scss';

const getRandomInt = (min, max) => {
  return Math.random() * (max - min) + min;
};

export default function Gallery() {
  const { height, width } = useWindowDimensions();
  const sliderRef = useRef();
  const titleRef = useRef();
  const galleryRef = useRef();

  const [zMax, setZMax] = useState(0);
  const [zStart, setZStart] = useState(0);
  const [zEnd, setZEnd] = useState(0);
  const [imageAttrObjs, setImageAttrObjs] = useState([]);
  const [titleTilt, setTitleTilt] = useState({
    tiltX: 0,
    tiltY: 0,
    degree: 0,
  });
  const [imageTilt, setImageTilt] = useState({
    tiltX: 0,
    tiltY: 0,
  });

  const gallery = [
    'https://placekitten.com/450/300',
    'https://placekitten.com/450/300',
    'https://placekitten.com/450/300',
    'https://placekitten.com/450/300',
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

  const handleMouseMove = e => {
    handleImageTilt(e);
    handleTitleTilt(e);
  };

  const handleImageTilt = e => {
    const TILT_POWER = 30;

    const cx = Math.ceil(width / 2),
      cy = Math.ceil(height / 2),
      tiltX = (e.clientX - cx) / (width / TILT_POWER),
      tiltY = (e.clientY - cy) / (width / TILT_POWER);

    setImageTilt({
      tiltX,
      tiltY,
    });
  };

  const handleTitleTilt = e => {
    const TILT_POWER = 30;

    const cx = Math.ceil(width / 2),
      cy = Math.ceil(height / 2),
      dx = e.pageX - cx,
      dy = e.pageY - cy,
      tiltX = dy / cy,
      tiltY = -(dx / cx),
      radius = Math.sqrt(Math.pow(tiltX, 2) + Math.pow(tiltY, 2)),
      degree = radius * TILT_POWER;

    setTitleTilt({
      tiltX,
      tiltY,
      degree,
    });
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
    <section className={styles.gallery} onMouseMove={handleMouseMove}>
      <div className={styles.headingContainer} ref={titleRef}>
        <Tween
          to={{
            transform: `rotate3d(${titleTilt.tiltX}, ${titleTilt.tiltY}, 0, ${titleTilt.degree}deg)`,
          }}
        >
          <h1 className={styles.heading}>Selected Work</h1>
        </Tween>
      </div>
      <div className={styles.galleryContainer} ref={galleryRef}>
        <div className={styles.zoomIn}></div>
        <div className={styles.zoomOut}></div>
        <div className={styles.imageContainer}>
          {imageAttrObjs.map((image, i) => (
            <div
              style={{
                transform: `translate3d(${image.left}px, ${image.top}px, ${image.translateZ}px)`,
                opacity: image.opacity,
                zIndex: image.zIndex,
                position: 'relative',
              }}
              key={i}
            >
              <Tween
                to={{
                  x: imageTilt.tiltX * (i + 1),
                  y: imageTilt.tiltY * (i + 1),
                }}
              >
                <div className={styles.galleryImage}>
                  <Image src={gallery[i]} alt="hey" width="450" height="300" />
                </div>
              </Tween>
            </div>
          ))}
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
