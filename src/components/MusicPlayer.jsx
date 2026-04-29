import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { musicStartedOn, toggleMute } from '../store/uiSlice';

/**
 * MusicPlayer
 * ───────────
 * True "play on load" — starts MUTED on mount (which all browsers allow), then
 * unmutes the first time the user interacts with the page. The volume comes
 * up smoothly via a fade-in. Audio is never paused, so toggling mute is just
 * an instant unmute.
 *
 * The floating control in the bottom-right also doubles as a pulsing "tap to
 * enable sound" prompt until music is unmuted.
 */
export default function MusicPlayer() {
  const dispatch = useDispatch();
  const { musicMuted } = useSelector(s => s.ui);
  const audioRef = useRef(null);

  // True on load → music is silent, awaiting first interaction
  const [awaitingUnmute, setAwaitingUnmute] = useState(true);

  // ─── Start muted-autoplay immediately on mount ───
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    a.muted   = false;
    a.volume  = 0;       // we'll fade in to ~0.32 once unmuted
    a.loop    = true;

    let unmounted = false;
    let fadeTimer;

    const startMuted = async () => {
      try { await a.play(); } catch { /* swallow — will retry on interaction */ }
    };
    startMuted();

    const fadeInVolume = () => {
      const TARGET = 0.32;
      const STEP   = 0.02;
      const TICK   = 80; // ms
      a.volume = 0;
      const grow = () => {
        if (unmounted || !a) return;
        a.volume = Math.min(TARGET, a.volume + STEP);
        if (a.volume < TARGET) fadeTimer = setTimeout(grow, TICK);
      };
      grow();
    };

    const unmuteNow = () => {
      if (unmounted) return;
      a.muted = false;
      fadeInVolume();
      setAwaitingUnmute(false);
      dispatch(musicStartedOn());
      // Try to play in case the muted-autoplay was rejected on this browser
      a.play().catch(() => {});
    };

    const onFirstInteraction = () => {
      // Only unmute if the user hasn't manually muted
      if (!musicMuted) unmuteNow();
      cleanupListeners();
    };
    const events = ['pointerdown', 'click', 'touchstart', 'keydown', 'wheel', 'scroll'];
    const opts   = { once: true, passive: true, capture: true };
    events.forEach(e => window.addEventListener(e, onFirstInteraction, opts));

    function cleanupListeners() {
      events.forEach(e => window.removeEventListener(e, onFirstInteraction, opts));
    }

    return () => {
      unmounted = true;
      clearTimeout(fadeTimer);
      cleanupListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // Apply manual mute toggle changes
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = musicMuted;
    if (!musicMuted) {
      setAwaitingUnmute(false);
      a.play().catch(() => {});
    }
  }, [musicMuted]);

  const toggle = () => {
    setAwaitingUnmute(false);
    dispatch(toggleMute());
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        muted
        autoPlay
        playsInline
        preload="auto"
        
      >
        {/* <source src="/music/kes_reason_to_love_energy.mp3" type="audio/mpeg" /> */}
        <source src="/music/wedding_band_2026.mp3" type="audio/mpeg" />
      </audio>

      <button
        type="button"
        onClick={toggle}
        aria-label={musicMuted || awaitingUnmute ? 'Enable music' : 'Mute music'}
        className={`
          group fixed bottom-4 right-4 z-50 grid place-items-center
          rounded-full backdrop-blur shadow-tile overflow-hidden
          transition-all duration-300
          focus-visible:outline-2 focus-visible:outline focus-visible:outline-champagne/60 focus-visible:outline-offset-2
          ${awaitingUnmute && !musicMuted
              ? 'w-12 h-12 bg-forest text-ivory border-2 border-champagne animate-pulse'
              : 'w-10 h-10 bg-ivory/90 text-forest-700 border border-forest/20 hover:border-forest/40 hover:scale-110 hover:text-forest-900'}
        `}
      >
        {/* Forest-green hover fade — matches the section navigator buttons */}
        {!awaitingUnmute && (
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
        )}

        {(musicMuted || awaitingUnmute) ? (
          <svg viewBox="0 0 24 24" className="relative w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinejoin="round" />
            <line x1="22" y1="9" x2="16" y2="15" strokeLinecap="round" />
            <line x1="16" y1="9" x2="22" y2="15" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="relative w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinejoin="round" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />
            <path d="M19 5a9 9 0 0 1 0 14" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {awaitingUnmute && !musicMuted && (
        <div
          aria-hidden="true"
          className="fixed bottom-[68px] right-4 z-40 px-3 py-1.5 rounded-full
                     bg-ink/90 text-ivory text-[10px] tracking-[0.18em] uppercase
                     shadow-tile pointer-events-none animate-fade-in"
        >
          Tap for music
        </div>
      )}
    </>
  );
}
