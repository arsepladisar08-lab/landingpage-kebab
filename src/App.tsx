import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { OfferSection } from './components/OfferSection';
import { WholesaleSection } from './components/WholesaleSection';
import { StepsSection } from './components/StepsSection';
import { QuoteBand } from './components/QuoteBand';
import { LocationSection } from './components/LocationSection';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <OfferSection />
        <WholesaleSection />
        <StepsSection />
        <QuoteBand />
        <LocationSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default App;
