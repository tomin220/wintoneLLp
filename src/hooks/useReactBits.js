/**
 * useReactBits — premium UI micro-interactions
 * Magnetic buttons, split text, shimmer labels, border beam
 */
import { useEffect } from 'react';

// ── 1. Magnetic Buttons ──────────────────────────────────────────────────────
export function useMagneticButtons() {
  useEffect(() => {
    const buttons = document.querySelectorAll('.btn--primary, .btn--outline, .navbar__cta');

    const handlers = [];

    buttons.forEach(btn => {
      btn.classList.add('magnetic');

      const onMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.25;
        const dy = (e.clientY - cy) * 0.25;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      };

      const onLeave = () => {
        btn.style.transform = '';
      };

      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
      handlers.push({ btn, onMove, onLeave });
    });

    return () => {
      handlers.forEach(({ btn, onMove, onLeave }) => {
        btn.removeEventListener('mousemove', onMove);
        btn.removeEventListener('mouseleave', onLeave);
        btn.style.transform = '';
      });
    };
  });
}

// ── 2. Split Text on Hero Heading ────────────────────────────────────────────
export function useSplitText() {
  useEffect(() => {
    const heading = document.querySelector('.hero__heading');
    if (!heading || heading.dataset.split) return;
    heading.dataset.split = 'true';

    // Split each text node into word spans
    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        words.forEach((word, i) => {
          if (/^\s+$/.test(word)) {
            frag.appendChild(document.createTextNode(word));
          } else {
            const span = document.createElement('span');
            span.className = 'split-word';
            span.style.animationDelay = `${i * 80}ms`;
            span.textContent = word;
            frag.appendChild(span);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'EM') {
        Array.from(node.childNodes).forEach(walk);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'EM') {
        // Handle em separately
        const words = node.textContent.split(/(\s+)/);
        node.innerHTML = '';
        words.forEach((word, i) => {
          if (/^\s+$/.test(word)) {
            node.appendChild(document.createTextNode(word));
          } else {
            const span = document.createElement('span');
            span.className = 'split-word';
            span.style.animationDelay = `${(i + 3) * 80}ms`;
            span.textContent = word;
            node.appendChild(span);
          }
        });
      }
    };

    Array.from(heading.childNodes).forEach(walk);
  }, []);
}

// ── 3. Shimmer on section labels ─────────────────────────────────────────────
export function useShimmerLabels() {
  useEffect(() => {
    const labels = document.querySelectorAll('.section-label');
    labels.forEach(el => el.classList.add('shimmer'));
  });
}

// ── 4. Border Beam on featured project cards ─────────────────────────────────
export function useBorderBeam() {
  useEffect(() => {
    // Add border-beam to the first 3 project cards (featured)
    const cards = document.querySelectorAll('.project-card--clickable');
    cards.forEach((card, i) => {
      if (i < 3) card.classList.add('border-beam');
    });

    // Add glow-card to award cards
    document.querySelectorAll('.award-card').forEach(c => c.classList.add('glow-card'));

    // Add float to hero float card
    const floatCard = document.querySelector('.hero__float-card');
    if (floatCard) floatCard.classList.add('float-anim');

    // Add gradient-text to awards title em
    const awardsEm = document.querySelector('.awards-title em');
    if (awardsEm) awardsEm.classList.add('gradient-text');

    // Add gradient-text to hero heading em
    const heroEm = document.querySelector('.hero__heading em');
    if (heroEm) heroEm.classList.add('gradient-text');
  });
}

// ── 5. Smooth page transitions ───────────────────────────────────────────────
export function usePageTransition() {
  useEffect(() => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  }, []);
}
