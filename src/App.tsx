import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { OfferSection } from './components/OfferSection';
import { WholesaleSection } from './components/WholesaleSection';
import { StepsSection } from './components/StepsSection';
import { QuoteBand } from './components/QuoteBand';
import { LocationSection } from './components/LocationSection';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { OrderModal } from './components/OrderModal';

export const App: React.FC = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();

  const handleOpenOrder = (productName?: string) => {
    setSelectedProduct(productName);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrder = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <>
      <Header onOpenOrderModal={() => handleOpenOrder()} />
      <main>
        <Hero onOpenOrderModal={() => handleOpenOrder()} />
        <AboutSection />
        <MenuSection onSelectProduct={(p) => handleOpenOrder(p)} />
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
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrder}
        initialProduct={selectedProduct}
      />
    </>
  );
};

export default App;
