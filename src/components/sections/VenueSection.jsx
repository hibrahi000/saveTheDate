import React from 'react';
import { useSelector } from 'react-redux';
import Tile from '../Tile';
import BackdropPhoto from '../BackdropPhoto';

/**
 * Venue tile — frames the elegant reception photo. Venue NAME is intentionally
 * not displayed; only the city/state is given.
 */
export default function VenueSection() {
  const { venue } = useSelector(s => s.wedding);

  return (
    <Tile delay={0.6} className="flex flex-col items-center text-center">
      {/* Framed reception photo */}
      <div className="w-full max-w-[460px] aspect-[3/2] rounded-sm overflow-hidden shadow-tile-deep border border-forest/20">
        <BackdropPhoto mode="frame" src="/dinnerTable.png" className="w-full h-full" />
      </div>

      <p
        className="mt-6 font-sans font-medium uppercase text-forest-700/70"
        style={{ fontSize: 'clamp(8px, 1.5vw, 12px)', letterSpacing: '0.42em' }}
      >
        the celebration will be held in
      </p>

      <h3
        className="mt-3 font-serif text-forest uppercase"
        style={{ fontSize: 'clamp(1.5rem, 6vw, 2.6rem)', letterSpacing: '0.12em' }}
      >
        {venue.city}
      </h3>

      <p
        className="mt-1 font-elegant italic text-forest-700"
        style={{ fontSize: 'clamp(1rem, 2.6vw, 1.25rem)' }}
      >
        {venue.state}
      </p>
    </Tile>
  );
}
