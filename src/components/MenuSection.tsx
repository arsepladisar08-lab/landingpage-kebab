import React, { useState } from 'react';
import { Eye, Flame } from 'lucide-react';
import { MENU_VARIANTS, formatRupiah, getWhatsAppLink } from '../data/content';
import { MenuVariant } from '../types';
import { DummyFoodVisual } from './DummyFoodVisual';

interface MenuSectionProps {
  onPreviewMenu: (item: MenuVariant) => void;
  onAddToCart?: (item: MenuVariant) => void;
}

const FILTER_TABS: Array<{ id: 'all' | 'kebab' | 'snack' | 'wholesale'; label: string }> = [
  { id: 'all', label: `Semua (${MENU_VARIANTS.length})` },
  { id: 'kebab', label: 'Kebab Hangat (4)' },
  { id: 'snack', label: 'Roti Maryam (1)' },
  { id: 'wholesale', label: 'Grosir & Acara (2)' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  onPreviewMenu,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'kebab' | 'snack' | 'wholesale'>('all');
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  const filteredItems = MENU_VARIANTS.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'kebab') return item.category === 'kebab';
    if (activeTab === 'snack') return item.category === 'snack';
    if (activeTab === 'wholesale') return item.category === 'wholesale' || item.category === 'event';
    return true;
  });

  return (
    <section className="menu-variants-section section-pad" id="menu-varian" aria-labelledby="menu-varian-title">
      <div className="section-heading">
        <div>
          <div className="section-kicker">02 / Pilihan Menu &amp; Kudapan</div>
          <h2 id="menu-varian-title">
            Pilih varian<br />
            <em>kebabmu hari ini.</em>
          </h2>
        </div>
        <p>
          Tersedia kebab panggang siap santap, roti maryam hangat, hingga paket bahan usaha. Buka <strong>Detail</strong> untuk melihat komposisi dan tingkat pedas.
        </p>
      </div>

      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 mb-8 no-scrollbar">
        <div
          className="inline-flex p-1.5 bg-[#f5d328]/50 rounded-xl border-2 border-[#2b1810] gap-1.5"
          role="group"
          aria-label="Filter kategori menu"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[44px] px-4 py-2 text-xs font-extrabold rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#a91d22] text-[#fffdf4]'
                    : 'text-[#2b1810] hover:bg-[#fffdf4]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="bg-[#fffdf4] border-2 border-[#2b1810] rounded-2xl p-8 text-center space-y-3">
          <p className="text-sm font-bold text-[#2b1810] m-0">
            Belum ada menu pada kategori ini.
          </p>
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-[#a91d22] text-[#fffdf4] text-xs font-extrabold border-2 border-[#2b1810]"
          >
            Tampilkan semua menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col bg-[#fffdf4] rounded-2xl border-2 border-[#2b1810] shadow-[4px_4px_0_rgba(43,24,16,0.16)] hover:shadow-[6px_6px_0_#a91d22] transition-shadow duration-200 overflow-hidden"
            >
              <button
                type="button"
                className="relative block w-full text-left aspect-[16/10] bg-[#fdf4c7] overflow-hidden border-b-2 border-[#2b1810] p-0"
                onClick={() => onPreviewMenu(item)}
                aria-label={`Buka detail ${item.name}`}
              >
                <DummyFoodVisual
                  type={item.type === 'custom' ? item.id : item.type}
                  alt={item.imageDummyAlt || item.name}
                  className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                  showBadge={true}
                />

                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg text-[11px] font-black bg-[#a91d22] text-[#f5d328] border border-[#2b1810]">
                  {item.badge}
                </span>

                <div className="absolute inset-0 bg-[#2b1810]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#fffdf4] text-[#2b1810] border-2 border-[#2b1810] text-xs font-extrabold">
                    <Eye className="w-3.5 h-3.5 text-[#a91d22]" aria-hidden="true" />
                    Lihat Detail
                  </span>
                </div>
              </button>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-black text-[#8a1418]">
                      {item.tag}
                    </span>
                    {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#8a1418] bg-[#f5d328]/45 px-2 py-0.5 rounded-md border border-[#2b1810]/20">
                        <Flame className="w-3 h-3 fill-current" aria-hidden="true" />
                        <span>Pedas Lv. {item.spiceLevel}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between gap-2 mt-1">
                    <h3 className="text-base font-black text-[#2b1810] leading-snug group-hover:text-[#a91d22] transition-colors m-0">
                      {item.name}
                    </h3>
                    {item.price && (
                      <span className="text-xs font-black text-[#2b1810] shrink-0 bg-[#f5d328] px-2 py-0.5 rounded-md border border-[#2b1810]">
                        {item.priceDisplay || formatRupiah(item.price)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#543729] line-clamp-2 mt-1.5 leading-relaxed mb-0">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#2b1810]/15 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onPreviewMenu(item)}
                    className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-extrabold text-[#2b1810] bg-[#fdf4c7] hover:bg-[#f5d328] border border-[#2b1810]/40 active:translate-y-0.5 transition-all inline-flex items-center justify-center gap-1.5"
                    aria-label={`Lihat detail ${item.name}`}
                  >
                    <Eye className="w-3.5 h-3.5 text-[#8a1418]" aria-hidden="true" />
                    <span>Detail</span>
                  </button>

                  {onAddToCart && (
                    <button
                      type="button"
                      onClick={() => {
                        onAddToCart(item);
                        setAddedItemId(item.id);
                        setTimeout(() => setAddedItemId(null), 1500);
                      }}
                      className={`flex-1 min-h-[44px] inline-flex items-center justify-center py-2 px-3 rounded-xl text-xs font-black transition-all active:translate-y-0.5 border-2 border-[#2b1810] ${
                        addedItemId === item.id
                          ? 'bg-[#196b3e] text-[#ffffff]'
                          : 'bg-[#f5d328] text-[#2b1810] hover:bg-[#a91d22] hover:text-[#fffdf4]'
                      }`}
                      aria-label={`Tambah ${item.name} ke keranjang`}
                    >
                      {addedItemId === item.id ? 'Ditambahkan' : '+ Keranjang'}
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="menu-snack-banner mt-12">
        <div className="snack-banner-left">
          <span className="eyebrow">Lengkapi Pesananmu</span>
          <h3>Roti Maryam Hangat &amp; Pasokan Grosir</h3>
          <p>
            Tersedia kudapan roti maryam gurih dan manis, pasokan kulit tortilla serta daging kebab untuk UMKM, dan paket acara di Sidoarjo.
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
            Tambah Roti Maryam
          </button>
          <a
            href={getWhatsAppLink('Halo Kebab Al Firdaus, saya ingin tanya pasokan bahan baku kebab grosir.')}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-dark"
          >
            Tanya Bahan Grosir
          </a>
        </div>
      </div>
    </section>
  );
};
