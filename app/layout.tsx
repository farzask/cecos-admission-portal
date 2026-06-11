import type { Metadata } from 'next';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Providers } from './providers';
import { getAdmissionData } from '@/lib/admission-data';

export const metadata: Metadata = {
  title: 'CECOS University Admission',
  description:
    'Apply online or visit our campus. Same form, five minutes to complete.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Reads happen on the server (RSC) and flow down through the client provider.
  const admissionData = await getAdmissionData();

  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-[#1A1612] antialiased">
        <Providers admissionData={admissionData}>
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
