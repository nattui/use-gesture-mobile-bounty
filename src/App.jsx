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

  const bind = useDrag(({ down, movement: [mx] }) => {
    if (down) {
      document.body.style.userSelect = 'none';
      setIsDragging(true);
      setXPosition(initialXPosition + mx);
      baseRef.current.style.transition = null;
    } else {
      document.body.style.userSelect = null;

      setXPosition(initialXPosition + mx);
      setInitialXPosition(state => state + mx);

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
      <div className={styles.left}>left</div>
      <div className={styles.center}>center</div>
      <div className={styles.right}>right</div>
    </main>
  );
}
