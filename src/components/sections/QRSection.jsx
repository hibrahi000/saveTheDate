import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { QRCodeSVG } from 'qrcode.react';
import Tile from '../Tile';
import Divider from '../Divider';

/**
 * QRSection
 * ─────────
 * A clickable QR-code card. Users (especially guests reading on a desktop)
 * can scan the QR with their phone to open the invite, OR tap the card to
 * use the native Web Share API (or copy the link as a fallback).
 *
 * Design notes:
 *  • QR code is rendered via qrcode.react as inline SVG → no network calls
 *  • Embedded center logo (◆) for an elegant brand touch
 *  • Tap state shows "Link copied!" toast for ~2 s
 */
export default function QRSection() {
  const { siteUrl, bride, groom, hashtag } = useSelector(s => ({
    siteUrl: s.wedding.siteUrl,
    bride:   s.wedding.bride,
    groom:   s.wedding.groom,
    hashtag: s.wedding.rsvp.hashtag,
  }));

  // Use the actual location at runtime so the QR always points to the live page,
  // even before the user has set siteUrl. Configured siteUrl wins when truthy.
  const [resolvedUrl, setResolvedUrl] = useState(siteUrl);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setResolvedUrl(siteUrl || window.location.origin);
    }
  }, [siteUrl]);

  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Save the Date · ${bride} & ${groom}`,
          text: `${bride} & ${groom} are getting married! Save the date.`,
          url: resolvedUrl,
        });
        return;
      } catch { /* user cancelled — fall through to copy */ }
    }
    try {
      await navigator.clipboard.writeText(resolvedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <Tile delay={0.4} className="text-center">
      <p
        className="font-sans font-medium uppercase text-forest-700/70"
        style={{ fontSize: 'clamp(8px, 1.5vw, 12px)', letterSpacing: '0.42em' }}
      >
        Share the celebration
      </p>

      <Divider variant="forest" width="xs" symbol="◆" className="mt-3" />

      <button
        type="button"
        onClick={onShare}
        aria-label="Share or copy invitation link"
        className="
          group relative mt-6 inline-flex flex-col items-center gap-3
          p-5 sm:p-6
          bg-ivory border border-forest/20 rounded-sm
          shadow-tile hover:shadow-tile-deep
          transition-all duration-300
          hover:scale-[1.02] active:scale-100
          focus-visible:outline-2 focus-visible:outline focus-visible:outline-champagne/60 focus-visible:outline-offset-4
          cursor-pointer
        "
      >
        {/* The QR code */}
        <div className="relative">
          <QRCodeSVG
            value={resolvedUrl}
            size={196}
            level="H"
            bgColor="#FAF6E9"
            fgColor="#1E4020"
            includeMargin={false}
            imageSettings={{
              src:
                'data:image/svg+xml;utf8,' +
                encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                     <circle cx="12" cy="12" r="11" fill="#FAF6E9" stroke="#D4AF37" stroke-width="1.5"/>
                     <text x="12" y="16" text-anchor="middle" font-family="serif" font-size="13" fill="#D4AF37" font-weight="700">F&amp;H</text>
                   </svg>`
                ),
              height: 32,
              width: 32,
              excavate: true,
            }}
          />
          {/* Champagne corner decorations */}
          <span aria-hidden="true" className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-champagne" />
          <span aria-hidden="true" className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-champagne" />
          <span aria-hidden="true" className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-champagne" />
          <span aria-hidden="true" className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-champagne" />
        </div>

        <div>
          <p
            className="font-serif text-forest"
            style={{ fontSize: 'clamp(0.95rem, 2.4vw, 1.15rem)', letterSpacing: '0.08em' }}
          >
            Scan or tap to share
          </p>
          <p
            className="mt-1 font-elegant italic text-ink-muted"
            style={{ fontSize: 'clamp(0.78rem, 1.7vw, 0.9rem)' }}
          >
            {hashtag}
          </p>
        </div>

        {/* Copied toast */}
        <span
          aria-live="polite"
          className={`
            absolute -top-3 left-1/2 -translate-x-1/2
            px-3 py-1 rounded-full
            bg-forest text-ivory font-sans
            text-[10px] tracking-[0.18em] uppercase
            shadow-tile pointer-events-none
            transition-all duration-300
            ${copied ? 'opacity-100 -translate-y-1' : 'opacity-0'}
          `}
        >
          Link copied
        </span>
      </button>
    </Tile>
  );
}
