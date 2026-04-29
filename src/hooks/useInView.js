import { useEffect, useRef, useState } from 'react';

/**
 * Returns true once the element has entered the viewport.
 * Sticky by default — once seen it stays "in view" so content doesn't
 * re-trigger when you scroll back over it.
 */
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -10% 0px', sticky = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (sticky) observer.disconnect();
        } else if (!sticky) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, sticky]);

  return [ref, inView];
}
