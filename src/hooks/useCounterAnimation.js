import { useState, useEffect, useRef } from 'react';

/**
 * Animates a counter from 0 to `target` when `triggerRef` enters the viewport.
 *
 * @param {number} target     - Final value to count up to
 * @param {number} duration   - Animation duration in ms (default 2000)
 * @param {React.RefObject}   triggerRef - Ref attached to the section container
 * @returns {number} count    - Current animated value (0 → target)
 */
function useCounterAnimation(target, duration = 2000, triggerRef) {
  // Treat negative targets as 0
  const effectiveTarget = target < 0 ? 0 : target;

  const [count, setCount] = useState(0);
  const rafIdRef = useRef(null);

  useEffect(() => {
    // Edge case: target is 0, no animation needed
    if (effectiveTarget === 0) {
      setCount(0);
      return;
    }

    const element = triggerRef?.current;
    if (!element) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(progress * effectiveTarget);
      setCount(current);

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          rafIdRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [effectiveTarget, duration, triggerRef]);

  return count;
}

export default useCounterAnimation;
