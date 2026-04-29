import React from 'react';
import { useSelector } from 'react-redux';
import Tile from '../Tile';
import Divider from '../Divider';
import BackdropPhoto from '../BackdropPhoto';

/**
 * Editorial-cover hero — fully responsive.
 *
 *   ┌────────────────────────┐
 *   │                        │
 *   │   chapel photo (75%)   │
 *   │                        │
 *   ├────────────────────────┤   ← dissolves into ivory
 *   │  TOGETHER WITH …       │
 *   │      SAVE              │
 *   │       the              │
 *   │      DATE              │
 *   │   ─── ◆ ───            │
 *   └────────────────────────┘
 *
 * Sized with 100svh (small viewport, accounts for mobile browser chrome) and
 * clamped above + below so it looks balanced on phones, tablets, and laptops.
 */
export default function HeroSection() {
  const w = useSelector(s => s.wedding);

  return (
    <Tile
      delay={0.1}
      noFade
      className="
        -mt-12 sm:-mt-14 -mx-5 sm:-mx-8
        relative
        h-[100svh] min-h-[600px] max-h-[920px]
      "
    >
      {/* Empty-chapel photo backdrop (top 75% of hero, dissolves to ivory) */}
      <BackdropPhoto mode="hero" src={w.heroBackdropSrc} />

      {/* Photo occupies the top 75%, typography lives in the bottom 25% */}
      <div className="absolute inset-0 grid grid-rows-[72%_28%] z-10">
        <div /> {/* spacer for photo */}

        {/* Typography row */}
        <div className="flex flex-col items-center justify-end px-5 sm:px-8 pb-4 text-center">
          <p
            className="font-sans font-semibold uppercase text-forest-800/80"
            style={{
              fontSize: 'clamp(9px, 1.6vw, 12px)',
              letterSpacing: '0.42em',
            }}
          >
            {w.inviteEyebrow}
          </p>

          <h1
            className="font-serif font-light text-ink leading-[0.95] mt-3 sm:mt-4"
            style={{ letterSpacing: '0.16em' }}
          >
            <span
              className="block uppercase"
              style={{ fontSize: 'clamp(2.4rem, 11vw, 5.6rem)' }}
            >
              SAVE
            </span>
            <span
              className="block font-script text-champagne my-1 normal-case"
              style={{ fontSize: 'clamp(1.5rem, 6.5vw, 3.2rem)', letterSpacing: 'normal' }}
            >
              the
            </span>
            <span
              className="block uppercase"
              style={{ fontSize: 'clamp(2.4rem, 11vw, 5.6rem)' }}
            >
              DATE
            </span>
          </h1>

          <div className="mt-4 sm:mt-5 w-full">
            <Divider variant="gold" width="sm" />
          </div>
        </div>
      </div>
    </Tile>
  );
}
