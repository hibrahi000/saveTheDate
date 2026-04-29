import React, { useCallback } from 'react';

/**
 * Small pill at the bottom-left of the viewport that jumps section-by-section.
 *
 *   ┌─────┐
 *   │  ▲  │
 *   │  ▼  │
 *   └─────┘
 *
 * Each tap snaps to the previous / next section using scrollIntoView with smooth
 * behavior. Buttons are 48 px tall so they're comfortable to press with a finger.
 *
 * Sections to navigate are queried via [data-section] attributes — the Tile
 * component sets this automatically.
 */
export default function SectionNavigator() {
  const go = useCallback((dir) => {
    const sections = [...document.querySelectorAll('[data-section]')];
    if (!sections.length) return;

    const viewportMid = window.innerHeight / 2;

    // Find the section currently dominating the viewport center
    let currentIdx = 0;
    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top <= viewportMid && rect.bottom > viewportMid) {
        currentIdx = i;
        break;
      }
      if (rect.top > viewportMid) {
        currentIdx = Math.max(0, i - 1);
        break;
      }
      currentIdx = i;
    }

    const next = Math.max(0, Math.min(sections.length - 1, currentIdx + dir));
    sections[next]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="
        fixed bottom-4 left-4 sm:bottom-5 sm:left-5 z-40
        flex flex-col items-stretch
        bg-ivory/90 backdrop-blur
        border border-forest/20 shadow-tile
        rounded-full overflow-hidden
        select-none
      "
    >
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous section"
        className="
          w-12 h-12 sm:w-13 sm:h-13 grid place-items-center
          text-forest-700 hover:text-forest-900 active:text-forest-900
          hover:bg-forest/8 active:bg-forest/12
          transition-colors
          border-b border-forest/15
          focus-visible:outline-2 focus-visible:outline focus-visible:outline-champagne/60 focus-visible:outline-offset-2
        "
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next section"
        className="
          w-12 h-12 sm:w-13 sm:h-13 grid place-items-center
          text-forest-700 hover:text-forest-900 active:text-forest-900
          hover:bg-forest/8 active:bg-forest/12
          transition-colors
          focus-visible:outline-2 focus-visible:outline focus-visible:outline-champagne/60 focus-visible:outline-offset-2
        "
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </nav>
  );
}
