import { useEffect } from 'react';

export default function useCursorSpotlight() {
  useEffect(() => {
    const el = document.createElement('div');
    el.id = 'cursor-spotlight';
    el.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
      opacity: 0;
      top: 0; left: 0;
    `;
    document.body.appendChild(el);

    const move = (e) => {
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
      el.style.opacity = '1';
    };

    const hide = () => { el.style.opacity = '0'; };

    window.addEventListener('mousemove', move, { passive: true });
    document.body.addEventListener('mouseleave', hide);

    return () => {
      window.removeEventListener('mousemove', move);
      document.body.removeEventListener('mouseleave', hide);
      el.remove();
    };
  }, []);
}
