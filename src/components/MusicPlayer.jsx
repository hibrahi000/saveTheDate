import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { musicStartedOn, toggleMute,  } from '../store/uiSlice';
import weddingBand2026 from '../../public/music/wedding_band_2026.mp3'

/**
 * Plays /music/background.mp3 on first user interaction.
 * Renders a tiny mute toggle in the corner.
 */
export default function MusicPlayer() {
  const dispatch = useDispatch();
  const { musicStarted, musicMuted } = useSelector(s => s.ui);
  const audioRef = useRef(weddingBand2026);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.52;

    const start = () => {
      if (musicStarted) return;
      a.play().then(() => dispatch(musicStartedOn())).catch(() => {/* blocked */});
    };
    ['click', 'touchstart', 'keydown', 'wheel'].forEach(evt =>
      window.addEventListener(evt, start, { once: false, passive: true })
    );
    return () => {
      ['click', 'touchstart', 'keydown', 'wheel'].forEach(evt =>
        window.removeEventListener(evt, start)
      );
    };
  }, [dispatch, musicStarted]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = musicMuted;
  }, [musicMuted]);

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/background.mp3" type="audio/mpeg" />
      </audio>
      <button
        type="button"
        onClick={() => dispatch(toggleMute())}
        aria-label={musicMuted ? 'Unmute music' : 'Mute music'}
        className="fixed bottom-4 right-4 z-50 w-9 h-9 rounded-full grid place-items-center
                   bg-ivory/80 border border-champagne/40 text-forest-700
                   backdrop-blur hover:bg-ivory hover:border-champagne transition"
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
    </>
  );
}
