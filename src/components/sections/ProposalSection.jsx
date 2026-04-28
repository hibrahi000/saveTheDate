import React from 'react';
import { useSelector } from 'react-redux';
import Tile from '../Tile';
import Divider from '../Divider';

/**
 * Polaroid-style proposal photo (cruise).
 *
 * Auto-hides when proposalPhoto.src is null.
 * To enable:
 *   1. Drop the photo at /public/proposal.jpg (or .webp/.png)
 *   2. In src/store/weddingSlice.js set:
 *        proposalPhoto: { src: '/proposal.jpg', caption: '...', sublabel: '...', rotation: -3 }
 */
export default function ProposalSection() {
  const proposal = useSelector(s => s.wedding.proposalPhoto);

  if (!proposal?.src) {
    // Render a tasteful placeholder slot so the section is wired up but invisible
    // until a photo is provided. We use a dashed elegant frame on dev builds only,
    // and nothing on production.
    if (import.meta.env.DEV) {
      return (
        <Tile delay={0.45} className="text-center">
          <div className="mx-auto max-w-[300px] aspect-[4/5] border border-dashed border-champagne/40 rounded-sm grid place-items-center">
            <div className="px-4">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-forest-700/60">
                Proposal photo
              </p>
              <p className="font-elegant italic text-ink-muted text-sm mt-2">
                Add /public/proposal.jpg and set src in weddingSlice
              </p>
            </div>
          </div>
        </Tile>
      );
    }
    return null;
  }

  return (
    <Tile delay={0.45} className="text-center">
      <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.42em] text-forest-700/70 uppercase">
        How it began
      </p>

      <div className="mt-6 flex justify-center">
        <div
          className="relative bg-white p-3 sm:p-4 pb-12 sm:pb-14 shadow-tile-deep
                     w-[clamp(220px,72vw,360px)] aspect-[4/5]
                     transition-transform duration-700 hover:rotate-0"
          style={{ transform: `rotate(${proposal.rotation || -3}deg)` }}
        >
          <img
            src={proposal.src}
            alt={proposal.caption || 'Proposal'}
            className="w-full h-[calc(100%-2.5rem)] object-cover"
          />
          {/* Polaroid caption */}
          <p className="absolute bottom-2 sm:bottom-3 left-0 right-0 text-center
                        font-script text-ink-soft text-xl sm:text-2xl">
            {proposal.caption}
          </p>

          {/* Tape accent */}
          <span
            aria-hidden="true"
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-champagne/30
                       rotate-1 rounded-[2px] shadow-sm"
          />
        </div>
      </div>

      {proposal.sublabel && (
        <p className="mt-6 font-elegant italic text-base sm:text-lg text-forest-700">
          {proposal.sublabel}
        </p>
      )}

      <Divider variant="gold" width="xs" className="mt-6" />
    </Tile>
  );
}
