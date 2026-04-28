import React from 'react';

/**
 * Reusable elegant tile/section.
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
  ...rest
}) {
  return (
    <Tag
      id={id}
      className={`relative reveal-on-load ${VARIANTS[variant] || ''} ${className}`}
      style={{ '--reveal-delay': `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
