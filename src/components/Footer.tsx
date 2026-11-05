import React from 'react';
import { Star, MapPin, Clock, MessageCircle, Heart, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppLink } from '../data/content';

export const Footer: React.FC = () => {
  return (
    <footer className="footer bg-[#1c1b18] text-[#f3efe5] pt-16 pb-12 border-t border-black/20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Credibility */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#d5f264] bg-[#2a2924] text-[#d5f264] flex items-center justify-center font-black text-sm tracking-tight transform -rotate-6">
                AF
              </div>
              <div>
                <span className="font-extrabold text-base tracking-wider text-white block">
                  {BUSINESS_INFO.name}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-[#a8a396]">
                  {BUSINESS_INFO.subName}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#b8b3a7] leading-relaxed">
              Kebab hangat, aneka kudapan roti maryam, serta penyedia bahan baku kebab grosir untuk usaha dan pesanan acara di Sidoarjo.
            </p>

            {/* Google Rating Badge */}
            <div className="inline-flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white">{BUSINESS_INFO.rating} / 5</span>{' '}
                <span className="text-[#a6a195]">di Google ({BUSINESS_INFO.reviewCount} ulasan)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Menu Favorit */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#d5f264]">
              Menu Favorit
            </h4>
            <ul className="space-y-2 text-xs text-[#c5c0b4]">
              <li>
                <a href="#menu-varian" className="hover:text-white transition-colors">
                  Kebab Original Klasik
                </a>
              </li>
              <li>
                <a href="#menu-varian" className="hover:text-white transition-colors">
                  Kebab Keju Creamy Melt
                </a>
              </li>
              <li>
                <a href="#menu-varian" className="hover:text-white transition-colors">
                  Kebab Pedas Mantap
                </a>
              </li>
              <li>
                <a href="#menu-varian" className="hover:text-white transition-colors">
                  Kebab Komplit Jumbo
                </a>
              </li>
              <li>
                <a href="#menu-varian" className="hover:text-white transition-colors">
                  Roti Maryam Gurih / Manis
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Layanan & Kebutuhan */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#d5f264]">
              Layanan & Mitra
            </h4>
            <ul className="space-y-2 text-xs text-[#c5c0b4]">
              <li>
                <a href="#grosir" className="hover:text-white transition-colors">
                  Bahan Baku Kebab Grosir
                </a>
              </li>
              <li>
                <a href="#grosir" className="hover:text-white transition-colors">
                  Tortilla, Daging Roll & Saus
                </a>
              </li>
              <li>
                <a href="#grosir" className="hover:text-white transition-colors">
                  Paket Katering Hajatan / Acara
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Petunjuk Rute Google Maps</span>
                  <ArrowUpRight className="w-3 h-3 text-[#d5f264]" />
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Tanya Jawab (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak & Operasional */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#d5f264]">
              Jam Buka & Kontak
            </h4>
            <div className="space-y-2 text-xs text-[#c5c0b4]">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#d5f264] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold">Senin – Sabtu:</div>
                  <div>06.00 – 21.00 WIB</div>
                  <div className="text-white font-semibold mt-1">Minggu:</div>
                  <div>06.00 – 18.00 WIB</div>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#d5f264] shrink-0 mt-0.5" />
                <address className="not-italic text-[11px] leading-relaxed text-[#b4afa2]">
                  {BUSINESS_INFO.address}
                </address>
              </div>

              <div className="pt-2">
                <a
                  href={getWhatsAppLink('Halo Kebab Al Firdaus, saya ingin bertanya tentang pemesanan.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-[#d5f264] !text-[#1c1b18] font-black text-xs tracking-wider uppercase hover:bg-[#c4e54a] transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-800" />
                  <span className="!text-[#1c1b18]">WhatsApp: {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8c887d]">
          <p className="m-0 text-center sm:text-left">
            © {new Date().getFullYear()} <strong>Kebab {BUSINESS_INFO.name}</strong> · Medaeng Kulon, Sidoarjo. Rasa yang bikin balik lagi.
          </p>

          <div className="flex items-center gap-1 text-[11px]">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-[#ec6c3b] fill-[#ec6c3b]" />
            <span>untuk penikmat kebab Medaeng</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
