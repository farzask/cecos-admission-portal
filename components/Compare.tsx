'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitCompare } from 'lucide-react';
import { programs } from '../lib/data';
import { useT } from '../lib/i18n';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
export function Compare() {
  const { t } = useT();
  const [a, setA] = useState<string>(programs[0]?.id ?? '');
  const [b, setB] = useState<string>(programs[7]?.id ?? '');
  const [open, setOpen] = useState(false);
  const progA = programs.find((p) => p.id === a);
  const progB = programs.find((p) => p.id === b);
  return (
    <section id="compare" className="bg-white border-t border-[#E2DBCF]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-[#5A524A] text-[13px] uppercase tracking-[0.14em] mb-4">
              <GitCompare className="w-3.5 h-3.5" />
              <span className="keep-ltr">{t('section.compare')}</span>
            </div>
            <h2 className="display-tight font-semibold text-[#1A1612] text-[34px] md:text-[46px] tracking-tight">
              {t('compare.title')}
            </h2>
            <p className="mt-4 text-[#5A524A] text-[16px] md:text-[18px]">
              {t('compare.sub')}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="bg-white border border-[#E2DBCF] rounded-[28px] p-6 md:p-8 shadow-surface">
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
                  <span className="ml-3 text-[13px] text-[#9A9087]">
                    {t('compare.sameProgramError')}
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
            className="fixed inset-0 z-50 bg-[#1A1612]/50 flex items-end md:items-center justify-center p-4"
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
              className="bg-white text-[#1A1612] rounded-[28px] w-full max-w-[760px] shadow-elevated overflow-hidden">

              <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-[#E2DBCF]">
                <div className="font-semibold text-[18px]">
                  {t('compare.modalTitle')}
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 grid place-items-center rounded-full hover:bg-[#EFE9DD]"
                  aria-label={t('compare.close')}>

                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-6 md:px-8 py-6">
                <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[#E2DBCF]">
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




}: { label: string; value: string; onChange: (v: string) => void; }) {
  return (
    <label className="block">
      <span className="block text-[13px] text-[#5A524A] mb-2">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 px-4 pr-10 bg-white border border-[#E2DBCF] hover:border-[#C9C0B4] rounded-2xl text-[#1A1612] text-[15px] appearance-none focus:border-[#C42828] focus:ring-4 focus:ring-[#C42828]/12 focus:outline-none">

          {programs.map((p) =>
            <option key={p.id} value={p.id} className="bg-white">
              {p.name}
            </option>
          )}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9087]">
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





}: { label: string; a: string; b: string; num?: boolean; }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-4 border-b border-[#E2DBCF] last:border-b-0">
      <div className="text-[13px] text-[#5A524A] uppercase tracking-wider">
        {label}
      </div>
      <div className={`text-[15px] text-[#1A1612] ${num ? 'num' : ''}`}>{a}</div>
      <div className={`text-[15px] text-[#1A1612] ${num ? 'num' : ''}`}>{b}</div>
    </div>);

}