import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  MapPin,
  Store,
  Bike,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { CartItem } from '../types';
import { buildCartWhatsAppUrl, BUSINESS_INFO } from '../data/content';
import { DummyFoodVisual } from './DummyFoodVisual';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onExploreMenu?: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreMenu,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');
  const [addressError, setAddressError] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (deliveryOption === 'delivery' && !deliveryAddress.trim()) {
      setAddressError(true);
      return;
    }
    setAddressError(false);

    const url = buildCartWhatsAppUrl({
      customerName: customerName.trim() || undefined,
      items: items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        portionOption: i.portionOption,
        notes: i.notes,
      })),
      deliveryOption,
      deliveryAddress: deliveryAddress.trim() || undefined,
      generalNotes: generalNotes.trim() || undefined,
    });

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="modal-backdrop show"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="cart-dialog w-full max-w-2xl max-h-[92vh] bg-[#faf7f0] rounded-2xl border border-neutral-300 shadow-2xl flex flex-col overflow-hidden my-auto mx-4 sm:mx-auto">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#f3efe5] border-b border-neutral-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1c1b18] text-[#d5f264] flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="cart-modal-title"
                  className="font-black text-lg text-[#1c1b18] tracking-tight"
                >
                  Keranjang Pesanan
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-black bg-[#d5f264] text-[#1c1b18] border border-black/10">
                  {totalItemCount} Item
                </span>
              </div>
              <p className="text-xs text-[#716d63] mt-0.5">
                Kebab & kudapan hangat Medaeng Kulon, Sidoarjo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="text-xs font-semibold text-neutral-500 hover:text-red-600 transition-colors px-2 py-1"
                title="Hapus semua item di keranjang"
              >
                Kosongkan
              </button>
            )}
            <button
              type="button"
              ref={closeBtnRef}
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-neutral-800 flex items-center justify-center border border-black/10 shadow-xs transition-transform active:scale-95"
              aria-label="Tutup keranjang"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#f0ebd9] mx-auto flex items-center justify-center text-[#ec6c3b]">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div className="max-w-sm mx-auto space-y-1.5">
                <h3 className="font-extrabold text-lg text-[#1c1b18]">
                  Keranjangmu Masih Kosong
                </h3>
                <p className="text-xs text-[#716d63] leading-relaxed">
                  Pilih varian kebab favorit seperti Kebab Original, Keju Lumer, atau Roti Maryam hangat untuk mulai memesan.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onExploreMenu) onExploreMenu();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1c1b18] text-[#d5f264] text-xs font-extrabold uppercase tracking-wider hover:bg-[#2c2b27] transition-all shadow-sm active:scale-95"
              >
                <span>Jelajahi Menu Kebab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#635f55]">
                  Daftar Pilihan Kebab & Kudapan ({items.length} macam)
                </h3>

                <div className="divide-y divide-neutral-200 border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-xs">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50/70 transition-colors"
                    >
                      {/* Left: Thumbnail & Name */}
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-lg bg-[#f3efe5] overflow-hidden shrink-0 border border-neutral-200">
                          <DummyFoodVisual
                            type={item.type || 'original'}
                            alt={item.name}
                            className="w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-[#1c1b18]">
                              {item.name}
                            </h4>
                            {item.portionOption && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                                {item.portionOption}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#858074] mt-0.5">
                            Harga dikonfirmasi melalui WhatsApp
                          </p>
                        </div>
                      </div>

                      {/* Right: Stepper & Subtotal */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                        {/* Stepper buttons */}
                        <div className="inline-flex items-center rounded-lg border border-neutral-300 bg-[#f8f5ee] p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-7 h-7 rounded flex items-center justify-center text-neutral-700 hover:bg-white active:scale-95 transition-all"
                            aria-label={`Kurangi ${item.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-black text-[#1c1b18]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-7 h-7 rounded flex items-center justify-center text-neutral-700 hover:bg-white active:scale-95 transition-all"
                            aria-label={`Tambah ${item.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          aria-label={`Hapus ${item.name}`}
                          title="Hapus item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery & Customer Option Form */}
              <form onSubmit={handleCheckout} id="cart-form" className="space-y-4 pt-2">
                {/* Method Tabs */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#635f55] mb-2">
                    Metode Pengambilan Pesanan
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setDeliveryOption('pickup');
                        setAddressError(false);
                      }}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                        deliveryOption === 'pickup'
                          ? 'bg-[#1c1b18] text-[#d5f264] border-[#1c1b18] shadow-sm'
                          : 'bg-white text-[#45423b] border-neutral-300 hover:bg-neutral-100'
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      <span>Ambil di Outlet Medaeng</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryOption('delivery')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                        deliveryOption === 'delivery'
                          ? 'bg-[#1c1b18] text-[#d5f264] border-[#1c1b18] shadow-sm'
                          : 'bg-white text-[#45423b] border-neutral-300 hover:bg-neutral-100'
                      }`}
                    >
                      <Bike className="w-4 h-4" />
                      <span>Kirim / Antar ke Lokasi</span>
                    </button>
                  </div>
                </div>

                {/* Conditional Delivery Address Input */}
                {deliveryOption === 'delivery' && (
                  <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/90 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <MapPin className="w-4 h-4 text-[#ec6c3b]" />
                      <span>Alamat Lengkap Pengiriman (konfirmasi area layanan)</span>
                    </div>
                    <textarea
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => {
                        setDeliveryAddress(e.target.value);
                        if (e.target.value.trim()) setAddressError(false);
                      }}
                      placeholder="Contoh: Jl. Medaeng Asri No. 12, RT 02/RW 03, Kedungturi, Taman"
                      className={`w-full p-2.5 rounded-lg border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1c1b18] ${
                        addressError ? 'border-red-500 ring-1 ring-red-400' : 'border-neutral-300'
                      }`}
                    />
                    {addressError && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Harap isi alamat pengiriman untuk proses antar.
                      </p>
                    )}
                  </div>
                )}

                {/* Name & Special Notes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="cartCustomerName"
                      className="block text-xs font-black uppercase tracking-wider text-[#635f55] mb-1.5"
                    >
                      Nama Pemesan (opsional)
                    </label>
                    <input
                      id="cartCustomerName"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Contoh: Mas Budi / Mbak Rini"
                      className="w-full p-2.5 rounded-lg border border-neutral-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1c1b18]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cartNotes"
                      className="block text-xs font-black uppercase tracking-wider text-[#635f55] mb-1.5"
                    >
                      Catatan Tambahan (opsional)
                    </label>
                    <input
                      id="cartNotes"
                      type="text"
                      value={generalNotes}
                      onChange={(e) => setGeneralNotes(e.target.value)}
                      placeholder="Contoh: saus dipisah, pedas sedang"
                      className="w-full p-2.5 rounded-lg border border-neutral-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1c1b18]"
                    />
                  </div>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Modal Footer / Checkout Bar */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#f3efe5] border-t border-neutral-200 shrink-0 space-y-3">
            {/* Price Calculations */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-[#716d63]">
                <span>Jumlah item:</span>
                <span className="font-bold text-[#1c1b18]">{totalItemCount} item</span>
              </div>
              <p className="text-sm font-extrabold text-[#1c1b18]">
                Harga akhir dikonfirmasi melalui WhatsApp
              </p>
              <p className="text-[10px] text-[#8c887d] italic">
                Ketersediaan menu, harga, area pengantaran, dan ongkir perlu dikonfirmasi oleh admin. Pesanan belum terkirim sampai kamu mengirim pesan melalui WhatsApp.
              </p>
            </div>

            {/* Submit Checkout Button */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onExploreMenu) onExploreMenu();
                }}
                className="py-3 px-4 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-100 text-xs font-bold text-[#3d3a33] text-center transition-all"
              >
                + Tambah Menu Lain
              </button>

              <button
                type="button"
                onClick={handleCheckout}
                className="flex-1 py-3 px-5 rounded-xl bg-[#1c1b18] hover:bg-[#2c2b27] text-[#d5f264] text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-[#d5f264] text-[#1c1b18]" />
                <span>Kirim Pesanan ke WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
