'use client';

import { useEffect } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

export function PrivacyContent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 md:py-32">
      <div className="mx-auto max-w-[800px] px-5 md:px-8">
        <Reveal>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#5A524A] hover:text-[#1A1612] mb-8 transition-colors text-[14px] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="max-w-[760px] mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 text-[#7A1818] text-[13px] font-medium uppercase tracking-[0.14em] mb-4">
              <Shield className="w-3.5 h-3.5" />
              <span className="keep-ltr">Data Protection</span>
            </div>
            <h1 className="display-tight font-semibold text-[#1A1612] text-[34px] md:text-[46px] tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 text-[#5A524A] text-[16px] md:text-[18px]">
              How we collect, use, and protect your personal information at
              CECOS University.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="bg-white rounded-[28px] border border-[#E2DBCF] shadow-surface p-6 md:p-10 space-y-8 text-[#2E2823] text-[15px] leading-relaxed">
            <section>
              <h2 className="text-[20px] font-semibold text-[#1A1612] mb-3">
                1. Information We Collect
              </h2>
              <p>
                When you use the Admission Portal, we collect personal
                information such as your name, contact details, educational
                history, identification numbers (like CNIC/B-Form), and payment
                transaction details necessary to process your admission
                application.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1A1612] mb-3">
                2. How We Use Your Information
              </h2>
              <p>
                The information collected is used exclusively for evaluating
                your eligibility for admission, managing your enrollment,
                processing scholarship requests, communicating updates regarding
                your application, and generating anonymized statistical reports
                for educational improvements.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1A1612] mb-3">
                3. Data Security &amp; Storage
              </h2>
              <p>
                We implement industry-standard security measures to protect your
                personal data from unauthorized access, alteration, or
                disclosure. All sensitive data transmitted through our portal is
                encrypted, and your records are stored securely on monitored
                servers.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1A1612] mb-3">
                4. Information Sharing
              </h2>
              <p>
                CECOS University does not sell, trade, or rent your personal
                information to third parties. We may only share data with
                regulatory bodies (like HEC, PEC, Pharmacy Council) as required
                by law, or with authorized third-party service providers (like
                payment gateways) strictly for processing your application.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1A1612] mb-3">
                5. Your Rights
              </h2>
              <p>
                You have the right to access, correct, or request the deletion
                of your personal data before your enrollment is finalized. If
                you wish to exercise these rights, please contact the admissions
                office. Note that certain data must be retained for legal and
                academic record-keeping.
              </p>
            </section>

            <div className="pt-6 mt-6 border-t border-[#EFE9DD] text-[13px] text-[#9A9087]">
              Last updated: January 2025
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
