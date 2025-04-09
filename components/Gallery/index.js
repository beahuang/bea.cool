/* eslint-disable @next/next/no-img-element, react-hooks/exhaustive-deps */

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Tween } from 'react-gsap';

import { ItemDescription, PerspectiveGrid } from 'components';
import { useArrayRef, useWindowDimensions } from 'hooks';
import { getRandomInt } from 'utils';
import blurImage from 'public/img/blur.png';
import styles from './gallery.module.scss';

export default function Gallery({ items }) {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const sliderRef = useRef();
  const galleryRef = useRef();
  const requestRef = useRef();
  const zoomDirection = useRef();
  const imageAttrObjs = useRef([]);
  const zMax = useRef(0);
  const zStart = useRef(0);
  const zCurr = useRef(0);
  const [imageRefs, setImageRefs] = useArrayRef();

  const [isLoading, setIsLoading] = useState(true);
  const [currentGalleryImage, setCurrentGalleryImage] = useState();
  const [titleTilt, setTitleTilt] = useState({
    tiltX: 0,
    tiltY: 0,
    degree: 0,
  });
  const [imageTilt, setImageTilt] = useState({
    tiltX: 0,
    tiltY: 0,
  });
  const [sliderVal, setSliderVal] = useState(0);
  const [headerOpacity, setHeaderOpacity] = useState(1);

  const setUpGallery = () => {
    const totalImages = items.length;

    imageAttrObjs.current = items.map((_item, index) => {
      const image = imageRefs.current[index];
      const posObj = calculatePosition(index, image);

      return {
        translateZ: (index / totalImages) * (zMax.current * -1),
        opacity: 1 - index / totalImages,
        zIndex: totalImages + 1 - index,
        top: posObj.top,
        left: posObj.left,
        item: items[index],
      };
    });

    zStart.current = imageAttrObjs.current[totalImages - 1].translateZ;
    zCurr.current = imageAttrObjs.current[totalImages - 1].translateZ;

    setSliderVal(0);
    setIsLoading(false);
  };

  const handleResize = () => {
    setUpGallery();
  };

  const calculatePosition = (index, image) => {
    if (windowWidth < 768) {
      return calculatePositionMobile(image);
    } else {
      return calculatePositionDesktop(index, image);
    }
  };

  const calculatePositionMobile = image => {
    const { height: imageHeight, width: imageWidth } = image.getBoundingClientRect();
    const { height: galleryHeight, width: galleryWidth } =
      galleryRef.current.getBoundingClientRect();

    const bottomBound = galleryHeight - imageHeight,
      rightBound = galleryWidth - imageWidth;

    const YOFFSET = 300;
    const randomTop = getRandomInt(YOFFSET, bottomBound / 2);

    return {
      top: randomTop,
      left: rightBound / 2,
    };
  };

  const calculatePositionDesktop = (index, image) => {
    const randomStart = Math.floor(getRandomInt(0, 2));
    const quadrant = (randomStart + index) % 4;
    const { height: imageHeight, width: imageWidth } = image.getBoundingClientRect();
    const { height: galleryHeight, width: galleryWidth } =
      galleryRef.current.getBoundingClientRect();

    const bottomBound = galleryHeight - imageHeight,
      rightBound = galleryWidth - imageWidth;

    let randomTop = 0,
      randomLeft = 0;

    const yOffset = 0.2 * windowHeight;
    const XOffset = 0.2 * windowWidth;

    switch (quadrant) {
      // top left
      case 0:
        randomTop = getRandomInt(yOffset, bottomBound / 2);
        randomLeft = getRandomInt(XOffset, rightBound / 2);
        break;
      // top right
      case 1:
        randomTop = getRandomInt(yOffset, bottomBound / 2);
        randomLeft = getRandomInt(rightBound / 2, rightBound - XOffset);
        break;
      // bottom left
      case 2:
        randomTop = getRandomInt(bottomBound / 2, bottomBound / 2 + yOffset);
        randomLeft = getRandomInt(XOffset, rightBound / 2);
        break;
      // bottom right
      case 3:
        randomTop = getRandomInt(bottomBound / 2, bottomBound / 2 + yOffset);
        randomLeft = getRandomInt(rightBound / 2, rightBound - XOffset);
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

    const cx = Math.ceil(windowWidth / 2),
      cy = Math.ceil(windowHeight / 2),
      tiltX = (e.clientX - cx) / (windowWidth / TILT_POWER),
      tiltY = (e.clientY - cy) / (windowWidth / TILT_POWER);

    setImageTilt({
      tiltX,
      tiltY,
    });
  };

  const handleTitleTilt = e => {
    const TILT_POWER = 30;

    const cx = Math.ceil(windowWidth / 2),
      cy = Math.ceil(windowHeight / 2),
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

  const handleMouseDown = (direction = 'IN') => {
    zoomDirection.current = direction;
  };

  const clearZoomDirection = () => {
    zoomDirection.current = '';
  };

  const animate = () => {
    window.requestAnimationFrame(animate);
    const zoomDistance = zStart.current - zCurr.current;
    const percentage = Math.abs(zoomDistance) / zMax.current;

    if (zoomDirection.current === 'IN') {
      if (percentage >= 0 && percentage < 0.95) {
        zoom('plus');
      } else {
        window.cancelAnimationFrame(animate);
      }
    } else if (zoomDirection.current === 'OUT') {
      if (0 < percentage && percentage <= 0.95 && zoomDistance <= 0) {
        zoom('minus');
      } else {
        window.cancelAnimationFrame(animate);
      }
    }

    if (percentage > 0.01) {
      setHeaderOpacity(0);
    } else {
      setHeaderOpacity(1);
    }
  };

  const zoom = direction => {
    const imageLength = imageAttrObjs.current.length;
    if (!imageLength) {
      return;
    }
    const zoomDistance = zStart.current - zCurr.current;
    const percentage = Math.abs(zoomDistance) / zMax.current;

    imageAttrObjs.current = imageAttrObjs.current.map((imgObj, index) => {
      const movementInterval = (1 / items.length) * 1000;
      const initialOpacity = 1 - index / items.length;
      const newOpacity = initialOpacity + percentage;
      let newTranslateZ;

      if (direction === 'plus') {
        newTranslateZ = imgObj.translateZ + movementInterval;
      } else if (direction === 'minus') {
        newTranslateZ = imgObj.translateZ - movementInterval;
      }

      return {
        translateZ: newTranslateZ,
        opacity: newOpacity,
        top: imgObj.top,
        left: imgObj.left,
        item: items[index],
      };
    });

    setSliderVal(imageAttrObjs.current[0].translateZ);
    setCurrentGalleryImage(getGalleryImageInView());
    zCurr.current = imageAttrObjs.current[imageLength - 1].translateZ;
  };

  const sliderZoom = evt => {
    const sliderVal = parseInt(evt.target.value);
    setSliderVal(sliderVal);

    const imageLength = imageAttrObjs.current.length;
    if (!imageLength) {
      return;
    }

    imageAttrObjs.current = imageAttrObjs.current.map((imgObj, index) => {
      const initialImgPos = (index / items.length) * (zMax.current * -1);
      const newTranslateZ = initialImgPos + sliderVal;

      const initialOpacity = 1 - index / items.length;
      const newOpacity = initialOpacity + (1 * sliderVal) / zMax.current;

      return {
        translateZ: newTranslateZ,
        opacity: newOpacity,
        top: imgObj.top,
        left: imgObj.left,
        item: items[index],
      };
    });

    setCurrentGalleryImage(getGalleryImageInView());
    zCurr.current = imageAttrObjs.current[imageLength - 1].translateZ;
  };

  const getGalleryImageInView = () => {
    const progressPercentage =
      zCurr.current === 0 ? 0 : Math.abs(zStart.current - zCurr.current) / zMax.current;
    const currentIndex =
      progressPercentage > 0.86 ? items.length - 1 : Math.floor(progressPercentage / 0.1);

    const currentInView = imageAttrObjs.current[currentIndex];

    return currentInView;
  };

  useEffect(() => {
    zMax.current = windowWidth * 10 > 10000 ? 20000 : windowWidth * 10;
    setUpGallery();
    requestRef.current = requestAnimationFrame(animate);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [items]);

  const onWheel = e => {
    const zoomDistance = zStart.current - zCurr.current;
    const percentage = Math.abs(zoomDistance) / zMax.current;

    if (e.deltaY > 0) {
      if (percentage >= 0 && percentage < 0.95) {
        zoom('plus');
      }
    } else if (e.deltaY < 0) {
      if (0 < percentage && percentage <= 0.95 && zoomDistance <= 0) {
        zoom('minus');
      }
    }

    if (percentage > 0.01) {
      setHeaderOpacity(0);
    } else {
      setHeaderOpacity(1);
    }
  };

  return (
    <>
      {isLoading && (
        <section>
          <h1 className="visually-hidden">loading...</h1>
        </section>
      )}
      <section className={styles.gallery} onMouseMove={handleMouseMove} onWheelCapture={onWheel}>
        <div className={styles.galleryContainer} ref={galleryRef}>
          <div className={styles.imageContainer}>
            {items.map((item, i) => {
              const transObj = imageAttrObjs.current[i] ?? {
                translateZ: 0,
                opacity: 0,
                top: 'inherit',
                left: 'inherit',
              };

              return (
                <Tween
                  to={{
                    transform: `translate3d(${transObj.left}px, ${transObj.top}px, ${transObj.translateZ}px)`,
                    opacity: transObj.opacity,
                    zIndex: transObj.zIndex,
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
                      <div className={styles.galleryImage} ref={setImageRefs(i)}>
                        <Image
                          src={item.image.src}
                          width={item.image.width}
                          height={item.image.height}
                          alt={item.altText}
                          priority={i < 4}
                          placeholder="blur"
                          blurDataURL={blurImage.src}
                        />
                      </div>
                    </Tween>
                  </div>
                </Tween>
              );
            })}
            <PerspectiveGrid />
          </div>
          <button
            className={styles.zoomIn}
            onMouseUp={clearZoomDirection}
            onMouseDown={() => handleMouseDown('IN')}
            tabIndex={-1}
          ></button>
          <button
            className={styles.zoomOut}
            onMouseUp={clearZoomDirection}
            onMouseDown={() => handleMouseDown('OUT')}
            tabIndex={-1}
          ></button>
        </div>

        <Tween
          to={{
            opacity: headerOpacity,
          }}
        >
          <div className={styles.headingContainer}>
            <Tween
              to={{
                transform: `rotate3d(${titleTilt.tiltX}, ${titleTilt.tiltY}, 0, ${titleTilt.degree}deg)`,
              }}
            >
              <h1 className={styles.heading}>Selected Projects</h1>
            </Tween>
          </div>
        </Tween>

        {currentGalleryImage && <ItemDescription item={currentGalleryImage.item} />}

        <div className={styles.slider}>
          <div className={styles.sliderWrapper}>
            <input
              ref={sliderRef}
              className={styles.range}
              type="range"
              min="0"
              value={sliderVal}
              max={((items.length - 1) / items.length) * zMax.current}
              onChange={sliderZoom}
            />
            <div className={styles.sliderTicks}>
              {items.map((_item, i) => (
                <span className={styles.tick} key={i}>
                  &mdash;
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
