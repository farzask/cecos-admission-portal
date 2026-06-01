import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '../lib/data';
import { useT } from '../lib/i18n';
import { Reveal } from './ui/Reveal';
import { useAdmissionData } from '../lib/AdmissionDataContext';

function formatPKR(amount: number): string {
  return amount.toLocaleString('en-PK');
}

export function Faqs() {
  const { t, lang } = useT();
  const [open, setOpen] = useState<number | null>(0);
  const { ugFee, pgFee } = useAdmissionData();

  // Build FAQ list with dynamically overridden fee answer
  const faqList = useMemo(() => {
    return faqs.map((f, i) => {
      // Override the "What's the application fee?" FAQ (index 2) with dynamic values
      if (i === 2 && (ugFee != null || pgFee != null)) {
        const ugStr = ugFee != null ? `PKR ${formatPKR(ugFee)}` : 'PKR 1,500';
        const pgStr = pgFee != null ? `PKR ${formatPKR(pgFee)}` : 'PKR 2,000';
        return {
          ...f,
          a: {
            en: `${ugStr} for undergraduate, ${pgStr} for postgraduate. If you already applied in an earlier phase this year, the fee drops to PKR 500.`,
            ur: `انڈرگریجویٹ کے لیے ${ugStr}، پوسٹ گریجویٹ کے لیے ${pgStr}۔ اگر آپ نے اسی سال پہلے درخواست دی ہے تو فیس PKR 500 رہ جاتی ہے۔`,
          },
        };
      }
      return f;
    });
  }, [ugFee, pgFee]);

  return (
    <section id="faqs" className="bg-white border-t border-[#E2DBCF]">
      <div className="mx-auto max-w-[880px] px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <div className="mb-10 md:mb-12">
            <div className="text-[#5A524A] text-[13px] uppercase tracking-[0.14em] font-medium mb-3 keep-ltr">
              FAQs
            </div>
            <h2 className="display-tight font-semibold text-[#1A1612] text-[34px] md:text-[46px] tracking-tight">
              {t('faqs.title')}
            </h2>
          </div>
        </Reveal>

        <div className="divide-y divide-[#E2DBCF] border-t border-[#E2DBCF]">
          {faqList.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full py-5 md:py-6 flex items-start justify-between gap-6 text-start group"
                  aria-expanded={isOpen}>
                  
                  <span className="font-semibold text-[#1A1612] text-[16px] md:text-[18px] leading-snug">
                    {f.q[lang]}
                  </span>
                  <span
                    className={`shrink-0 w-9 h-9 rounded-full grid place-items-center border transition-colors ${isOpen ? 'bg-[#7A1818] text-white border-[#7A1818]' : 'bg-white text-[#1A1612] border-[#E2DBCF] group-hover:border-[#1A1612]'}`}>
                    
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
                    
                      <div className="pb-6 pr-12 text-[#5A524A] text-[15px] md:text-[16px] leading-relaxed">
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