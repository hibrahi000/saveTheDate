import { useEffect, useRef, useState } from 'react';

/**
 * Tracks total page scroll progress (0..1) and the raw scrollY value.
 * Updates via requestAnimationFrame for smooth, throttled reads.
 */
export function useScrollProgress() {
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const max = Math.max(1, (document.documentElement.scrollHeight - window.innerHeight));
      setScrollY(y);
      setProgress(Math.min(1, Math.max(0, y / max)));
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { scrollY, progress };
}

/**
 * Tracks the visibility/progress of a single element relative to the viewport.
 * Returns a value 0..1 — 0 when the element is just below the viewport bottom,
 * 1 when its top has scrolled past the viewport top.
 */
export function useElementScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const el = ref.current;
      if (!el) { ticking = false; return; }
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Map: rect.top from vh down to -rect.height into 0..1
      const total = vh + rect.height;
      const y = vh - rect.top;
      setProgress(Math.min(1, Math.max(0, y / total)));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);

  return progress;
}
