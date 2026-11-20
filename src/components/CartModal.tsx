import React, { useState, useRef } from 'react';
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
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { CartItem } from '../types';
import { formatRupiah, buildCartWhatsAppUrl, BUSINESS_INFO } from '../data/content';
import { DummyFoodVisual } from './DummyFoodVisual';
import { useModalFocusTrap } from '../utils/useModalFocusTrap';

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
  const [readyWhatsAppUrl, setReadyWhatsAppUrl] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useModalFocusTrap(isOpen, onClose, dialogRef, closeBtnRef);

  if (!isOpen) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (deliveryOption === 'delivery' && !deliveryAddress.trim()) {
      setAddressError(true);
      setReadyWhatsAppUrl(null);
      return;
    }
    setAddressError(false);

    const url = buildCartWhatsAppUrl({
      customerName: customerName.trim() || undefined,
      items: items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
        portionOption: i.portionOption,
        notes: i.notes,
      })),
      deliveryOption,
      deliveryAddress: deliveryAddress.trim() || undefined,
      generalNotes: generalNotes.trim() || undefined,
    });

    setReadyWhatsAppUrl(url);
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
      <div
        ref={dialogRef}
        className="cart-dialog w-full max-w-2xl max-h-[92vh] bg-[#fffdf4] rounded-2xl border-2 border-[#2b1810] shadow-[8px_10px_0_#a91d22] flex flex-col overflow-hidden my-auto mx-3 sm:mx-auto"
      >
        <div className="px-5 sm:px-6 py-4 bg-[#f5d328] border-b-2 border-[#2b1810] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#a91d22] text-[#f5d328] border-2 border-[#2b1810] flex items-center justify-center font-bold shrink-0">
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2
                  id="cart-modal-title"
                  className="font-black text-base sm:text-lg text-[#2b1810] tracking-tight m-0"
                >
                  Keranjang Pesanan
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#a91d22] text-[#f5d328] border border-[#2b1810]">
                  {totalItemCount} Item
                </span>
              </div>
              <p className="text-xs font-semibold text-[#543729] mt-0.5 mb-0 truncate">
                Kebab Al Firdaus · Medaeng Kulon, Sidoarjo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {items.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  onClearCart();
                  setReadyWhatsAppUrl(null);
                }}
                className="min-h-[44px] px-2.5 text-xs font-extrabold text-[#8a1418] hover:underline"
              >
                Kosongkan
              </button>
            )}
            <button
              type="button"
              ref={closeBtnRef}
              onClick={onClose}
              className="w-11 h-11 rounded-xl bg-[#fffdf4] hover:bg-[#a91d22] text-[#2b1810] hover:text-[#fffdf4] flex items-center justify-center border-2 border-[#2b1810] transition-colors"
              aria-label="Tutup keranjang pesanan"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-10 px-4 space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#fdf4c7] border-2 border-[#2b1810] mx-auto flex items-center justify-center text-[#8a1418]">
                <ShoppingBag className="w-10 h-10" aria-hidden="true" />
              </div>
              <div className="max-w-sm mx-auto space-y-1.5">
                <h3 className="font-extrabold text-lg text-[#2b1810] m-0">
                  Keranjangmu masih kosong
                </h3>
                <p className="text-xs text-[#543729] leading-relaxed m-0">
                  Tambahkan Kebab Original, Kebab Keju, atau Roti Maryam hangat terlebih dahulu agar pesanan bisa dirangkum ke WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onExploreMenu) onExploreMenu();
                }}
                className="inline-flex items-center justify-center min-h-[46px] px-6 py-2.5 rounded-xl bg-[#a91d22] text-[#fffdf4] border-2 border-[#2b1810] text-xs font-extrabold tracking-wide hover:bg-[#7d1216] transition-colors shadow-[3px_3px_0_#2b1810]"
              >
                Pilih Menu Kebab
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#8a1418] m-0">
                  Daftar Pilihan ({items.length} menu)
                </h3>

                <div className="divide-y divide-[#2b1810]/15 border-2 border-[#2b1810] rounded-xl overflow-hidden bg-white">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#fdf5d2]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-lg bg-[#fdf4c7] overflow-hidden shrink-0 border border-[#2b1810]">
                          <DummyFoodVisual
                            type={item.type || 'original'}
                            alt={item.name}
                            className="w-full h-full"
                            showBadge={false}
                          />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-extrabold text-sm text-[#2b1810] m-0">
                              {item.name}
                            </h4>
                            {item.portionOption && (
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#f5d328] text-[#2b1810] border border-[#2b1810]/30">
                                {item.portionOption}
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-bold text-[#8a1418] mt-0.5">
                            {formatRupiah(item.price)}
                            <span className="text-xs text-[#66493c] font-normal"> / porsi</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2.5 sm:pt-0">
                        <div className="inline-flex items-center rounded-xl border-2 border-[#2b1810] bg-[#fdf4c7] p-0.5">
                          <button
                            type="button"
                            onClick={() => {
                              onUpdateQuantity(item.id, -1);
                              setReadyWhatsAppUrl(null);
                            }}
                            className="w-11 h-11 rounded-lg flex items-center justify-center text-[#2b1810] hover:bg-white transition-colors"
                            aria-label={`Kurangi jumlah ${item.name}`}
                          >
                            <Minus className="w-4 h-4" aria-hidden="true" />
                          </button>
                          <span className="w-8 text-center text-xs font-black text-[#2b1810]" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              onUpdateQuantity(item.id, 1);
                              setReadyWhatsAppUrl(null);
                            }}
                            className="w-11 h-11 rounded-lg flex items-center justify-center text-[#2b1810] hover:bg-white transition-colors"
                            aria-label={`Tambah jumlah ${item.name}`}
                          >
                            <Plus className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="text-right min-w-[82px]">
                          <span className="text-xs font-black text-[#2b1810]">
                            {formatRupiah(item.price * item.quantity)}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            onRemoveItem(item.id);
                            setReadyWhatsAppUrl(null);
                          }}
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-[#66493c] hover:text-[#8a1418] hover:bg-[#fdf5d2] transition-colors"
                          aria-label={`Hapus ${item.name} dari keranjang`}
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleCheckout} id="cart-form" className="space-y-4 pt-1" noValidate>
                <fieldset className="border-0 p-0 m-0">
                  <legend className="block text-xs font-black uppercase tracking-wider text-[#2b1810] mb-2">
                    Metode Pengambilan Pesanan
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      aria-pressed={deliveryOption === 'pickup'}
                      onClick={() => {
                        setDeliveryOption('pickup');
                        setAddressError(false);
                        setReadyWhatsAppUrl(null);
                      }}
                      className={`flex items-center justify-center gap-2 min-h-[48px] p-3 rounded-xl border-2 text-xs font-extrabold transition-colors ${
                        deliveryOption === 'pickup'
                          ? 'bg-[#a91d22] text-[#fffdf4] border-[#2b1810] shadow-[2px_2px_0_#2b1810]'
                          : 'bg-white text-[#2b1810] border-[#2b1810]/40 hover:bg-[#fdf4c7]'
                      }`}
                    >
                      <Store className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Ambil di Outlet Medaeng</span>
                    </button>

                    <button
                      type="button"
                      aria-pressed={deliveryOption === 'delivery'}
                      onClick={() => {
                        setDeliveryOption('delivery');
                        setReadyWhatsAppUrl(null);
                      }}
                      className={`flex items-center justify-center gap-2 min-h-[48px] p-3 rounded-xl border-2 text-xs font-extrabold transition-colors ${
                        deliveryOption === 'delivery'
                          ? 'bg-[#a91d22] text-[#fffdf4] border-[#2b1810] shadow-[2px_2px_0_#2b1810]'
                          : 'bg-white text-[#2b1810] border-[#2b1810]/40 hover:bg-[#fdf4c7]'
                      }`}
                    >
                      <Bike className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Kirim / Antar ke Lokasi</span>
                    </button>
                  </div>
                </fieldset>

                {deliveryOption === 'delivery' && (
                  <div className="p-3.5 bg-[#fdf4c7] rounded-xl border-2 border-[#2b1810] space-y-2">
                    <label
                      htmlFor="cartDeliveryAddress"
                      className="flex items-center gap-1.5 text-xs font-bold text-[#2b1810]"
                    >
                      <MapPin className="w-4 h-4 text-[#8a1418] shrink-0" aria-hidden="true" />
                      <span>Alamat Lengkap Pengiriman (Area Sidoarjo &amp; Sekitarnya)</span>
                    </label>
                    <textarea
                      id="cartDeliveryAddress"
                      rows={2}
                      value={deliveryAddress}
                      aria-invalid={addressError}
                      aria-describedby={addressError ? 'delivery-address-error' : undefined}
                      onChange={(e) => {
                        setDeliveryAddress(e.target.value);
                        setReadyWhatsAppUrl(null);
                        if (e.target.value.trim()) setAddressError(false);
                      }}
                      placeholder="Tulis nama jalan, nomor rumah, RT/RW, dan kelurahan"
                      className={`w-full p-3 rounded-lg border-2 text-xs bg-white text-[#2b1810] ${
                        addressError ? 'border-[#a91d22]' : 'border-[#2b1810]/45'
                      }`}
                    />
                    {addressError && (
                      <p
                        id="delivery-address-error"
                        role="alert"
                        className="text-xs text-[#8a1418] font-bold flex items-center gap-1.5 m-0"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Harap isi alamat pengiriman terlebih dahulu sebelum melanjutkan.</span>
                      </p>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="cartCustomerName"
                      className="block text-xs font-black uppercase tracking-wider text-[#2b1810] mb-1.5"
                    >
                      Nama Pemesan (opsional)
                    </label>
                    <input
                      id="cartCustomerName"
                      type="text"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        setReadyWhatsAppUrl(null);
                      }}
                      placeholder="Nama Anda"
                      className="w-full min-h-[44px] p-2.5 rounded-lg border-2 border-[#2b1810]/40 text-xs bg-white text-[#2b1810]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cartNotes"
                      className="block text-xs font-black uppercase tracking-wider text-[#2b1810] mb-1.5"
                    >
                      Catatan Tambahan (opsional)
                    </label>
                    <input
                      id="cartNotes"
                      type="text"
                      value={generalNotes}
                      onChange={(e) => {
                        setGeneralNotes(e.target.value);
                        setReadyWhatsAppUrl(null);
                      }}
                      placeholder="Saus dipisah, pedas sedang, dll."
                      className="w-full min-h-[44px] p-2.5 rounded-lg border-2 border-[#2b1810]/40 text-xs bg-white text-[#2b1810]"
                    />
                  </div>
                </div>

                {readyWhatsAppUrl && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="p-4 rounded-xl bg-[#fffdf4] border-2 border-[#196b3e] space-y-2.5"
                  >
                    <div className="flex items-start gap-2 text-xs font-extrabold text-[#196b3e]">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Rangkuman pesanan siap dikirim ke WhatsApp resmi Kebab Al Firdaus ({BUSINESS_INFO.phoneDisplay}).</span>
                    </div>
                    <a
                      href={readyWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#196b3e] hover:bg-[#145632] text-white border-2 border-[#2b1810] text-xs font-black tracking-wide transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Lanjutkan ke WhatsApp Sekarang</span>
                    </a>
                  </div>
                )}
              </form>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#fdf4c7] border-t-2 border-[#2b1810] shrink-0 space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-[#543729]">
                <span>Total jumlah pesanan:</span>
                <span className="font-bold text-[#2b1810]">{totalItemCount} item</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-[#2b1810]">
                  Estimasi total pembayaran:
                </span>
                <span className="text-xl font-black text-[#8a1418]">
                  {formatRupiah(totalPrice)}
                </span>
              </div>
              <p className="text-[11px] text-[#543729] m-0">
                Stok harian dan ongkir (jika antar) dikonfirmasi admin melalui WhatsApp <strong>{BUSINESS_INFO.phoneDisplay}</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onExploreMenu) onExploreMenu();
                }}
                className="min-h-[48px] py-3 px-4 rounded-xl border-2 border-[#2b1810] bg-white hover:bg-[#f5d328] text-xs font-extrabold text-[#2b1810] text-center transition-colors"
              >
                + Tambah Menu Lain
              </button>

              <button
                type="submit"
                form="cart-form"
                className="flex-1 min-h-[48px] py-3 px-5 rounded-xl bg-[#a91d22] hover:bg-[#7d1216] text-[#fffdf4] border-2 border-[#2b1810] text-xs sm:text-sm font-black tracking-wide flex items-center justify-center gap-2 shadow-[3px_3px_0_#2b1810] active:translate-y-0.5 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#f5d328] shrink-0" aria-hidden="true" />
                <span>Siapkan Pesanan WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
