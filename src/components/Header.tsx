import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle, MapPin, Clock } from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppLink } from '../data/content';

interface HeaderProps {
  onOpenOrderModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenOrderModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#f3efe5]/95 backdrop-blur-md border-b border-[#1c1b18]/15 shadow-xs'
            : 'bg-[#f3efe5] border-b border-[#1c1b18]/10'
        }`}
        id="top"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-[74px] flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            className="flex items-center gap-3 group"
            href="#top"
            aria-label="Kebab Al Firdaus, ke halaman utama"
          >
            <div className="w-10 h-10 rounded-full border-2 border-[#1c1b18] bg-[#d5f264] flex items-center justify-center font-black text-sm tracking-tight transform -rotate-6 transition-transform group-hover:rotate-0">
              AF
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-widest text-[#1c1b18] leading-none">
                {BUSINESS_INFO.name}
              </span>
              <span className="text-[9px] font-bold tracking-widest text-[#716d63] mt-0.5">
                {BUSINESS_INFO.subName} · MEDAENG
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1 bg-[#e8e1d2]/70 p-1 rounded-full border border-black/10"
            aria-label="Navigasi utama"
          >
            <a
              href="#cerita"
              className="px-3.5 py-1.5 text-xs font-bold text-[#45423b] hover:text-[#1c1b18] hover:bg-white/90 rounded-full transition-all"
            >
              Tentang
            </a>
            <a
              href="#menu-varian"
              className="px-3.5 py-1.5 text-xs font-bold text-[#45423b] hover:text-[#1c1b18] hover:bg-white/90 rounded-full transition-all"
            >
              Menu Pilihan
            </a>
            <a
              href="#pilihan"
              className="px-3.5 py-1.5 text-xs font-bold text-[#45423b] hover:text-[#1c1b18] hover:bg-white/90 rounded-full transition-all"
            >
              Layanan
            </a>
            <a
              href="#grosir"
              className="px-3.5 py-1.5 text-xs font-bold text-[#45423b] hover:text-[#1c1b18] hover:bg-white/90 rounded-full transition-all"
            >
              Grosir & Acara
            </a>
            <a
              href="#lokasi"
              className="px-3.5 py-1.5 text-xs font-bold text-[#45423b] hover:text-[#1c1b18] hover:bg-white/90 rounded-full transition-all"
            >
              Lokasi
            </a>
            <a
              href="#faq"
              className="px-3.5 py-1.5 text-xs font-bold text-[#45423b] hover:text-[#1c1b18] hover:bg-white/90 rounded-full transition-all"
            >
              FAQ
            </a>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 py-2 px-4 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#1c1b18] text-[#d5f264] hover:bg-[#2c2b27] active:scale-95 transition-all shadow-xs"
              onClick={onOpenOrderModal}
              aria-label="Buka formulir pemesanan cepat"
            >
              <span>Pesan Sekarang</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="lg:hidden w-10 h-10 rounded-xl bg-white/80 border border-black/10 flex items-center justify-center text-[#1c1b18] hover:bg-white active:scale-95 transition-all"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-sheet"
            aria-label={isMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer / Sheet */}
      {isMenuOpen && (
        <div
          id="mobile-sheet"
          className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sheet Body */}
          <div className="relative z-10 w-full bg-[#faf7f0] rounded-t-3xl border-t border-neutral-300 p-6 shadow-2xl animate-in slide-in-from-bottom duration-250 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border border-black bg-[#d5f264] flex items-center justify-center font-bold text-xs">
                  AF
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#1c1b18] leading-none">
                    AL FIRDAUS
                  </h4>
                  <p className="text-[10px] text-[#716d63] mt-0.5">Kebab & More Medaeng</p>
                </div>
              </div>

              <button
                type="button"
                className="w-8 h-8 rounded-full bg-neutral-200/80 flex items-center justify-center text-neutral-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Links */}
            <div className="py-4 space-y-1">
              {[
                { href: '#cerita', label: 'Tentang Al Firdaus' },
                { href: '#menu-varian', label: 'Pilihan Menu Kebab' },
                { href: '#pilihan', label: 'Layanan Lengkap' },
                { href: '#grosir', label: 'Bahan Grosir & Pesanan Acara' },
                { href: '#lokasi', label: 'Lokasi & Jam Buka' },
                { href: '#faq', label: 'Pertanyaan Umum (FAQ)' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-bold text-[#2e2d29] hover:bg-[#e8e1d2] transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="text-neutral-400">›</span>
                </a>
              ))}
            </div>

            {/* Operating Hours & Address Callout */}
            <div className="bg-[#ede5d8] p-3 rounded-xl border border-black/10 space-y-2 text-xs text-[#555147] my-2">
              <div className="flex items-center gap-2 font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#ec6c3b]" />
                <span>Buka: Sen–Sab 06.00–21.00 · Min 06.00–18.00</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#ec6c3b]" />
                <span>Medaeng Kulon, Kedungturi, Taman, Sidoarjo</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenOrderModal();
                }}
                className="w-full py-3 rounded-xl bg-[#1c1b18] text-[#d5f264] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Buka Formulir Pesan</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={getWhatsAppLink('Halo Kebab Al Firdaus, saya mau pesan kebab.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="w-full py-2.5 rounded-xl bg-[#d5f264] text-[#1c1b18] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-black/10"
              >
                <MessageCircle className="w-4 h-4 text-emerald-800" />
                <span>WhatsApp Langsung</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
