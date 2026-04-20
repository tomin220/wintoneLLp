import { useEffect, useRef } from 'react';

/**
 * Magnetic button effect — element follows cursor within a radius.
 * @param {number} strength - how much it moves (default 0.35)
 * @param {number} radius - activation radius in px (default 80)
 */
export default function useMagneticEffect(strength = 0.35, radius = 80) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add('magnetic');

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const x = dx * strength;
        const y = dy * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const onMouseLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength, radius]);

  return ref;
}
