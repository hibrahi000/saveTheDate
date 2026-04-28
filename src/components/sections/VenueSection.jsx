import React from 'react';
import { useSelector } from 'react-redux';
import Tile from '../Tile';
import BackdropPhoto from '../BackdropPhoto';

/**
 * Venue tile — frames the elegant Ashton Gardens reception photo (dinner table).
 */
export default function VenueSection() {
  const { venue } = useSelector(s => s.wedding);

  return (
    <Tile delay={0.6} className="flex flex-col items-center text-center">
      {/* Framed reception photo */}
      <div className="w-full max-w-[460px] aspect-[3/2] rounded-sm overflow-hidden shadow-tile-deep border border-champagne/30">
        <BackdropPhoto mode="frame" src="/dinnerTable.png" className="w-full h-full" />
      </div>

      <p
        className="mt-6 font-sans font-medium uppercase text-forest-800/70"
        style={{ fontSize: 'clamp(8px, 1.5vw, 12px)', letterSpacing: '0.42em' }}
      >
        will be held at
      </p>

      <h3
        className="mt-3 font-serif text-ink uppercase"
        style={{ fontSize: 'clamp(1.4rem, 5.5vw, 2.4rem)', letterSpacing: '0.12em' }}
      >
        {venue.name}
      </h3>

      <p
        className="mt-2 font-elegant italic text-forest-700"
        style={{ fontSize: 'clamp(0.95rem, 2.4vw, 1.2rem)' }}
      >
        {venue.line1}
      </p>
      <p
        className="font-elegant italic text-forest-700"
        style={{ fontSize: 'clamp(0.95rem, 2.4vw, 1.2rem)' }}
      >
        {venue.city}, {venue.state} {venue.zip}
      </p>
    </Tile>
  );
}
