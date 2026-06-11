'use client';

import React, { useMemo } from 'react';
import { useT } from '../lib/i18n';
import { CountUp } from './ui/CountUp';
import { Reveal } from './ui/Reveal';
import { useAdmissionData } from '../lib/AdmissionDataContext';

export function Stats() {
  const { t } = useT();
  const { disciplines, programChoicesCount } = useAdmissionData();

  // Compute dynamic stats from Supabase data, with static fallbacks
  const items = useMemo(() => {
    const hasData = disciplines.length > 0;

    // Count unique group_numbers
    const groupCount = hasData
      ? new Set(disciplines.map((d) => d.group_number)).size
      : 5;

    // Total active programs/disciplines
    const programCount = hasData ? disciplines.length : 40;

    // Program choices per applicant (from cycle)
    const choicesCount = programChoicesCount ?? 3;

    return [
      {
        value: groupCount,
        suffix: '+',
        key: 'stats.1'
      },
      {
        value: programCount,
        suffix: '+',
        key: 'stats.2'
      },
      {
        value: 15,
        suffix: '',
        key: 'stats.3'
      },
      {
        value: choicesCount,
        suffix: '',
        key: 'stats.4'
      }
    ];
  }, [disciplines, programChoicesCount]);

  return (
    <section className="bg-white border-b border-[#E2DBCF]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {items.map((it, i) =>
            <Reveal key={it.key} delay={i * 0.05}>
              <div className="flex flex-col">
                <div className="text-[#1A1612] font-semibold text-[44px] md:text-[56px] leading-none tracking-tight">
                  <CountUp to={it.value} suffix={it.suffix} />
                </div>
                <div className="text-[#5A524A] text-[14px] md:text-[15px] mt-3 max-w-[180px]">
                  {t(it.key)}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}