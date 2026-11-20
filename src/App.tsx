import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VisualShowcaseCarousel } from './components/VisualShowcaseCarousel';
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
import { MobileCartBar } from './components/MobileCartBar';
import { MenuDetailModal } from './components/MenuDetailModal';
import { CartModal } from './components/CartModal';
import { ServiceInquiryModal } from './components/ServiceInquiryModal';
import { CartProvider, useCart } from './context/CartContext';
import { MenuVariant, ServiceInquiryMode } from './types';
import { SHOWCASE_MEDIA } from './data/showcaseMedia';

const AppContent: React.FC = () => {
  const { totalItemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [previewVariant, setPreviewVariant] = useState<MenuVariant | null>(null);
  const [serviceInquiry, setServiceInquiry] = useState<{
    mode: ServiceInquiryMode;
    productName?: string;
  } | null>(null);

  const openServiceInquiry = (mode: ServiceInquiryMode, productName?: string) => {
    setServiceInquiry({ mode, productName });
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Langsung ke konten utama
      </a>

      <Header
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalItemCount}
      />

      <main id="main-content" tabIndex={-1}>
        <Hero onPreviewMenu={(item) => setPreviewVariant(item)} />

        <VisualShowcaseCarousel items={SHOWCASE_MEDIA} />

        <AboutSection />

        <MenuSection
          onPreviewMenu={(item) => setPreviewVariant(item)}
          onOpenServiceInquiry={openServiceInquiry}
        />

        <OfferSection
          onViewMenu={() => {
            document.getElementById('menu-varian')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenServiceInquiry={openServiceInquiry}
        />

        <WholesaleSection onOpenServiceInquiry={openServiceInquiry} />
        <StepsSection />
        <QuoteBand />
        <LocationSection />
        <FaqSection />
        <FinalCta />
      </main>

      <Footer />

      <FloatingWhatsApp hideMobileBar={totalItemCount > 0} />

      <MobileCartBar
        isCartOpen={isCartOpen}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onExploreMenu={() => {
          document.getElementById('menu-varian')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <MenuDetailModal
        item={previewVariant}
        onClose={() => setPreviewVariant(null)}
        onOpenServiceInquiry={openServiceInquiry}
      />

      <ServiceInquiryModal
        mode={serviceInquiry?.mode || null}
        productName={serviceInquiry?.productName}
        onClose={() => setServiceInquiry(null)}
      />
    </>
  );
};

export const App: React.FC = () => (
  <CartProvider>
    <AppContent />
  </CartProvider>
);

export default App;
