import React from 'react';
import { useSelector } from 'react-redux';
import Tile from '../Tile';
import { useCountdown } from '../../hooks/useCountdown';

const Cell = ({ value, label }) => (
  <div className="flex flex-col items-center min-w-[58px] sm:min-w-[72px]">
    <span className="font-serif text-3xl sm:text-4xl text-ink leading-none tabular-nums">
      {String(value).padStart(2, '0')}
    </span>
    <span className="mt-2 font-sans text-[9px] sm:text-[10px] tracking-[0.28em] text-forest-700/70 uppercase">
      {label}
    </span>
  </div>
);

export default function CountdownSection() {
  const { dateISO } = useSelector(s => s.wedding);
  const { days, hours, minutes, seconds, isPast } = useCountdown(dateISO);

  if (isPast) {
    return (
      <Tile delay={0.7} className="text-center">
        <p className="font-elegant italic text-2xl text-forest-700">Today is the day. ✨</p>
      </Tile>
    );
  }

  return (
    <Tile delay={0.7} variant="cream" className="px-6 py-7 sm:px-10 sm:py-9">
      <p className="text-center font-sans text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-forest-800/70 mb-5">
        until we say "I do"
      </p>
      <div className="flex items-start justify-center gap-3 sm:gap-6">
        <Cell value={days}    label="Days" />
        <span className="font-serif text-2xl sm:text-3xl text-champagne/60 mt-1">:</span>
        <Cell value={hours}   label="Hours" />
        <span className="font-serif text-2xl sm:text-3xl text-champagne/60 mt-1">:</span>
        <Cell value={minutes} label="Min" />
        <span className="font-serif text-2xl sm:text-3xl text-champagne/60 mt-1">:</span>
        <Cell value={seconds} label="Sec" />
      </div>
    </Tile>
  );
}
