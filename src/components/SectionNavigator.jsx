import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Bottom-left pill that jumps section-by-section.
 *
 *   ┌─────┐
 *   │  ▲  │
 *   │  ▼  │   ← "Click here" hint badge floats next to this on load
 *   └─────┘
 *
 * On first mount a small "Click here" hint badge appears next to the down
 * button, gently pulsing with an arrow. It auto-dismisses on first interaction
 * or after 8 s.
 *
 * Spam-click safe: uses an internal `targetIdxRef` to remember the *intended*
 * destination across clicks. Without this, fast clicks would read window.scrollY
 * mid-animation (which hasn't moved yet) and re-target the same neighbor.
 */
export default function SectionNavigator() {
  const targetIdxRef   = useRef(null);
  const idleTimeoutRef = useRef(null);
  const [hintVisible, setHintVisible] = useState(true);

  // Hint stays visible until the user actually clicks the navigator OR scrolls.
  // We listen for scroll/touch interaction to also dismiss it (so the user
  // doesn't see it linger after they've already discovered scrolling works).
  useEffect(() => {
    const dismiss = () => setHintVisible(false);
    const events = ['wheel', 'touchstart'];
    events.forEach(e => window.addEventListener(e, dismiss, { once: true, passive: true }));
    return () => events.forEach(e => window.removeEventListener(e, dismiss));
  }, []);

  const detectCurrentIdx = useCallback(() => {
    const sections = [...document.querySelectorAll('[data-section]')];
    if (!sections.length) return 0;
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    let idx = 0;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= scrollY + 80) idx = i;
      else break;
    }
    return idx;
  }, []);

  const go = useCallback((dir) => {
    setHintVisible(false);

    const sections = [...document.querySelectorAll('[data-section]')];
    if (!sections.length) return;

    const baseIdx = targetIdxRef.current ?? detectCurrentIdx();
    const next    = Math.max(0, Math.min(sections.length - 1, baseIdx + dir));
    if (next === baseIdx) return;

    targetIdxRef.current = next;
    clearTimeout(idleTimeoutRef.current);
    idleTimeoutRef.current = setTimeout(() => { targetIdxRef.current = null; }, 700);

    const targetSection = sections[next];
    if (!targetSection) return;

    const top = Math.max(0, targetSection.offsetTop);
    window.scrollTo({ top, left: 0, behavior: 'smooth' });
  }, [detectCurrentIdx]);

  return (
    <>
      <nav
        aria-label="Section navigation"
        className="
          fixed bottom-4 left-4 sm:bottom-5 sm:left-5 z-40
          flex flex-col items-stretch
          bg-ivory/90 backdrop-blur
          border border-forest/20 shadow-tile
          rounded-full overflow-hidden
          select-none
          transition-shadow duration-300 hover:shadow-tile-deep
        "
      >
        <NavButton
          dir={-1}
          onClick={() => go(-1)}
          ariaLabel="Previous section"
          className="border-b border-forest/15"
        />
        <NavButton
          dir={1}
          onClick={() => go(1)}
          ariaLabel="Next section"
        />
      </nav>

      {/* "Click here" hint pointing at the DOWN button */}
      {hintVisible && (
        <div
          className="
            fixed bottom-[18px] sm:bottom-[22px] left-[68px] sm:left-[78px] z-40
            flex items-center gap-1.5
            pointer-events-none
            animate-hint-bob
          "
        >
          {/* tiny arrow */}
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-forest -mr-0.5" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            className="
              px-2.5 py-1 rounded-full
              bg-forest text-ivory
              font-sans font-semibold uppercase
              shadow-tile
            "
            style={{
              fontSize: 'clamp(9px, 1.6vw, 11px)',
              letterSpacing: '0.18em',
            }}
          >
            Click here
          </span>
        </div>
      )}
    </>
  );
}

/**
 * A single navigation arrow with a forest-green hover fade.
 * The button background fades from transparent → forest tint to make the
 * pressable area obvious.
 */
function NavButton({ dir, onClick, ariaLabel, className = '' }) {
  const path = dir === -1 ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        relative w-12 h-12 grid place-items-center
        text-forest-700 hover:text-forest-900 active:text-forest-900
        transition-colors duration-300
        focus-visible:outline-2 focus-visible:outline focus-visible:outline-champagne/60 focus-visible:outline-offset-2
        group
        ${className}
      `}
    >
      {/* Forest-green fade layer — opacity scales on hover */}
      <span
        aria-hidden="true"
        className="
          absolute inset-0
          bg-gradient-to-b from-forest-200/0 via-forest-300/0 to-forest-400/0
          group-hover:from-forest-300/40 group-hover:via-forest-500/30 group-hover:to-forest-700/35
          group-active:from-forest-500/55 group-active:via-forest-600/45 group-active:to-forest-800/50
          transition-all duration-300
        "
      />
      <svg
        viewBox="0 0 24 24"
        className="relative w-5 h-5 transition-transform duration-300 group-hover:scale-110"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d={path} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
