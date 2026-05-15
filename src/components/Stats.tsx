import React from 'react';
import { useT } from '../lib/i18n';
import { CountUp } from './ui/CountUp';
import { Reveal } from './ui/Reveal';
const items = [
  {
    value: 5,
    suffix: '+',
    key: 'stats.1'
  },
  {
    value: 40,
    suffix: '+',
    key: 'stats.2'
  },
  {
    value: 15,
    suffix: '',
    key: 'stats.3'
  },
  {
    value: 3,
    suffix: '',
    key: 'stats.4'
  }];

export function Stats() {
  const { t } = useT();
  return (
    <section className="bg-white border-b border-[#E5E7EB]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {items.map((it, i) =>
            <Reveal key={it.key} delay={i * 0.05}>
              <div className="flex flex-col">
                <div className="text-black font-semibold text-[44px] md:text-[56px] leading-none tracking-tight">
                  <CountUp to={it.value} suffix={it.suffix} />
                </div>
                <div className="text-[#666666] text-[14px] md:text-[15px] mt-3 max-w-[180px]">
                  {t(it.key)}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}