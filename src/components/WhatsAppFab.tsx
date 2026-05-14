import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useT } from '../lib/i18n';
import { whatsappNumber } from '../lib/data';
export function WhatsAppFab() {
  const { t } = useT();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(id);
  }, []);
  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      className={`fixed bottom-5 right-5 md:bottom-6 md:right-6 z-30 inline-flex items-center gap-2.5 h-12 md:h-13 rounded-full bg-black text-white pl-3 pr-2 md:pr-5 shadow-elevated hover:bg-[#191919] transition-all ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{
        transitionDuration: '300ms'
      }}
      aria-label={t('wa.label')}>
      
      <span className="w-9 h-9 grid place-items-center rounded-full bg-[#D97706]">
        <MessageCircle className="w-5 h-5 text-black" />
      </span>
      <span className="hidden sm:inline text-[14px] font-medium pr-2">
        {t('wa.label')}
      </span>
    </a>);

}