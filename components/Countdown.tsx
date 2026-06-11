'use client';

import React, { useEffect, useState } from 'react';
import { useT } from '../lib/i18n';
import { useReducedMotion } from 'framer-motion';

type Props = {
  target: Date;
  label?: string;
  subtitle?: string;
};

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor(ms / (1000 * 60 * 60) % 24);
  const minutes = Math.floor(ms / (1000 * 60) % 60);
  const seconds = Math.floor(ms / 1000 % 60);
  return {
    days,
    hours,
    minutes,
    seconds
  };
}

export function Countdown({ target, label, subtitle }: Props) {
  const { t } = useT();
  // Start from a neutral value so the server-rendered HTML matches the first
  // client render (avoids a hydration mismatch from the live `Date.now()`).
  // The real countdown is computed on the client right after mount.
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const update = () => setTime(diff(target));
    const raf = requestAnimationFrame(update);
    const id = setInterval(update, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, [target]);

  const display = time ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const blocks = [
    {
      v: display.days,
      label: t('cd.days')
    },
    {
      v: display.hours,
      label: t('cd.hours')
    },
    {
      v: display.minutes,
      label: t('cd.minutes')
    },
    {
      v: display.seconds,
      label: t('cd.seconds')
    }];

  return (
    <div className="bg-white/[0.06] border border-white/10 rounded-[24px] p-5 md:p-6">
      <div className="text-white/60 text-[13px] uppercase tracking-[0.14em] mb-3">
        {label ?? t('cd.label')}
      </div>
      <div
        className="grid grid-cols-4 gap-2 md:gap-3"
        aria-live={reduce ? 'off' : 'polite'}>

        {blocks.map((b) =>
          <div
            key={b.label}
            className="bg-[#1A1612]/40 border border-white/5 rounded-2xl py-3 md:py-4 text-center">

            <div className="num text-white text-[28px] md:text-[36px] font-semibold leading-none tabular-nums">
              {String(b.v).padStart(2, '0')}
            </div>
            <div className="text-white/55 text-[11px] md:text-[12px] mt-2 uppercase tracking-wider">
              {b.label}
            </div>
          </div>
        )}
      </div>
      <div className="text-white/55 text-[13px] mt-4">{subtitle ?? t('cd.sub')}</div>
    </div>);

}