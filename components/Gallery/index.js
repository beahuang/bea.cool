/* eslint-disable react-hooks/exhaustive-deps */

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

  const zMax = useRef(0);
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
  const [zoomIn, setZoomIn] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);

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

    setImageAttrObjs(
      gallery.map((item, index) => {
        // TODO: this should be item height, width
        const posObj = calculatePosition(index, 300, 450);

        return {
          translateZ: (index / totalImages) * (zMax.current * -1),
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

  const handleMouseDown = (zoomDirection = 'IN') => {
    if (zoomDirection === 'IN') {
      setZoomIn(true);
    } else {
      setZoomOut(true);
    }
  };

  const handleMouseUp = (zoomDirection = 'IN') => {
    if (zoomDirection === 'IN') {
      setZoomIn(false);
    } else {
      setZoomOut(false);
    }
  };

  const zoom = direction => {
    setImageAttrObjs(
      imageAttrObjs.map((imgObj, i) => {
        const movementInterval = (1 / gallery.length) * 1000,
          opacityInterval = movementInterval / (1000 * 10);

        let newTranslateZ, newOpacityInterval;

        if (direction === 'plus') {
          newTranslateZ = imgObj.translateZ + movementInterval;
          newOpacityInterval = imgObj.opacity + opacityInterval;
        } else if (direction === 'minus') {
          newTranslateZ = imgObj.translateZ - movementInterval;
          newOpacityInterval = imgObj.opacity - opacityInterval;
        }

        return {
          translateZ: newTranslateZ,
          opacity: newOpacityInterval,
          top: imgObj.top,
          left: imgObj.left,
        };
      }),
    );
  };

  useEffect(() => {
    if (zoomIn) {
      zoom('plus');
    } else if (zoomOut) {
      zoom('minus');
    }
  }, [zoomIn, zoomOut]);

  useEffect(() => {
    zMax.current = width * 10 > 10000 ? 10000 : width * 10;
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
        <button
          className={styles.zoomIn}
          onMouseUp={() => handleMouseUp('IN')}
          onMouseDown={() => handleMouseDown('IN')}
        ></button>
        <button
          className={styles.zoomOut}
          onMouseUp={() => handleMouseUp('OUT')}
          onMouseDown={() => handleMouseDown('OUT')}
        ></button>
        <div className={styles.imageContainer}>
          {imageAttrObjs.map((image, i) => (
            <Tween
              to={{
                transform: `translate3d(${image.left}px, ${image.top}px, ${image.translateZ}px)`,
                opacity: image.opacity,
                zIndex: image.zIndex,
                position: 'relative',
              }}
              key={i}
            >
              <div>
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
            </Tween>
          ))}
        </div>
      </div>

      <div className={styles.slider}>
        <input
          ref={sliderRef}
          className={styles.range}
          type="range"
          min="0"
          max={((gallery.length - 1) / gallery.length) * zMax.current}
        />
      </div>
    </section>
  );
}
