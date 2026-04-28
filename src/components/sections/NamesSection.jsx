import React from 'react';
import { useSelector } from 'react-redux';
import Tile from '../Tile';

export default function NamesSection() {
  const { bride, groom } = useSelector(s => s.wedding);
  return (
    <Tile delay={0.25} className="text-center scroll-mt-8" id="names-section">
      <h2
        className="font-serif text-ink leading-[1.05] uppercase"
        style={{ letterSpacing: '0.18em' }}
      >
        <span
          className="block"
          style={{ fontSize: 'clamp(1.7rem, 8vw, 3.6rem)' }}
        >
          {bride}
        </span>
        <span
          className="block font-script normal-case text-champagne my-1"
          style={{ fontSize: 'clamp(1.6rem, 6vw, 2.6rem)', letterSpacing: 'normal' }}
        >
          &amp;
        </span>
        <span
          className="block"
          style={{ fontSize: 'clamp(1.7rem, 8vw, 3.6rem)' }}
        >
          {groom}
        </span>
      </h2>
    </Tile>
  );
}
