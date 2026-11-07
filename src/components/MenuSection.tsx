import React, { useState } from 'react';
import { Eye, Sparkles } from 'lucide-react';
import { MENU_VARIANTS, formatRupiah, getWhatsAppLink } from '../data/content';
import { MenuVariant } from '../types';
import { DummyFoodVisual } from './DummyFoodVisual';

interface MenuSectionProps {
  onPreviewMenu: (item: MenuVariant) => void;
  onAddToCart?: (item: MenuVariant) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onPreviewMenu,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'kebab' | 'snack' | 'wholesale'>('all');
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const filteredItems = MENU_VARIANTS.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'kebab') return item.category === 'kebab';
    if (activeTab === 'snack') return item.category === 'snack';
    if (activeTab === 'wholesale') return item.category === 'wholesale' || item.category === 'event';
    return true;
  });

  return (
    <section className="menu-variants-section section-pad" id="menu-varian">
      <div className="section-heading">
        <div>
          <div className="section-kicker flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#ec6c3b]" />
            <span>PILIHAN MENU & KUDAPAN</span>
          </div>
          <h2>
            Pilih mood<br />
            <em>kebabmu hari ini.</em>
          </h2>
        </div>
        <p>
          Tampilan minimalis dengan info ringkas. Klik <strong>Lihat Detail</strong> untuk komposisi lengkap & karakter rasa, atau langsung pesan via WhatsApp.
        </p>
      </div>

      {/* shadcn-inspired Filter Tabs */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 mb-8 gap-2 no-scrollbar">
        <div className="inline-flex p-1 bg-[#eae3d5] rounded-xl border border-black/10 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'all'
                ? 'bg-white text-[#1c1b18] shadow-xs'
                : 'text-[#656157] hover:text-[#1c1b18]'
            }`}
          >
            Semua ({MENU_VARIANTS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('kebab')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'kebab'
                ? 'bg-white text-[#1c1b18] shadow-xs'
                : 'text-[#656157] hover:text-[#1c1b18]'
            }`}
          >
            Kebab Hangat (4)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('snack')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'snack'
                ? 'bg-white text-[#1c1b18] shadow-xs'
                : 'text-[#656157] hover:text-[#1c1b18]'
            }`}
          >
            Roti Maryam (1)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wholesale')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'wholesale'
                ? 'bg-white text-[#1c1b18] shadow-xs'
                : 'text-[#656157] hover:text-[#1c1b18]'
            }`}
          >
            Grosir & Acara (2)
          </button>
        </div>
      </div>

      {/* Minimalist shadcn-style Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="group flex flex-col bg-white rounded-2xl border border-neutral-200/90 hover:border-neutral-300 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            {/* Dummy Image Container with Quick Preview Hover */}
            <div
              className="relative aspect-[16/10] bg-[#f8f5ee] cursor-pointer overflow-hidden border-b border-neutral-100"
              onClick={() => onPreviewMenu(item)}
            >
              <DummyFoodVisual
                type={item.type === 'custom' ? item.id : item.type}
                alt={item.imageDummyAlt || item.name}
                className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                showBadge={true}
              />

              {/* Tag pill badge top left */}
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#1c1b18] text-[#d5f264] shadow-xs">
                {item.badge}
              </span>

              {/* Hover Quick Preview Pill Overlay */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[#1c1b18] text-xs font-bold shadow-md transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-200">
                  <Eye className="w-3.5 h-3.5" />
                  Lihat Detail
                </span>
              </div>
            </div>

            {/* Minimalist Card Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ec6c3b]">
                    {item.tag}
                  </span>
                  {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
                    <span className="text-[10px] font-medium text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
                      {'🌶️'.repeat(item.spiceLevel)}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline justify-between gap-2 mt-1">
                  <h3 className="text-base font-black text-[#1c1b18] leading-snug group-hover:text-[#ec6c3b] transition-colors">
                    {item.name}
                  </h3>
                  {item.price && (
                    <span className="text-xs font-black text-[#1c1b18] shrink-0 bg-[#f3efe5] px-2 py-0.5 rounded-md border border-black/5">
                      {item.priceDisplay || formatRupiah(item.price)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#625e55] line-clamp-2 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Minimalist Card Footer Actions */}
              <div className="pt-2 border-t border-neutral-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onPreviewMenu(item)}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-[#1c1b18] bg-neutral-100 hover:bg-neutral-200 active:scale-95 transition-all inline-flex items-center justify-center gap-1.5"
                  aria-label={`Lihat detail ${item.name}`}
                  title="Lihat detail komposisi"
                >
                  <Eye className="w-3.5 h-3.5 text-[#5e5b53]" />
                  <span>Detail</span>
                </button>

                {onAddToCart && (
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(item);
                      setAddedItemName(item.id);
                      setTimeout(() => setAddedItemName(null), 1500);
                    }}
                    className={`flex-1 inline-flex items-center justify-center py-2 px-3 rounded-xl text-xs font-black transition-all active:scale-95 shadow-xs ${
                      addedItemName === item.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#d5f264] text-[#1c1b18] hover:bg-[#c4e44b]'
                    }`}
                    aria-label={`Tambah ${item.name} ke keranjang`}
                  >
                    {addedItemName === item.id ? (
                      <span>Masuk!</span>
                    ) : (
                      <span>+ Keranjang</span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Roti Maryam & Wholesale Quick Callout */}
      <div className="menu-snack-banner mt-12">
        <div className="snack-banner-left">
          <span className="eyebrow" style={{ color: 'var(--orange)' }}>
            LENGKAPI PESANANMU
          </span>
          <h3>Roti Maryam Hangat & Pasokan Grosir</h3>
          <p>
            Tersedia kudapan roti maryam gurih/manis, paket pasokan kulit tortilla & daging kebab untuk UMKM, serta paket katering acara di Sidoarjo.
          </p>
        </div>
        <div className="snack-banner-actions">
          <button
            type="button"
            className="button button-lime"
            onClick={() => {
              const maryam = MENU_VARIANTS.find((m) => m.id === 'maryam');
              if (maryam && onAddToCart) {
                onAddToCart(maryam);
              }
            }}
          >
            Pesan Roti Maryam
          </button>
          <a
            href={getWhatsAppLink('Halo Kebab Al Firdaus, saya ingin tanya pasokan bahan baku kebab grosir.')}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-dark"
          >
            Tanya Bahan Grosir <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};
