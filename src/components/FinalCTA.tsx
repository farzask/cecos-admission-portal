import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useT } from '../lib/i18n';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
export function FinalCTA() {
  const { t } = useT();
  return (
    <section id="apply" className="bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/assets/landscape-image-of-graduation-ceremony.png" alt="Graduation Ceremony Desktop" className="hidden md:block w-full h-full object-cover opacity-70" />
        <img src="/assets/portrait-image-of-graduation-ceremony.png" alt="Graduation Ceremony Mobile" className="block md:hidden w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative z-10 mx-auto max-w-[1000px] px-5 md:px-8 py-20 md:py-28 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/10 rounded-full px-3 py-1.5 mb-8 keep-ltr">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            <span className="text-[12px] tracking-[0.14em] font-medium text-white/85">
              {t('final.eyebrow')}
            </span>
          </div>
          <h2 className="display-tight font-semibold text-white text-[40px] sm:text-[56px] md:text-[72px] tracking-tight">
            {t('final.title')}
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              as="a"
              href="#apply"
              variant="primary"
              size="lg"
              className="!h-14 !px-7 group">

              {t('hero.cta1')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform rtl:rotate-180" />
            </Button>
          </div>
          <p className="mt-6 text-white/55 text-[14px]">
            {t('final.sub')}
            <br className="sm:hidden" />
            <span className="inline-flex items-center justify-center gap-3 mt-3 sm:mt-0 sm:ml-4 text-white/40">
              <Link to="/terms" className="hover:text-white transition-colors underline underline-offset-2">Terms & Conditions</Link>
              <span>·</span>
              <Link to="/privacy" className="hover:text-white transition-colors underline underline-offset-2">Privacy Policy</Link>
            </span>
          </p>
        </Reveal>
      </div>
    </section>);

}