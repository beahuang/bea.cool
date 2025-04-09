import { useState } from 'react';
import Image from 'next/image';
import { Tween } from 'react-gsap';

import { useWindowDimensions } from 'hooks';
import { ItemDescription } from 'components';
import blurImage from 'public/img/blur.png';
import styles from './list.module.scss';

export default function List({ items }) {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const [itemTilt, setItemTilt] = useState({
    tiltX: 0,
    tiltY: 0,
  });

  const [titleTilt, setTitleTilt] = useState({
    tiltX: 0,
    tiltY: 0,
    degree: 0,
  });

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

  const handleMouseMove = e => {
    if (windowWidth > 768) {
      handleItemTilt(e);
      handleTitleTilt(e);
    } else {
      setItemTilt({
        tiltX: 0,
        tiltY: 0,
      });

      setTitleTilt({
        tiltX: 0,
        tiltY: 0,
        degree: 0,
      });
    }
  };

  const handleItemTilt = e => {
    const TILT_POWER = 30;

    const cx = Math.ceil(windowWidth / 2),
      cy = Math.ceil(windowHeight / 2),
      tiltX = (e.clientX - cx) / (windowWidth / TILT_POWER),
      tiltY = (e.clientY - cy) / (windowWidth / TILT_POWER);

    setItemTilt({
      tiltX,
      tiltY,
    });
  };

  return (
    <section className={styles.container} onMouseMove={handleMouseMove}>
      <div className={styles.headingContainer}>
        <Tween
          to={{
            transform: `rotate3d(${titleTilt.tiltX}, ${titleTilt.tiltY}, 0, ${titleTilt.degree}deg)`,
          }}
        >
          <h1 className={styles.heading}>All Projects</h1>
        </Tween>
      </div>
      {items.map((item, i) => {
        return (
          <div className={styles.listContainer} key={i}>
            <Tween
              to={{
                x: itemTilt.tiltX * (i + 1),
                y: itemTilt.tiltY * (i + 1),
              }}
              key={i}
            >
              <div className={styles.listImage}>
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

            <div className={styles.listItem}>
              <ItemDescription item={item} isList />
            </div>
          </div>
        );
      })}
    </section>
  );
}
