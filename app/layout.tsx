import type { Metadata } from 'next';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Providers } from './providers';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { getAdmissionData } from '@/lib/admission-data';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});


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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-white text-[#1A1612] antialiased">
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <Providers admissionData={admissionData}>
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
