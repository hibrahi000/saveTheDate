import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { musicStartedOn, toggleMute } from '../store/uiSlice';

/**
 * MusicPlayer
 * ───────────
 * Plays /music/wedding_band_2026.mp3 immediately on page load if the browser
 * allows it; otherwise falls back to starting on the very first user interaction
 * (click/touch/keypress/scroll). Browsers BLOCK autoplay-with-sound by default —
 * this component tries every available trick:
 *
 *   1. On mount, attempt audio.play() right away.
 *   2. If that fails (browser autoplay block), retry on first interaction.
 *   3. As a backup, also try a muted autoplay → unmute trick (allowed in Chrome).
 *
 * A small floating mute toggle is rendered in the bottom-right corner.
 */
export default function MusicPlayer() {
  const dispatch = useDispatch();
  const { musicMuted } = useSelector(s => s.ui);
  const audioRef = useRef(null);
  const [needsTap, setNeedsTap] = useState(false);

  // ─── Try autoplay immediately on mount ───────────────────────────────
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    a.volume = 0.20;
    a.muted = musicMuted;

    let unmounted = false;

    const tryPlay = async () => {
      try {
        await a.play();
        if (!unmounted) dispatch(musicStartedOn());
        setNeedsTap(false);
      } catch {
        // Autoplay blocked — try the muted trick
        try {
          a.muted = true;
          await a.play();
          if (!unmounted) {
            // Unmute after a short delay (Chrome allows this in many cases)
            setTimeout(() => {
              if (!unmounted && a) {
                a.muted = musicMuted;
                dispatch(musicStartedOn());
              }
            }, 200);
          }
          setNeedsTap(false);
        } catch {
          // Still blocked — fall back to interaction-based start
          setNeedsTap(true);
        }
      }
    };

    tryPlay();

    // Interaction-based fallback
    const start = () => {
      if (a.paused) tryPlay();
    };
    const events = ['pointerdown', 'click', 'touchstart', 'keydown', 'wheel'];
    events.forEach(evt => window.addEventListener(evt, start, { once: false, passive: true }));

    return () => {
      unmounted = true;
      events.forEach(evt => window.removeEventListener(evt, start));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // Apply mute toggle changes
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = musicMuted;
  }, [musicMuted]);

  return (
    <>
      <audio ref={audioRef} loop preload="auto" autoPlay playsInline>
        <source src="/music/kes_reason_to_love_energy.mp3" type="audio/mpeg" />
      </audio>

      {/* Mute toggle */}
      <button
        type="button"
        onClick={() => dispatch(toggleMute())}
        aria-label={musicMuted ? 'Unmute music' : 'Mute music'}
        className="fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full grid place-items-center
                   bg-ivory/85 border border-champagne/40 text-forest-700
                   backdrop-blur shadow-tile hover:bg-ivory hover:border-champagne
                   hover:text-forest-800 hover:scale-110 transition"
      >
        {musicMuted ? (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="22" y1="9" x2="16" y2="15" />
            <line x1="16" y1="9" x2="22" y2="15" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M19 5a9 9 0 0 1 0 14" />
          </svg>
        )}
      </button>

      {/* Tiny "tap to play" prompt only shows if browser blocked autoplay AND user hasn't muted */}
      {needsTap && !musicMuted && (
        <div
          aria-hidden="true"
          className="fixed bottom-16 right-4 z-40 px-3 py-1.5 rounded-full
                     bg-ink/85 text-ivory text-[10px] tracking-[0.18em] uppercase
                     animate-fade-in shadow-tile pointer-events-none"
        >
          Tap anywhere for music
        </div>
      )}
    </>
  );
}
