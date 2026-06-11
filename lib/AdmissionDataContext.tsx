'use client';

import { createContext, useContext, type ReactNode } from 'react';
import {
  type AdmissionData,
  defaultAdmissionData,
} from '@/lib/admission-data-types';

// Re-export types for existing consumers (e.g. components/Programs.tsx).
export type {
  AdmissionData,
  AdmissionLevel,
  CycleRow,
  PhaseRow,
  DisciplineRow,
} from '@/lib/admission-data-types';

const AdmissionDataContext =
  createContext<AdmissionData>(defaultAdmissionData);

/**
 * Client provider. Data is fetched on the server (RSC) via
 * {@link getAdmissionData} and passed down through `value` — this provider
 * only exposes it to client components through the {@link useAdmissionData}
 * hook. No client-side fetching happens here.
 */
export function AdmissionDataProvider({
  value,
  children,
}: {
  value: AdmissionData;
  children: ReactNode;
}) {
  return (
    <AdmissionDataContext.Provider value={value}>
      {children}
    </AdmissionDataContext.Provider>
  );
}

export function useAdmissionData(): AdmissionData {
  return useContext(AdmissionDataContext);
}
