import React, { useEffect, useState } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { useT } from '../lib/i18n';
import { Button } from './ui/Button';
export function Nav() {
  const { t, lang, setLang } = useT();
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
      className={`sticky top-0 z-40 bg-black text-white transition-shadow ${scrolled ? 'shadow-elevated' : ''}`}>
      
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 h-[64px] md:h-[72px] flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 shrink-0">
          <img src="/assets/CECOS White Logo.png" alt="CECOS Logo" className="h-[42px] w-auto" />
        </a>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) =>
          <a
            key={l.href}
            href={l.href}
            className="text-[15px] text-white/85 hover:text-white transition-colors">
            
              {t(l.key)}
            </a>
          )}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 md:gap-3">

          <a
            href="#login"
            className="hidden sm:inline-flex h-10 px-4 items-center text-[14px] text-white/90 hover:text-white border border-white/20 hover:border-white/40 rounded-[20px] transition-colors">
            
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
            className="lg:hidden w-10 h-10 grid place-items-center rounded-full hover:bg-white/10"
            aria-label="Open menu"
            onClick={() => setOpen(!open)}>
            
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open &&
      <div className="lg:hidden border-t border-white/10 bg-black">
          <div className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) =>
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="py-3 text-[16px] text-white/90 hover:text-white border-b border-white/5">
            
                {t(l.key)}
              </a>
          )}
            <a
            href="#login"
            onClick={() => setOpen(false)}
            className="py-3 text-[16px] text-white/90 hover:text-white">
            
              {t('nav.login')}
            </a>
          </div>
        </div>
      }
    </header>);

}