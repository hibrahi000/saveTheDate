import React from 'react';
import { useSelector } from 'react-redux';
import Tile from '../Tile';
import IsolatedRing from '../IsolatedRing';
import Divider from '../Divider';

/**
 * UnionSection — single editorial composition.
 *
 *  Top row:  FHOENIX  &  HASHMAT     ← names on one line
 *  Below:    [Polaroid]              ← cruise photo, slightly tilted
 *               ◯  ← ring overlapping the upper-right corner of the Polaroid
 *
 * Inspired by editorial wedding-invitation spreads (Magnolia Rouge, Together
 * Journal). The ring sits on the Polaroid corner like a wax-seal monogram.
 */
export default function UnionSection() {
  const { bride, groom, proposalPhoto } = useSelector(s => s.wedding);

  return (
    <Tile delay={0.1} id="names-section" className="scroll-mt-8 text-center">
      {/* Eyebrow + sage sprig divider */}
      <p
        className="font-sans font-medium uppercase text-forest-700/70"
        style={{ fontSize: 'clamp(8px, 1.6vw, 12px)', letterSpacing: '0.42em' }}
      >
        Two Becoming One
      </p>
      <div className="mt-3 flex justify-center items-center gap-3">
        <SagebranchSprig direction="left" />
        <span className="text-champagne text-[8px]">◆</span>
        <SagebranchSprig direction="right" />
      </div>

      {/* Names on one line */}
      <h2
        className="mt-7 sm:mt-9 font-serif text-ink uppercase leading-none flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5"
        style={{ letterSpacing: '0.16em' }}
      >
        <span style={{ fontSize: 'clamp(1.6rem, 7vw, 3rem)' }}>{bride}</span>
        <span
          className="font-script text-champagne normal-case"
          style={{ fontSize: 'clamp(1.6rem, 6vw, 2.8rem)', letterSpacing: 'normal' }}
        >
          &amp;
        </span>
        <span style={{ fontSize: 'clamp(1.6rem, 7vw, 3rem)' }}>{groom}</span>
      </h2>

      {/* Polaroid + Ring composition */}
      <div className="mt-10 sm:mt-14 flex justify-center">
        <PolaroidWithRing
          photo={proposalPhoto}
          fallback={import.meta.env.DEV}
        />
      </div>

      {/* Sublabel beneath */}
      {proposalPhoto?.sublabel && (
        <p
          className="mt-7 mx-auto font-elegant italic text-forest-700 max-w-[380px]"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}
        >
          {proposalPhoto.sublabel}
        </p>
      )}

      <Divider variant="forest" width="xs" symbol="◆" className="mt-10 sm:mt-12" />
    </Tile>
  );
}

/**
 * The hero composition: Polaroid card with the rotating shimmery ring
 * overlapping its upper-right corner like a charm/seal.
 */
function PolaroidWithRing({ photo, fallback }) {
  const hasPhoto = !!photo?.src;

  return (
    <div
      className="relative inline-block"
      style={{
        // Reserve room above + right for the ring overhang so it isn't clipped
        paddingTop: 'clamp(48px, 10vw, 88px)',
        paddingRight: 'clamp(48px, 10vw, 88px)',
      }}
    >
      {/* Polaroid card */}
      <div
        className="relative bg-white p-3 sm:p-4 pb-12 sm:pb-14 shadow-tile-deep
                   w-[clamp(240px,76vw,400px)] aspect-[4/5]
                   transition-transform duration-700"
        style={{ transform: 'rotate(-3.5deg)' }}
      >
        {hasPhoto ? (
          <>
            <img
              src={photo.src}
              alt={photo.caption || 'Proposal'}
              className="w-full h-[calc(100%-2.5rem)] object-cover"
            />
            <p className="absolute bottom-2 sm:bottom-3 left-0 right-0 text-center
                          font-script text-ink-soft text-xl sm:text-2xl">
              {photo.caption}
            </p>
          </>
        ) : fallback ? (
          <div className="w-full h-[calc(100%-2.5rem)] grid place-items-center
                          border border-dashed border-forest/30 bg-ivory">
            <div className="text-center px-4">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-forest-700/60">
                Proposal photo
              </p>
              <p className="font-elegant italic text-ink-muted text-sm mt-2">
                /public/proposal.jpg
              </p>
            </div>
          </div>
        ) : null}

        {/* Forest-green washi-tape on top center */}
        <span
          aria-hidden="true"
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5
                     bg-forest-200/70 rotate-1 rounded-[2px] shadow-sm
                     border-x border-forest/15"
        />
      </div>

      {/* Ring — overlapping upper-right corner of the Polaroid */}
      <div
        className="absolute z-20"
        style={{
          // Position the ring so it sits on the upper-right corner, ~50% overlapping
          top: 0,
          right: 0,
          width:  'clamp(120px, 28vw, 200px)',
          height: 'clamp(120px, 28vw, 200px)',
          transform: 'rotate(8deg)',
          // Soft drop shadow on the ring container itself for that pinned-on feel
          filter: 'drop-shadow(0 8px 24px rgba(20,20,30,0.25))',
        }}
      >
        <IsolatedRing className="w-full h-full" />
      </div>
    </div>
  );
}

/** Tiny eucalyptus-sprig SVG ornament */
function SagebranchSprig({ direction = 'left' }) {
  const flip = direction === 'right' ? 'scale-x-[-1]' : '';
  return (
    <svg
      viewBox="0 0 60 16"
      aria-hidden="true"
      className={`w-14 sm:w-20 h-4 ${flip}`}
    >
      <path
        d="M2,8 Q15,8 28,8 Q40,8 56,8"
        stroke="rgba(45,106,79,0.55)"
        strokeWidth="0.8"
        fill="none"
      />
      <ellipse cx="14" cy="6"  rx="3.2" ry="1.6" fill="#5E9456" opacity="0.85" transform="rotate(-15 14 6)" />
      <ellipse cx="22" cy="10" rx="3"   ry="1.5" fill="#88B580" opacity="0.78" transform="rotate(15 22 10)" />
      <ellipse cx="32" cy="6"  rx="3.4" ry="1.7" fill="#5E9456" opacity="0.82" transform="rotate(-15 32 6)" />
      <ellipse cx="42" cy="10" rx="2.8" ry="1.4" fill="#88B580" opacity="0.74" transform="rotate(15 42 10)" />
      <circle  cx="50" cy="8" r="1" fill="#D4AF37" opacity="0.7" />
    </svg>
  );
}
