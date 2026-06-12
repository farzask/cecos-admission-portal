'use client';

import { useEffect, useRef } from 'react';
import { useAdmissionData } from './AdmissionDataContext';
import { phase1ClosesAt } from './data';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type ParamValue = string | number | boolean | undefined;
export type EventParams = Record<string, ParamValue>;

/**
 * Fire a GA4 custom event. Safe to call anywhere on the client: it no-ops
 * during SSR and when GA hasn't loaded (e.g. NEXT_PUBLIC_GA_ID unset locally).
 * `undefined` params are stripped so they don't show up as "(not set)" in GA4.
 */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  const clean: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) clean[key] = value;
  }
  window.gtag('event', name, clean);
}

// ── Deadline helpers (point 14) ──────────────────────────────────────────────

/** Whole days from now until the admission deadline (0 if already passed). */
export function daysUntil(target: Date | null | undefined): number | undefined {
  const date = target ?? phase1ClosesAt;
  if (!date) return undefined;
  const ms = date.getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

/** Human-readable bucket so deadline proximity is easy to read in GA4 reports. */
export function deadlineWindow(days: number | undefined): string {
  if (days === undefined) return 'unknown';
  if (days <= 3) return '0-3_days';
  if (days <= 7) return '4-7_days';
  if (days <= 14) return '8-14_days';
  return '15_plus_days';
}

/**
 * Returns a `trackApply(location)` fn that fires an `apply_button_clicked`
 * event tagged with where the button lives and how close the deadline is
 * (exact days + bucket), powering point 2 and point 14.
 */
export function useTrackApply(): (location: string) => void {
  const { countdownTarget } = useAdmissionData();
  return (location: string) => {
    const days = daysUntil(countdownTarget);
    trackEvent('apply_button_clicked', {
      location,
      days_to_deadline: days,
      deadline_window: deadlineWindow(days),
    });
  };
}

/** Returns a `trackLogin(location)` fn for the login button (point 1). */
export function useTrackLogin(): (location: string) => void {
  return (location: string) => trackEvent('login_button_clicked', { location });
}

/**
 * Fires `name` once, the first time the returned ref's element scrolls into
 * view. Used to record when a visitor sees the programs section (point 13)
 * without double counting.
 */
export function useTrackViewOnce(name: string, params: EventParams = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const fired = useRef(false);
  // params captured once; this hook is meant for a stable, single fire.
  const paramsRef = useRef(params);

  useEffect(() => {
    const el = ref.current;
    if (!el || fired.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired.current) {
            fired.current = true;
            trackEvent(name, paramsRef.current);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [name]);

  return ref;
}
