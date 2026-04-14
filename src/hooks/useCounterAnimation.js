import { useState, useEffect, useRef } from 'react';

function useCounterAnimation(target, duration = 2000, triggerRef) {
  const effectiveTarget = target < 0 ? 0 : target;
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const rafIdRef = useRef(null);

  useEffect(() => {
    if (effectiveTarget === 0) { setCount(0); return; }

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
      } else {
        setDone(true);
        setTimeout(() => setDone(false), 700);
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
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [effectiveTarget, duration, triggerRef]);

  return { count, done };
}

export default useCounterAnimation;
