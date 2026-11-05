import React, { useEffect, useState } from 'react';
import { BUSINESS_INFO } from '../data/content';

interface HeaderProps { onOpenOrderModal: () => void; }

export const Header: React.FC<HeaderProps> = ({ onOpenOrderModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const openOrder = () => {
    closeMenu();
    onOpenOrderModal();
  };

  return (
    <>
      <div className="topline">
        <span className="dot" /> KEBAB AL FIRDAUS <span className="topline-divider">/</span> MEDAENG · SIDOARJO
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
          type="button"
          className="menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="main-nav"
          aria-label={isMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
        <nav className={'nav ' + (isMenuOpen ? 'open' : '')} id="main-nav" aria-label="Navigasi utama">
          <a href="#cerita" onClick={closeMenu}>Tentang</a>
          <a href="#menu-varian" onClick={closeMenu}>Menu Kebab</a>
          <a href="#pilihan" onClick={closeMenu}>Layanan</a>
          <a href="#grosir" onClick={closeMenu}>Grosir & Acara</a>
          <a href="#lokasi" onClick={closeMenu}>Lokasi</a>
        </nav>
        <button type="button" className="header-cta header-cta-btn" onClick={openOrder}>
          Pesan Sekarang <span>↗</span>
        </button>
      </header>
    </>
  );
};
