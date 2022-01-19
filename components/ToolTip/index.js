import { useState, useEffect } from 'react';

export default function Tooltip({ className, offsetX = 0, offsetY = 0, children }) {
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [mouseMoved, setMouseMoved] = useState(false);

  useEffect(() => {
    window.addEventListener('mousemove', getTooltipPosition);

    return () => {
      window.removeEventListener('mousemove', getTooltipPosition);
    };
  }, []);

  const getTooltipPosition = ({ clientX, clientY }) => {
    setXPosition(clientX);
    setYPosition(clientY);
    setMouseMoved(true);
  };

  return (
    <div
      className={className}
      style={{
        display: mouseMoved ? 'block' : 'none',
        position: 'fixed',
        top: yPosition + offsetY,
        left: xPosition + offsetX,
      }}
    >
      {children}
    </div>
  );
}
