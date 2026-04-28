import React from 'react';

/**
 * A scatter of subtle gold dots across an area (use absolutely-positioned).
 */
export default function GoldSparkles({ density = 18, className = '' }) {
  const dots = React.useMemo(() => {
    return Array.from({ length: density }, (_, i) => ({
      id: i,
      left:  Math.random() * 100,
      top:   Math.random() * 100,
      size:  0.5 + Math.random() * 2.2,
      delay: Math.random() * 3,
      dur:   2.4 + Math.random() * 2.6,
      tone:  Math.random() > 0.6 ? '#F2DFA0' : '#D4AF37',
      opacity: 0.35 + Math.random() * 0.5,
    }));
  }, [density]);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {dots.map(d => (
        <span
          key={d.id}
          className="absolute rounded-full animate-sparkle"
          style={{
            left: `${d.left}%`,
            top:  `${d.top}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            background: d.tone,
            opacity: d.opacity,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
            boxShadow: `0 0 ${d.size * 3}px ${d.tone}`,
          }}
        />
      ))}
    </div>
  );
}
