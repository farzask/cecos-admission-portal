import React from 'react';
import { UserPlus, ListChecks, CreditCard } from 'lucide-react';
import { useT } from '../lib/i18n';
import { Reveal } from './ui/Reveal';
import { useAdmissionData } from '../lib/AdmissionDataContext';

function formatPKR(amount: number): string {
  return amount.toLocaleString('en-PK');
}

export function HowItWorks() {
  const { t, lang } = useT();
  const { ugFee, pgFee } = useAdmissionData();

  // Dynamic fee description for step 3
  const feeDescription = (() => {
    if (ugFee != null && pgFee != null) {
      return lang === 'ur'
        ? `PKR ${formatPKR(ugFee)} (UG) یا PKR ${formatPKR(pgFee)} (PG)، PayPro سے یا کیمپس کاؤنٹر پر۔ رسید ای میل اور واٹس ایپ پر۔`
        : `PKR ${formatPKR(ugFee)} (UG) or PKR ${formatPKR(pgFee)} (PG) via PayPro, or at our campus counter. Receipt by Email & WhatsApp.`;
    }
    if (ugFee != null) {
      return lang === 'ur'
        ? `PKR ${formatPKR(ugFee)} (UG)، PayPro سے یا کیمپس کاؤنٹر پر۔ رسید ای میل اور واٹس ایپ پر۔`
        : `PKR ${formatPKR(ugFee)} (UG) via PayPro, or at our campus counter. Receipt by Email & WhatsApp.`;
    }
    if (pgFee != null) {
      return lang === 'ur'
        ? `PKR ${formatPKR(pgFee)} (PG)، PayPro سے یا کیمپس کاؤنٹر پر۔ رسید ای میل اور واٹس ایپ پر۔`
        : `PKR ${formatPKR(pgFee)} (PG) via PayPro, or at our campus counter. Receipt by Email & WhatsApp.`;
    }
    // Fallback to static i18n text
    return t('how.3.d');
  })();

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
      d: feeDescription
    }];

  return (
    <section id="how" className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <div className="max-w-[680px] mb-12 md:mb-14">
            <div className="text-[#5A524A] text-[13px] uppercase tracking-[0.14em] font-medium mb-3 keep-ltr">
              {t('how.title')}
            </div>
            <h2 className="display-tight font-semibold text-[#1A1612] text-[34px] md:text-[46px] tracking-tight">
              Three steps. About <span className="num">5</span> minutes.
            </h2>
            <p className="mt-4 text-[#5A524A] text-[16px] md:text-[18px]">
              No paperwork, no waiting in line. Simple steps, big opportunities.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 relative">
          {/* Connector line on desktop */}
          <div
            className="hidden md:block absolute top-[34px] left-[10%] right-[10%] h-px bg-[#E2DBCF]"
            aria-hidden />


          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative">
                  <div className="relative w-[68px] h-[68px] rounded-2xl bg-[#7A1818] text-white grid place-items-center">
                    <Icon className="w-6 h-6" />
                    <span className="num absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#7A1818] text-white text-[12px] font-semibold grid place-items-center border-2 border-white">
                      {i + 1}
                    </span>
                  </div>
                  <div className="mt-5 font-semibold text-[#1A1612] text-[18px]">
                    {s.t}
                  </div>
                  <div className="mt-2 text-[14px] text-[#5A524A] leading-relaxed max-w-[320px]">
                    {s.d}
                  </div>
                </div>
              </Reveal>);

          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 md:mt-16 p-6 md:p-8 rounded-[24px] bg-white border border-[#E2DBCF] max-w-[820px]">
            <p className="text-[#1A1612] text-[16px] md:text-[18px] leading-relaxed">
              {t('how.closer')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>);

}