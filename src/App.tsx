import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProductSection } from './components/ProductSection';
import { BenefitsSection } from './components/BenefitsSection';
import { GallerySection } from './components/GallerySection';
import { WholesaleSection } from './components/WholesaleSection';
import { StepsSection } from './components/StepsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const App: React.FC = () => {
  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            <span>BAHAN KEBAB HOMEMADE <b>✳</b> FROZEN FOOD <b>✳</b> DARI TAMAN, SIDOARJO <b>✳</b> UNTUK KELUARGA &amp; USAHA <b>✳</b></span>
            <span>BAHAN KEBAB HOMEMADE <b>✳</b> FROZEN FOOD <b>✳</b> DARI TAMAN, SIDOARJO <b>✳</b> UNTUK KELUARGA &amp; USAHA <b>✳</b></span>
          </div>
        </div>
        <section className="section proof-section" aria-label="Ringkasan layanan">
          <div className="container">
            <div className="proof-row" data-reveal>
              <div className="proof-item"><span className="proof-icon" aria-hidden="true">🏠</span><div><strong>Produk homemade</strong><small>Bahan kebab &amp; frozen food</small></div></div>
              <div className="proof-item"><span className="proof-icon" aria-hidden="true">🧺</span><div><strong>Satuan maupun grosir</strong><small>Untuk belanja rumah atau usaha</small></div></div>
              <div className="proof-item"><span className="proof-icon" aria-hidden="true">💬</span><div><strong>Pesan lewat WhatsApp</strong><small>Konfirmasi harga dengan admin</small></div></div>
            </div>
          </div>
        </section>
        <AboutSection />
        <ProductSection />
        <BenefitsSection />
        <GallerySection />
        <StepsSection />
        <WholesaleSection />
        <FaqSection />
        <ContactSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default App;
