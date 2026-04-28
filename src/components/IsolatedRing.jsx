import React, { useEffect, useRef, useState } from 'react';
import { useElementScrollProgress } from '../hooks/useScrollProgress';

/**
 * IsolatedRing
 * ─────────────
 * 1. Loads /ring.png and removes the white background pixel-by-pixel via canvas.
 * 2. **No rotation** — the ring is held still.
 * 3. **Scroll-into-view shine**: the shine intensity ramps UP as the ring scrolls
 *    INTO the viewport, peaks when the ring is centered, then ramps DOWN as it
 *    scrolls past. Driven by useElementScrollProgress + a sin(πp) curve so the
 *    apex is exactly at center-of-view.
 *
 * Props:
 *  - whiteThreshold (default 232) — anything ≥ this in all RGB channels is treated as background
 *  - softness        (default 24) — feathering window above the threshold
 *  - className       — extra classes for the wrapper
 */
export default function IsolatedRing({
  whiteThreshold = 232,
  softness       = 24,
  className      = '',
}) {
  const wrapRef = useRef(null);
  const [src, setSrc]     = useState(null);
  const [error, setError] = useState(null);
  const cacheKey  = `ring_isolated_v3_${whiteThreshold}_${softness}`;
  const cancelled = useRef(false);

  // Element-in-view progress: 0 (just below viewport) → 0.5 (centered) → 1 (just past top)
  const elementProgress = useElementScrollProgress(wrapRef);

  // Bell curve: 0 at edges, 1 at center
  const intensity = Math.sin(Math.min(1, Math.max(0, elementProgress)) * Math.PI);

  // ─── Background removal (cached in sessionStorage) ───
  useEffect(() => {
    cancelled.current = false;
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) { setSrc(cached); return; }
    } catch { /* ignore */ }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/ring.png';
    img.onload = () => {
      if (cancelled.current) return;
      try {
        const w = img.naturalWidth, h = img.naturalHeight;
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          const minRGB = Math.min(r, g, b);
          if (minRGB >= whiteThreshold + softness) {
            data[i + 3] = 0;
          } else if (minRGB >= whiteThreshold) {
            const t = (minRGB - whiteThreshold) / softness;
            data[i + 3] = Math.round(data[i + 3] * (1 - t));
          }
        }
        ctx.putImageData(imgData, 0, 0);
        const url = canvas.toDataURL('image/png');
        if (!cancelled.current) {
          setSrc(url);
          try { sessionStorage.setItem(cacheKey, url); } catch { /* over quota */ }
        }
      } catch (e) {
        setError(e.message);
      }
    };
    img.onerror = () => { if (!cancelled.current) setError('Failed to load /ring.png'); };
    return () => { cancelled.current = true; };
  }, [whiteThreshold, softness, cacheKey]);

  // Shine values driven by intensity
  const shine = {
    glowBlur:  10 + 44 * intensity,        // px
    glowAlpha: 0.20 + 0.65 * intensity,    // 0..1
    bright:    1 + 0.26 * intensity,
    contrast:  1 + 0.10 * intensity,
    haloOp:    0.40 + 0.55 * intensity,
    sweepOp:   0.35 + 0.65 * intensity,
  };

  return (
    <div ref={wrapRef} className={`relative inline-block select-none ${className}`}>
      {/* Champagne radial halo — intensifies near center-of-view */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 blur-2xl scale-110"
        style={{
          opacity: shine.haloOp,
          background:
            'radial-gradient(circle at 50% 55%, rgba(212,175,55,0.5) 0%, rgba(212,175,55,0.22) 40%, transparent 75%)',
          transition: 'opacity 0.18s ease-out',
        }}
      />

      {src ? (
        <div className="relative w-full h-full">
          <img
            src={src}
            alt="Engagement ring"
            draggable="false"
            className="block w-full h-auto"
            style={{
              filter:
                `drop-shadow(0 14px 32px rgba(20,20,30,0.30)) ` +
                `drop-shadow(0 0 ${shine.glowBlur}px rgba(255,255,255,${shine.glowAlpha})) ` +
                `brightness(${shine.bright}) contrast(${shine.contrast})`,
              transition: 'filter 0.18s ease-out',
            }}
          />
          {/* Continuous shine sweep, masked to the ring shape; intensity scales with view */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 ring-shine-overlay"
            style={{
              opacity: shine.sweepOp,
              transition: 'opacity 0.18s ease-out',
              WebkitMaskImage: `url(${src})`,
              maskImage: `url(${src})`,
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          />
        </div>
      ) : (
        <div className="aspect-square w-full grid place-items-center">
          <div className="w-12 h-12 rounded-full border-2 border-champagne border-t-transparent animate-spin opacity-50" />
        </div>
      )}

      {error && <p className="text-xs text-ink-muted mt-2">Ring image error: {error}</p>}
    </div>
  );
}
