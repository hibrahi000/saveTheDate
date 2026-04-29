import React, { useCallback, useRef } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

/**
 * Vertical pill-style custom scrollbar pinned to the right side of the page.
 *
 *  ┌─────┐
 *  │  ▲  │  ← up button (scroll up by 1 viewport)
 *  ├─────┤
 *  │  •  │  ← thumb (reflects current scroll position; drag-to-scroll)
 *  │     │
 *  │     │
 *  │     │
 *  ├─────┤
 *  │  ▼  │  ← down button (scroll down by 1 viewport)
 *  └─────┘
 *
 * Scrolling is smoothed via { behavior: 'smooth' }. Drag tracking uses pointer
 * events with rAF throttling for silky updates.
 */
export default function ScrollControl() {
  const trackRef = useRef(null);
  const draggingRef = useRef(false);
  const { progress } = useScrollProgress();

  const scrollByPage = useCallback((dir = 1) => {
    const amt = window.innerHeight * 0.85;
    window.scrollBy({ top: dir * amt, left: 0, behavior: 'smooth' });
  }, []);

  // Click on track to jump to that position
  const onTrackClick = useCallback((e) => {
    if (draggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = (e.clientY - rect.top) / rect.height;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ratio * max, behavior: 'smooth' });
  }, []);

  // Drag thumb
  const onThumbPointerDown = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    draggingRef.current = true;
    const track = trackRef.current;
    if (!track) return;

    const move = (ev) => {
      const rect = track.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (ev.clientY - rect.top) / rect.height));
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // For drag, instant scroll is more responsive (smooth fights the pointer)
      window.scrollTo({ top: ratio * max, left: 0 });
    };
    const up = () => {
      draggingRef.current = false;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });
    window.addEventListener('pointercancel', up, { passive: true });
  }, []);

  return (
    <div
      aria-label="Scroll control"
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40
                 flex flex-col items-stretch
                 bg-ivory/85 backdrop-blur border border-forest/15
                 rounded-full shadow-tile
                 w-9 sm:w-10
                 select-none
                 hover:border-forest/30 transition-colors"
      style={{ height: 'min(70vh, 460px)' }}
    >
      {/* Up button */}
      <button
        type="button"
        onClick={() => scrollByPage(-1)}
        aria-label="Scroll up"
        className="grid place-items-center h-9 sm:h-10 rounded-t-full
                   text-forest-700 hover:text-forest-900 hover:bg-forest/5
                   transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        onClick={onTrackClick}
        className="flex-1 mx-auto my-1 w-[3px] rounded-full bg-forest/15 relative cursor-pointer"
      >
        {/* Filled portion (above thumb) */}
        <div
          className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-forest/45 to-champagne/55"
          style={{ height: `${progress * 100}%`, transition: 'height 0.05s linear' }}
        />
        {/* Thumb */}
        <button
          type="button"
          onPointerDown={onThumbPointerDown}
          aria-label="Scroll thumb (drag to scroll)"
          className="absolute left-1/2 -translate-x-1/2 w-4 h-7 rounded-full
                     bg-gradient-to-b from-champagne to-champagne-600
                     border border-forest-700/30 shadow
                     hover:scale-110 active:scale-105 transition-transform
                     cursor-grab active:cursor-grabbing
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest-600 focus-visible:outline-offset-2"
          style={{
            top: `calc(${progress * 100}% - 14px)`,
            transition: 'top 0.05s linear, transform 0.15s ease-out',
          }}
        />
      </div>

      {/* Down button */}
      <button
        type="button"
        onClick={() => scrollByPage(1)}
        aria-label="Scroll down"
        className="grid place-items-center h-9 sm:h-10 rounded-b-full
                   text-forest-700 hover:text-forest-900 hover:bg-forest/5
                   transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
