'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  DollarSign,
  Info,
  ArrowRight,
  Clock,
  Wallet,
  GraduationCap,
  Award,
  ChevronDown,
  X,
} from 'lucide-react';
import { feeGroups, type FeeRow, type FeeGroup } from '../lib/data';
import { useT } from '../lib/i18n';
import { Reveal } from './ui/Reveal';
import { Button } from './ui/Button';
import { trackEvent, useTrackApply } from '../lib/analytics';

// ── helpers ──────────────────────────────────────────────────────────────────
function pkr(amount: number): string {
  return amount.toLocaleString('en-PK');
}

function semestersToDuration(n: number): string {
  const years = n / 2;
  return `${years} ${years === 1 ? 'year' : 'years'}`;
}

import { useSearchParams } from 'next/navigation';

// Flatten all fee rows into a searchable list, keeping a reference to the group
type FlatProgram = FeeRow & { group: FeeGroup };

function buildFlatList(): FlatProgram[] {
  return feeGroups.flatMap((g) =>
    g.rows.map((r) => ({ ...r, group: g }))
  );
}

// ── main component ──────────────────────────────────────────────────────────
export function FeeStructure() {
  const { t } = useT();
  const allPrograms = useMemo(() => buildFlatList(), []);
  
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const trackApply = useTrackApply();

  // Debounced search tracking (point 4) — settled queries only.
  useEffect(() => {
    const q = query.trim();
    if (!q) return;
    const id = setTimeout(() => {
      trackEvent('fee_search', { query: q });
    }, 700);
    return () => clearTimeout(id);
  }, [query]);

  // Filter programs by search query
  const filtered = useMemo(() => {
    if (!query.trim()) return allPrograms;
    const q = query.toLowerCase();
    return allPrograms.filter(
      (p) =>
        p.program.toLowerCase().includes(q) ||
        p.group.title.toLowerCase().includes(q)
    );
  }, [query, allPrograms]);

  function handleClear() {
    setQuery('');
    inputRef.current?.focus();
  }

  return (
    <section id="fees" className="bg-white border-t border-[#E2DBCF]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24">

        {/* ── Section header ──────────────────────────────────────── */}
        <Reveal>
          <div className="max-w-[760px] mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 text-[#7A1818] text-[13px] font-medium uppercase tracking-[0.14em] mb-4">
              <DollarSign className="w-3.5 h-3.5" />
              <span className="keep-ltr">{t('fee.eyebrow')}</span>
            </div>
            <h2 className="display-tight font-semibold text-[#1A1612] text-[34px] md:text-[46px] tracking-tight">
              {t('fee.title')}
            </h2>
            <p className="mt-4 text-[#5A524A] text-[16px] md:text-[18px]">
              {t('fee.sub')}
            </p>
          </div>
        </Reveal>

        {/* ── Search bar ──────────────────────────────────────────── */}
        <Reveal delay={0.05}>
          <div className="relative max-w-[640px]">
            <div className="flex items-center gap-3 bg-white rounded-2xl border px-5 h-14 transition-all border-[#E2DBCF] shadow-xs focus-within:border-[#7A1818] focus-within:ring-2 focus-within:ring-[#C42828]/15">
              <Search className="w-5 h-5 text-[#9A9087] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('fee.search')}
                className="flex-1 bg-transparent text-[15px] text-[#1A1612] placeholder:text-[#9A9087] outline-none"
                aria-label={t('fee.search')}
                autoComplete="off"
              />
              {query && (
                <button
                  onClick={handleClear}
                  className="w-7 h-7 rounded-full grid place-items-center hover:bg-[#EFE9DD] transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4 text-[#5A524A]" />
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* ── Result Cards Grid ─────────────────────────────────────────── */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <motion.div
                  key={`${p.group.id}-${p.program}`}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <div className="h-full flex flex-col bg-white rounded-[28px] border border-[#E2DBCF] shadow-xs overflow-hidden">
                    {/* Card header */}
                    <div className="px-6 md:px-8 pt-6 md:pt-8 pb-5 border-b border-[#EFE9DD] flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[12px] text-[#9A9087] uppercase tracking-wider font-medium">
                            {t('fee.group')}{' '}
                            <span className="num">{String(p.group.groupNumber).padStart(2, '0')}</span>
                            {' · '}
                            {p.group.level === 'PG' ? 'Postgraduate' : 'Undergraduate'}
                          </div>
                          <h3 className="mt-2 font-semibold text-[#1A1612] text-[22px] md:text-[24px] leading-tight tracking-tight">
                            {p.program}
                          </h3>
                        </div>
                        {p.notes && (
                          <span className="shrink-0 inline-flex items-center text-[10px] font-semibold px-2.5 h-6 rounded-full bg-[#7A1818] text-white mt-1">
                            {p.notes}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-3 divide-x divide-[#EFE9DD] mt-auto">
                      {/* Semester fee */}
                      <div className="px-4 py-5 text-center">
                        <div className="flex justify-center mb-2">
                          <Wallet className="w-5 h-5 text-[#7A1818]" />
                        </div>
                        <div className="num text-[18px] md:text-[20px] font-semibold text-[#1A1612] leading-tight">
                          {pkr(p.firstSemesterFee)}
                        </div>
                        <div className="text-[11px] text-[#9A9087] mt-1 font-medium uppercase tracking-wider">
                          {t('fee.semester')}
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="px-4 py-5 text-center">
                        <div className="flex justify-center mb-2">
                          <Clock className="w-5 h-5 text-[#7A1818]" />
                        </div>
                        <div className="num text-[18px] md:text-[20px] font-semibold text-[#1A1612] leading-tight">
                          {semestersToDuration(p.semesters)}
                        </div>
                        <div className="text-[11px] text-[#9A9087] mt-1 font-medium uppercase tracking-wider">
                          {t('fee.duration')}
                        </div>
                      </div>

                      {/* Total */}
                      <div className="px-4 py-5 text-center">
                        <div className="flex justify-center mb-2">
                          <GraduationCap className="w-5 h-5 text-[#7A1818]" />
                        </div>
                        <div className="num text-[18px] md:text-[20px] font-semibold text-[#1A1612] leading-tight">
                          ~{pkr(p.totalCourseFee)}
                        </div>
                        <div className="text-[11px] text-[#9A9087] mt-1 font-medium uppercase tracking-wider">
                          {t('fee.total')}
                        </div>
                      </div>
                    </div>

                    {/* Footer badges + CTAs */}
                    <div className="px-6 md:px-8 py-5 bg-white border-t border-[#EFE9DD]">
                      {/* Info badges */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 h-7 rounded-full bg-white border border-[#E2DBCF] text-[#5A524A]">
                          <Info className="w-3 h-3" />
                          {t('fee.includes')}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 h-7 rounded-full bg-[#7A1818]/[0.07] border border-[#7A1818]/20 text-[#7A1818]">
                          <Award className="w-3 h-3" />
                          {t('fee.scholarship')}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button as="a" href="#apply" onClick={() => trackApply('fees_card')} variant="primary" size="lg" className="w-full sm:w-fit">
                          {t('fee.cta')}
                          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-12 text-center text-[15px] text-[#5A524A]"
              >
                {t('fee.noResults')}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Disclaimer ──────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="mt-8 max-w-[640px] flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E2DBCF]">
            <Info className="w-4 h-4 text-[#9A9087] shrink-0 mt-0.5" />
            <p className="text-[13px] text-[#5A524A] leading-relaxed">
              {t('fee.disclaimer')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
