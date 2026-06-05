import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { supabase } from './supabase';

// ─── Types matching Supabase schema (read-only subset) ──────────────────────

export type CycleRow = {
  id: string;
  session: string;       // e.g. 'fall', 'spring'
  year: number;
  level: string;         // cycle_level enum
  status: string;        // cycle_status enum — 'open' | 'closed' etc.
  start_date: string;    // date
  end_date: string;      // date
  program_choices_count: number;
  config: Record<string, unknown> | null;
};

export type PhaseRow = {
  id: string;
  cycle_id: string;
  phase_number: number;
  start_date: string;
  end_date: string;
  fee_amount: number;
  eligibility: string;
};

export type DisciplineRow = {
  id: string;
  group_number: number;
  name: string;
  short_code: string;
  level: string;         // cycle_level enum
  active: boolean;
};

// ─── Context value ──────────────────────────────────────────────────────────

export type AdmissionLevel = 'ug' | 'pg' | 'both' | null;

export type AdmissionData = {
  /** The currently open/active cycles (may be one UG + one PG) */
  activeCycles: CycleRow[];
  /** Current phase for each active cycle, keyed by cycle id */
  currentPhases: Record<string, PhaseRow | null>;
  /** All phases for active cycles */
  allPhases: PhaseRow[];
  /** Active disciplines from DB */
  disciplines: DisciplineRow[];
  /** Convenience: UG application fee from current phase */
  ugFee: number | null;
  /** Convenience: PG application fee from current phase */
  pgFee: number | null;
  /** Which level(s) of admission are currently open */
  admissionLevel: AdmissionLevel;
  /** Convenience: the soonest cycle end date (for countdown) */
  countdownTarget: Date | null;
  /** Convenience: program choices count from cycle */
  programChoicesCount: number | null;
  /** Session label, e.g. "Fall 2026" */
  sessionLabel: string | null;
  /** Whether we're still loading */
  loading: boolean;
  /** Error message if fetch failed */
  error: string | null;
};

const defaultValue: AdmissionData = {
  activeCycles: [],
  currentPhases: {},
  allPhases: [],
  disciplines: [],
  ugFee: null,
  pgFee: null,
  admissionLevel: null,
  countdownTarget: null,
  programChoicesCount: null,
  sessionLabel: null,
  loading: true,
  error: null,
};

const AdmissionDataContext = createContext<AdmissionData>(defaultValue);

// ─── Helper: determine the current phase for a cycle ────────────────────────

function findCurrentPhase(phases: PhaseRow[]): PhaseRow | null {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  // Find the phase whose date range includes today
  const active = phases.find(
    (p) => p.start_date <= today && p.end_date >= today
  );
  if (active) return active;
  // If no phase is currently active, return the next upcoming one
  const upcoming = phases
    .filter((p) => p.start_date > today)
    .sort((a, b) => a.start_date.localeCompare(b.start_date));
  if (upcoming.length > 0) return upcoming[0];
  // Fallback to the last phase
  return phases.length > 0 ? phases[phases.length - 1] : null;
}

// ─── Provider ───────────────────────────────────────────────────────────────

export function AdmissionDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AdmissionData>(defaultValue);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      console.log('[Supabase Debug] Starting fetch from Supabase...');
      if (!supabase) {
        console.warn('[Supabase Debug] Supabase client is null. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
        setData((prev) => ({ ...prev, loading: false, error: null }));
        return;
      }

      try {
        console.log('[Supabase Debug] 1. Querying cycles where status = "active"...');
        const { data: cycles, error: cyclesErr } = await supabase
          .from('cycles')
          .select('id, session, year, level, status, start_date, end_date, program_choices_count, config')
          .eq('status', 'active');

        console.log('[Supabase Debug] 1. cycles query result:', cycles);
        if (cyclesErr) {
          console.error('[Supabase Debug] 1. cycles query error:', cyclesErr);
          throw cyclesErr;
        }
        if (cancelled) return;

        const activeCycles: CycleRow[] = cycles ?? [];

        // 2. Fetch phases for active cycles
        const cycleIds = activeCycles.map((c) => c.id);
        console.log('[Supabase Debug] 2. Active cycle IDs:', cycleIds);
        let allPhases: PhaseRow[] = [];
        if (cycleIds.length > 0) {
          console.log('[Supabase Debug] 2. Querying phases for cycle IDs:', cycleIds);
          const { data: phases, error: phasesErr } = await supabase
            .from('phases')
            .select('id, cycle_id, phase_number, start_date, end_date, fee_amount, eligibility')
            .in('cycle_id', cycleIds)
            .order('phase_number', { ascending: true });

          console.log('[Supabase Debug] 2. phases query result:', phases);
          if (phasesErr) {
            console.error('[Supabase Debug] 2. phases query error:', phasesErr);
            throw phasesErr;
          }
          if (cancelled) return;
          allPhases = phases ?? [];
        }

        // 3. Fetch active disciplines
        console.log('[Supabase Debug] 3. Querying active disciplines where active = true...');
        const { data: disciplines, error: discErr } = await supabase
          .from('disciplines')
          .select('id, group_number, name, short_code, level, active')
          .eq('active', true)
          .order('group_number', { ascending: true });

        console.log('[Supabase Debug] 3. disciplines query result (count: ' + (disciplines?.length ?? 0) + '):', disciplines);
        if (discErr) {
          console.error('[Supabase Debug] 3. disciplines query error:', discErr);
          throw discErr;
        }
        if (cancelled) return;

        // ── Derived values ────────────────────────────────────────────────

        // Current phase per cycle
        const currentPhases: Record<string, PhaseRow | null> = {};
        for (const cycle of activeCycles) {
          const cyclePhases = allPhases.filter((p) => p.cycle_id === cycle.id);
          currentPhases[cycle.id] = findCurrentPhase(cyclePhases);
        }

        // UG / PG fee from the current phase of the respective cycle
        let ugFee: number | null = null;
        let pgFee: number | null = null;
        for (const cycle of activeCycles) {
          const phase = currentPhases[cycle.id];
          if (!phase) continue;
          const lvl = cycle.level?.toLowerCase();
          if (lvl === 'undergraduate' || lvl === 'ug') {
            ugFee = phase.fee_amount;
          } else if (lvl === 'postgraduate' || lvl === 'pg') {
            pgFee = phase.fee_amount;
          } else if (lvl === 'both') {
            ugFee = phase.fee_amount;
            pgFee = phase.fee_amount;
          }
        }

        // Derive which admission level(s) are open
        const admissionLevel: AdmissionLevel =
          ugFee != null && pgFee != null ? 'both'
          : ugFee != null ? 'ug'
          : pgFee != null ? 'pg'
          : null;

        // Countdown target — the soonest cycle end_date among active cycles
        let countdownTarget: Date | null = null;
        if (activeCycles.length > 0) {
          const sorted = [...activeCycles].sort(
            (a, b) => a.end_date.localeCompare(b.end_date)
          );
          // Use midnight at end of the cycle end date
          const d = new Date(sorted[0].end_date + 'T23:59:00');
          countdownTarget = d;
        }

        // Session label from the first active cycle
        let sessionLabel: string | null = null;
        let programChoicesCount: number | null = null;
        if (activeCycles.length > 0) {
          const c = activeCycles[0];
          const session = c.session
            ? c.session.charAt(0).toUpperCase() + c.session.slice(1)
            : '';
          sessionLabel = `${session} ${c.year}`;
          programChoicesCount = c.program_choices_count;
        }

        console.log('[Supabase Debug] 4. Derived final state:', {
          activeCyclesCount: activeCycles.length,
          ugFee,
          pgFee,
          countdownTarget: countdownTarget?.toString() ?? 'null',
          sessionLabel,
          programChoicesCount
        });

        setData({
          activeCycles,
          currentPhases,
          allPhases,
          disciplines: disciplines ?? [],
          ugFee,
          pgFee,
          admissionLevel,
          countdownTarget,
          programChoicesCount,
          sessionLabel,
          loading: false,
          error: null,
        });
      } catch (err: unknown) {
        if (cancelled) return;
        const message =
          err instanceof Error ? err.message : 'Failed to load admission data';
        console.error('[AdmissionData]', err);
        setData((prev) => ({ ...prev, loading: false, error: message }));
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AdmissionDataContext.Provider value={data}>
      {children}
    </AdmissionDataContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useAdmissionData(): AdmissionData {
  return useContext(AdmissionDataContext);
}
