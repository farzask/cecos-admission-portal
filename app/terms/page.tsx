import type { Metadata } from 'next';
import { TermsContent } from '@/components/TermsContent';

export const metadata: Metadata = {
  title: 'Terms & Conditions — CECOS University',
  description: 'Read the terms and conditions for using the CECOS University Admission Portal.',
};

export default function TermsPage() {
  return <TermsContent />;
}

