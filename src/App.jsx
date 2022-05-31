import { useDrag } from '@use-gesture/react';
import { useRef, useState } from 'react';
import styles from './App.module.scss';

export default function App() {
  const baseRef = useRef(null);

  const [initialXPosition, setInitialXPosition] = useState(0);
  const [xPosition, setXPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const SIDEBAR_WIDTH = 320;
  const DURATION_TIME = 100;

  const bind = useDrag(({ down, movement: [mx], velocity: [vx] }) => {
    if (down) {
      document.body.style.userSelect = 'none';
      setIsDragging(true);
      setXPosition(initialXPosition + mx);
      baseRef.current.style.transition = null;
    } else {
      document.body.style.userSelect = null;

      // Momentum based movement
      if (vx > 1) {
        // TODO: Cap the velocity to 2 or 3 px/ms
        setXPosition(vx * mx + initialXPosition);
        setInitialXPosition(state => vx * mx + state);
      } else {
        setXPosition(initialXPosition + mx);
        setInitialXPosition(state => state + mx);
      }

      setIsDragging(false);
      baseRef.current.style.transition = `left ${DURATION_TIME}ms`;
    }
  }, {
    axis: 'x',
    bounds: { left: -SIDEBAR_WIDTH, right: SIDEBAR_WIDTH },
    from: () => [xPosition, 0]
  });

  return (
    <main
      {...bind()}
      className={styles.base}
      ref={baseRef}
      style={{ left: `${xPosition}px`, touchAction: 'none' }}
    >
      <div className={styles.left}></div>
      <div className={styles.center}></div>
      <div className={styles.right}></div>
    </main>
  );
}
