import type { Metadata } from 'next';
import { Suspense } from 'react';
import { FeesPageContent } from '@/components/FeesPageContent';

export const metadata: Metadata = {
  title: 'Fee Structure 2026 — CECOS University',
  description: 'View the complete fee structure for all CECOS University programs for 2026.',
};

export default function FeesPage() {
  return (
    <Suspense>
      <FeesPageContent />
    </Suspense>
  );
}
