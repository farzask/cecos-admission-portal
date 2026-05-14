import React, { useMemo, useRef, useState } from 'react';
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
  Download,
  ChevronDown,
  X,
} from 'lucide-react';
import { feeGroups, type FeeRow, type FeeGroup } from '../lib/data';
import { useT } from '../lib/i18n';
import { Reveal } from './ui/Reveal';
import { Button } from './ui/Button';

// ── helpers ──────────────────────────────────────────────────────────────────
function pkr(amount: number): string {
  return amount.toLocaleString('en-PK');
}

function semestersToDuration(n: number): string {
  const years = n / 2;
  return `${years} ${years === 1 ? 'year' : 'years'}`;
}

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
  const allPrograms = useMemo(buildFlatList, []);

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<FlatProgram | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  function handleSelect(p: FlatProgram) {
    setSelected(p);
    setQuery(p.program);
    setDropdownOpen(false);
  }

  function handleClear() {
    setSelected(null);
    setQuery('');
    setDropdownOpen(false);
    inputRef.current?.focus();
  }

  function handleInputFocus() {
    setDropdownOpen(true);
    // If a program was previously selected and user re-focuses, clear to let them search again
    if (selected) {
      setQuery('');
      setSelected(null);
    }
  }

  function handleBlur(e: React.FocusEvent) {
    // Close dropdown only if focus moves outside the wrapper
    if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
      setDropdownOpen(false);
    }
  }

  return (
    <section id="fees" className="bg-[#F3F5F9] border-t border-[#E5E7EB]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24">

        {/* ── Section header ──────────────────────────────────────── */}
        <Reveal>
          <div className="max-w-[760px] mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 text-[#a81e24] text-[13px] font-medium uppercase tracking-[0.14em] mb-4">
              <DollarSign className="w-3.5 h-3.5" />
              <span className="keep-ltr">{t('fee.eyebrow')}</span>
            </div>
            <h2 className="display-tight font-semibold text-black text-[34px] md:text-[46px] tracking-tight">
              {t('fee.title')}
            </h2>
            <p className="mt-4 text-[#666666] text-[16px] md:text-[18px]">
              {t('fee.sub')}
            </p>
          </div>
        </Reveal>

        {/* ── Search bar ──────────────────────────────────────────── */}
        <Reveal delay={0.05}>
          <div
            ref={wrapperRef}
            onBlur={handleBlur}
            className="relative max-w-[640px]"
          >
            <div
              className={`flex items-center gap-3 bg-white rounded-2xl border px-5 h-14 transition-all ${
                dropdownOpen
                  ? 'border-[#a81e24] ring-2 ring-[#a81e24]/15 shadow-lg'
                  : 'border-[#E5E7EB] shadow-sm hover:border-black/30'
              }`}
            >
              <Search className="w-5 h-5 text-[#999] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setDropdownOpen(true);
                  setSelected(null);
                }}
                onFocus={handleInputFocus}
                placeholder={t('fee.search')}
                className="flex-1 bg-transparent text-[15px] text-black placeholder:text-[#999] outline-none"
                aria-label={t('fee.search')}
                aria-expanded={dropdownOpen}
                aria-controls="fee-search-listbox"
                role="combobox"
                autoComplete="off"
              />
              {query && (
                <button
                  onClick={handleClear}
                  className="w-7 h-7 rounded-full grid place-items-center hover:bg-[#F3F5F9] transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4 text-[#666]" />
                </button>
              )}
              <ChevronDown
                className={`w-4 h-4 text-[#999] shrink-0 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </div>

            {/* ── Dropdown list ──────────────────────────────────── */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  id="fee-search-listbox"
                  role="listbox"
                  initial={{ opacity: 0, y: -4, scaleY: 0.96 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -4, scaleY: 0.96 }}
                  transition={{ duration: 0.18 }}
                  style={{ transformOrigin: 'top' }}
                  className="absolute z-30 left-0 right-0 mt-2 bg-white rounded-2xl border border-[#E5E7EB] shadow-elevated max-h-[320px] overflow-y-auto"
                >
                  {filtered.length > 0 ? (
                    filtered.map((p) => (
                      <button
                        key={`${p.group.id}-${p.program}`}
                        role="option"
                        aria-selected={selected?.program === p.program}
                        onMouseDown={(e) => e.preventDefault()} // prevent blur before click
                        onClick={() => handleSelect(p)}
                        className="w-full text-start px-5 py-3 flex items-center justify-between gap-4 hover:bg-[#F3F5F9] transition-colors border-b border-[#F5F5F7] last:border-b-0"
                      >
                        <div className="min-w-0">
                          <div className="font-medium text-black text-[14px] truncate">
                            {p.program}
                          </div>
                          <div className="text-[12px] text-[#999] mt-0.5">
                            {p.group.title} · {p.group.level === 'PG' ? 'Postgraduate' : 'Undergraduate'}
                          </div>
                        </div>
                        <div className="text-[13px] font-semibold text-[#a81e24] num shrink-0">
                          PKR {pkr(p.semesterFee)}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-5 py-8 text-center text-[14px] text-[#999]">
                      {t('fee.noResults')}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* ── Result card ─────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.program}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-8 max-w-[640px]"
            >
              <div className="bg-white rounded-[28px] border border-[#E5E7EB] shadow-surface overflow-hidden">
                {/* Card header */}
                <div className="px-6 md:px-8 pt-6 md:pt-8 pb-5 border-b border-[#F0F0F2]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[12px] text-[#999] uppercase tracking-wider font-medium">
                        {t('fee.group')}{' '}
                        <span className="num">{String(selected.group.groupNumber).padStart(2, '0')}</span>
                        {' · '}
                        {selected.group.level === 'PG' ? 'Postgraduate' : 'Undergraduate'}
                      </div>
                      <h3 className="mt-2 font-semibold text-black text-[22px] md:text-[26px] leading-tight tracking-tight">
                        {selected.program}
                      </h3>
                    </div>
                    {selected.notes && (
                      <span className="shrink-0 inline-flex items-center text-[10px] font-semibold px-2.5 h-6 rounded-full bg-black text-white mt-1">
                        {selected.notes}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 divide-x divide-[#F0F0F2]">
                  {/* Semester fee */}
                  <div className="px-4 md:px-6 py-5 md:py-6 text-center">
                    <div className="flex justify-center mb-2">
                      <Wallet className="w-5 h-5 text-[#a81e24]" />
                    </div>
                    <div className="num text-[20px] md:text-[24px] font-semibold text-black leading-tight">
                      {pkr(selected.semesterFee)}
                    </div>
                    <div className="text-[11px] md:text-[12px] text-[#999] mt-1 font-medium uppercase tracking-wider">
                      {t('fee.semester')}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="px-4 md:px-6 py-5 md:py-6 text-center">
                    <div className="flex justify-center mb-2">
                      <Clock className="w-5 h-5 text-[#a81e24]" />
                    </div>
                    <div className="num text-[20px] md:text-[24px] font-semibold text-black leading-tight">
                      {semestersToDuration(selected.semesters)}
                    </div>
                    <div className="text-[11px] md:text-[12px] text-[#999] mt-1 font-medium uppercase tracking-wider">
                      {t('fee.duration')}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="px-4 md:px-6 py-5 md:py-6 text-center">
                    <div className="flex justify-center mb-2">
                      <GraduationCap className="w-5 h-5 text-[#a81e24]" />
                    </div>
                    <div className="num text-[20px] md:text-[24px] font-semibold text-black leading-tight">
                      ~{pkr(selected.semesterFee * selected.semesters)}
                    </div>
                    <div className="text-[11px] md:text-[12px] text-[#999] mt-1 font-medium uppercase tracking-wider">
                      {t('fee.total')}
                    </div>
                  </div>
                </div>

                {/* Footer badges + CTAs */}
                <div className="px-6 md:px-8 py-5 md:py-6 bg-[#FAFAFA] border-t border-[#F0F0F2]">
                  {/* Info badges */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 h-7 rounded-full bg-white border border-[#E5E7EB] text-[#666]">
                      <Info className="w-3 h-3" />
                      {t('fee.includes')}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 h-7 rounded-full bg-[#a81e24]/[0.07] border border-[#a81e24]/20 text-[#a81e24]">
                      <Award className="w-3 h-3" />
                      {t('fee.scholarship')}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button as="a" href="#apply" variant="primary" size="lg">
                      {t('fee.cta')}
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </Button>
                    <Button as="a" href="#" variant="secondary" size="lg">
                      <Download className="w-4 h-4" />
                      {t('fee.download')}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Disclaimer ──────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="mt-8 max-w-[640px] flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E5E7EB]">
            <Info className="w-4 h-4 text-[#999] shrink-0 mt-0.5" />
            <p className="text-[13px] text-[#666666] leading-relaxed">
              {t('fee.disclaimer')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
