import React from 'react';

/**
 * Watercolor eucalyptus + gold-sparkle corner ornament.
 * Position: 'tl' | 'tr' | 'bl' | 'br'
 *
 * Built entirely from SVG so it scales cleanly. Uses the project palette.
 */

const ROTATIONS = {
  tl: 'rotate-0',
  tr: 'rotate-90',
  br: 'rotate-180',
  bl: '-rotate-90',
};
const POSITIONS = {
  tl: 'top-0 left-0',
  tr: 'top-0 right-0',
  br: 'bottom-0 right-0',
  bl: 'bottom-0 left-0',
};

export default function BotanicalCorner({ position = 'tl', size = 'lg', className = '' }) {
  const sizeClasses = {
    sm: 'w-28 h-28',
    md: 'w-40 h-40',
    lg: 'w-56 h-56 sm:w-64 sm:h-64',
    xl: 'w-72 h-72 sm:w-80 sm:h-80',
  }[size];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${POSITIONS[position]} ${sizeClasses} ${ROTATIONS[position]} ${className}`}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id={`bcLeaf-${position}`} cx="35%" cy="30%" r="80%">
            <stop offset="0%"  stopColor="#9FC79A" />
            <stop offset="55%" stopColor="#5E9456" />
            <stop offset="100%" stopColor="#2F5C2A" />
          </radialGradient>
          <radialGradient id={`bcLeafLt-${position}`} cx="35%" cy="30%" r="80%">
            <stop offset="0%"  stopColor="#C4DBB7" />
            <stop offset="55%" stopColor="#88B580" />
            <stop offset="100%" stopColor="#5E9456" />
          </radialGradient>
          <linearGradient id={`bcStem-${position}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor="#3F6E40" />
            <stop offset="100%" stopColor="#5E9456" />
          </linearGradient>
        </defs>

        {/* Main stem */}
        <path
          d="M0,0 Q35,30 60,55 Q90,90 120,130 Q140,160 165,185"
          stroke={`url(#bcStem-${position})`}
          strokeWidth="1.4"
          fill="none"
          opacity="0.7"
        />
        {/* Secondary stem */}
        <path
          d="M0,18 Q40,55 75,75 Q105,95 145,120"
          stroke={`url(#bcStem-${position})`}
          strokeWidth="1.0"
          fill="none"
          opacity="0.55"
        />

        {/* Eucalyptus leaves — paired sets along the stem */}
        {/* Cluster 1 — top-left (corner) */}
        <g>
          <ellipse cx="14"  cy="6"   rx="14" ry="7"  fill={`url(#bcLeaf-${position})`}    transform="rotate(-25 14 6)"   opacity="0.92"/>
          <ellipse cx="6"   cy="22"  rx="13" ry="6.5" fill={`url(#bcLeafLt-${position})`} transform="rotate(-50 6 22)"   opacity="0.85"/>
          <ellipse cx="28"  cy="14"  rx="11" ry="6"  fill={`url(#bcLeaf-${position})`}    transform="rotate(15 28 14)"   opacity="0.88"/>
        </g>

        {/* Cluster 2 */}
        <g>
          <ellipse cx="42"  cy="38"  rx="16" ry="8"  fill={`url(#bcLeaf-${position})`}    transform="rotate(-30 42 38)"  opacity="0.92"/>
          <ellipse cx="32"  cy="55"  rx="14" ry="7"  fill={`url(#bcLeafLt-${position})`} transform="rotate(-55 32 55)"  opacity="0.85"/>
          <ellipse cx="58"  cy="42"  rx="12" ry="6"  fill={`url(#bcLeaf-${position})`}    transform="rotate(20 58 42)"   opacity="0.88"/>
          <ellipse cx="50"  cy="60"  rx="10" ry="5"  fill={`url(#bcLeafLt-${position})`} transform="rotate(-15 50 60)"  opacity="0.78"/>
        </g>

        {/* Cluster 3 */}
        <g>
          <ellipse cx="78"  cy="78"  rx="18" ry="9"  fill={`url(#bcLeaf-${position})`}    transform="rotate(-25 78 78)"  opacity="0.95"/>
          <ellipse cx="68"  cy="98"  rx="15" ry="7"  fill={`url(#bcLeafLt-${position})`} transform="rotate(-55 68 98)"  opacity="0.87"/>
          <ellipse cx="98"  cy="86"  rx="13" ry="6.5" fill={`url(#bcLeaf-${position})`}   transform="rotate(20 98 86)"   opacity="0.9"/>
          <ellipse cx="90"  cy="105" rx="11" ry="5.5" fill={`url(#bcLeafLt-${position})`} transform="rotate(-15 90 105)" opacity="0.78"/>
        </g>

        {/* Cluster 4 — outer */}
        <g>
          <ellipse cx="120" cy="125" rx="17" ry="8.5" fill={`url(#bcLeaf-${position})`}    transform="rotate(-30 120 125)" opacity="0.9"/>
          <ellipse cx="110" cy="145" rx="14" ry="7"   fill={`url(#bcLeafLt-${position})`}  transform="rotate(-55 110 145)" opacity="0.82"/>
          <ellipse cx="140" cy="135" rx="12" ry="6"   fill={`url(#bcLeaf-${position})`}    transform="rotate(20 140 135)"  opacity="0.86"/>
        </g>

        {/* Small accent leaves */}
        <ellipse cx="35"  cy="70"  rx="8" ry="4" fill={`url(#bcLeafLt-${position})`} transform="rotate(-70 35 70)" opacity="0.65"/>
        <ellipse cx="65"  cy="115" rx="7" ry="3.5" fill={`url(#bcLeafLt-${position})`} transform="rotate(-65 65 115)" opacity="0.6"/>
        <ellipse cx="95"  cy="155" rx="6" ry="3" fill={`url(#bcLeafLt-${position})`} transform="rotate(-60 95 155)" opacity="0.55"/>

        {/* Gold dots / sparkles */}
        <g fill="#D4AF37">
          <circle cx="58"  cy="22"  r="1.4" opacity="0.85"/>
          <circle cx="80"  cy="38"  r="1.0" opacity="0.7"/>
          <circle cx="105" cy="62"  r="1.3" opacity="0.8"/>
          <circle cx="130" cy="98"  r="1.1" opacity="0.75"/>
          <circle cx="155" cy="142" r="1.4" opacity="0.85"/>
          <circle cx="22"  cy="52"  r="0.9" opacity="0.6"/>
          <circle cx="48"  cy="92"  r="1.0" opacity="0.65"/>
          <circle cx="72"  cy="138" r="0.9" opacity="0.55"/>
        </g>
        <g fill="#F2DFA0">
          <circle cx="68"  cy="28"  r="0.6" opacity="0.9"/>
          <circle cx="92"  cy="48"  r="0.7" opacity="0.85"/>
          <circle cx="118" cy="78"  r="0.6" opacity="0.8"/>
          <circle cx="40"  cy="65"  r="0.5" opacity="0.7"/>
        </g>
      </svg>
    </div>
  );
}
