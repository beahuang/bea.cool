/* eslint-disable @next/next/no-img-element, react-hooks/exhaustive-deps */

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useWindowDimensions } from 'hooks';
import { Tween } from 'react-gsap';
import { getRandomInt } from 'utils';

import { ItemDescription } from 'components';
import styles from './gallery.module.scss';

export default function Gallery({ items }) {
  const { height, width } = useWindowDimensions();
  const sliderRef = useRef();
  const titleRef = useRef();
  const galleryRef = useRef();
  const requestRef = useRef();
  const zoomDirection = useRef();
  const imageAttrObjs = useRef([]);
  const zMax = useRef(0);
  const zStart = useRef(0);
  const zCurr = useRef(0);

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

  const setUpGallery = () => {
    const totalImages = items.length;

    imageAttrObjs.current = items.map((item, index) => {
      // TODO: this should be item height, width
      const posObj = calculatePosition(index, 300, 450);

      return {
        translateZ: (index / totalImages) * (zMax.current * -1),
        opacity: 1 - index / totalImages,
        zIndex: totalImages + 1 - index,
        top: posObj.top,
        left: posObj.left,
        item: items[index],
        imageIndex: index,
      };
    });

    zStart.current = imageAttrObjs.current[totalImages - 1].translateZ;
    setIsLoading(false);
  };

  const handleResize = () => {
    setUpGallery();
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

  const handleMouseDown = (direction = 'IN') => {
    zoomDirection.current = direction;
  };

  const clearZoomDirection = () => {
    zoomDirection.current = '';
  };

  const animate = () => {
    window.requestAnimationFrame(animate);

    if (zoomDirection.current === 'IN') {
      if (zCurr.current <= 0) {
        zoom('plus');
      } else {
        window.cancelAnimationFrame(animate);
      }
    } else if (zoomDirection.current === 'OUT') {
      if (zCurr.current >= zStart.current) {
        zoom('minus');
      } else {
        window.cancelAnimationFrame(animate);
      }
    }
  };

  const zoom = direction => {
    const imageLength = imageAttrObjs.current.length;
    if (!imageLength) {
      return;
    }

    imageAttrObjs.current = imageAttrObjs.current.map((imgObj, index) => {
      const movementInterval = (1 / items.length) * 1000,
        opacityInterval = movementInterval / (1000 * 10);

      let newTranslateZ, newOpacity;

      if (direction === 'plus') {
        newTranslateZ = imgObj.translateZ + movementInterval;
        newOpacity = imgObj.opacity + opacityInterval;
      } else if (direction === 'minus') {
        newTranslateZ = imgObj.translateZ - movementInterval;
        newOpacity = imgObj.opacity - opacityInterval;
      }

      return {
        translateZ: newTranslateZ,
        opacity: newOpacity,
        top: imgObj.top,
        left: imgObj.left,
        item: items[index],
        imageIndex: index,
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
        imageIndex: index,
      };
    });

    setCurrentGalleryImage(getGalleryImageInView());
    zCurr.current = imageAttrObjs.current[imageLength - 1].translateZ;
  };

  const getGalleryImageInView = () => {
    const currentInView = imageAttrObjs.current.find(x => {
      return 1100 > x.translateZ && x.translateZ >= 0;
    });

    return currentInView;
  };

  useEffect(() => {
    zMax.current = width * 10 > 10000 ? 10000 : width * 10;
    setUpGallery();
    requestRef.current = requestAnimationFrame(animate);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [items]);

  const onWheel = e => {
    if (e.deltaY > 0 && zCurr.current <= 0) {
      zoom('plus');
    } else if (e.deltaY < 0 && zCurr.current >= zStart.current) {
      zoom('minus');
    }
  };

  return (
    <>
      {isLoading && (
        <section>
          <h1>loading...</h1>
        </section>
      )}
      <section className={styles.gallery} onMouseMove={handleMouseMove} onWheelCapture={onWheel}>
        <div className={styles.headingContainer} ref={titleRef}>
          <Tween
            to={{
              transform: `rotate3d(${titleTilt.tiltX}, ${titleTilt.tiltY}, 0, ${titleTilt.degree}deg)`,
            }}
          >
            <h1 className={styles.heading}>Selected Projects</h1>
          </Tween>
        </div>
        <div className={styles.galleryContainer} ref={galleryRef}>
          <button
            className={styles.zoomIn}
            onMouseUp={clearZoomDirection}
            onMouseDown={() => handleMouseDown('IN')}
          ></button>
          <button
            className={styles.zoomOut}
            onMouseUp={clearZoomDirection}
            onMouseDown={() => handleMouseDown('OUT')}
          ></button>
          <div className={styles.imageContainer}>
            {imageAttrObjs.current.map((image, i) => (
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
                      <Image
                        src={image.item.imageUrl.src}
                        width={image.item.imageUrl.width}
                        height={image.item.imageUrl.height}
                        alt={image.item.altText}
                      />
                    </div>
                  </Tween>
                </div>
              </Tween>
            ))}
          </div>
        </div>

        {currentGalleryImage && <ItemDescription item={currentGalleryImage.item} />}

        <div className={styles.slider}>
          <input
            ref={sliderRef}
            className={styles.range}
            type="range"
            min="0"
            value={sliderVal}
            max={((items.length - 1) / items.length) * zMax.current}
            onChange={sliderZoom}
          />
        </div>
      </section>
    </>
  );
}
