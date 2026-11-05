import React, { useCallback, useState } from 'react';
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
  const [selectedProduct, setSelectedProduct] = useState('Kebab Original');

  const openOrder = useCallback((productName = 'Kebab Original') => {
    setSelectedProduct(productName);
    setIsOrderModalOpen(true);
  }, []);
  const closeOrder = useCallback(() => setIsOrderModalOpen(false), []);
  const viewMenu = useCallback(() => {
    document.getElementById('menu-varian')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <Header onOpenOrderModal={() => openOrder()} />
      <main>
        <Hero onOpenOrderModal={() => openOrder()} />
        <AboutSection />
        <MenuSection onSelectProduct={openOrder} />
        <OfferSection onSelectProduct={openOrder} onViewMenu={viewMenu} />
        <WholesaleSection onOpenWholesale={() => openOrder('Bahan Baku Kebab Grosir')} />
        <StepsSection />
        <QuoteBand />
        <LocationSection />
        <FaqSection />
        <FinalCta onOpenOrder={() => openOrder()} />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <OrderModal isOpen={isOrderModalOpen} onClose={closeOrder} initialProduct={selectedProduct} />
    </>
  );
};

export default App;
