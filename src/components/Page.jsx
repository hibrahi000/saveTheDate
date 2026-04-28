import React from 'react';
import BotanicalCorner from './BotanicalCorner';
import GoldSparkles from './GoldSparkles';

/**
 * The "page" — the elegant invitation paper that holds all tiles.
 * Fluidly sized with clamp() so it looks right on iPhone, Android, iPad and MacBook.
 *
 * Note: the first child (HeroSection) is allowed to break out of the column
 * via negative margins so it can present a full-bleed editorial cover.
 */
export default function Page({ children, className = '' }) {
  return (
    <div className="min-h-screen w-full bg-ivory relative overflow-x-hidden">
      {/* Subtle paper texture overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.4) 1px, transparent 1px)',
          backgroundSize: '4px 4px, 6px 6px',
          backgroundPosition: '0 0, 2px 3px',
          zIndex: 1,
        }}
      />

      {/* The invitation column — fluid width across all devices */}
      <main
        className={`relative mx-auto ${className}`}
        style={{
          // 100% on small phones, capped at 720px on tablets/laptops
          width: 'min(100%, 720px)',
          paddingLeft:  'clamp(16px, 4vw, 36px)',
          paddingRight: 'clamp(16px, 4vw, 36px)',
          paddingTop:    'clamp(36px, 6vh, 56px)',
          paddingBottom: 'clamp(36px, 6vh, 56px)',
        }}
      >
        {/* Eucalyptus + gold-sparkle decorations */}
        <BotanicalCorner position="tl" size="md" className="-translate-x-3 -translate-y-1 z-20" />
        <BotanicalCorner position="br" size="lg" className="translate-x-4 translate-y-2 z-10" />

        {/* Subtle gold sparkles scattered through the page */}
        <GoldSparkles density={22} />

        {/* Content stack — fluid gaps */}
        <div
          className="relative z-10 flex flex-col items-stretch"
          style={{ rowGap: 'clamp(40px, 8vh, 80px)' }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
