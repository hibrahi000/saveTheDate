import React from 'react';

/**
 * Tinted Ashton Gardens chapel backdrop.
 *
 * Two source files supported:
 *  - HERO PHOTO  : /ashton_garden_backdrop.jpg  — wide-angle empty chapel (no people)
 *  - VENUE PHOTO : /backdrop.png                 — original photo with the couple (used in venue tile)
 *
 * Modes:
 *  - 'hero'  — magazine cover backdrop. Shows the new empty-chapel photo, dissolves
 *              gracefully into ivory at the bottom so typography reads cleanly.
 *  - 'soft'  — washed-out, full-bleed accent
 *  - 'rich'  — fuller saturation
 *  - 'frame' — clean framed card (couple photo)
 */
export default function DinnerTable({ mode = 'soft', className = '', children, src }) {
  if (mode === 'hero') {
    // The new empty-chapel photo composes beautifully on its own — no aggressive
    // cropping needed. We frame the upper portion and dissolve to ivory at the bottom.
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
        <img
          src={src || '/ashton_garden_backdrop.jpg'}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: 'center 32%',
            // Dissolve photo into ivory in the lower half so typography sits on clean ground
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0) 100%)',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0) 100%)',
          }}
        />
        {/* Soft ivory wash to keep the photo desaturated into the palette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(250,246,233,0.10) 0%, rgba(250,246,233,0.20) 45%, rgba(250,246,233,0.85) 78%, rgba(250,246,233,1) 100%)',
          }}
        />
        {/* Champagne vignette for that printed-on-paper feel */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 35%, transparent 50%, rgba(170,140,90,0.18) 100%)',
          }}
        />
        {children}
      </div>
    );
  }

  // Other modes (frame / soft / rich) — typically use the original photo with couple
  const filterClass = {
    soft:  'opacity-25 saturate-75 contrast-95 blur-[1px]',
    rich:  'opacity-90 saturate-110',
    frame: 'opacity-100',
  }[mode] || '';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src || '/backdrop.png'}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover ${filterClass}`}
        style={{ objectPosition: 'center 20%' }}
      />
      {/* Mask Pinterest button on the legacy backdrop.png */}
      {(mode === 'frame' || mode === 'soft') && (!src || src === '/backdrop.png') && (
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-32 h-12"
          style={{
            background:
              'linear-gradient(135deg, rgba(250,246,233,1) 60%, rgba(250,246,233,0) 100%)',
          }}
        />
      )}
      {mode === 'soft' && (
        <div aria-hidden="true" className="absolute inset-0" style={{ background: 'rgba(250,246,233,0.45)' }} />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
