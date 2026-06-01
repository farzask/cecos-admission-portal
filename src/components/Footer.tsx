import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  GraduationCap } from
'lucide-react';
import { useT } from '../lib/i18n';
import { whatsappNumber } from '../lib/data';
import { Link } from 'react-router-dom';

export function Footer() {
  const { t } = useT();
  return (
    <footer className="bg-white border-t border-[#E2DBCF]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-14 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {/* Contact */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#7A1818] grid place-items-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-[16px] text-[#1A1612]">
                CECOS University
              </span>
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
                <a href="#apply" className="text-[#1A1612] hover:text-[#7A1818]">
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
                <a href="#login" className="text-[#1A1612] hover:text-[#7A1818]">
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
                <MessageCircle className="w-4 h-4 text-[#5A524A] shrink-0 mt-0.5" />
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="num hover:text-[#7A1818] keep-ltr">
                  
                  +{whatsappNumber.slice(0, 2)} {whatsappNumber.slice(2)}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Linkedin].map((Icon, i) =>
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-[#E2DBCF] grid place-items-center text-[#1A1612] hover:bg-[#1A1612] hover:text-white hover:border-[#1A1612] transition-colors"
                aria-label="Social link">
                
                  <Icon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E2DBCF] flex flex-col md:flex-row md:items-center justify-between gap-4 text-[13px] text-[#5A524A]">
          <div>{t('footer.rights')}</div>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-[#1A1612]">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="hover:text-[#1A1612]">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>);

}