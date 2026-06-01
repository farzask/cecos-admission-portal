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
            <div className="inline-flex items-center gap-2 text-[#5A524A] text-[13px] uppercase tracking-[0.14em] mb-4">
              <Award className="w-3.5 h-3.5" />
              <span className="keep-ltr">Scholarships</span>
            </div>
            <h2 className="display-tight font-semibold text-[#1A1612] text-[34px] md:text-[46px] tracking-tight">
              {t('sch.title')}
            </h2>
            <p className="mt-4 text-[#5A524A] text-[16px] md:text-[18px]">
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
              className={`shrink-0 h-10 px-4 rounded-xl text-[13px] font-medium border transition-colors ${cat === c.id ? 'bg-[#7A1818] text-white border-[#7A1818]' : 'bg-white text-[#1A1612] border-[#E2DBCF] hover:border-[#1A1612]'}`}>
              
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
              className="p-6 rounded-[24px] bg-white border border-[#E2DBCF] flex flex-col">
              
                <div className="num text-[#1A1612] text-[34px] md:text-[40px] font-semibold leading-none tracking-tight">
                  {s.reduction}
                </div>
                <div className="mt-3 font-semibold text-[#1A1612] text-[16px]">
                  {s.name}
                </div>
                <div className="mt-2 text-[14px] text-[#5A524A] flex-1">
                  {s.description}
                </div>
                <div className="mt-5 pt-4 border-t border-[#E2DBCF]/70 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 h-6 rounded-full bg-white border border-[#E2DBCF] text-[#1A1612]">
                    {s.tag}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 text-[14px] text-[#5A524A]">
          {t('sch.footer').replace('→', '').trim()}
        </div>
      </div>
    </section>);

}