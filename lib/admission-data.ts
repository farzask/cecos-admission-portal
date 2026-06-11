import { createClient } from '@/lib/supabase/server';
import {
  type AdmissionData,
  type AdmissionLevel,
  type CycleRow,
  type PhaseRow,
  defaultAdmissionData,
} from '@/lib/admission-data-types';

// Re-export shared types so existing import sites keep working.
export type {
  AdmissionData,
  AdmissionLevel,
  CycleRow,
  PhaseRow,
  DisciplineRow,
} from '@/lib/admission-data-types';
export { defaultAdmissionData } from '@/lib/admission-data-types';

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
  if (upcoming.length > 0) return upcoming[0] ?? null;
  // Fallback to the last phase
  return phases.length > 0 ? (phases[phases.length - 1] ?? null) : null;
}

// ─── Server-side fetch (RSC) ────────────────────────────────────────────────

/**
 * Fetches the active admission cycle data on the server (RSC).
 * Falls back to {@link defaultAdmissionData} when Supabase is not configured
 * or a query fails — the UI then renders its static fallbacks.
 */
export async function getAdmissionData(): Promise<AdmissionData> {
  const supabase = await createClient();
  if (!supabase) {
    return defaultAdmissionData;
  }

  try {
    // 1. Active cycles
    const { data: cycles, error: cyclesErr } = await supabase
      .from('cycles')
      .select(
        'id, session, year, level, status, start_date, end_date, program_choices_count, config'
      )
      .eq('status', 'active');
    if (cyclesErr) throw cyclesErr;

    const activeCycles: CycleRow[] = cycles ?? [];

    // 2. Phases for active cycles
    const cycleIds = activeCycles.map((c) => c.id);
    let allPhases: PhaseRow[] = [];
    if (cycleIds.length > 0) {
      const { data: phases, error: phasesErr } = await supabase
        .from('phases')
        .select(
          'id, cycle_id, phase_number, start_date, end_date, fee_amount, eligibility'
        )
        .in('cycle_id', cycleIds)
        .order('phase_number', { ascending: true });
      if (phasesErr) throw phasesErr;
      allPhases = phases ?? [];
    }

    // 3. Active disciplines
    const { data: disciplines, error: discErr } = await supabase
      .from('disciplines')
      .select('id, group_number, name, short_code, level, active')
      .eq('active', true)
      .order('group_number', { ascending: true });
    if (discErr) throw discErr;

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
      ugFee != null && pgFee != null
        ? 'both'
        : ugFee != null
          ? 'ug'
          : pgFee != null
            ? 'pg'
            : null;

    // Countdown target — the soonest cycle end_date among active cycles
    let countdownTarget: Date | null = null;
    if (activeCycles.length > 0) {
      const sorted = [...activeCycles].sort((a, b) =>
        a.end_date.localeCompare(b.end_date)
      );
      const soonest = sorted[0];
      if (soonest) {
        countdownTarget = new Date(soonest.end_date + 'T23:59:00');
      }
    }

    // Session label from the first active cycle
    let sessionLabel: string | null = null;
    let programChoicesCount: number | null = null;
    const firstCycle = activeCycles[0];
    if (firstCycle) {
      const session = firstCycle.session
        ? firstCycle.session.charAt(0).toUpperCase() +
          firstCycle.session.slice(1)
        : '';
      sessionLabel = `${session} ${firstCycle.year}`;
      programChoicesCount = firstCycle.program_choices_count;
    }

    return {
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
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Failed to load admission data';
    console.error('[AdmissionData]', err);
    return { ...defaultAdmissionData, error: message };
  }
}
