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
  ExternalLink,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatRupiah, buildCartWhatsAppUrl, BUSINESS_INFO } from '../data/content';
import { resolveProductAsset } from '../data/productAssets';
import { MAX_CART_ITEM_QTY } from '../utils/cart';
import { validateCartForm, CartFormErrors, CartFormField } from '../utils/cartForm';
import { ProductImage } from './ProductImage';
import { useModalFocusTrap } from '../utils/useModalFocusTrap';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreMenu?: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  onExploreMenu,
}) => {
  const {
    items,
    totalItemCount,
    allPricesVerified,
    verifiedTotalPrice,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  // Customer data lives only in component memory, never persisted to localStorage or a server.
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');
  const [errors, setErrors] = useState<CartFormErrors>({});
  const [preparedWhatsAppUrl, setPreparedWhatsAppUrl] = useState<string | null>(null);
  const [popupBlocked, setPopupBlocked] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLTextAreaElement>(null);

  useModalFocusTrap(isOpen, onClose, dialogRef, closeBtnRef);

  if (!isOpen) return null;

  const focusField = (field: CartFormField) => {
    if (field === 'customerName') {
      nameInputRef.current?.focus();
    } else if (field === 'customerPhone') {
      phoneInputRef.current?.focus();
    } else if (field === 'deliveryAddress') {
      addressInputRef.current?.focus();
    }
  };

  const clearFieldError = (field: CartFormField) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const resetWhatsAppFeedback = () => {
    setPreparedWhatsAppUrl(null);
    setPopupBlocked(false);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const validation = validateCartForm({
      customerName,
      customerPhone,
      deliveryOption,
      deliveryAddress,
      generalNotes,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      resetWhatsAppFeedback();
      if (validation.firstErrorField) {
        focusField(validation.firstErrorField);
      }
      return;
    }

    setErrors({});

    const url = buildCartWhatsAppUrl({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      items: items.map((item) => ({
        name: item.name,
        qty: item.qty,
        option: item.option,
        verifiedPrice: item.verifiedPrice,
      })),
      deliveryOption,
      deliveryAddress: deliveryAddress.trim() || undefined,
      generalNotes: generalNotes.trim() || undefined,
    });

    setPreparedWhatsAppUrl(url);

    let opened: Window | null = null;
    try {
      opened = window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      opened = null;
    }
    setPopupBlocked(!opened);
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
        className="cart-dialog modal-dialog-enter w-full max-w-2xl max-h-[92dvh] bg-[#fffdf4] rounded-2xl border-2 border-[#2b1810] shadow-[6px_8px_0_#a91d22] flex flex-col overflow-hidden my-auto mx-0 sm:mx-auto"
      >
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#f5d328] border-b-2 border-[#2b1810] flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#a91d22] text-[#f5d328] border-2 border-[#2b1810] flex items-center justify-center font-bold shrink-0">
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h2
                  id="cart-modal-title"
                  className="font-black text-base sm:text-lg text-[#2b1810] tracking-tight m-0"
                >
                  Keranjang Pesanan
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-[#a91d22] text-[#f5d328] border border-[#2b1810] whitespace-nowrap">
                  {totalItemCount} item
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-[#543729] mt-0.5 mb-0 truncate">
                Kebab Al Firdaus · Medaeng Kulon, Sidoarjo
              </p>
            </div>
          </div>

          <button
            type="button"
            ref={closeBtnRef}
            onClick={onClose}
            className="w-11 h-11 rounded-xl bg-[#fffdf4] hover:bg-[#a91d22] text-[#2b1810] hover:text-[#fffdf4] flex items-center justify-center border-2 border-[#2b1810] transition-colors shrink-0"
            aria-label="Tutup keranjang pesanan"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {items.length === 0 ? (
            <div className="text-center py-8 px-3 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#fdf4c7] border-2 border-[#2b1810] mx-auto flex items-center justify-center text-[#8a1418]">
                <ShoppingBag className="w-8 h-8" aria-hidden="true" />
              </div>
              <div className="max-w-sm mx-auto space-y-1.5">
                <h3 className="font-extrabold text-lg text-[#2b1810] m-0">
                  Keranjangmu masih kosong
                </h3>
                <p className="text-xs text-[#543729] leading-relaxed m-0">
                  Pilih kebab siap santap atau roti maryam dari katalog menu untuk menyiapkan pesanan ke WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onExploreMenu) onExploreMenu();
                }}
                className="inline-flex items-center justify-center min-h-[46px] px-5 py-2.5 rounded-xl bg-[#a91d22] text-[#fffdf4] border-2 border-[#2b1810] text-xs font-extrabold tracking-wide hover:bg-[#7d1216] transition-colors shadow-[3px_3px_0_#2b1810]"
              >
                Pilih Menu Kebab
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#8a1418] m-0">
                    Daftar Pilihan ({items.length} menu)
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      clearCart();
                      resetWhatsAppFeedback();
                    }}
                    className="min-h-[36px] px-2 text-xs font-extrabold text-[#8a1418] hover:underline"
                  >
                    Kosongkan keranjang
                  </button>
                </div>

                <div className="divide-y divide-[#2b1810]/15 border-2 border-[#2b1810] rounded-xl overflow-hidden bg-white">
                  {items.map((item) => {
                    const hasVerifiedPrice = typeof item.verifiedPrice === 'number';
                    return (
                      <div
                        key={item.id}
                        className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-14 h-11 sm:w-16 sm:h-12 rounded-lg bg-[#fdf4c7] overflow-hidden shrink-0 border border-[#2b1810]">
                            <ProductImage
                              asset={resolveProductAsset(item.menuId, item.name, item.type || 'original')}
                              className="w-full h-full"
                              showPlaceholderTag={false}
                              sizes="64px"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <h4 className="font-extrabold text-sm text-[#2b1810] m-0 truncate">
                                {item.name}
                              </h4>
                              {item.option && (
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#f5d328] text-[#2b1810] border border-[#2b1810]/30 whitespace-nowrap">
                                  {item.option}
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-bold text-[#8a1418] mt-0.5 tabular-nums">
                              {hasVerifiedPrice ? (
                                <>
                                  {formatRupiah(item.verifiedPrice as number)}
                                  <span className="text-xs text-[#66493c] font-normal"> / porsi</span>
                                </>
                              ) : (
                                <span className="text-[#543729] font-semibold">
                                  Harga dikonfirmasi admin via WhatsApp
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-2 border-t sm:border-t-0 pt-2.5 sm:pt-0">
                          <div className="inline-flex items-center rounded-xl border-2 border-[#2b1810] bg-[#fdf4c7] p-0.5">
                            <button
                              type="button"
                              onClick={() => {
                                updateQuantity(item.id, -1);
                                resetWhatsAppFeedback();
                              }}
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-[#2b1810] hover:bg-white transition-colors"
                              aria-label={`Kurangi jumlah ${item.name}`}
                            >
                              <Minus className="w-4 h-4" aria-hidden="true" />
                            </button>
                            <span
                              className="w-8 text-center text-xs font-black text-[#2b1810] tabular-nums"
                              aria-live="polite"
                            >
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              disabled={item.qty >= MAX_CART_ITEM_QTY}
                              onClick={() => {
                                updateQuantity(item.id, 1);
                                resetWhatsAppFeedback();
                              }}
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-[#2b1810] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                              aria-label={`Tambah jumlah ${item.name}`}
                            >
                              <Plus className="w-4 h-4" aria-hidden="true" />
                            </button>
                          </div>

                          {hasVerifiedPrice && (
                            <div className="text-right min-w-[78px] tabular-nums">
                              <span className="text-xs font-black text-[#2b1810]">
                                {formatRupiah((item.verifiedPrice as number) * item.qty)}
                              </span>
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              removeItem(item.id);
                              resetWhatsAppFeedback();
                            }}
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#66493c] hover:text-[#8a1418] hover:bg-[#fdf5d2] transition-colors shrink-0"
                            aria-label={`Hapus ${item.name} dari keranjang`}
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleCheckout} id="cart-form" className="space-y-4 pt-1" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="cartCustomerName"
                      className="block text-xs font-black uppercase tracking-wider text-[#2b1810] mb-1.5"
                    >
                      Nama Pemesan <span className="text-[#8a1418]">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      id="cartCustomerName"
                      name="customerName"
                      type="text"
                      autoComplete="name"
                      required
                      value={customerName}
                      aria-invalid={Boolean(errors.customerName)}
                      aria-describedby={errors.customerName ? 'cart-name-error' : undefined}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        clearFieldError('customerName');
                        resetWhatsAppFeedback();
                      }}
                      placeholder="Contoh: Siti Aminah"
                      className={`w-full min-h-[44px] px-3 py-2.5 rounded-lg border-2 text-xs bg-white text-[#2b1810] ${
                        errors.customerName ? 'border-[#a91d22]' : 'border-[#2b1810]/45'
                      }`}
                    />
                    {errors.customerName && (
                      <p
                        id="cart-name-error"
                        role="alert"
                        className="mt-1.5 text-xs text-[#8a1418] font-bold flex items-start gap-1.5 mb-0"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{errors.customerName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="cartCustomerPhone"
                      className="block text-xs font-black uppercase tracking-wider text-[#2b1810] mb-1.5"
                    >
                      Nomor WhatsApp <span className="text-[#8a1418]">*</span>
                    </label>
                    <input
                      ref={phoneInputRef}
                      id="cartCustomerPhone"
                      name="customerPhone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      value={customerPhone}
                      aria-invalid={Boolean(errors.customerPhone)}
                      aria-describedby={errors.customerPhone ? 'cart-phone-error' : undefined}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value);
                        clearFieldError('customerPhone');
                        resetWhatsAppFeedback();
                      }}
                      placeholder="0812-3456-7890 atau +62 812..."
                      className={`w-full min-h-[44px] px-3 py-2.5 rounded-lg border-2 text-xs bg-white text-[#2b1810] ${
                        errors.customerPhone ? 'border-[#a91d22]' : 'border-[#2b1810]/45'
                      }`}
                    />
                    {errors.customerPhone && (
                      <p
                        id="cart-phone-error"
                        role="alert"
                        className="mt-1.5 text-xs text-[#8a1418] font-bold flex items-start gap-1.5 mb-0"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{errors.customerPhone}</span>
                      </p>
                    )}
                  </div>
                </div>

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
                        clearFieldError('deliveryAddress');
                        resetWhatsAppFeedback();
                      }}
                      className={`flex items-center justify-center gap-2 min-h-[46px] p-3 rounded-xl border-2 text-xs font-extrabold transition-colors ${
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
                        resetWhatsAppFeedback();
                      }}
                      className={`flex items-center justify-center gap-2 min-h-[46px] p-3 rounded-xl border-2 text-xs font-extrabold transition-colors ${
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
                      <span>
                        Alamat Lengkap Pengiriman <span className="text-[#8a1418]">*</span>
                      </span>
                    </label>
                    <textarea
                      ref={addressInputRef}
                      id="cartDeliveryAddress"
                      name="deliveryAddress"
                      rows={2}
                      required
                      value={deliveryAddress}
                      aria-invalid={Boolean(errors.deliveryAddress)}
                      aria-describedby={errors.deliveryAddress ? 'delivery-address-error' : undefined}
                      onChange={(e) => {
                        setDeliveryAddress(e.target.value);
                        clearFieldError('deliveryAddress');
                        resetWhatsAppFeedback();
                      }}
                      placeholder="Tulis nama jalan, nomor rumah, RT/RW, dan kelurahan"
                      className={`w-full p-2.5 rounded-lg border-2 text-xs bg-white text-[#2b1810] ${
                        errors.deliveryAddress ? 'border-[#a91d22]' : 'border-[#2b1810]/45'
                      }`}
                    />
                    {errors.deliveryAddress && (
                      <p
                        id="delivery-address-error"
                        role="alert"
                        className="text-xs text-[#8a1418] font-bold flex items-start gap-1.5 m-0"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{errors.deliveryAddress}</span>
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="cartNotes"
                    className="block text-xs font-black uppercase tracking-wider text-[#2b1810] mb-1.5"
                  >
                    Catatan Tambahan (opsional)
                  </label>
                  <input
                    id="cartNotes"
                    name="generalNotes"
                    type="text"
                    value={generalNotes}
                    onChange={(e) => {
                      setGeneralNotes(e.target.value);
                      resetWhatsAppFeedback();
                    }}
                    placeholder="Saus dipisah, tanpa timun, pedas sedang, dll."
                    className="w-full min-h-[44px] px-3 py-2.5 rounded-lg border-2 border-[#2b1810]/45 text-xs bg-white text-[#2b1810]"
                  />
                </div>

                {preparedWhatsAppUrl && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="p-3.5 sm:p-4 rounded-xl bg-[#fffdf4] border-2 border-[#196b3e] space-y-2.5"
                  >
                    <div className="flex items-start gap-2 text-xs font-extrabold text-[#196b3e]">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>
                        Pesan sudah disiapkan di WhatsApp. Pesanan baru terkonfirmasi setelah admin membalas.
                      </span>
                    </div>

                    {popupBlocked && (
                      <p className="text-xs font-semibold text-[#4f3327] m-0">
                        Browser memblokir jendela baru otomatis. Gunakan tombol manual di bawah untuk membuka WhatsApp:
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href={preparedWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#196b3e] hover:bg-[#145632] text-white border-2 border-[#2b1810] text-xs font-black tracking-wide transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Buka WhatsApp ({BUSINESS_INFO.phoneDisplay})</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          clearCart();
                          resetWhatsAppFeedback();
                        }}
                        className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white hover:bg-[#fdf4c7] text-[#8a1418] border-2 border-[#2b1810] text-xs font-black transition-colors"
                      >
                        Kosongkan keranjang
                      </button>
                    </div>
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
                <span className="font-black text-[#2b1810] tabular-nums">{totalItemCount} item</span>
              </div>

              {allPricesVerified && verifiedTotalPrice !== null ? (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-extrabold text-[#2b1810]">
                    Estimasi total pembayaran:
                  </span>
                  <span className="text-lg sm:text-xl font-black text-[#8a1418] tabular-nums">
                    {formatRupiah(verifiedTotalPrice)}
                  </span>
                </div>
              ) : (
                <p className="text-xs font-extrabold text-[#8a1418] m-0">
                  Harga dikonfirmasi admin via WhatsApp
                </p>
              )}

              <p className="text-[11px] text-[#543729] m-0">
                Ketersediaan, ongkir, dan konfirmasi akhir menunggu admin ({BUSINESS_INFO.phoneDisplay}).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onExploreMenu) onExploreMenu();
                }}
                className="min-h-[46px] py-2.5 px-4 rounded-xl border-2 border-[#2b1810] bg-white hover:bg-[#f5d328] text-xs font-extrabold text-[#2b1810] text-center transition-colors"
              >
                + Tambah Menu Lain
              </button>

              <button
                type="submit"
                form="cart-form"
                className="flex-1 min-h-[46px] py-2.5 px-4 rounded-xl bg-[#a91d22] hover:bg-[#7d1216] text-[#fffdf4] border-2 border-[#2b1810] text-xs sm:text-sm font-black tracking-wide flex items-center justify-center gap-2 shadow-[3px_3px_0_#2b1810] active:translate-y-0.5 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#f5d328] shrink-0" aria-hidden="true" />
                <span>Pesan via WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
