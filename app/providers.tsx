'use client';

import { type ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n';
import { AdmissionDataProvider } from '@/lib/AdmissionDataContext';
import { type AdmissionData } from '@/lib/admission-data-types';

export function Providers({
  admissionData,
  children,
}: {
  admissionData: AdmissionData;
  children: ReactNode;
}) {
  return (
    <AdmissionDataProvider value={admissionData}>
      <LanguageProvider>{children}</LanguageProvider>
    </AdmissionDataProvider>
  );
}
