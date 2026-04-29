import React from 'react';
import { useInView } from '../hooks/useInView';

/**
 * Reusable elegant tile/section.
 *
 * Each tile:
 *  • emits a [data-section] attribute (used by the SectionNavigator)
 *  • fades in from translateY(28px) when it enters the viewport, like an app card
 *
 * Variants:
 *  - 'plain'    : transparent, no border (default)
 *  - 'glass'    : subtle ivory glass card
 *  - 'cream'    : solid cream card with soft shadow
 *  - 'forest'   : deep forest green card with cream text
 *  - 'ink'      : black card with gold text
 */
const VARIANTS = {
  plain:  '',
  glass:  'glass-ivory rounded-sm shadow-tile',
  cream:  'bg-cream/80 border border-champagne/20 rounded-sm shadow-tile',
  forest: 'bg-forest text-ivory border border-champagne/30 rounded-sm shadow-tile-deep',
  ink:    'bg-ink text-ivory border border-gold-rich/30 rounded-sm shadow-tile-deep',
};

export default function Tile({
  variant = 'plain',
  className = '',
  children,
  delay = 0,
  as: Tag = 'section',
  id,
  // For the hero (or any full-bleed) you can disable the in-view fade
  noFade = false,
  ...rest
}) {
  const [ref, inView] = useInView({ threshold: 0.12 });

  return (
    <Tag
      ref={ref}
      id={id}
      data-section
      className={`
        relative
        ${VARIANTS[variant] || ''}
        ${className}
        ${noFade ? '' : (inView ? 'card-in' : 'card-out')}
      `}
      style={{
        transitionDelay: noFade ? '0s' : `${delay}s`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
