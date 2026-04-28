import React from 'react';

/**
 * Elegant gold rule with center diamond/dot ornament.
 * Variants:
 *  - 'gold'   (default) — gold gradient
 *  - 'forest' — forest green
 *  - 'ivory'  — ivory (use on dark backgrounds)
 */
const COLOR = {
  gold:   { line: 'via-champagne/60',  dot: 'text-champagne' },
  forest: { line: 'via-forest-600/40', dot: 'text-forest-700' },
  ivory:  { line: 'via-ivory/50',      dot: 'text-ivory' },
};

export default function Divider({ variant = 'gold', width = 'sm', symbol = '◆', className = '' }) {
  const widthClass = {
    xs: 'max-w-[140px]',
    sm: 'max-w-[260px]',
    md: 'max-w-[360px]',
    lg: 'max-w-[460px]',
  }[width];
  const c = COLOR[variant] || COLOR.gold;
  return (
    <div className={`flex items-center gap-2 w-full ${widthClass} mx-auto ${className}`}>
      <span className={`flex-1 h-px bg-gradient-to-r from-transparent ${c.line} to-transparent`} />
      <span className={`text-[8px] ${c.dot} opacity-70`}>{symbol}</span>
      <span className={`flex-1 h-px bg-gradient-to-r from-transparent ${c.line} to-transparent`} />
    </div>
  );
}
