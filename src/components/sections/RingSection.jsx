import React from 'react';
import Tile from '../Tile';
import IsolatedRing from '../IsolatedRing';

/**
 * Centered rotating, shimmering ring on the cream/ivory background.
 * White background of source image is removed at runtime via canvas.
 */
export default function RingSection() {
  return (
    <Tile delay={0.4} className="flex flex-col items-center">
      <div className="w-44 sm:w-56 md:w-64">
        <IsolatedRing />
      </div>
    </Tile>
  );
}
