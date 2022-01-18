import { useState } from 'react';
import Image from 'next/image';
import { Tween } from 'react-gsap';

import { useWindowDimensions } from 'hooks';
import { ItemDescription } from 'components';
import styles from './list.module.scss';

export default function List({ items }) {
  const { height, width } = useWindowDimensions();

  const [itemTilt, setItemTilt] = useState({
    tiltX: 0,
    tiltY: 0,
  });

  const handleMouseMove = e => {
    if (width > 768) {
      handleItemTilt(e);
    } else {
      setItemTilt({
        tiltX: 0,
        tiltY: 0,
      });
    }
  };

  const handleItemTilt = e => {
    const TILT_POWER = 30;

    const cx = Math.ceil(width / 2),
      cy = Math.ceil(height / 2),
      tiltX = (e.clientX - cx) / (width / TILT_POWER),
      tiltY = (e.clientY - cy) / (width / TILT_POWER);

    setItemTilt({
      tiltX,
      tiltY,
    });
  };

  return (
    <section className={styles.container} onMouseMove={handleMouseMove}>
      <h1 className={styles.heading}>Selected Work</h1>
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
                  src={item.imageUrl.src}
                  width={item.imageUrl.width}
                  height={item.imageUrl.height}
                  alt={item.altText}
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
