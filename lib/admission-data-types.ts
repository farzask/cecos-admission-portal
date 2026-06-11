// Client-safe types + defaults for admission data. This module must NOT import
// any server-only code (e.g. next/headers) so it can be pulled into client
// components. The server-side fetch lives in `lib/admission-data.ts`.

export type CycleRow = {
  id: string;
  session: string; // e.g. 'fall', 'spring'
  year: number;
  level: string; // cycle_level enum
  status: string; // cycle_status enum — 'open' | 'closed' etc.
  start_date: string; // date
  end_date: string; // date
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
  level: string; // cycle_level enum
  active: boolean;
};

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
  /** Whether the data is still loading (always false for server reads) */
  loading: boolean;
  /** Error message if fetch failed */
  error: string | null;
};

export const defaultAdmissionData: AdmissionData = {
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
  loading: false,
  error: null,
};
