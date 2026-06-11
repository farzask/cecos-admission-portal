'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useT } from '../lib/i18n';
import { Button } from './ui/Button';
export function Nav() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links: {
    href: string;
    key: string;
  }[] = [
  {
    href: '/#programs',
    key: 'nav.programs'
  },
  {
    href: '/#find',
    key: 'nav.find'
  },
  {
    href: '/#scholarships',
    key: 'nav.scholarships'
  },
  {
    href: '/#faqs',
    key: 'nav.faqs'
  }];

  return (
    <header
      className={`sticky top-0 z-40 bg-white text-[#1A1612] transition-shadow ${scrolled ? 'shadow-surface border-b border-[#E2DBCF]' : ''}`}>
      
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 h-[64px] md:h-[72px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img src="/assets/CECOS_orginal-1.png" alt="CECOS Logo" className="h-[42px] w-auto" />
        </Link>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) =>
          <a
            key={l.href}
            href={l.href}
            className="text-[15px] text-[#5A524A] hover:text-[#1A1612] transition-colors">
            
              {t(l.key)}
            </a>
          )}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 md:gap-3">

          <a
            href="#login"
            className="hidden sm:inline-flex h-10 px-4 items-center text-[14px] text-[#1A1612] hover:text-[#7A1818] border border-[#E2DBCF] hover:border-[#C9C0B4] rounded-[20px] transition-colors">
            
            {t('nav.login')}
          </a>

          <Button
            as="a"
            href="#apply"
            variant="primary"
            className="hidden md:inline-flex">
            
            {t('nav.start')}
          </Button>

          <Button
            as="a"
            href="#apply"
            variant="primary"
            size="md"
            className="md:hidden !px-3 !text-[13px]">
            
            {t('nav.start')}
          </Button>

          {/* Mobile menu */}
          <button
            className="lg:hidden w-10 h-10 grid place-items-center rounded-full hover:bg-[#EFE9DD]"
            aria-label="Open menu"
            onClick={() => setOpen(!open)}>
            
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open &&
      <div className="lg:hidden border-t border-[#E2DBCF] bg-white">
          <div className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) =>
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="py-3 text-[16px] text-[#2E2823] hover:text-[#1A1612] border-b border-[#EFE9DD]">
            
                {t(l.key)}
              </a>
          )}
            <a
            href="#login"
            onClick={() => setOpen(false)}
            className="py-3 text-[16px] text-[#2E2823] hover:text-[#1A1612]">
            
              {t('nav.login')}
            </a>
          </div>
        </div>
      }
    </header>);

}