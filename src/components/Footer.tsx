import React from 'react';
import { Star } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

export const Footer: React.FC = () => {
  return (
    <footer className="footer bg-[#1c1b18] text-[#f3efe5] py-12 border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Clean Row: Brand Info & Primary Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          {/* Brand Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#d5f264] text-[#1c1b18] flex items-center justify-center font-black text-xs tracking-tight shrink-0 shadow-xs">
              AF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-widest text-white">
                  {BUSINESS_INFO.name}
                </span>
                <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-[#d5f264]">
                  MEDAENG
                </span>
              </div>
              <p className="text-xs text-[#9e9a8f] mt-0.5">
                Kebab hangat & aneka kudapan di Medaeng Kulon, Sidoarjo
              </p>
            </div>
          </div>

          {/* Quick Clean Navigation */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-[#c8c3b7]">
            <a href="#cerita" className="hover:text-white transition-colors">
              Tentang
            </a>
            <a href="#menu-varian" className="hover:text-white transition-colors">
              Menu Kebab
            </a>
            <a href="#grosir" className="hover:text-white transition-colors">
              Grosir & Acara
            </a>
            <a href="#lokasi" className="hover:text-white transition-colors">
              Lokasi
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </div>
        </div>

        {/* Bottom Clean Meta Row: Copyright, Hours, & Google Rating */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#8c887e]">
          <div>
            © {new Date().getFullYear()} <strong>Kebab {BUSINESS_INFO.name}</strong> · Jl. Bali No.13 Blok O, Medaeng Kulon, Sidoarjo
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>Sen–Sab 06.00–21.00 · Min 06.00–18.00</span>
            <span className="opacity-40 hidden sm:inline">•</span>
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#b8b3a7] hover:text-[#d5f264] transition-colors"
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{BUSINESS_INFO.rating} / 5 Google ({BUSINESS_INFO.reviewCount} ulasan)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
