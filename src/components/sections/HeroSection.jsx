import React from 'react';
import { useSelector } from 'react-redux';
import Tile from '../Tile';
import Divider from '../Divider';
import BackdropPhoto from '../BackdropPhoto';

/**
 * Editorial-cover hero — fully responsive.
 *
 * Layout:
 *  - Photo region : ~ top half  → empty chapel image dissolved into ivory
 *  - Type region  : ~ bottom half → "Save the Date" lockup
 *
 * Sized with 100svh (small viewport, accounts for mobile browser chrome) and
 * clamped both above and below so it looks balanced on phones, tablets, and laptops.
 */
export default function HeroSection() {
  const w = useSelector(s => s.wedding);

  return (
    <Tile
      delay={0.1}
      className="
        -mt-12 sm:-mt-14 -mx-5 sm:-mx-8
        relative
        h-[100svh] min-h-[560px] max-h-[920px]
      "
    >
      {/* Empty-chapel photo backdrop */}
      <BackdropPhoto mode="hero" src={w.heroBackdropSrc} />

      {/* Two-row stack: type lives in the lower half, breathing room above + below */}
      <div className="absolute inset-0 grid grid-rows-[55%_45%] z-10">
        {/* Spacer row (photo lives behind it, no content) */}
        <div />

        {/* Typography row */}
        <div className="flex flex-col items-center justify-center px-5 sm:px-8 text-center">
          <p
            className="font-sans font-medium uppercase text-forest-700/80"
            style={{
              fontSize: 'clamp(8px, 1.6vw, 12px)',
              letterSpacing: '0.42em',
            }}
          >
            {w.inviteEyebrow}
          </p>

          <h1
            className="font-serif font-light text-ink leading-[0.96] mt-4 sm:mt-6"
            style={{ letterSpacing: '0.16em' }}
          >
            <span
              className="block uppercase"
              style={{ fontSize: 'clamp(2.4rem, 12vw, 6rem)' }}
            >
              SAVE
            </span>
            <span
              className="block font-script text-champagne my-1 normal-case"
              style={{ fontSize: 'clamp(1.6rem, 7vw, 3.6rem)', letterSpacing: 'normal' }}
            >
              the
            </span>
            <span
              className="block uppercase"
              style={{ fontSize: 'clamp(2.4rem, 12vw, 6rem)' }}
            >
              DATE
            </span>
          </h1>

          <p
            className="font-sans font-medium uppercase text-forest-800/80 mt-4 sm:mt-6"
            style={{
              fontSize: 'clamp(8px, 1.5vw, 12px)',
              letterSpacing: '0.3em',
            }}
          >
            for the wedding of
          </p>

          <div className="mt-5 sm:mt-7 w-full">
            <Divider variant="gold" width="sm" />
          </div>
        </div>
      </div>
    </Tile>
  );
}
