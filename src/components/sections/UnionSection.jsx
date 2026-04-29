import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Tile from '../Tile';
import IsolatedRing from '../IsolatedRing';
import Divider from '../Divider';

/**
 * UnionSection — the editorial centerpiece.
 *
 *  ── for the wedding of ──
 *  FHOENIX  &  HASHMAT
 *
 *           ◯               ← ring (the keyring)
 *         /  |  \           ← gold chains
 *       [P1][P2][P3]        ← three Polaroids fanning out, hanging from the ring
 *
 * The three Polaroids share a common anchor at the top and tilt outward at
 * progressively wider angles, like souvenir photos on a keychain.
 */
export default function UnionSection() {
  const { bride, groom, proposalGallery, proposalSublabel } = useSelector(s => s.wedding);

  return (
    <Tile delay={0.1} id="names-section" className="scroll-mt-8 text-center">
      {/* Eyebrow + sage sprig divider */}
      <p
        className="font-sans font-medium uppercase text-forest-700/70"
        style={{ fontSize: 'clamp(8px, 1.6vw, 12px)', letterSpacing: '0.42em' }}
      >
        for the wedding of
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

      {/* Keychain composition — overflow-visible so rotated photo corners aren't clipped */}
      <div className="mt-8 sm:mt-12 flex justify-center overflow-visible">
        <KeychainGallery photos={proposalGallery} fallback={import.meta.env.DEV} />
      </div>

      {/* Sublabel */}
      {proposalSublabel && (
        <p
          className="mt-7 sm:mt-9 mx-auto font-elegant italic text-forest-700 max-w-[420px]"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}
        >
          {proposalSublabel}
        </p>
      )}

      <Divider variant="forest" width="xs" symbol="◆" className="mt-9 sm:mt-11" />
    </Tile>
  );
}

/**
 * Ring at the top, three Polaroids fanning out below.
 *
 * Auto-cycle: every 3.6 s the "active" Polaroid scales up and brightens.
 * Cycle order is centre → left → right → centre → … (visit middle first).
 *
 * Hover/focus pauses the cycle and pins the active state to the hovered photo.
 * Tapping anywhere off the gallery resumes auto-cycling.
 */
function KeychainGallery({ photos = [], fallback }) {
  const list = photos?.length ? photos : [];
  const RING_SIZE = 'clamp(96px, 21vw, 168px)';
  const CHAIN_HEIGHT = 'clamp(36px, 7vw, 64px)';

  // Visit order: middle (1) → left (0) → right (2)
  const center = Math.floor(list.length / 2);
  const visitOrder = list.length === 3 ? [center, 0, 2] : list.map((_, i) => i);

  const [step, setStep]   = useState(0);     // index into visitOrder
  const [hovered, setHovered] = useState(null);  // hovered Polaroid index (pauses cycle)

  useEffect(() => {
    if (hovered !== null) return; // pause on hover
    if (visitOrder.length <= 1) return;
    const id = setInterval(() => {
      setStep(s => (s + 1) % visitOrder.length);
    }, 3600);
    return () => clearInterval(id);
  }, [hovered, visitOrder.length]);

  const activeIdx = hovered ?? visitOrder[step];

  return (
    <div className="relative w-full max-w-[640px] mx-auto">
      {/* The ring — positioned ABOVE the photo row with breathing room */}
      <div
        className="relative mx-auto z-30"
        style={{
          width:  RING_SIZE,
          height: RING_SIZE,
          filter: 'drop-shadow(0 10px 22px rgba(20,20,30,0.22))',
          marginBottom: '4px',
        }}
      >
        <IsolatedRing className="w-full h-full" />
      </div>

      {/* Gold chains bridging ring → photos */}
      <div className="relative w-full mx-auto" style={{ height: CHAIN_HEIGHT }}>
        <ChainLines />
      </div>

      {/* Three Polaroids — flex-nowrap so they always sit in a single fan.
          Extra side padding so rotated edges don't clip against the column. */}
      <div
        className="
          relative
          flex flex-row items-start justify-center
          gap-1.5 sm:gap-3
          flex-nowrap
          px-3 sm:px-6
          z-20
          overflow-visible
        "
        onMouseLeave={() => setHovered(null)}
      >
        {list.map((photo, idx) => (
          <Polaroid
            key={idx}
            index={idx}
            count={list.length}
            photo={photo}
            fallback={fallback}
            isActive={idx === activeIdx}
            onActivate={() => setHovered(idx)}
            onDeactivate={() => setHovered(null)}
          />
        ))}
      </div>
    </div>
  );
}

/** A single Polaroid in the fan.
 *  When `isActive` is true the photo enlarges, brightens, and lifts — drawing
 *  the eye to it. The cycle hits each photo every 3.6 s; hovering pins it. */
function Polaroid({ photo, index, count, fallback, isActive, onActivate, onDeactivate }) {
  const isCenter = index === Math.floor(count / 2);
  const rotation = photo?.rotation ?? 0;
  const baseScale = photo?.scale ?? 1;
  const activeScale = baseScale * 1.18;       // grow ~18% when active
  const liftPx = isActive ? -10 : 0;            // lift slightly when active
  const ringOpacity = isActive ? 1 : 0;         // soft halo when active

  // Sizing budget: the center Polaroid is larger; flanking ones are smaller.
  const widthClamp = isCenter
    ? 'clamp(118px, 34vw, 230px)'
    : 'clamp(96px,  26vw, 190px)';

  return (
    <div
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onTouchStart={onActivate}
      tabIndex={0}
      aria-label={photo?.caption}
      className={`
        relative flex-shrink-0 bg-white
        p-1.5 sm:p-2.5 pb-7 sm:pb-10
        shadow-tile-deep cursor-pointer
        transition-[transform,box-shadow,filter] duration-500 ease-out
        outline-none
        ${isActive ? 'z-40 shadow-2xl' : isCenter ? 'z-30' : 'z-20'}
      `}
      style={{
        width: widthClamp,
        aspectRatio: '4 / 5',
        transform: `translateY(${liftPx}px) rotate(${rotation}deg) scale(${isActive ? activeScale : baseScale})`,
        transformOrigin: '50% 0%',
        filter: isActive
          ? 'brightness(1.05) saturate(1.08) drop-shadow(0 14px 28px rgba(20,20,30,0.32))'
          : 'brightness(0.98) saturate(0.96)',
      }}
    >
      {/* Champagne halo when active */}
      <span
        aria-hidden="true"
        className="absolute -inset-2 rounded pointer-events-none transition-opacity duration-500"
        style={{
          opacity: ringOpacity * 0.7,
          background:
            'radial-gradient(closest-side, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0) 75%)',
          zIndex: -1,
        }}
      />
      {photo?.src ? (
        <>
          <img
            src={photo.src}
            alt={photo.caption || 'Photo'}
            draggable="false"
            className="block w-full h-[calc(100%-1.4rem)] sm:h-[calc(100%-1.8rem)] object-cover"
            loading="lazy"
          />
          <p
            className="absolute bottom-1 sm:bottom-1.5 left-0 right-0 text-center
                       font-script text-ink-soft px-1 truncate"
            style={{
              fontSize: isCenter
                ? 'clamp(0.72rem, 1.9vw, 1.2rem)'
                : 'clamp(0.6rem, 1.55vw, 0.95rem)',
            }}
          >
            {photo.caption}
          </p>
        </>
      ) : fallback ? (
        <div className="w-full h-[calc(100%-1.4rem)] grid place-items-center
                        border border-dashed border-forest/30 bg-ivory">
          <span className="text-[8px] tracking-[0.3em] uppercase text-forest-700/60">
            photo {index + 1}
          </span>
        </div>
      ) : null}

      {/* Grommet — where the chain meets the photo */}
      <span
        aria-hidden="true"
        className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5
                   rounded-full bg-forest-900 ring-2 ring-champagne/70 shadow"
      />
    </div>
  );
}

/**
 * Three thin gold chain lines descending from where the ring sits down to
 * where each Polaroid grommet will be. Lives inside its own height-bounded
 * container so it never overlaps the ring or the photos.
 */
function ChainLines() {
  return (
    <svg
      viewBox="0 0 200 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="absolute inset-x-0 top-0 mx-auto z-10 pointer-events-none opacity-65"
      style={{
        width: 'min(92%, 460px)',
        height: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <defs>
        <linearGradient id="chainGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#D4AF37" stopOpacity="1" />
          <stop offset="100%" stopColor="#8B6914" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <line x1="100" y1="0" x2="22"  y2="100" stroke="url(#chainGrad)" strokeWidth="1.4" strokeDasharray="3 4" />
      <line x1="100" y1="0" x2="100" y2="100" stroke="url(#chainGrad)" strokeWidth="1.4" strokeDasharray="3 4" />
      <line x1="100" y1="0" x2="178" y2="100" stroke="url(#chainGrad)" strokeWidth="1.4" strokeDasharray="3 4" />
    </svg>
  );
}

/** Tiny eucalyptus-sprig SVG ornament */
function SagebranchSprig({ direction = 'left' }) {
  const flip = direction === 'right' ? 'scale-x-[-1]' : '';
  return (
    <svg viewBox="0 0 60 16" aria-hidden="true" className={`w-14 sm:w-20 h-4 ${flip}`}>
      <path d="M2,8 Q15,8 28,8 Q40,8 56,8" stroke="rgba(45,106,79,0.55)" strokeWidth="0.8" fill="none" />
      <ellipse cx="14" cy="6"  rx="3.2" ry="1.6" fill="#5E9456" opacity="0.85" transform="rotate(-15 14 6)" />
      <ellipse cx="22" cy="10" rx="3"   ry="1.5" fill="#88B580" opacity="0.78" transform="rotate(15 22 10)" />
      <ellipse cx="32" cy="6"  rx="3.4" ry="1.7" fill="#5E9456" opacity="0.82" transform="rotate(-15 32 6)" />
      <ellipse cx="42" cy="10" rx="2.8" ry="1.4" fill="#88B580" opacity="0.74" transform="rotate(15 42 10)" />
      <circle  cx="50" cy="8" r="1" fill="#D4AF37" opacity="0.7" />
    </svg>
  );
}
