import React from 'react';
import Tile from '../Tile';

/**
 * DetailsSection
 * ──────────────
 * A forest-green editorial card with two essential notes:
 *  • Adults Only celebration
 *  • Black Tie attire
 *
 * Designed to read like a stamp on heavy linen — gold serif numerals, fine gold
 * rules, deep forest background.
 */
export default function DetailsSection() {
  return (
    <Tile
      delay={0.65}
      variant="forest"
      className="px-6 py-8 sm:px-10 sm:py-10 text-center"
    >
      {/* Top hairline */}
      <div className="mx-auto mb-5 w-16 h-px bg-champagne/60" />

      <p
        className="font-sans font-medium uppercase text-champagne/85"
        style={{ fontSize: 'clamp(8px, 1.4vw, 11px)', letterSpacing: '0.42em' }}
      >
        A Note On The Evening
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-6 sm:gap-8">
        {/* Adults Only */}
        <div className="flex flex-col items-center">
          <DetailIcon kind="adults" />
          <h4
            className="mt-3 font-serif text-ivory uppercase"
            style={{ fontSize: 'clamp(1rem, 3vw, 1.4rem)', letterSpacing: '0.18em' }}
          >
            Adults Only
          </h4>
          <p
            className="mt-2 font-elegant italic text-ivory/70 leading-snug max-w-[200px] mx-auto"
            style={{ fontSize: 'clamp(0.78rem, 1.6vw, 0.95rem)' }}
          >
            We kindly request an adults-only evening
          </p>
        </div>

        {/* Vertical rule */}
        <div className="hidden sm:block w-px h-20 bg-champagne/30" />
        <div className="sm:hidden mx-auto w-16 h-px bg-champagne/30" />

        {/* Black Tie */}
        <div className="flex flex-col items-center">
          <DetailIcon kind="bowtie" />
          <h4
            className="mt-3 font-serif text-ivory uppercase"
            style={{ fontSize: 'clamp(1rem, 3vw, 1.4rem)', letterSpacing: '0.18em' }}
          >
            Black Tie
          </h4>
          <p
            className="mt-2 font-elegant italic text-ivory/70 leading-snug max-w-[200px] mx-auto"
            style={{ fontSize: 'clamp(0.78rem, 1.6vw, 0.95rem)' }}
          >
            Floor-length gowns &amp; tuxedos requested
          </p>
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="mx-auto mt-7 w-16 h-px bg-champagne/60" />
    </Tile>
  );
}

function DetailIcon({ kind }) {
  if (kind === 'bowtie') {
    return (
      <svg viewBox="0 0 48 24" className="w-12 h-6" aria-hidden="true">
        <defs>
          <linearGradient id="bowGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#F2DFA0" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
        <path d="M2,12 L18,4 L18,20 Z" fill="url(#bowGold)" />
        <path d="M46,12 L30,4 L30,20 Z" fill="url(#bowGold)" />
        <rect x="18" y="8" width="12" height="8" rx="1.5" fill="url(#bowGold)" />
        <rect x="22" y="9" width="4" height="6" fill="rgba(0,0,0,0.18)" />
      </svg>
    );
  }
  // adults — wine glass crest
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
      <path d="M9,4 H23 L21,14 a5,5 0 0 1 -10,0 Z"
            fill="none" stroke="#D4AF37" strokeWidth="1.4" strokeLinejoin="round" />
      <line x1="16" y1="20" x2="16" y2="27" stroke="#D4AF37" strokeWidth="1.4" />
      <line x1="11" y1="28" x2="21" y2="28" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M11,8 H21" stroke="#D4AF37" strokeWidth="0.6" opacity="0.6" />
    </svg>
  );
}
