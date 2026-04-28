import { useEffect, useState } from 'react';

/**
 * Returns { days, hours, minutes, seconds, isPast } for a target ISO date string.
 * Updates once per second.
 */
export function useCountdown(targetISO) {
  const target = new Date(targetISO).getTime();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const isPast = target - now <= 0;

  const days    = Math.floor(diff / 86_400_000);
  const hours   = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1_000);

  return { days, hours, minutes, seconds, isPast };
}
