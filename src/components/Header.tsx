import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, MessageCircle, MapPin, Clock, ShoppingBag } from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppLink } from '../data/content';
import { useModalFocusTrap } from '../utils/useModalFocusTrap';

interface HeaderProps {
  onOpenCart?: () => void;
  cartCount?: number;
}

const NAV_LINKS = [
  { href: '#cerita', label: 'Tentang', mobileLabel: 'Tentang Al Firdaus' },
  { href: '#menu-varian', label: 'Menu Pilihan', mobileLabel: 'Pilihan Menu Kebab' },
  { href: '#pilihan', label: 'Layanan', mobileLabel: 'Layanan Lengkap' },
  { href: '#grosir', label: 'Grosir & Acara', mobileLabel: 'Bahan Grosir & Pesanan Acara' },
  { href: '#lokasi', label: 'Lokasi', mobileLabel: 'Lokasi & Jam Buka' },
  { href: '#faq', label: 'FAQ', mobileLabel: 'Pertanyaan Umum (FAQ)' },
];

export const Header: React.FC<HeaderProps> = ({
  onOpenCart,
  cartCount = 0,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useModalFocusTrap(isMenuOpen, () => setIsMenuOpen(false), drawerRef, drawerCloseRef);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        id="top"
        data-scrolled={isScrolled ? 'true' : 'false'}
        className="sticky top-0 z-40 w-full pointer-events-none"
      >
        <div
          className={`w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            isScrolled ? 'px-3 sm:px-5 pt-2.5 sm:pt-3.5' : 'px-0 pt-0'
          }`}
        >
          <div
            className={`pointer-events-auto mx-auto w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
              isScrolled
                ? 'max-w-[1440px] rounded-full bg-[#f5d328]/55 backdrop-blur-xl border-2 border-[#2b1810]/25 shadow-[0_14px_34px_rgba(43,24,16,0.22),inset_0_1px_0_rgba(255,253,244,0.5)]'
                : 'max-w-full rounded-none bg-[#f5d328] border-b-2 border-[#2b1810]/20 shadow-none'
            }`}
          >
            <div
              className={`mx-auto flex items-center justify-between gap-2.5 sm:gap-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                isScrolled
                  ? 'max-w-[1440px] h-[58px] sm:h-[64px] px-3 sm:px-5 lg:px-6'
                  : 'max-w-[1600px] h-[72px] sm:h-[76px] px-4 sm:px-6 lg:px-11'
              }`}
            >
              <a
                className={`flex items-center gap-2.5 sm:gap-3 group min-h-[44px] min-w-0 transition-all duration-300 motion-reduce:transition-none ${
                  isScrolled ? 'pl-0.5 pr-2.5 py-1 rounded-full bg-[#fffdf4]/80' : ''
                }`}
                href="#top"
                aria-label="Kebab Al Firdaus, ke halaman utama"
              >
                <div
                  className={`rounded-full border-2 border-[#2b1810] bg-[#a91d22] text-[#f5d328] flex items-center justify-center font-black text-xs tracking-tight transform -rotate-6 transition-all duration-300 group-hover:rotate-0 shadow-[2px_2px_0_#2b1810] shrink-0 ${
                    isScrolled ? 'w-9 h-9' : 'w-10 h-10 sm:w-11 sm:h-11'
                  }`}
                >
                  AF
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-black text-[9.5px] sm:text-[10px] tracking-[0.16em] text-[#2b1810] leading-none">
                    KEBAB
                  </span>
                  <span className="font-black text-sm sm:text-base tracking-wide text-[#8a1418] leading-tight whitespace-nowrap truncate">
                    {BUSINESS_INFO.name}
                  </span>
                  {!isScrolled && (
                    <span className="hidden sm:block text-[10px] font-bold italic text-[#2b1810] -mt-0.5 truncate">
                      Maknyus Banget · Medaeng
                    </span>
                  )}
                </div>
              </a>

              <div className="flex items-center gap-2 sm:gap-3">
                <nav
                  className={`hidden lg:flex items-center gap-1 p-1 border-2 border-[#2b1810] transition-all duration-300 motion-reduce:transition-none ${
                    isScrolled
                      ? 'bg-[#fffdf4]/90 rounded-full'
                      : 'bg-[#fffdf4] rounded-xl'
                  }`}
                  aria-label="Navigasi utama"
                >
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`px-3.5 py-1.5 text-xs font-extrabold text-[#2b1810] hover:text-[#fffdf4] hover:bg-[#a91d22] whitespace-nowrap shrink-0 transition-colors ${
                        isScrolled ? 'rounded-full' : 'rounded-lg'
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                {/* Cart button stays hidden until the user adds an item. */}
                {cartCount > 0 && (
                  <button
                    key={cartCount}
                    type="button"
                    onClick={onOpenCart}
                    className={`cart-badge-pop relative inline-flex items-center gap-2 min-h-[42px] py-2 px-3.5 text-xs font-black bg-[#a91d22] hover:bg-[#7d1216] text-[#fffdf4] border-2 border-[#2b1810] shadow-[2px_2px_0_#2b1810] active:translate-y-0.5 transition-all whitespace-nowrap shrink-0 ${
                      isScrolled ? 'rounded-full' : 'rounded-xl'
                    }`}
                    aria-label={`Keranjang belanja, ${cartCount} item`}
                  >
                    <ShoppingBag className="w-4 h-4 text-[#f5d328]" aria-hidden="true" />
                    <span className="hidden md:inline">Keranjang</span>
                    <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-black bg-[#f5d328] text-[#2b1810] border border-[#2b1810]">
                      {cartCount}
                    </span>
                  </button>
                )}

                <button
                  type="button"
                  className={`lg:hidden inline-flex items-center gap-2 min-h-[42px] px-3.5 bg-[#fffdf4] border-2 border-[#2b1810] text-xs font-black text-[#8a1418] hover:bg-[#a91d22] hover:text-[#fffdf4] shadow-[2px_2px_0_#2b1810] active:translate-y-0.5 transition-all whitespace-nowrap shrink-0 ${
                    isScrolled ? 'rounded-full' : 'rounded-xl'
                  }`}
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-sheet"
                  aria-label={isMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Menu className="w-5 h-5" aria-hidden="true" />
                  )}
                  <span>{isMenuOpen ? 'Tutup' : 'Menu'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div
          id="mobile-sheet"
          className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-sheet-title"
        >
          <div
            className="fixed inset-0 bg-[#2b1810]/70"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

          <div
            ref={drawerRef}
            className="relative z-10 w-full bg-[#fffdf4] rounded-t-3xl border-t-4 border-[#a91d22] p-5 pb-8 shadow-2xl max-h-[85dvh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#2b1810]/15">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full border-2 border-[#2b1810] bg-[#a91d22] text-[#f5d328] flex items-center justify-center font-black text-xs">
                  AF
                </div>
                <div>
                  <h2 id="mobile-sheet-title" className="font-black text-sm text-[#8a1418] leading-none">
                    KEBAB AL FIRDAUS
                  </h2>
                  <p className="text-xs font-bold italic text-[#2b1810] mt-0.5 mb-0">
                    Maknyus Banget · Medaeng
                  </p>
                </div>
              </div>

              <button
                ref={drawerCloseRef}
                type="button"
                className="w-11 h-11 rounded-xl bg-[#f5d328] hover:bg-[#a91d22] hover:text-[#fffdf4] border-2 border-[#2b1810] flex items-center justify-center text-[#2b1810] transition-colors"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Tutup menu navigasi"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {cartCount > 0 && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (onOpenCart) onOpenCart();
                  }}
                  className="w-full min-h-[46px] py-2.5 px-3.5 rounded-xl bg-[#fdf5d2] border-2 border-[#2b1810] flex items-center justify-between text-xs font-black text-[#2b1810] hover:bg-[#f5d328] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#8a1418]" aria-hidden="true" />
                    <span>Keranjang Pesanan</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#a91d22] text-[#f5d328] text-[11px] font-black">
                    {cartCount} Item
                  </span>
                </button>
              </div>
            )}

            <nav className="py-3 space-y-1" aria-label="Navigasi mobile">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="flex items-center justify-between min-h-[44px] py-2.5 px-3 rounded-xl text-sm font-extrabold text-[#2b1810] hover:bg-[#f5d328]/60 transition-colors"
                >
                  <span>{link.mobileLabel}</span>
                  <span className="text-[#8a1418] font-black" aria-hidden="true">›</span>
                </a>
              ))}
            </nav>

            <div className="bg-[#fdf5d2] p-3.5 rounded-xl border-2 border-[#2b1810]/20 space-y-2 text-xs text-[#2b1810] my-2">
              <div className="flex items-center gap-2 font-bold">
                <Clock className="w-4 h-4 text-[#8a1418] shrink-0" aria-hidden="true" />
                <span>Buka: {BUSINESS_INFO.hoursWeekday} · {BUSINESS_INFO.hoursSunday}</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <MapPin className="w-4 h-4 text-[#8a1418] shrink-0" aria-hidden="true" />
                <span>Medaeng Kulon, Kedungturi, Taman, Sidoarjo</span>
              </div>
            </div>

            <div className="pt-3 flex flex-col gap-2.5">
              {cartCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (onOpenCart) onOpenCart();
                  }}
                  className="w-full min-h-[48px] py-3 rounded-xl bg-[#a91d22] hover:bg-[#7d1216] text-[#fffdf4] border-2 border-[#2b1810] text-xs font-black tracking-wide flex items-center justify-center gap-2 shadow-[2px_2px_0_#2b1810] active:translate-y-0.5 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-[#f5d328]" aria-hidden="true" />
                  <span>Lihat Keranjang ({cartCount} Item)</span>
                </button>
              )}

              <a
                href={getWhatsAppLink('Halo Kebab Al Firdaus, saya mau pesan kebab.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="w-full min-h-[48px] py-3 rounded-xl bg-[#f5d328] hover:bg-[#fae15c] text-[#2b1810] text-xs font-black tracking-wide flex items-center justify-center gap-2 border-2 border-[#2b1810] shadow-[2px_2px_0_#2b1810] active:translate-y-0.5 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#196b3e]" aria-hidden="true" />
                <span>WhatsApp Langsung</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
