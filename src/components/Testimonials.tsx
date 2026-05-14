import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../lib/data';
import { useT } from '../lib/i18n';
import { Reveal } from './ui/Reveal';
export function Testimonials() {
  const { t } = useT();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % testimonials.length),
      6000
    );
    return () => clearInterval(id);
  }, [paused, reduce]);
  const current = testimonials[idx];
  return (
    <section id="stories" className="bg-[#F3F5F9]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <div className="max-w-[760px] mb-10 md:mb-12">
            <div className="text-[#666666] text-[13px] uppercase tracking-[0.14em] font-medium mb-3 keep-ltr">
              Graduate stories
            </div>
            <h2 className="display-tight font-semibold text-black text-[34px] md:text-[46px] tracking-tight">
              {t('stories.title')}
            </h2>
            <p className="mt-4 text-[#666666] text-[16px] md:text-[18px]">
              {t('stories.sub')}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div
            ref={ref}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative bg-white rounded-[28px] border border-[#E5E7EB] overflow-hidden shadow-surface">

            <div className="grid md:grid-cols-12">
              <div className="relative md:col-span-5 text-white flex flex-col justify-end min-h-[360px] md:min-h-[460px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.name + '-bg'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 z-0">

                    {current.image ? (
                      <img src={current.image} alt={current.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-black"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  </motion.div>
                </AnimatePresence>

                <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-end">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.name + '-details'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35 }}>

                      <div className="font-semibold text-[22px] md:text-[26px] drop-shadow-md">
                        {current.name}
                      </div>
                      <div className="text-white/90 text-[14px] mt-1 drop-shadow-md">
                        {current.program}
                      </div>
                      {/* <div className="text-white text-[14px] font-medium mt-2 drop-shadow-md">
                        {current.role}
                      </div> */}
                    </motion.div>
                  </AnimatePresence>

                  {/* Controls */}
                  <div className="flex items-center justify-between mt-8">
                    <div className="flex gap-1.5">
                      {testimonials.map((_, i) =>
                        <button
                          key={i}
                          onClick={() => setIdx(i)}
                          aria-label={`Story ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/50'}`} />

                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setIdx(
                            (i) =>
                              (i - 1 + testimonials.length) % testimonials.length
                          )
                        }
                        className="w-9 h-9 grid place-items-center rounded-full border border-white/20 bg-black/20 backdrop-blur-sm hover:bg-white/20 transition-colors"
                        aria-label="Previous">

                        <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                      </button>
                      <button
                        onClick={() =>
                          setIdx((i) => (i + 1) % testimonials.length)
                        }
                        className="w-9 h-9 grid place-items-center rounded-full border border-white/20 bg-black/20 backdrop-blur-sm hover:bg-white/20 transition-colors"
                        aria-label="Next">

                        <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between min-h-[280px] md:min-h-[420px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.name + '-quote'}
                    initial={{
                      opacity: 0,
                      y: 8
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
                      duration: 0.35
                    }}>

                    <Quote className="w-6 h-6 text-[#a81e24] mb-6" />
                    <blockquote className="text-black text-[22px] md:text-[28px] font-semibold leading-snug tracking-tight">
                      {current.quote}
                    </blockquote>
                  </motion.div>
                </AnimatePresence>

                <a
                  href="#"
                  className="mt-8 inline-flex items-center gap-1.5 text-[#a81e24] hover:text-[#8f1920] text-[14px] font-medium">

                  {t('stories.read')}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>);

}