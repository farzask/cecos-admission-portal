'use client';

import React, { useMemo, useState } from 'react';
import { FlaskConical, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { disciplineGroups } from '../lib/data';
import { useT } from '../lib/i18n';
import { Reveal } from './ui/Reveal';
import { useAdmissionData, type DisciplineRow } from '../lib/AdmissionDataContext';
import { trackEvent, useTrackViewOnce } from '../lib/analytics';

// ── Static fallback for postgraduate (used when Supabase is not configured) ──
const staticPostgraduateGroups = [
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
      'PhD Management Sciences',
    ],
  },
  {
    number: 5,
    name: 'Computing & Mathematics',
    programs: [
      'MS Computer Science',
      'MS Software Engineering',
      'MS Applied Mathematics',
      'PhD Computer Science',
    ],
  },
  {
    number: 6,
    name: 'Sciences, Health & Humanities',
    programs: [
      'MS Biotechnology',
      'MS Pharmacy – Pharmaceutics',
      'MS Pharmacy – Pharmacology',
      'MS Pharmacy – Pharmacy Practice',
      'MPhil English',
      'MPhil Psychology',
      'MPhil Islamic Studies',
      'MPhil Biotechnology',
      'MPhil Microbiology',
      'PhD English',
      'PhD Psychology',
      'PhD Biotechnology',
    ],
  },
];

// ── Helpers to group Supabase disciplines ───────────────────────────────────

type GroupedDiscipline = {
  number: number;
  name: string;
  disciplines: DisciplineRow[];
};

// Map a discipline's group_number → category name using the `number` key in
// disciplineGroups (data.ts). Falls back to the first discipline name if a
// group_number has no matching entry.
const groupLabelByNumber = new Map(disciplineGroups.map((g) => [g.number, g.name]));

function groupByNumber(rows: DisciplineRow[]): GroupedDiscipline[] {
  const map = new Map<number, DisciplineRow[]>();
  for (const d of rows) {
    const existing = map.get(d.group_number) || [];
    existing.push(d);
    map.set(d.group_number, existing);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a - b)
    .map(([num, items]) => ({
      number: num,
      name: groupLabelByNumber.get(num) ?? items[0]?.name ?? '',
      disciplines: items,
    }));
}

function isUndergraduate(level: string): boolean {
  const l = level.toLowerCase();
  return l === 'undergraduate' || l === 'ug';
}

function isPostgraduate(level: string): boolean {
  const l = level.toLowerCase();
  return l === 'postgraduate' || l === 'pg';
}

// ── Static fallback for bachelor groups (1-5) ───────────────────────────────
const staticBachelorGroups = disciplineGroups.filter((g) => g.number <= 5);

type Tab = 'undergraduate' | 'postgraduate';

export function Programs() {
  const { t } = useT();
  const [activeTab, setActiveTab] = useState<Tab>('undergraduate');
  const { disciplines } = useAdmissionData();
  // Fires `programs_view` once when the section scrolls into view (point 13).
  const sectionRef = useTrackViewOnce('programs_view');
  function switchTab(tab: Tab) {
    if (tab !== activeTab) trackEvent('program_tab_switch', { tab });
    setActiveTab(tab);
  }

  // Use Supabase data if available, otherwise fall back to static data
  const hasSupabaseData = disciplines.length > 0;

  const ugDisciplines = useMemo(() => {
    if (!hasSupabaseData) return null;
    return disciplines.filter((d) => isUndergraduate(d.level));
  }, [disciplines, hasSupabaseData]);

  const pgDisciplines = useMemo(() => {
    if (!hasSupabaseData) return null;
    return disciplines.filter((d) => isPostgraduate(d.level));
  }, [disciplines, hasSupabaseData]);

  const ugGroups = useMemo(() => {
    if (!ugDisciplines) return null;
    return groupByNumber(ugDisciplines);
  }, [ugDisciplines]);

  const pgGroups = useMemo(() => {
    if (!pgDisciplines) return null;
    return groupByNumber(pgDisciplines);
  }, [pgDisciplines]);

  return (
    <section id="programs" ref={sectionRef} className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="max-w-[640px]">
              <div className="text-[#5A524A] text-[13px] uppercase tracking-[0.14em] font-medium mb-3 keep-ltr">
                {t('nav.programs')}
              </div>
              <h2 className="display-tight font-semibold text-[#1A1612] text-[34px] md:text-[46px] tracking-tight">
                {t('programs.title')}
              </h2>
              <p className="mt-4 text-[#5A524A] text-[16px] md:text-[18px]">
                {t('programs.sub')}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Tab Switcher — larger size */}
        <Reveal delay={0.05}>
          <div className="flex gap-1.5 p-1.5 rounded-2xl bg-white border border-[#E2DBCF] w-fit mb-10">
            {(['undergraduate', 'postgraduate'] as Tab[]).map((tab) => (
              <button
                key={tab}
                id={`tab-${tab}`}
                onClick={() => switchTab(tab)}
                className={`relative px-8 py-3 rounded-xl text-[16px] font-semibold transition-all duration-200 ${activeTab === tab
                    ? 'bg-[#7A1818] text-white shadow-md'
                    : 'text-[#5A524A] hover:text-[#1A1612] hover:bg-white/60'
                  }`}
              >
                {tab === 'undergraduate' ? t('programs.tabUG') : t('programs.tabPG')}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'undergraduate' ? (
            <motion.div
              key="undergraduate"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              {/* Supabase-driven UG */}
              {ugGroups ? (
                ugGroups.map((g, i) => (
                  <Reveal key={g.number} delay={Math.min(i * 0.04, 0.2)}>
                    <div className="group flex flex-col h-full p-6 md:p-7 rounded-[24px] bg-white border border-[#E2DBCF] hover:border-[#1A1612] transition-all hover:shadow-surface">
                      <div className="flex items-start justify-between">
                        <div className="num text-[#7A1818] font-semibold text-[14px] tracking-wider">
                          {String(g.number).padStart(2, '0')}
                        </div>
                      </div>
                      <h3 className="mt-4 font-semibold text-[#1A1612] text-[20px] leading-tight tracking-tight">
                        {g.name}
                      </h3>
                      <ul className="mt-4 space-y-1.5 flex-1">
                        {g.disciplines.map((d) => (
                          <li key={d.id} className="text-[14px] text-[#5A524A]">
                            {d.name}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-6">
                        <Link
                          href={`/fees?group=${g.number}`}
                          onClick={() =>
                            trackEvent('program_fee_link', {
                              group: g.number,
                              group_name: g.name,
                            })
                          }
                          className="inline-flex items-center gap-2 text-[13px] font-medium text-[#7A1818] hover:text-[#A82222] transition-colors"
                        >
                          {t('programs.feeLink')}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                ))
              ) : (
                /* Static fallback UG */
                staticBachelorGroups.map((g, i) => (
                  <Reveal key={g.number} delay={Math.min(i * 0.04, 0.2)}>
                    <div className="group flex flex-col h-full p-6 md:p-7 rounded-[24px] bg-white border border-[#E2DBCF] hover:border-[#1A1612] transition-all hover:shadow-surface">
                      <div className="flex items-start justify-between">
                        <div className="num text-[#7A1818] font-semibold text-[14px] tracking-wider">
                          {String(g.number).padStart(2, '0')}
                        </div>
                      </div>
                      <h3 className="mt-4 font-semibold text-[#1A1612] text-[20px] leading-tight tracking-tight">
                        {g.name}
                      </h3>
                      <ul className="mt-4 space-y-1.5 flex-1">
                        {g.examples.map((ex) => (
                          <li key={ex} className="text-[14px] text-[#5A524A]">
                            {ex}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-6">
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 h-6 rounded-full border ${g.test === 'ETEA required'
                                ? 'bg-[#7A1818] text-white border-[#7A1818]'
                                : 'bg-white text-[#1A1612] border-[#E2DBCF]'
                              }`}
                          >
                            <FlaskConical className="w-3 h-3" />
                            {g.test}
                          </span>
                        </div>
                        <Link
                          href={`/fees?group=${g.number}`}
                          onClick={() =>
                            trackEvent('program_fee_link', {
                              group: g.number,
                              group_name: g.name,
                            })
                          }
                          className="inline-flex items-center gap-2 text-[13px] font-medium text-[#7A1818] hover:text-[#A82222] transition-colors"
                        >
                          {t('programs.feeLink')}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key="postgraduate"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              {/* Supabase-driven PG */}
              {pgGroups ? (
                pgGroups.map((g, i) => (
                  <Reveal key={g.number} delay={Math.min(i * 0.04, 0.2)}>
                    <div className="group flex flex-col h-full p-6 md:p-7 rounded-[24px] bg-white border border-[#E2DBCF] hover:border-[#1A1612] transition-all hover:shadow-surface">
                      <div className="flex items-start justify-between">
                        <div className="num text-[#7A1818] font-semibold text-[14px] tracking-wider">
                          {String(g.number).padStart(2, '0')}
                        </div>
                      </div>
                      <h3 className="mt-4 font-semibold text-[#1A1612] text-[20px] leading-tight tracking-tight">
                        {g.name}
                      </h3>
                      <ul className="mt-4 space-y-1.5 flex-1">
                        {g.disciplines.map((d) => (
                          <li key={d.id} className="text-[14px] text-[#5A524A]">
                            {d.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))
              ) : (
                /* Static fallback PG */
                staticPostgraduateGroups.map((g, i) => (
                  <Reveal key={g.number} delay={Math.min(i * 0.04, 0.2)}>
                    <div className="group flex flex-col h-full p-6 md:p-7 rounded-[24px] bg-white border border-[#E2DBCF] hover:border-[#1A1612] transition-all hover:shadow-surface">
                      <div className="flex items-start justify-between">
                        <div className="num text-[#7A1818] font-semibold text-[14px] tracking-wider">
                          {String(g.number).padStart(2, '0')}
                        </div>
                      </div>
                      <h3 className="mt-4 font-semibold text-[#1A1612] text-[20px] leading-tight tracking-tight">
                        {g.name}
                      </h3>
                      <ul className="mt-4 space-y-1.5 flex-1">
                        {g.programs.map((prog) => (
                          <li key={prog} className="text-[14px] text-[#5A524A]">
                            {prog}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}