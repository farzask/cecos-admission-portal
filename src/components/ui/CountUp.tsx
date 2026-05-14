import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
type Props = {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
};
export function CountUp({
  to,
  duration = 1200,
  suffix = '',
  className
}: Props) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) {
      setVal(to);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setVal(Math.round(to * eased));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      {
        threshold: 0.4
      }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [to, duration, reduce]);
  return (
    <span ref={ref} className={`num ${className ?? ''}`}>
      {val}
      {suffix}
    </span>);

}