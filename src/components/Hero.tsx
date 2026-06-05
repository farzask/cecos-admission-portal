import React from 'react';
import {
  ArrowRight,
  Clock,
  ShieldCheck,
  Award,
  Users,
  Calendar
} from
  'lucide-react';
import { useT } from '../lib/i18n';
import { Button } from './ui/Button';
import { Countdown } from './Countdown';
import { phase1ClosesAt } from '../lib/data';
import { useAdmissionData } from '../lib/AdmissionDataContext';

export function Hero() {
  const { t, lang } = useT();
  const { countdownTarget, sessionLabel, admissionLevel } = useAdmissionData();

  // Fall back to static date when Supabase isn't configured or still loading
  const targetDate = countdownTarget ?? phase1ClosesAt;

  // Dynamic eyebrow text: "Fall 2026 admissions are open"
  const eyebrowText = sessionLabel
    ? lang === 'ur'
      ? `${sessionLabel} کے داخلے کھل چکے ہیں`
      : `${sessionLabel} admissions are open`
    : t('hero.eyebrow');

  // Admission level badge label
  const levelLabel = admissionLevel === 'ug'
    ? (lang === 'ur' ? 'انڈرگریجویٹ' : 'Undergraduate')
    : admissionLevel === 'pg'
      ? (lang === 'ur' ? 'پوسٹ گریجویٹ' : 'Postgraduate')
      : admissionLevel === 'both'
        ? (lang === 'ur' ? 'انڈرگریجویٹ + پوسٹ گریجویٹ' : 'Undergraduate & Postgraduate')
        : null;

  // Dynamic countdown label
  const countdownLabel = lang === 'ur' ? 'داخلے بند ہونے میں' : 'Admissions close in';

  return (
    <section id="top" className="bg-[#1A1612] text-white overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <img src="/assets/landscape-image-of-CECOS-building.png" alt="CECOS Campus Desktop" className="hidden md:block w-full h-full object-cover opacity-50" />
        <img src="/assets/portrait-image--of-CECOS.png" alt="CECOS Campus Mobile" className="block md:hidden w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612] via-[#1A1612]/70 to-transparent"></div>
      </div>
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-8 pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            {/* Sand Sticker + Level badge group */}
            <div className="flex flex-col items-start gap-4 mb-6">
              <div
                className="inline-flex items-center justify-center bg-[#F4D58D] text-[#1A1612] font-mono text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md shadow-sm select-none relative z-10"
                style={{ transform: 'rotate(-2deg)' }}
              >
                ✨ {eyebrowText}
              </div>
              {levelLabel && (
                <div className="inline-flex items-center gap-1.5 bg-white/[0.08] border border-white/15 text-white/85 text-[11px] font-medium uppercase tracking-wider px-3 py-1.5 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4D58D] animate-pulse flex-shrink-0" />
                  {levelLabel} {lang === 'ur' ? 'داخلے' : 'Admissions'}
                </div>
              )}
            </div>

            <h1 className="display-tight font-display font-normal italic text-white text-[40px] sm:text-[52px] md:text-[64px] lg:text-[76px] whitespace-pre-line">
              {t('hero.title')}
            </h1>

            <p className="mt-6 text-white/70 text-[16px] md:text-[18px] max-w-[560px] leading-relaxed">
              {t('hero.sub')}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                as="a"
                href="#apply"
                variant="primary"
                size="lg"
                className="group">

                {t('hero.cta1')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
              </Button>
              <Button
                as="a"
                href="#find"
                variant="ghost"
                size="lg"
                className="">

                {t('hero.cta2')}
              </Button>
            </div>

            <div className="mt-5 inline-flex items-center gap-2 text-white/55 text-[13px]">
              <Clock className="w-3.5 h-3.5" />
              <span>{t('hero.timeBadge')}</span>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
              <TrustItem
                icon={<Calendar className="w-3.5 h-3.5" />}
                label={t('hero.trust1')} />

              <TrustItem
                icon={<Users className="w-3.5 h-3.5" />}
                label={t('hero.trust2')} />

              <TrustItem
                icon={<ShieldCheck className="w-3.5 h-3.5" />}
                label={t('hero.trust3')} />

              <TrustItem
                icon={<Award className="w-3.5 h-3.5" />}
                label={t('hero.trust4')} />

            </div>
          </div>

          {/* Right: countdown */}
          <div className="lg:col-span-5 lg:pl-4">
            <Countdown
              target={targetDate}
              label={countdownTarget ? countdownLabel : undefined}
            />
          </div>
        </div>
      </div>
    </section>);

}
function TrustItem({ icon, label }: { icon: React.ReactNode; label: string; }) {
  return (
    <div className="flex items-center gap-2 text-white/70 text-[13px]">
      <span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 grid place-items-center text-white/70">
        {icon}
      </span>
      <span>{label}</span>
    </div>);

}