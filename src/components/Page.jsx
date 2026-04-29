import React from 'react';
import BotanicalCorner from './BotanicalCorner';
import GoldSparkles from './GoldSparkles';

/**
 * The "page" — the elegant invitation paper that holds all tiles.
 * Fluidly sized with clamp() so it looks right on iPhone, Android, iPad and MacBook.
 *
 * Backdrop: a layered ivory + sage-green watercolor wash for editorial depth.
 */
export default function Page({ children, className = '' }) {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-ivory">
      {/* Layered organic green watercolor wash — adds depth + ties to the chapel forest */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          background: [
            // Sage wash top-left
            'radial-gradient(ellipse 800px 600px at 0% 10%, rgba(45,106,79,0.07) 0%, transparent 70%)',
            // Forest wash bottom-right
            'radial-gradient(ellipse 900px 700px at 100% 90%, rgba(30,64,32,0.08) 0%, transparent 65%)',
            // Champagne wash mid
            'radial-gradient(ellipse 600px 500px at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)',
          ].join(','),
          zIndex: 0,
        }}
      />

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

      {/* The invitation column */}
      <main
        className={`relative mx-auto ${className}`}
        style={{
          width: 'min(100%, 720px)',
          paddingLeft:  'clamp(16px, 4vw, 36px)',
          paddingRight: 'clamp(16px, 4vw, 36px)',
          paddingTop:    'clamp(36px, 6vh, 56px)',
          paddingBottom: 'clamp(36px, 6vh, 56px)',
          zIndex: 2,
        }}
      >
        {/* Eucalyptus + gold-sparkle decorations */}
        <BotanicalCorner position="tl" size="md" className="-translate-x-3 -translate-y-1 z-20" />
        <BotanicalCorner position="tr" size="sm" className="opacity-60 z-10" />
        <BotanicalCorner position="bl" size="sm" className="opacity-60 z-10" />
        <BotanicalCorner position="br" size="lg" className="translate-x-4 translate-y-2 z-10" />

        {/* Subtle gold sparkles */}
        <GoldSparkles density={22} />

        {/* Content stack */}
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
