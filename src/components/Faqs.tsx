import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '../lib/data';
import { useT } from '../lib/i18n';
import { Reveal } from './ui/Reveal';
export function Faqs() {
  const { t, lang } = useT();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faqs" className="bg-white border-t border-[#E5E7EB]">
      <div className="mx-auto max-w-[880px] px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <div className="mb-10 md:mb-12">
            <div className="text-[#666666] text-[13px] uppercase tracking-[0.14em] font-medium mb-3 keep-ltr">
              FAQs
            </div>
            <h2 className="display-tight font-semibold text-black text-[34px] md:text-[46px] tracking-tight">
              {t('faqs.title')}
            </h2>
          </div>
        </Reveal>

        <div className="divide-y divide-[#E5E7EB] border-t border-[#E5E7EB]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full py-5 md:py-6 flex items-start justify-between gap-6 text-start group"
                  aria-expanded={isOpen}>
                  
                  <span className="font-semibold text-black text-[16px] md:text-[18px] leading-snug">
                    {f.q[lang]}
                  </span>
                  <span
                    className={`shrink-0 w-9 h-9 rounded-full grid place-items-center border transition-colors ${isOpen ? 'bg-black text-white border-black' : 'bg-white text-black border-[#E5E7EB] group-hover:border-black'}`}>
                    
                    {isOpen ?
                    <Minus className="w-4 h-4" /> :

                    <Plus className="w-4 h-4" />
                    }
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen &&
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0
                    }}
                    animate={{
                      height: 'auto',
                      opacity: 1
                    }}
                    exit={{
                      height: 0,
                      opacity: 0
                    }}
                    transition={{
                      duration: 0.25,
                      ease: [0.21, 0.47, 0.32, 0.98]
                    }}
                    className="overflow-hidden">
                    
                      <div className="pb-6 pr-12 text-[#666666] text-[15px] md:text-[16px] leading-relaxed">
                        {f.a[lang]}
                      </div>
                    </motion.div>
                  }
                </AnimatePresence>
              </div>);

          })}
        </div>
      </div>
    </section>);

}