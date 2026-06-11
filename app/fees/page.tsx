import { Suspense } from 'react';
import { FeesPageContent } from '@/components/FeesPageContent';

export default function FeesPage() {
  return (
    <Suspense>
      <FeesPageContent />
    </Suspense>
  );
}
