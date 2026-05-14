import React, { useState } from 'react';
import { ArrowUpRight, FlaskConical, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { disciplineGroups } from '../lib/data';
import { useT } from '../lib/i18n';
import { Reveal } from './ui/Reveal';

// Bachelor discipline groups (1-5)
const bachelorGroups = disciplineGroups.filter((g) => g.number <= 5);

// Masters programs organized into cards by field
const masterGroups = [
  {
    number: 1,
    name: 'Civil Engineering',
    programs: [
      'MS Civil – Structural Engineering',
      'MS Civil – Water Resources & Environmental Engineering',
      'MS Civil – Construction Engineering Management',
      'MS Civil – Geo-Tech',
    ],
  },
  {
    number: 2,
    name: 'Electrical Engineering',
    programs: [
      'MS Elect – Communication',
      'MS Elect – Power & Control Engineering',
      'MS Engineering Management',
    ],
  },
  {
    number: 3,
    name: 'Mechanical & Architecture',
    programs: [
      'MS Mechanical Engineering',
      'Master in Architecture',
    ],
  },
  {
    number: 4,
    name: 'Business & Management',
    programs: [
      'MBA (Business)',
      'MBA (Non-Business)',
      'MS Management Science (Finance, Marketing, HRM)',
      'MS Project Management',
    ],
  },
  {
    number: 5,
    name: 'Computing & Mathematics',
    programs: [
      'MS Computer Science',
      'MS Software Engineering',
      'MS Applied Mathematics',
    ],
  },
  {
    number: 6,
    name: 'Sciences & Health',
    programs: [
      'MS Biotechnology',
      'MS Pharmacy – Pharmaceutics',
      'MS Pharmacy – Pharmacology',
      'MS Pharmacy – Pharmacy Practice',
    ],
  },
];

type Tab = 'bachelors' | 'masters';

export function Programs() {
  const { t } = useT();
  const [activeTab, setActiveTab] = useState<Tab>('bachelors');

  return (
    <section id="programs" className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="max-w-[640px]">
              <div className="text-[#666666] text-[13px] uppercase tracking-[0.14em] font-medium mb-3 keep-ltr">
                {t('nav.programs')}
              </div>
              <h2 className="display-tight font-semibold text-black text-[34px] md:text-[46px] tracking-tight">
                {t('programs.title')}
              </h2>
              <p className="mt-4 text-[#666666] text-[16px] md:text-[18px]">
                {t('programs.sub')}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Tab Switcher — larger size */}
        <Reveal delay={0.05}>
          <div className="flex gap-1.5 p-1.5 rounded-2xl bg-[#F3F5F9] border border-[#E5E7EB] w-fit mb-10">
            {(['bachelors', 'masters'] as Tab[]).map((tab) => (
              <button
                key={tab}
                id={`tab-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`relative px-8 py-3 rounded-xl text-[16px] font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-black text-white shadow-md'
                    : 'text-[#666666] hover:text-black hover:bg-white/60'
                }`}
              >
                {tab === 'bachelors' ? 'Bachelors' : 'Masters'}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'bachelors' ? (
            <motion.div
              key="bachelors"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              {bachelorGroups.map((g, i) => (
                <Reveal key={g.number} delay={Math.min(i * 0.04, 0.2)}>
                  <div className="group flex flex-col h-full p-6 md:p-7 rounded-[24px] bg-white border border-[#E5E7EB] hover:border-black transition-all hover:shadow-surface">
                    <div className="flex items-start justify-between">
                      <div className="num text-[#a81e24] font-semibold text-[14px] tracking-wider">
                        {String(g.number).padStart(2, '0')}
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#999] group-hover:text-black transition-colors" />
                    </div>
                    <h3 className="mt-4 font-semibold text-black text-[20px] leading-tight tracking-tight">
                      {g.name}
                    </h3>
                    <ul className="mt-4 space-y-1.5 flex-1">
                      {g.examples.map((ex) => (
                        <li key={ex} className="text-[14px] text-[#666666]">
                          {ex}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 h-6 rounded-full border ${
                            g.test === 'ETEA required'
                              ? 'bg-black text-white border-black'
                              : 'bg-[#F3F5F9] text-black border-[#E5E7EB]'
                          }`}
                        >
                          <FlaskConical className="w-3 h-3" />
                          {g.test}
                        </span>
                      </div>
                      <Link
                        to="/fees"
                        className="inline-flex items-center gap-2 text-[13px] font-medium text-[#a81e24] hover:text-[#8a181d] transition-colors"
                      >
                        Check Fee Structure
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="masters"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              {masterGroups.map((g, i) => (
                <Reveal key={g.number} delay={Math.min(i * 0.04, 0.2)}>
                  <div className="group flex flex-col h-full p-6 md:p-7 rounded-[24px] bg-white border border-[#E5E7EB] hover:border-black transition-all hover:shadow-surface">
                    <div className="flex items-start justify-between">
                      <div className="num text-[#a81e24] font-semibold text-[14px] tracking-wider">
                        {String(g.number).padStart(2, '0')}
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#999] group-hover:text-black transition-colors" />
                    </div>
                    <h3 className="mt-4 font-semibold text-black text-[20px] leading-tight tracking-tight">
                      {g.name}
                    </h3>
                    <ul className="mt-4 space-y-1.5 flex-1">
                      {g.programs.map((prog) => (
                        <li key={prog} className="text-[14px] text-[#666666]">
                          {prog}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 h-6 rounded-full border bg-[#F3F5F9] text-black border-[#E5E7EB]">
                          <FlaskConical className="w-3 h-3" />
                          CECOS / NTS / ETEA test
                        </span>
                      </div>
                      <Link
                        to="/fees"
                        className="inline-flex items-center gap-2 text-[13px] font-medium text-[#a81e24] hover:text-[#8a181d] transition-colors"
                      >
                        Check Fee Structure
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}