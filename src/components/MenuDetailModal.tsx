import React, { useEffect } from 'react';
import { X, Flame, CheckCircle2, MessageCircle, FileText, Sparkles, ChefHat } from 'lucide-react';
import { MenuVariant } from '../types';
import { DummyFoodVisual } from './DummyFoodVisual';
import { getWhatsAppLink } from '../data/content';

interface MenuDetailModalProps {
  item: MenuVariant | null;
  onClose: () => void;
  onOpenOrderForm: (productName: string) => void;
}

export const MenuDetailModal: React.FC<MenuDetailModalProps> = ({
  item,
  onClose,
  onOpenOrderForm,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const spiceMeter = () => {
    const level = item.spiceLevel ?? 1;
    if (level === 0) {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200">
          🌱 Tidak Pedas / Ramah Anak
        </span>
      );
    }
    return (
      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100/90 px-2.5 py-1 rounded-full border border-amber-200">
        <span className="flex items-center text-red-600">
          {Array.from({ length: 3 }).map((_, i) => (
            <Flame
              key={i}
              className={`w-3.5 h-3.5 ${
                i < level ? 'fill-red-500 text-red-600' : 'text-neutral-300'
              }`}
            />
          ))}
        </span>
        <span>
          {level === 1 ? 'Pedas Sedang (Standar)' : level === 2 ? 'Pedas Nendang' : 'Ekstra Pedas Mantap'}
        </span>
      </div>
    );
  };

  const directWaMessage = `Halo Kebab Al Firdaus, saya tertarik dengan menu *${item.name}*. Boleh info harga dan cara pemesanannya?`;

  return (
    <div
      className="modal-backdrop show"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-detail-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="menu-detail-dialog max-w-xl w-[94%] bg-[#faf7f0] rounded-2xl border border-neutral-300 shadow-2xl overflow-hidden p-0 my-auto">
        {/* Modal Image Header with Dummy Tag */}
        <div className="relative aspect-[16/9] w-full bg-[#f3efe5] border-b border-neutral-200 overflow-hidden">
          <DummyFoodVisual
            type={item.type === 'custom' ? item.id : item.type}
            alt={item.imageDummyAlt || item.name}
            className="w-full h-full"
            showBadge={true}
          />

          <button
            type="button"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center border border-black/10 shadow-sm transition-transform active:scale-95"
            onClick={onClose}
            aria-label="Tutup detail menu"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#d5f264] text-[#1c1b18] border border-black/20 shadow-xs">
              {item.badge}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#68645b] border border-black/10">
              {item.tag}
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 md:p-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#ec6c3b] uppercase tracking-wider mb-1">
              <ChefHat className="w-4 h-4" />
              <span>Detail Menu Al Firdaus</span>
            </div>
            <h2 id="menu-detail-title" className="text-2xl font-black text-[#1c1b18] tracking-tight">
              {item.name}
            </h2>
            <p className="mt-1.5 text-sm text-[#5d5950] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Flavor Profile & Spice Level */}
          <div className="bg-[#f2ece1] rounded-xl p-3.5 border border-black/10 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-[#1c1b18] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#ec6c3b]" />
                Karakter Rasa
              </span>
              {spiceMeter()}
            </div>
            <p className="text-xs text-[#555147] font-medium leading-relaxed">
              {item.flavorProfile || 'Racikan gurih khas Al Firdaus dengan bahan higienis dan porsi memuaskan.'}
            </p>
          </div>

          {/* Ingredients Breakdown */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#1c1b18] mb-2">
                Komposisi & Sajian Utama
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.ingredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-white/80 p-2 rounded-lg border border-neutral-200/90 text-xs text-[#2e2d29]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{ing}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Portion Info */}
          {item.portionInfo && (
            <div className="text-xs text-[#68645b] flex items-center gap-2 border-t border-dashed border-neutral-300 pt-3">
              <span className="font-bold text-[#1c1b18]">Catatan Porsi:</span>
              <span>{item.portionInfo}</span>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <a
              href={getWhatsAppLink(directWaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-extrabold text-xs tracking-wider uppercase bg-[#1c1b18] text-[#d5f264] hover:bg-[#2e2c27] active:scale-[0.98] transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current text-[#d5f264]" />
              <span>Pesan via WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenOrderForm(item.name);
              }}
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-extrabold text-xs tracking-wider uppercase bg-[#d5f264] text-[#1c1b18] border border-black/15 hover:bg-[#c9e855] active:scale-[0.98] transition-all shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Formulir Cepat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
