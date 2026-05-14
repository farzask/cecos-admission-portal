import React from 'react';
import { UserPlus, ListChecks, CreditCard } from 'lucide-react';
import { useT } from '../lib/i18n';
import { Reveal } from './ui/Reveal';
export function HowItWorks() {
  const { t } = useT();
  const steps = [
  {
    icon: UserPlus,
    t: t('how.1.t'),
    d: t('how.1.d')
  },
  {
    icon: ListChecks,
    t: t('how.2.t'),
    d: t('how.2.d')
  },
  {
    icon: CreditCard,
    t: t('how.3.t'),
    d: t('how.3.d')
  }];

  return (
    <section id="how" className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <div className="max-w-[680px] mb-12 md:mb-14">
            <div className="text-[#666666] text-[13px] uppercase tracking-[0.14em] font-medium mb-3 keep-ltr">
              {t('how.title')}
            </div>
            <h2 className="display-tight font-semibold text-black text-[34px] md:text-[46px] tracking-tight">
              Three steps. About <span className="num">5</span> minutes.
            </h2>
            <p className="mt-4 text-[#666666] text-[16px] md:text-[18px]">
              No paperwork, no waiting in line. The whole application fits on
              your phone.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 relative">
          {/* Connector line on desktop */}
          <div
            className="hidden md:block absolute top-[34px] left-[10%] right-[10%] h-px bg-[#E5E7EB]"
            aria-hidden />
          

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative">
                  <div className="relative w-[68px] h-[68px] rounded-2xl bg-black text-white grid place-items-center">
                    <Icon className="w-6 h-6" />
                    <span className="num absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#a81e24] text-white text-[12px] font-semibold grid place-items-center border-2 border-white">
                      {i + 1}
                    </span>
                  </div>
                  <div className="mt-5 font-semibold text-black text-[18px]">
                    {s.t}
                  </div>
                  <div className="mt-2 text-[14px] text-[#666666] leading-relaxed max-w-[320px]">
                    {s.d}
                  </div>
                </div>
              </Reveal>);

          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 md:mt-16 p-6 md:p-8 rounded-[24px] bg-[#F6F4F2] border border-[#E5E7EB] max-w-[820px]">
            <p className="text-black text-[16px] md:text-[18px] leading-relaxed">
              {t('how.closer')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>);

}