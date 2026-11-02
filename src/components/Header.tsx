import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO, getWhatsAppLink } from '../data/content';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const headerWhatsappUrl = getWhatsAppLink(
    'Halo Kebab Al Firdaus, saya ingin bertanya tentang produk.'
  );

  return (
    <>
      <div className="topline">
        <span className="dot" /> KEBAB AL FIRDAUS{' '}
        <span className="topline-divider">/</span> MEDAENG · SIDOARJO
      </div>

      <header className="site-header" id="top">
        <a className="brand" href="#top" aria-label="Kebab Al Firdaus, ke halaman utama">
          <span className="brand-mark" aria-hidden="true">AF</span>
          <span className="brand-copy">
            <strong>{BUSINESS_INFO.name}</strong>
            <small>{BUSINESS_INFO.subName}</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="main-nav"
          aria-label={isMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
        </button>

        <nav
          className={`nav ${isMenuOpen ? 'open' : ''}`}
          id="main-nav"
          aria-label="Navigasi utama"
        >
          <a href="#cerita" onClick={handleLinkClick}>Tentang</a>
          <a href="#pilihan" onClick={handleLinkClick}>Pilihan</a>
          <a href="#grosir" onClick={handleLinkClick}>Grosir & Acara</a>
          <a href="#lokasi" onClick={handleLinkClick}>Lokasi</a>
        </nav>

        <a
          className="header-cta"
          href={headerWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Hubungi Kami <span>↗</span>
        </a>
      </header>
    </>
  );
};
