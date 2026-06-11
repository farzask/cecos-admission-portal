'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Sparkles, RotateCcw } from 'lucide-react';
import { useT } from '../lib/i18n';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { CountUp } from './ui/CountUp';
import { backgroundOptions, interestOptions, programs } from '../lib/data';
type Step = 1 | 2 | 3 | 4;
export function FindMyProgram() {
  const { t } = useT();
  const [step, setStep] = useState<Step>(1);
  const [background, setBackground] = useState<string | null>(null);
  const [marks, setMarks] = useState<number>(70);
  const [interests, setInterests] = useState<string[]>([]);
  const isPG = useMemo(() => {
    return background ? (background.startsWith('16-Year') || background.startsWith('18-Year')) : false;
  }, [background]);
  const matches = useMemo(() => {
    if (!background) return [];
    const isB_PG = background.startsWith('16-Year') || background.startsWith('18-Year');
    return programs.
      filter((p) => p.backgrounds.includes(background)).
      map((p) => {
        const interestMatch =
          interests.length === 0 ||
          p.interests.some((i) => interests.includes(i));
        let status: 'eligible' | 'close' | 'no';
        if (isB_PG) {
          const threshold = p.minCGPA || 2.0;
          if (marks >= threshold) status = 'eligible'; else
            if (marks >= threshold - 0.2) status = 'close'; else
              status = 'no';
        } else {
          if (marks >= p.minPercent) status = 'eligible'; else
            if (marks >= p.minPercent - 5) status = 'close'; else
              status = 'no';
        }
        return {
          p,
          status,
          interestMatch
        };
      }).
      filter((m) => m.interestMatch).
      sort((a, b) => {
        const order = {
          eligible: 0,
          close: 1,
          no: 2
        } as const;
        return order[a.status] - order[b.status];
      });
  }, [background, marks, interests]);
  const eligibleCount = matches.filter((m) => m.status !== 'no').length;
  function reset() {
    setStep(1);
    setBackground(null);
    setMarks(70);
    setInterests([]);
  }
  function toggleInterest(i: string) {
    setInterests((prev) => {
      if (prev.includes(i)) return prev.filter((x) => x !== i);
      if (prev.length >= 3) return prev;
      return [...prev, i];
    });
  }
  return (
    <section id="find" className="bg-white border-t border-[#E2DBCF]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <div className="max-w-[760px]">
            <div className="inline-flex items-center gap-2 text-[#7A1818] text-[13px] font-medium uppercase tracking-[0.14em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="keep-ltr">Find my program</span>
            </div>
            <h2 className="display-tight font-semibold text-[#1A1612] text-[34px] md:text-[46px] tracking-tight">
              {t('find.title')}
            </h2>
            <p className="mt-4 text-[#5A524A] text-[16px] md:text-[18px] max-w-[600px]">
              {t('find.sub')}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 md:mt-12 bg-white rounded-[28px] shadow-surface border border-[#E2DBCF] relative overflow-visible">
            {/* Dynamic Sand Sticker Badge */}
            <div
              className="absolute -top-3 right-6 z-20 inline-flex items-center justify-center bg-[#F4D58D] text-[#1A1612] font-mono text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md shadow-[0_2px_6px_rgba(26,22,18,0.08)] select-none transition-all duration-300"
              style={{ transform: 'rotate(2.5deg)' }}
            >
              {step < 4 ? `STEP ${step} OF 3` : '✨ MATCHES FOUND'}
            </div>
            {/* Stepper header */}
            {step < 4 &&
              <div className="px-6 md:px-10 pt-6 md:pt-8 border-b border-[#EFE9DD]">
                <div className="flex items-center gap-3 mb-5">
                  {[1, 2, 3].map((s) =>
                    <div key={s} className="flex items-center gap-3 flex-1">
                      <div
                        className={`w-7 h-7 rounded-full grid place-items-center text-[12px] font-semibold transition-colors ${step >= (s as Step) ? 'bg-[#7A1818] text-white' : 'bg-white text-[#5A524A] border border-[#E2DBCF]'}`}>

                        {step > s ?
                          <Check className="w-3.5 h-3.5" /> :

                          <span className="num">{s}</span>
                        }
                      </div>
                      {s < 3 &&
                        <div
                          className={`flex-1 h-px ${step > s ? 'bg-[#7A1818]' : 'bg-[#E2DBCF]'}`} />

                      }
                    </div>
                  )}
                </div>
              </div>
            }

            <div className="px-6 md:px-10 py-8 md:py-10 min-h-[420px] flex flex-col">
              <AnimatePresence mode="wait">
                {step === 1 &&
                  <motion.div
                    key="s1"
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
                      y: -8
                    }}
                    transition={{
                      duration: 0.25
                    }}>

                    <h3 className="text-[22px] md:text-[26px] font-semibold text-[#1A1612]">
                      {t('find.step1')}
                    </h3>
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {backgroundOptions.map((b) =>
                        <button
                          key={b}
                          onClick={() => {
                            setBackground(b);
                            const isB_PG = b.startsWith('16-Year') || b.startsWith('18-Year');
                            setMarks(isB_PG ? 3.0 : 70);
                            setTimeout(() => setStep(2), 180);
                          }}
                          className={`text-start p-4 rounded-2xl border transition-all min-h-[88px] ${background === b ? 'border-[#7A1818] bg-[#7A1818]/[0.05] ring-2 ring-[#7A1818]/20' : 'border-[#E2DBCF] hover:border-[#1A1612]/30 bg-white'}`}>

                          <div className="font-semibold text-[15px] text-[#1A1612]">
                            {b}
                          </div>
                        </button>
                      )}
                    </div>
                  </motion.div>
                }

                {step === 2 &&
                  <motion.div
                    key="s2"
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
                      y: -8
                    }}
                    transition={{
                      duration: 0.25
                    }}>

                    <h3 className="text-[22px] md:text-[26px] font-semibold text-[#1A1612]">
                      {isPG ? "What was your CGPA?" : t('find.step2')}
                    </h3>
                    {isPG && (
                      <p className="mt-3 text-[#5A524A] text-[15px]">
                        Most CECOS postgraduate programs need 2.0+ CGPA. PhD programs need 3.0+ CGPA.
                      </p>
                    )}

                    <div className="mt-8 max-w-[520px]">
                      <div className="flex items-end justify-between mb-3">
                        <span className="num text-[48px] md:text-[64px] font-semibold leading-none text-[#1A1612] tabular-nums">
                          {isPG ? marks.toFixed(1) : marks}
                          <span className="text-[#7A1818]">{isPG ? ' CGPA' : '%'}</span>
                        </span>
                        <input
                          type="number"
                          min={isPG ? 2.0 : 40}
                          max={isPG ? 4.0 : 100}
                          step={isPG ? 0.1 : 1}
                          value={marks}
                          onChange={(e) => {
                            const val = Number(e.target.value) || 0;
                            const minVal = isPG ? 2.0 : 40;
                            const maxVal = isPG ? 4.0 : 100;
                            setMarks(Math.max(minVal, Math.min(maxVal, val)));
                          }}
                          className="num w-20 h-10 px-3 rounded-xl border border-[#E2DBCF] text-center text-[15px] focus:border-[#C42828] focus:ring-4 focus:ring-[#C42828]/12 transition-all outline-none" />

                      </div>
                      <input
                        type="range"
                        min={isPG ? 2.0 : 40}
                        max={isPG ? 4.0 : 100}
                        step={isPG ? 0.1 : 1}
                        value={marks}
                        onChange={(e) => setMarks(Number(e.target.value))}
                        className="w-full accent-[#7A1818]"
                        style={{
                          direction: 'ltr'
                        }} />

                      <div className="flex justify-between mt-2 text-[12px] text-[#5A524A] num">
                        <span>{isPG ? '2.0 CGPA' : '40%'}</span>
                        <span>{isPG ? '4.0 CGPA' : '100%'}</span>
                      </div>
                    </div>
                  </motion.div>
                }

                {step === 3 &&
                  <motion.div
                    key="s3"
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
                      y: -8
                    }}
                    transition={{
                      duration: 0.25
                    }}>

                    <h3 className="text-[22px] md:text-[26px] font-semibold text-[#1A1612]">
                      {t('find.step3')}
                    </h3>
                    <p className="mt-3 text-[#5A524A] text-[15px]">
                      {t('find.step3.help')}{' '}
                      <span className="num">({interests.length}/3)</span>
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {interestOptions.map((i) => {
                        const active = interests.includes(i);
                        const disabled = !active && interests.length >= 3;
                        return (
                          <button
                            key={i}
                            disabled={disabled}
                            onClick={() => toggleInterest(i)}
                            className={`px-4 h-11 rounded-xl border text-[14px] font-medium transition-all ${active ? 'bg-[#7A1818] text-white border-[#7A1818]' : disabled ? 'bg-white text-[#9A9087] border-[#E2DBCF] cursor-not-allowed' : 'bg-white text-[#1A1612] border-[#E2DBCF] hover:border-[#1A1612]'}`}>

                            {i}
                          </button>);

                      })}
                    </div>
                  </motion.div>
                }

                {step === 4 &&
                  <motion.div
                    key="s4"
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
                      y: -8
                    }}
                    transition={{
                      duration: 0.25
                    }}>

                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="text-[#5A524A] text-[14px]">
                          {t('find.result')}
                        </div>
                        <div className="display-tight font-semibold text-[#1A1612] text-[44px] md:text-[64px] leading-none mt-1">
                          <CountUp
                            to={eligibleCount}
                            className="text-[#7A1818]" />
                          {' '}
                          <span className="text-[24px] md:text-[28px] font-medium text-[#1A1612]/80">
                            {t('find.programs')}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 text-[14px] text-[#5A524A] hover:text-[#1A1612] h-10">

                        <RotateCcw className="w-3.5 h-3.5" />
                        {t('find.restart')}
                      </button>
                    </div>

                    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[460px] overflow-y-auto pr-1">
                      {matches.map(({ p, status }) =>
                        <div
                          key={p.id}
                          className={`p-4 rounded-2xl border bg-white transition-all ${status === 'eligible' ? 'border-[#E2DBCF]' : status === 'close' ? 'border-[#E2DBCF]' : 'border-[#E2DBCF] opacity-60'}`}>

                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-[11px] text-[#5A524A] uppercase tracking-wider">
                                {t('programs.group')}{' '}
                                <span className="num">{p.group}</span>
                              </div>
                              <div className="font-semibold text-[#1A1612] text-[15px] mt-1 leading-snug">
                                {p.name}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center justify-between gap-2">
                            <div className="text-[12px] text-[#5A524A]">
                              Min <span className="num">{isPG ? `${p.minCGPA || 2.0} CGPA` : `${p.minPercent}%`}</span>
                            </div>
                            <StatusPill status={status} t={t} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                      <Button as="a" href="#apply" variant="primary" size="lg">
                        {t('find.continue')}
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </Button>
                      <a
                        href="#programs"
                        className="text-[14px] text-[#7A1818] hover:text-[#A82222] font-medium">

                        {t('find.browseAll')}
                      </a>
                    </div>
                  </motion.div>
                }
              </AnimatePresence>

              {/* Step controls */}
              {step < 4 &&
                <div className="mt-auto pt-8 flex items-center justify-between">
                  <button
                    onClick={() => setStep((s) => Math.max(1, s - 1) as Step)}
                    disabled={step === 1}
                    className="inline-flex items-center gap-2 h-10 px-3 text-[14px] text-[#5A524A] hover:text-[#1A1612] disabled:opacity-30 disabled:hover:text-[#5A524A]">

                    <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                    {t('find.back')}
                  </button>

                  {step === 3 ?
                    <Button
                      onClick={() => setStep(4)}
                      variant="primary"
                      size="lg">

                      {t('find.see')}
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </Button> :

                    <Button
                      onClick={() => setStep((s) => Math.min(3, s + 1) as Step)}
                      variant="primary"
                      disabled={step === 1 && !background}>

                      {t('find.next')}
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </Button>
                  }
                </div>
              }
            </div>
          </div>
        </Reveal>
      </div>
    </section>);

}
function StatusPill({
  status,
  t



}: { status: 'eligible' | 'close' | 'no'; t: (k: string) => string; }) {
  if (status === 'eligible') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 h-6 rounded-full bg-[#F4D58D]/15 text-[#1A1612] border border-[#F4D58D]/40">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F4D58D]" />
        {t('find.eligible')}
      </span>);

  }
  if (status === 'close') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 h-6 rounded-full bg-[#1A1612]/5 text-[#1A1612] border border-[#1A1612]/10">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5A524A]" />
        {t('find.close')}
      </span>);

  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 h-6 rounded-full bg-white text-[#9A9087] border border-[#E2DBCF]">
      {t('find.notEligible')}
    </span>);

}