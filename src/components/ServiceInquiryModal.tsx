import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Package,
  Calendar,
} from 'lucide-react';
import { ServiceInquiryMode } from '../types';
import { BUSINESS_INFO, buildServiceInquiryWhatsAppUrl } from '../data/content';
import { validateIndonesianPhone } from '../utils/cartForm';
import { useModalFocusTrap } from '../utils/useModalFocusTrap';

interface ServiceInquiryModalProps {
  mode: ServiceInquiryMode | null;
  productName?: string;
  onClose: () => void;
}

type InquiryField = 'customerName' | 'customerPhone' | 'quantity' | 'eventDate' | 'eventLocation';

const WHOLESALE_UNITS = ['pack', 'kg', 'roll', 'dus', 'porsi'];

export const ServiceInquiryModal: React.FC<ServiceInquiryModalProps> = ({
  mode,
  productName,
  onClose,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [quantity, setQuantity] = useState('10');
  const [unit, setUnit] = useState('pack');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Partial<Record<InquiryField, string>>>({});
  const [preparedUrl, setPreparedUrl] = useState<string | null>(null);
  const [popupBlocked, setPopupBlocked] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const qtyRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!mode) return;
    setQuantity(mode === 'event' ? '30' : '10');
    setErrors({});
    setPreparedUrl(null);
    setPopupBlocked(false);
  }, [mode]);

  useModalFocusTrap(Boolean(mode), onClose, dialogRef, closeBtnRef);

  if (!mode) return null;

  const isWholesale = mode === 'wholesale';
  const resolvedProduct =
    productName ||
    (isWholesale ? 'Bahan Baku Kebab Grosir' : 'Paket Pesanan Acara / Hajatan');

  const clearError = (field: InquiryField) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const focusField = (field: InquiryField) => {
    const map: Record<InquiryField, HTMLInputElement | null> = {
      customerName: nameRef.current,
      customerPhone: phoneRef.current,
      quantity: qtyRef.current,
      eventDate: dateRef.current,
      eventLocation: locationRef.current,
    };
    map[field]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Partial<Record<InquiryField, string>> = {};
    const parsedQty = Number.parseInt(quantity, 10);

    if (!customerName.trim()) {
      nextErrors.customerName = 'Nama pemesan wajib diisi.';
    }
    if (!customerPhone.trim()) {
      nextErrors.customerPhone = 'Nomor WhatsApp wajib diisi.';
    } else if (!validateIndonesianPhone(customerPhone)) {
      nextErrors.customerPhone = 'Masukkan nomor WhatsApp Indonesia yang valid.';
    }
    if (!Number.isFinite(parsedQty) || parsedQty < 1) {
      nextErrors.quantity = 'Masukkan perkiraan jumlah minimal 1.';
    }
    if (!isWholesale) {
      if (!eventDate.trim()) {
        nextErrors.eventDate = 'Tanggal acara wajib diisi.';
      }
      if (!eventLocation.trim()) {
        nextErrors.eventLocation = 'Lokasi acara wajib diisi.';
      }
    }

    const order: InquiryField[] = [
      'customerName',
      'customerPhone',
      'quantity',
      'eventDate',
      'eventLocation',
    ];
    const firstInvalid = order.find((f) => Boolean(nextErrors[f]));

    if (firstInvalid) {
      setErrors(nextErrors);
      setPreparedUrl(null);
      setPopupBlocked(false);
      focusField(firstInvalid);
      return;
    }

    setErrors({});

    const url = buildServiceInquiryWhatsAppUrl({
      mode,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      product: resolvedProduct,
      quantity: parsedQty,
      unit: isWholesale ? unit : undefined,
      eventDate: !isWholesale ? eventDate.trim() : undefined,
      eventLocation: !isWholesale ? eventLocation.trim() : undefined,
      notes: notes.trim() || undefined,
    });

    setPreparedUrl(url);
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
      aria-labelledby="service-inquiry-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="modal-dialog-enter w-full max-w-lg max-h-[92dvh] bg-[#fffdf4] rounded-2xl border-2 border-[#2b1810] shadow-[6px_8px_0_#a91d22] flex flex-col overflow-hidden my-auto mx-0 sm:mx-auto"
      >
        <div className="px-4 sm:px-5 py-3.5 bg-[#f5d328] border-b-2 border-[#2b1810] flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#a91d22] text-[#f5d328] border-2 border-[#2b1810] flex items-center justify-center shrink-0">
              {isWholesale ? (
                <Package className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Calendar className="w-4 h-4" aria-hidden="true" />
              )}
            </div>
            <div className="min-w-0">
              <h2
                id="service-inquiry-title"
                className="font-black text-base text-[#2b1810] m-0 truncate"
              >
                {isWholesale ? 'Konsultasi Bahan Grosir' : 'Konsultasi Pesanan Acara'}
              </h2>
              <p className="text-[11px] font-semibold text-[#543729] m-0 truncate">
                Jalur terpisah dari keranjang eceran · Konfirmasi langsung via WhatsApp
              </p>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="w-11 h-11 rounded-xl bg-[#fffdf4] hover:bg-[#a91d22] text-[#2b1810] hover:text-[#fffdf4] border-2 border-[#2b1810] flex items-center justify-center shrink-0"
            aria-label="Tutup konsultasi"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4" noValidate>
          <div className="p-3 rounded-xl bg-[#fdf4c7] border border-[#2b1810]/30 text-xs text-[#2b1810]">
            <span className="font-black text-[#8a1418]">Layanan: </span>
            <span className="font-bold">{resolvedProduct}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="inquiryName"
                className="block text-xs font-black uppercase tracking-wider text-[#2b1810] mb-1"
              >
                Nama Pemesan <span className="text-[#8a1418]">*</span>
              </label>
              <input
                ref={nameRef}
                id="inquiryName"
                type="text"
                value={customerName}
                aria-invalid={Boolean(errors.customerName)}
                aria-describedby={errors.customerName ? 'inquiry-name-error' : undefined}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  clearError('customerName');
                  setPreparedUrl(null);
                }}
                placeholder="Nama Anda"
                className={`w-full min-h-[44px] px-3 py-2 rounded-lg border-2 text-xs bg-white text-[#2b1810] ${
                  errors.customerName ? 'border-[#a91d22]' : 'border-[#2b1810]/45'
                }`}
              />
              {errors.customerName && (
                <p id="inquiry-name-error" role="alert" className="mt-1 text-xs font-bold text-[#8a1418] flex items-center gap-1 mb-0">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.customerName}</span>
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="inquiryPhone"
                className="block text-xs font-black uppercase tracking-wider text-[#2b1810] mb-1"
              >
                Nomor WhatsApp <span className="text-[#8a1418]">*</span>
              </label>
              <input
                ref={phoneRef}
                id="inquiryPhone"
                type="tel"
                inputMode="tel"
                value={customerPhone}
                aria-invalid={Boolean(errors.customerPhone)}
                aria-describedby={errors.customerPhone ? 'inquiry-phone-error' : undefined}
                onChange={(e) => {
                  setCustomerPhone(e.target.value);
                  clearError('customerPhone');
                  setPreparedUrl(null);
                }}
                placeholder="0812-3456-7890"
                className={`w-full min-h-[44px] px-3 py-2 rounded-lg border-2 text-xs bg-white text-[#2b1810] ${
                  errors.customerPhone ? 'border-[#a91d22]' : 'border-[#2b1810]/45'
                }`}
              />
              {errors.customerPhone && (
                <p id="inquiry-phone-error" role="alert" className="mt-1 text-xs font-bold text-[#8a1418] flex items-center gap-1 mb-0">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.customerPhone}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="inquiryQty"
                className="block text-xs font-black uppercase tracking-wider text-[#2b1810] mb-1"
              >
                Perkiraan Jumlah <span className="text-[#8a1418]">*</span>
              </label>
              <input
                ref={qtyRef}
                id="inquiryQty"
                type="number"
                min={1}
                value={quantity}
                aria-invalid={Boolean(errors.quantity)}
                aria-describedby={errors.quantity ? 'inquiry-qty-error' : undefined}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  clearError('quantity');
                  setPreparedUrl(null);
                }}
                className={`w-full min-h-[44px] px-3 py-2 rounded-lg border-2 text-xs bg-white text-[#2b1810] ${
                  errors.quantity ? 'border-[#a91d22]' : 'border-[#2b1810]/45'
                }`}
              />
              {errors.quantity && (
                <p id="inquiry-qty-error" role="alert" className="mt-1 text-xs font-bold text-[#8a1418] flex items-center gap-1 mb-0">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.quantity}</span>
                </p>
              )}
            </div>

            {isWholesale ? (
              <div>
                <label
                  htmlFor="inquiryUnit"
                  className="block text-xs font-black uppercase tracking-wider text-[#2b1810] mb-1"
                >
                  Satuan / Unit
                </label>
                <select
                  id="inquiryUnit"
                  value={unit}
                  onChange={(e) => {
                    setUnit(e.target.value);
                    setPreparedUrl(null);
                  }}
                  className="w-full min-h-[44px] px-3 py-2 rounded-lg border-2 border-[#2b1810]/45 text-xs bg-white text-[#2b1810]"
                >
                  {WHOLESALE_UNITS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="inquiryDate"
                  className="block text-xs font-black uppercase tracking-wider text-[#2b1810] mb-1"
                >
                  Tanggal Acara <span className="text-[#8a1418]">*</span>
                </label>
                <input
                  ref={dateRef}
                  id="inquiryDate"
                  type="date"
                  value={eventDate}
                  aria-invalid={Boolean(errors.eventDate)}
                  aria-describedby={errors.eventDate ? 'inquiry-date-error' : undefined}
                  onChange={(e) => {
                    setEventDate(e.target.value);
                    clearError('eventDate');
                    setPreparedUrl(null);
                  }}
                  className={`w-full min-h-[44px] px-3 py-2 rounded-lg border-2 text-xs bg-white text-[#2b1810] ${
                    errors.eventDate ? 'border-[#a91d22]' : 'border-[#2b1810]/45'
                  }`}
                />
                {errors.eventDate && (
                  <p id="inquiry-date-error" role="alert" className="mt-1 text-xs font-bold text-[#8a1418] flex items-center gap-1 mb-0">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.eventDate}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          {!isWholesale && (
            <div>
              <label
                htmlFor="inquiryLocation"
                className="block text-xs font-black uppercase tracking-wider text-[#2b1810] mb-1"
              >
                Lokasi Acara <span className="text-[#8a1418]">*</span>
              </label>
              <input
                ref={locationRef}
                id="inquiryLocation"
                type="text"
                value={eventLocation}
                aria-invalid={Boolean(errors.eventLocation)}
                aria-describedby={errors.eventLocation ? 'inquiry-location-error' : undefined}
                onChange={(e) => {
                  setEventLocation(e.target.value);
                  clearError('eventLocation');
                  setPreparedUrl(null);
                }}
                placeholder="Contoh: Medaeng Kulon, Taman, Sidoarjo"
                className={`w-full min-h-[44px] px-3 py-2 rounded-lg border-2 text-xs bg-white text-[#2b1810] ${
                  errors.eventLocation ? 'border-[#a91d22]' : 'border-[#2b1810]/45'
                }`}
              />
              {errors.eventLocation && (
                <p id="inquiry-location-error" role="alert" className="mt-1 text-xs font-bold text-[#8a1418] flex items-center gap-1 mb-0">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.eventLocation}</span>
                </p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="inquiryNotes"
              className="block text-xs font-black uppercase tracking-wider text-[#2b1810] mb-1"
            >
              Catatan Tambahan (opsional)
            </label>
            <textarea
              id="inquiryNotes"
              rows={2}
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setPreparedUrl(null);
              }}
              placeholder={
                isWholesale
                  ? 'Jenis bahan (kulit tortilla, daging, saus) dan jadwal pasokan'
                  : 'Pilihan varian kebab, jam pengiriman, atau kebutuhan kemasan'
              }
              className="w-full p-2.5 rounded-lg border-2 border-[#2b1810]/45 text-xs bg-white text-[#2b1810]"
            />
          </div>

          {preparedUrl && (
            <div role="status" aria-live="polite" className="p-3.5 rounded-xl bg-white border-2 border-[#196b3e] space-y-2">
              <div className="flex items-start gap-2 text-xs font-extrabold text-[#196b3e]">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Pesan sudah disiapkan di WhatsApp. Pesanan baru terkonfirmasi setelah admin membalas.
                </span>
              </div>
              {popupBlocked && (
                <p className="text-xs text-[#4f3327] m-0">
                  Popup diblokir browser. Buka tautan manual di bawah:
                </p>
              )}
              <a
                href={preparedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full min-h-[44px] px-4 py-2 rounded-xl bg-[#196b3e] hover:bg-[#145632] text-white border-2 border-[#2b1810] text-xs font-black"
              >
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Buka WhatsApp ({BUSINESS_INFO.phoneDisplay})</span>
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#a91d22] hover:bg-[#7d1216] text-[#fffdf4] border-2 border-[#2b1810] text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-[3px_3px_0_#2b1810]"
          >
            <MessageCircle className="w-4 h-4 text-[#f5d328] shrink-0" aria-hidden="true" />
            <span>Kirim Konsultasi via WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};
