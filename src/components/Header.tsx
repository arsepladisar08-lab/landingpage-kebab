import React, { useEffect, useState } from 'react';
import { BUSINESS_INFO, getWhatsAppLink } from '../data/content';

const NAV_ITEMS = [
  ['#produk', 'Produk'],
  ['#keunggulan', 'Keunggulan'],
  ['#cara-pesan', 'Cara Pesan'],
  ['#grosir', 'Harga Grosir'],
  ['#faq', 'FAQ'],
  ['#kontak', 'Kontak'],
] as const;

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  const headerWhatsappUrl = getWhatsAppLink(
    'Halo, Toko Kebab Al Firdaus. Saya ingin bertanya tentang produk dan harga terbaru.'
  );

  return (
    <header className="site-header" id="top">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="Toko Kebab Al Firdaus, kembali ke atas">
          <span className="brand-badge" aria-hidden="true">AF</span>
          <span>
            <span className="brand-name">{BUSINESS_INFO.name}</span>
            <span className="brand-line">{BUSINESS_INFO.tagline}</span>
          </span>
        </a>

        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`} id="mainNav" aria-label="Navigasi utama">
          {NAV_ITEMS.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setIsMenuOpen(false)}>{label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="btn btn-primary" href={headerWhatsappUrl} target="_blank" rel="noopener noreferrer">
            Pesan via WhatsApp <span aria-hidden="true">↗</span>
          </a>
          <button
            className="nav-toggle"
            type="button"
            aria-label={isMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={isMenuOpen}
            aria-controls="mainNav"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? '×' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
};
