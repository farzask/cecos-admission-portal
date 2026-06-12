import type { Metadata } from 'next';
import { PrivacyContent } from '@/components/PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy — CECOS University',
  description: 'Read how CECOS University collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}

