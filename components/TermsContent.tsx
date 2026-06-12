'use client';

import { useEffect } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

export function TermsContent() {
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
              <FileText className="w-3.5 h-3.5" />
              <span className="keep-ltr">Legal Information</span>
            </div>
            <h1 className="display-tight font-semibold text-[#1A1612] text-[34px] md:text-[46px] tracking-tight">
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-[#5A524A] text-[16px] md:text-[18px]">
              Please read these terms carefully before using the CECOS
              University Admission Portal.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="bg-white rounded-[28px] border border-[#E2DBCF] shadow-surface p-6 md:p-10 space-y-8 text-[#2E2823] text-[15px] leading-relaxed">
            <section>
              <h2 className="text-[20px] font-semibold text-[#1A1612] mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using the CECOS University Admission Portal,
                you accept and agree to be bound by the terms and provision of
                this agreement. If you do not agree to abide by these terms,
                please do not use this portal.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1A1612] mb-3">
                2. Application Accuracy
              </h2>
              <p>
                All information provided during the application process must be
                accurate, complete, and truthful. Any false information or
                forged documents may lead to the immediate cancellation of your
                admission at any stage of your academic journey.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1A1612] mb-3">
                3. Fee Payments &amp; Refunds
              </h2>
              <p>
                Application processing fees are strictly non-refundable. Tuition
                and semester fees are governed by the guidelines set by the
                Higher Education Commission (HEC) of Pakistan. Refunds are
                calculated based on the official notification date of admission
                withdrawal.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1A1612] mb-3">
                4. Admission Rights
              </h2>
              <p>
                CECOS University reserves the right to accept or reject any
                application without assigning any reason. Admission is granted
                strictly on merit and subject to the availability of seats in
                the respective disciplines.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1A1612] mb-3">
                5. Portal Availability
              </h2>
              <p>
                While we strive to ensure the portal is available 24/7, we do
                not guarantee uninterrupted access. We reserve the right to
                suspend or restrict access for maintenance, updates, or
                technical issues.
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
