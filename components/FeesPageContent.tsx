'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  DollarSign,
  Info,
  ArrowRight,
  Award,
  X,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { feeGroups, type FeeRow, type FeeGroup } from '@/lib/data';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { trackEvent, useTrackApply } from '@/lib/analytics';

// ── helpers ──────────────────────────────────────────────────────────────────
function pkr(amount: number): string {
  return amount.toLocaleString('en-PK');
}

function semestersToDuration(n: number): string {
  const years = n / 2;
  return `${years} ${years === 1 ? 'year' : 'years'}`;
}

type FlatProgram = FeeRow & { group: FeeGroup };

function buildFlatList(): FlatProgram[] {
  return feeGroups.flatMap((g) => g.rows.map((r) => ({ ...r, group: g })));
}

export function FeesPageContent() {
  const allPrograms = useMemo(() => buildFlatList(), []);

  const searchParams = useSearchParams();
  const initialGroup = searchParams.get('group');

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeGroup, setActiveGroup] = useState<number | null>(
    initialGroup ? parseInt(initialGroup, 10) : null
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const trackApply = useTrackApply();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Record arrival via a program "View fees" deep-link (point 4 filtering).
  useEffect(() => {
    if (initialGroup) {
      trackEvent('fee_filter', {
        group: parseInt(initialGroup, 10),
        source: 'deeplink',
      });
    }
    // Only on first mount, based on the incoming URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced search tracking so we log settled queries, not every keystroke.
  useEffect(() => {
    const q = query.trim();
    if (!q) return;
    const id = setTimeout(() => {
      trackEvent('fee_search', { query: q });
    }, 700);
    return () => clearTimeout(id);
  }, [query]);

  const filtered = useMemo(() => {
    if (activeGroup) {
      return allPrograms.filter((p) => p.group.groupNumber === activeGroup);
    }
    if (!query.trim()) return allPrograms;
    const q = query.toLowerCase();
    return allPrograms.filter(
      (p) =>
        p.program.toLowerCase().includes(q) ||
        p.group.title.toLowerCase().includes(q)
    );
  }, [query, activeGroup, allPrograms]);

  function handleQueryChange(val: string) {
    setQuery(val);
    setActiveGroup(null);
  }

  function handleClear() {
    setQuery('');
    setActiveGroup(null);
    inputRef.current?.focus();
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 md:py-32">
      <div className="mx-auto max-w-[800px] px-5 md:px-8">
        <Reveal>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#5A524A] hover:text-[#1A1612] mb-8 transition-colors text-[14px] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="max-w-[760px] mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 text-[#7A1818] text-[13px] font-medium uppercase tracking-[0.14em] mb-4">
              <DollarSign className="w-3.5 h-3.5" />
              <span className="keep-ltr">Fee Structure 2025</span>
            </div>
            <h1 className="display-tight font-display font-normal italic text-[#1A1612] text-[40px] md:text-[54px] tracking-tight">
              Know exactly what you&apos;ll invest — no surprises.
            </h1>
            <p className="mt-4 text-[#5A524A] text-[16px] md:text-[18px]">
              Search or select your program to see the per-semester fee,
              duration, and estimated total cost.
            </p>
          </div>
        </Reveal>

        {/* ── Search bar ──────────────────────────────────────────── */}
        <Reveal delay={0.05}>
          <div className="relative overflow-visible">
            {/* Sand Sticker Signature */}
            <div
              className="absolute -top-3 right-6 z-20 inline-flex items-center justify-center bg-[#F4D58D] text-[#1A1612] font-mono text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md shadow-[0_2px_6px_rgba(26,22,18,0.08)] select-none"
              style={{ transform: 'rotate(-2deg)' }}
            >
              💰 FEES · INTAKE 2026
            </div>

            <div className="flex items-center gap-3 bg-white rounded-2xl border px-5 h-16 transition-all border-[#E2DBCF] shadow-xs focus-within:border-[#C42828] focus-within:ring-4 focus-within:ring-[#C42828]/12">
              <Search className="w-5 h-5 text-[#9A9087] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Search by program (e.g. BS Computer Science)"
                className="flex-1 bg-transparent text-[16px] text-[#1A1612] placeholder:text-[#9A9087] outline-none h-full"
                autoComplete="off"
              />
              {query && (
                <button
                  onClick={handleClear}
                  className="w-8 h-8 rounded-full grid place-items-center hover:bg-[#EFE9DD] transition-colors"
                >
                  <X className="w-4 h-4 text-[#5A524A]" />
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* ── Result Cards ─────────────────────────────────────────── */}
        <div className="mt-8 flex flex-col gap-6">
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
                  <div className="bg-white rounded-[28px] border border-[#E2DBCF] shadow-surface overflow-hidden">
                    <div className="px-6 md:px-8 pt-6 md:pt-8 pb-5 border-b border-[#EFE9DD]">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[12px] text-[#9A9087] uppercase tracking-wider font-medium">
                            Group{' '}
                            <span className="num">
                              {String(p.group.groupNumber).padStart(2, '0')}
                            </span>
                            {' · '}
                            {p.group.level === 'PG'
                              ? 'Postgraduate'
                              : 'Undergraduate'}
                          </div>
                          <h3 className="mt-2 font-semibold text-[#1A1612] text-[24px] md:text-[28px] leading-tight tracking-tight">
                            {p.program}
                          </h3>
                        </div>
                        {p.notes && (
                          <span className="shrink-0 inline-flex items-center text-[11px] font-semibold px-3 h-7 rounded-full bg-[#7A1818] text-white mt-1">
                            {p.notes}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#EFE9DD]">
                      <div className="px-4 py-6 text-center">
                        <div className="text-[11px] text-[#9A9087] mb-1.5 font-medium uppercase tracking-wider">
                          Admission Fee
                        </div>
                        <div className="num text-[20px] font-semibold text-[#1A1612]">
                          {pkr(p.admissionFee)}
                        </div>
                        <div className="text-[12px] text-[#5A524A] mt-1">
                          (One time)
                        </div>
                      </div>
                      <div className="px-4 py-6 text-center">
                        <div className="text-[11px] text-[#9A9087] mb-1.5 font-medium uppercase tracking-wider">
                          1st Semester
                        </div>
                        <div className="num text-[20px] font-semibold text-[#1A1612]">
                          {pkr(p.firstSemesterFee)}
                        </div>
                        <div className="text-[12px] text-[#5A524A] mt-1">
                          (Including admission)
                        </div>
                      </div>
                      <div className="px-4 py-6 text-center">
                        <div className="text-[11px] text-[#9A9087] mb-1.5 font-medium uppercase tracking-wider">
                          Onward Semesters
                        </div>
                        <div className="num text-[20px] font-semibold text-[#1A1612]">
                          {pkr(p.onwardSemesterFee)}
                        </div>
                        <div className="text-[12px] text-[#5A524A] mt-1">
                          (Per semester)
                        </div>
                      </div>
                      <div className="px-4 py-6 text-center">
                        <div className="text-[11px] text-[#9A9087] mb-1.5 font-medium uppercase tracking-wider">
                          Est. Total
                        </div>
                        <div className="num text-[20px] font-semibold text-[#7A1818]">
                          ~{pkr(p.totalCourseFee)}
                        </div>
                        <div className="text-[12px] text-[#5A524A] mt-1">
                          ({semestersToDuration(p.semesters)})
                        </div>
                      </div>
                    </div>

                    <div className="px-6 md:px-8 py-5 md:py-6 bg-white border-t border-[#EFE9DD]">
                      <div className="flex flex-wrap gap-2 mb-5">
                        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 h-7 rounded-full bg-white border border-[#E2DBCF] text-[#5A524A]">
                          <Info className="w-3 h-3" />
                          Includes tuition &amp; exam fees
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 h-7 rounded-full bg-[#7A1818]/[0.07] border border-[#7A1818]/20 text-[#7A1818]">
                          <Award className="w-3 h-3" />
                          Eligible for up to 100% scholarship
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          href="/"
                          onClick={() => trackApply('fees_page_card')}
                          variant="primary"
                          size="lg"
                          className="w-full sm:w-fit"
                        >
                          Start your application
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
                className="py-12 text-center text-[15px] text-[#5A524A]"
              >
                No programs found matching &quot;{query}&quot;
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E2DBCF]">
            <Info className="w-4 h-4 text-[#9A9087] shrink-0 mt-0.5" />
            <p className="text-[13px] text-[#5A524A] leading-relaxed">
              Fees shown are based on the 2025 schedule and subject to change.
              Lab, hostel, and transport charges may apply separately. Contact
              admissions for the most current schedule.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
