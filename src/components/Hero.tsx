import React from 'react';
import { getWhatsAppLink } from '../data/content';

export const Hero: React.FC = () => {
  const whatsappHeroUrl = getWhatsAppLink(
    'Halo, Toko Kebab Al Firdaus. Saya ingin bertanya tentang produk dan harga terbaru. Mohon info ketersediaan produk, harga, ongkir, dan cara pemesanan.'
  );

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="green-dot" /> Homemade • Taman, Sidoarjo</div>
          <h1 id="hero-title">Bahan kebab &amp; <span className="accent">frozen food</span> homemade dari Sidoarjo.</h1>
          <p className="hero-lead">
            Daging kebab, kulit tortilla, dan kebab frozen siap olah. Beli satuan untuk keluarga,
            atau tanyakan harga grosir untuk warung, katering, dan reseller.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={whatsappHeroUrl} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.48 0 .1 5.38.1 11.98c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.63a11.9 11.9 0 0 0 5.87 1.54h.01c6.6 0 11.98-5.38 11.98-11.98 0-3.2-1.25-6.2-3.54-8.45ZM12.08 21.9a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.68.97.98-3.59-.23-.37a9.87 9.87 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.98 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.45-4.44 9.89-9.93 9.89Zm5.43-7.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.64-.93-2.24-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.49s1.08 2.88 1.23 3.08c.15.2 2.12 3.24 5.14 4.55.72.31 1.28.49 1.72.63.72.23 1.37.2 1.88.12.57-.09 1.77-.73 2.02-1.44.25-.72.25-1.33.18-1.45-.08-.13-.28-.2-.58-.35Z"/></svg>
              Pesan via WhatsApp
            </a>
            <a className="btn btn-light" href="#produk">Lihat Produk <span aria-hidden="true">↓</span></a>
          </div>
          <p className="hero-note"><span className="green-dot" /> Harga dan ketersediaan dikonfirmasi admin sebelum transaksi.</p>
        </div>

        <div className="hero-visual" aria-label="Logo resmi Toko Kebab Al Firdaus">
          <div className="orbit" aria-hidden="true" />
          <div className="logo-frame">
            <img
              src="/brand/kebab-al-firdaus-logo.webp"
              alt="Logo Kebab Al Firdaus — Maknyus Banget"
              width="720"
              height="720"
              fetchPriority="high"
            />
          </div>
          <div className="hero-stamp" aria-hidden="true"><div><strong>AF</strong>HOMEMADE<br />SIDOARJO</div></div>
          <div className="hero-label">Bisa satuan &amp; grosir</div>
        </div>
      </div>
    </section>
  );
};
