import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitCompare } from 'lucide-react';
import { programs } from '../lib/data';
import { useT } from '../lib/i18n';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
export function Compare() {
  const { t } = useT();
  const [a, setA] = useState<string>(programs[0].id);
  const [b, setB] = useState<string>(programs[7].id);
  const [open, setOpen] = useState(false);
  const progA = programs.find((p) => p.id === a);
  const progB = programs.find((p) => p.id === b);
  return (
    <section id="compare" className="bg-black text-white">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-white/55 text-[13px] uppercase tracking-[0.14em] mb-4">
              <GitCompare className="w-3.5 h-3.5" />
              <span className="keep-ltr">Compare</span>
            </div>
            <h2 className="display-tight font-semibold text-white text-[34px] md:text-[46px] tracking-tight">
              {t('compare.title')}
            </h2>
            <p className="mt-4 text-white/65 text-[16px] md:text-[18px]">
              {t('compare.sub')}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="bg-white/[0.04] border border-white/10 rounded-[28px] p-6 md:p-8">
              <div className="grid sm:grid-cols-2 gap-4">
                <ProgramSelect
                  label={t('compare.a')}
                  value={a}
                  onChange={setA} />
                
                <ProgramSelect
                  label={t('compare.b')}
                  value={b}
                  onChange={setB} />
                
              </div>
              <div className="mt-5">
                <Button
                  onClick={() => setOpen(true)}
                  variant="primary"
                  size="lg"
                  disabled={a === b}>
                  
                  {t('compare.btn')}
                </Button>
                {a === b &&
                <span className="ml-3 text-[13px] text-white/55">
                    Select two different programs.
                  </span>
                }
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && progA && progB &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}
          className="fixed inset-0 z-50 bg-black/70 flex items-end md:items-center justify-center p-4"
          onClick={() => setOpen(false)}>
          
            <motion.div
            initial={{
              y: 40,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            exit={{
              y: 40,
              opacity: 0
            }}
            transition={{
              duration: 0.25,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-black rounded-[28px] w-full max-w-[760px] shadow-elevated overflow-hidden">
            
              <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-[#E5E7EB]">
                <div className="font-semibold text-[18px]">
                  Side-by-side comparison
                </div>
                <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 grid place-items-center rounded-full hover:bg-[#F3F5F9]"
                aria-label={t('compare.close')}>
                
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-6 md:px-8 py-6">
                <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[#E5E7EB]">
                  <div />
                  <div className="font-semibold text-[15px] leading-snug">
                    {progA.name}
                  </div>
                  <div className="font-semibold text-[15px] leading-snug">
                    {progB.name}
                  </div>
                </div>
                <CompareRow
                label={t('compare.duration')}
                a={progA.duration}
                b={progB.duration} />
              
                <CompareRow
                label={t('compare.eligibility')}
                a={`${progA.minPercent}%`}
                b={`${progB.minPercent}%`}
                num />
              
                <CompareRow
                label={t('compare.test')}
                a={progA.test}
                b={progB.test} />
              
                <CompareRow
                label={t('compare.group')}
                a={`${progA.group}`}
                b={`${progB.group}`}
                num />
              
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </section>);

}
function ProgramSelect({
  label,
  value,
  onChange




}: {label: string;value: string;onChange: (v: string) => void;}) {
  return (
    <label className="block">
      <span className="block text-[13px] text-white/65 mb-2">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 px-4 pr-10 bg-black border border-white/15 hover:border-white/30 rounded-2xl text-white text-[15px] appearance-none focus:border-[#a81e24] focus:outline-none">
          
          {programs.map((p) =>
          <option key={p.id} value={p.id} className="bg-black">
              {p.name}
            </option>
          )}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/55">
          ▾
        </span>
      </div>
    </label>);

}
function CompareRow({
  label,
  a,
  b,
  num





}: {label: string;a: string;b: string;num?: boolean;}) {
  return (
    <div className="grid grid-cols-3 gap-4 py-4 border-b border-[#E5E7EB] last:border-b-0">
      <div className="text-[13px] text-[#666666] uppercase tracking-wider">
        {label}
      </div>
      <div className={`text-[15px] text-black ${num ? 'num' : ''}`}>{a}</div>
      <div className={`text-[15px] text-black ${num ? 'num' : ''}`}>{b}</div>
    </div>);

}