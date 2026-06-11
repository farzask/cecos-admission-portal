'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin
} from
  'lucide-react';
import { useT } from '../lib/i18n';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTrackApply, useTrackLogin } from '../lib/analytics';

export function Footer() {
  const { t } = useT();
  const trackApply = useTrackApply();
  const trackLogin = useTrackLogin();
  const [showCredits, setShowCredits] = useState(false);
  return (
    <footer className="bg-white border-t border-[#E2DBCF]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-14 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {/* Contact */}
          <div>
            <div className="flex items-center mb-5">
              <img
                src="/assets/CECOS_orginal-1.png"
                alt="CECOS University"
                className="h-[42px] w-auto" />
            </div>
            <div className="font-semibold text-[13px] uppercase tracking-[0.14em] text-[#5A524A] mb-4 keep-ltr">
              {t('footer.contact')}
            </div>
            <ul className="space-y-3 text-[14px] text-[#1A1612]">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#5A524A] shrink-0 mt-0.5" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-[#5A524A] shrink-0 mt-0.5" />
                <a href="tel:+92915864291" className="num hover:text-[#7A1818]">
                  +92-91-5864291
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-[#5A524A] shrink-0 mt-0.5" />
                <a
                  href="mailto:admissions@cecos.edu.pk"
                  className="hover:text-[#7A1818] keep-ltr">

                  admissions@cecos.edu.pk
                </a>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <div className="font-semibold text-[13px] uppercase tracking-[0.14em] text-[#5A524A] mb-4">
              {t('footer.quick')}
            </div>
            <ul className="space-y-3 text-[14px]">
              <li>
                <a
                  href="#apply"
                  onClick={() => trackApply('footer')}
                  className="text-[#1A1612] hover:text-[#7A1818]">
                  {t('footer.apply')}
                </a>
              </li>
              <li>
                <a href="#find" className="text-[#1A1612] hover:text-[#7A1818]">
                  {t('nav.find')}
                </a>
              </li>
              <li>
                <a
                  href="#scholarships"
                  className="text-[#1A1612] hover:text-[#7A1818]">

                  {t('nav.scholarships')}
                </a>
              </li>
              <li>
                <a href="#faqs" className="text-[#1A1612] hover:text-[#7A1818]">
                  {t('nav.faqs')}
                </a>
              </li>
              <li>
                <a
                  href="#login"
                  onClick={() => trackLogin('footer')}
                  className="text-[#1A1612] hover:text-[#7A1818]">
                  {t('footer.draft')}
                </a>
              </li>
            </ul>
          </div>

          {/* Support & social */}
          <div>
            <div className="font-semibold text-[13px] uppercase tracking-[0.14em] text-[#5A524A] mb-4">
              {t('footer.support')}
            </div>
            <ul className="space-y-3 text-[14px] text-[#1A1612]">
              <li>{t('footer.hours')}</li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-[#5A524A] shrink-0 mt-0.5" />
                <a href="tel:+92915864291" className="num hover:text-[#7A1818]">
                  +92-91-5864291
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              <a
                href="https://www.facebook.com/cecosofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#E2DBCF] grid place-items-center text-[#1A1612] hover:bg-[#1A1612] hover:text-white hover:border-[#1A1612] transition-colors"
                aria-label="CECOS University on Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/cecosofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#E2DBCF] grid place-items-center text-[#1A1612] hover:bg-[#1A1612] hover:text-white hover:border-[#1A1612] transition-colors"
                aria-label="CECOS University on Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/school/cecos-university-of-information-technology-and-emerging-sciences/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#E2DBCF] grid place-items-center text-[#1A1612] hover:bg-[#1A1612] hover:text-white hover:border-[#1A1612] transition-colors"
                aria-label="CECOS University on LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E2DBCF] flex flex-col md:flex-row md:items-center justify-between gap-4 text-[13px] text-[#5A524A]">
          <div>{t('footer.rights')}</div>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-[#1A1612]">
              {t('footer.privacy')}
            </Link>
            <Link href="/terms" className="hover:text-[#1A1612]">
              {t('footer.terms')}
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-1.5 text-center">
          <div 
            className="relative inline-block"
            onMouseEnter={() => setShowCredits(true)}
            onMouseLeave={() => setShowCredits(false)}
          >
            <button
              onClick={() => setShowCredits(!showCredits)}
              onFocus={() => setShowCredits(true)}
              onBlur={() => setShowCredits(false)}
              className="text-[12.5px] text-[#5A524A] keep-ltr cursor-pointer hover:opacity-85 select-none focus:outline-hidden"
              aria-haspopup="true"
              aria-expanded={showCredits}
            >
              {t('footer.builtBy')}{' '}
              <span className="font-semibold text-fire-600">CDGAI</span>
            </button>

            <AnimatePresence>
              {showCredits && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 z-50 w-72 p-3.5 bg-[#1A1612] text-white text-[12px] leading-relaxed rounded-xl shadow-elevated border border-white/10 text-center animate-fade-in"
                >
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1A1612]" />
                  
                  <div className="text-white/50 text-[10px] uppercase tracking-wider mb-1">
                    {t('footer.crafted')}
                  </div>
                  <div className="font-medium text-white/95">
                    Farza Shahzad, Khuwaja Muhammad Momin &amp; Dr. Maryam Mahsal Khan
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </footer>
  );
}