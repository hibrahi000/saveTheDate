import React from 'react';
import { useSelector } from 'react-redux';
import Tile from '../Tile';
import Divider from '../Divider';

export default function DateSection() {
  const { dateShort, dayName, timeText } = useSelector(s => s.wedding);
  return (
    <Tile delay={0.5} className="text-center">
      <Divider variant="gold" width="xs" symbol="◆" className="mb-4" />
      <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-forest-800/70">
        {dayName}
      </p>
      <h3 className="mt-3 font-serif text-3xl sm:text-5xl tracking-[0.14em] text-ink">
        {dateShort}
      </h3>
      <p className="mt-3 font-elegant italic text-forest-700 text-sm sm:text-base">
        {timeText}
      </p>
      <Divider variant="gold" width="xs" symbol="◆" className="mt-5" />
    </Tile>
  );
}
