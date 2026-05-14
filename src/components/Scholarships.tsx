import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, ChevronRight } from 'lucide-react';
import { scholarships } from '../lib/data';
import { useT } from '../lib/i18n';
import { Reveal } from './ui/Reveal';
type Cat = 'all' | 'merit' | 'female' | 'need' | 'regional' | 'family';
export function Scholarships() {
  const { t } = useT();
  const [cat, setCat] = useState<Cat>('all');
  const filtered = useMemo(() => {
    if (cat === 'all') return scholarships;
    return scholarships.filter((s) => s.categories.includes(cat as any));
  }, [cat]);
  const chips: {
    id: Cat;
    label: string;
  }[] = [
  {
    id: 'all',
    label: t('sch.all')
  },
  {
    id: 'merit',
    label: t('sch.merit')
  },
  {
    id: 'female',
    label: t('sch.female')
  },
  {
    id: 'need',
    label: t('sch.need')
  },
  {
    id: 'regional',
    label: t('sch.regional')
  },
  {
    id: 'family',
    label: t('sch.family')
  }];

  return (
    <section id="scholarships" className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <div className="max-w-[760px]">
            <div className="inline-flex items-center gap-2 text-[#666666] text-[13px] uppercase tracking-[0.14em] mb-4">
              <Award className="w-3.5 h-3.5" />
              <span className="keep-ltr">Scholarships</span>
            </div>
            <h2 className="display-tight font-semibold text-black text-[34px] md:text-[46px] tracking-tight">
              {t('sch.title')}
            </h2>
            <p className="mt-4 text-[#666666] text-[16px] md:text-[18px]">
              {t('sch.sub')}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5 md:mx-0 md:px-0">
            {chips.map((c) =>
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`shrink-0 h-10 px-4 rounded-full text-[13px] font-medium border transition-colors ${cat === c.id ? 'bg-black text-white border-black' : 'bg-white text-black border-[#E5E7EB] hover:border-black'}`}>
              
                {c.label}
              </button>
            )}
          </div>
        </Reveal>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) =>
            <motion.div
              key={s.name}
              layout
              initial={{
                opacity: 0,
                y: 12
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -12
              }}
              transition={{
                duration: 0.25,
                delay: Math.min(i * 0.03, 0.18)
              }}
              className="p-6 rounded-[24px] bg-[#F3F5F9] border border-[#E5E7EB] flex flex-col">
              
                <div className="num text-black text-[34px] md:text-[40px] font-semibold leading-none tracking-tight">
                  {s.reduction}
                </div>
                <div className="mt-3 font-semibold text-black text-[16px]">
                  {s.name}
                </div>
                <div className="mt-2 text-[14px] text-[#666666] flex-1">
                  {s.description}
                </div>
                <div className="mt-5 pt-4 border-t border-[#E5E7EB]/70 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 h-6 rounded-full bg-white border border-[#E5E7EB] text-black">
                    {s.tag}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 text-[14px] text-[#666666]">
          {t('sch.footer').replace('→', '')}{' '}
          <a
            href="#"
            className="text-[#a81e24] hover:text-[#8f1920] font-medium inline-flex items-center gap-1">
            
            See the full list{' '}
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </a>
        </div>
      </div>
    </section>);

}