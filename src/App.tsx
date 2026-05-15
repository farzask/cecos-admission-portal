import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './lib/i18n';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { WhatsAppFab } from './components/WhatsAppFab';
import { HomePage } from './pages/HomePage';
import { FeesPage } from './pages/FeesPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';

export function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white text-black antialiased">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fees" element={<FeesPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
        <Footer />
        <WhatsAppFab />
      </div>
    </LanguageProvider>
  );
}