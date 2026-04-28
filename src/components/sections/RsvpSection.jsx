import React from 'react';
import { useSelector } from 'react-redux';
import Tile from '../Tile';
import Divider from '../Divider';

export default function RsvpSection() {
  const { rsvp, cultural, formalNote } = useSelector(s => s.wedding);

  // Build a proper mailto link with prefilled subject + body
  const mailto = `mailto:${rsvp.email}?subject=${encodeURIComponent(
    rsvp.subject || ''
  )}&body=${encodeURIComponent(rsvp.body || '')}`;

  return (
    <Tile delay={0.8} className="text-center pb-2">
      <p className="font-elegant italic text-base sm:text-lg text-ink-soft leading-relaxed max-w-md mx-auto">
        {cultural}
      </p>

      <Divider variant="gold" width="xs" className="my-6" />

      <a
        href={mailto}
        className="group inline-block relative font-sans text-[10px] sm:text-[11px] tracking-[0.32em] uppercase
                   px-9 py-3.5 border border-champagne text-ink overflow-hidden
                   transition-colors hover:text-ivory"
      >
        <span className="relative z-10">{rsvp.cta}</span>
        <span
          className="absolute inset-0 bg-gradient-to-br from-forest-700 to-forest -translate-x-full
                     transition-transform duration-500 ease-out group-hover:translate-x-0"
        />
      </a>

      <p className="mt-6 font-sans font-semibold text-[11px] sm:text-xs tracking-[0.18em] text-champagne-700">
        {rsvp.hashtag}
      </p>

      <p className="mt-8 font-script text-2xl text-ink-muted">
        {formalNote}
      </p>
    </Tile>
  );
}
