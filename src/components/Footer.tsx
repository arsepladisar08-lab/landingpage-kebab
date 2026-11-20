import React from 'react';
import { BUSINESS_INFO } from '../data/content';

export const Footer: React.FC = () => {
  return (
    <footer className="footer bg-[#24130d] text-[#fffdf4] py-12 border-t-4 border-[#f5d328]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#f5d328]/20">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#a91d22] text-[#f5d328] border-2 border-[#f5d328] flex items-center justify-center font-black text-xs tracking-tight shrink-0">
              AF
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-black text-sm tracking-wider text-[#f5d328]">
                  KEBAB {BUSINESS_INFO.name}
                </span>
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-lg bg-[#a91d22] text-[#fffdf4] border border-[#f5d328]/50">
                  Maknyus Banget
                </span>
              </div>
              <p className="text-xs text-[#e3d2c4] mt-1 mb-0">
                Kebab hangat siap santap, kemasan frozen (isi 5, 6, 10) dan kudapan di Medaeng Kulon, Sidoarjo
              </p>
            </div>
          </div>

          <nav aria-label="Navigasi footer" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold text-[#f7e7cb]">
            <a href="#cerita" className="py-2 hover:text-[#f5d328] transition-colors">
              Tentang
            </a>
            <a href="#menu-varian" className="py-2 hover:text-[#f5d328] transition-colors">
              Menu Kebab
            </a>
            <a href="#grosir" className="py-2 hover:text-[#f5d328] transition-colors">
              Grosir &amp; Acara
            </a>
            <a href="#lokasi" className="py-2 hover:text-[#f5d328] transition-colors">
              Lokasi
            </a>
            <a href="#faq" className="py-2 hover:text-[#f5d328] transition-colors">
              FAQ
            </a>
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#cbb8a8]">
          <div>
            © {new Date().getFullYear()} <strong className="text-[#f5d328]">Kebab {BUSINESS_INFO.name}</strong> · Jl. Bali No.13 Blok O, Medaeng Kulon, Sidoarjo
          </div>
        </div>
      </div>
    </footer>
  );
};
