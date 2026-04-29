import { useEffect, useRef, useState } from 'react';

/**
 * Returns true once the element has entered (or is approaching) the viewport.
 *
 * Default rootMargin EXPANDS the viewport downward by 25% so sections start
 * fading in BEFORE they're actually visible. By the time the user scrolls
 * them into view, they're already fully revealed → no scroll-lag perception.
 *
 * sticky=true (default): once seen, stays "in view" so content doesn't
 * re-trigger when scrolling back over.
 */
export function useInView({
  threshold = 0,
  rootMargin = '0px 0px 25% 0px',
  sticky = true,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Safety net: if IntersectionObserver isn't supported or fails to fire
    // within 1.2 s, force the element visible so content never gets stuck hidden.
    const safety = setTimeout(() => setInView(true), 1200);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(safety);
          setInView(true);
          if (sticky) observer.disconnect();
        } else if (!sticky) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);

    return () => {
      clearTimeout(safety);
      observer.disconnect();
    };
  }, [threshold, rootMargin, sticky]);

  return [ref, inView];
}
