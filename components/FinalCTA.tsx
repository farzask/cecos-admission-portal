'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useT } from '../lib/i18n';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { useAdmissionData } from '../lib/AdmissionDataContext';
export function FinalCTA() {
  const { t } = useT();
  const { sessionLabel } = useAdmissionData();

  // Dynamic eyebrow: "FALL 2026 ADMISSIONS" from Supabase
  const eyebrowText = sessionLabel
    ? `${sessionLabel.toUpperCase()} ADMISSIONS`
    : t('final.eyebrow');

  return (
    <section id="apply" className="bg-[#1A1612] text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/assets/landscape-image-of-graduation-ceremony.png" alt="Graduation Ceremony Desktop" className="hidden md:block w-full h-full object-cover opacity-70" />
        <img src="/assets/portrait-image-of-graduation-ceremony.png" alt="Graduation Ceremony Mobile" className="block md:hidden w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-[#1A1612]/50"></div>
      </div>
      <div className="relative z-10 mx-auto max-w-[1000px] px-5 md:px-8 py-20 md:py-28 text-center">
        {/* Sand Sticker */}
        <div
          className="absolute -top-3 right-6 z-20 inline-flex items-center justify-center bg-[#F4D58D] text-[#1A1612] font-mono text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md shadow-[0_2px_6px_rgba(26,22,18,0.08)] select-none"
          style={{ transform: 'rotate(-2deg)' }}
        >
          {t('sticker.finalCta')}
        </div>

        <Reveal>
          <div className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/10 rounded-full px-3 py-1.5 mb-8 keep-ltr">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4D58D]" />
            <span className="text-[12px] tracking-[0.14em] font-medium text-white/85">
              {eyebrowText}
            </span>
          </div>
          <h2 className="display-tight font-display font-normal italic text-white text-[40px] sm:text-[56px] md:text-[72px] tracking-tight">
            {t('final.title')}
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              as="a"
              href="#apply"
              variant="primary"
              size="lg"
              className="group">

              {t('hero.cta1')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform rtl:rotate-180" />
            </Button>
          </div>
          <p className="mt-6 text-white/55 text-[14px]">
            {t('final.sub')}
            <br className="sm:hidden" />
            <span className="inline-flex items-center justify-center gap-3 mt-3 sm:mt-0 sm:ml-4 text-white/40">
              <Link href="/terms" className="hover:text-white transition-colors underline underline-offset-2">Terms & Conditions</Link>
              <span>·</span>
              <Link href="/privacy" className="hover:text-white transition-colors underline underline-offset-2">Privacy Policy</Link>
            </span>
          </p>
        </Reveal>
      </div>
    </section>);

}