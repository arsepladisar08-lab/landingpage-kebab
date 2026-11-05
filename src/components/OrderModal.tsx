import React, { useState, useEffect, useRef } from 'react';
import { MENU_VARIANTS, buildOrderWhatsAppUrl, BUSINESS_INFO } from '../data/content';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialProduct,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [product, setProduct] = useState(initialProduct || 'Kebab Original');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
    }
  }, [initialProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildOrderWhatsAppUrl({
      customerName: customerName.trim(),
      product,
      quantity,
      notes: notes.trim(),
    });
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const previewLines = [
    `Halo Kebab Al Firdaus!`,
    `Menu: ${product}`,
    `Jumlah: ${quantity} porsi/paket`,
    customerName ? `Nama: ${customerName}` : '',
    notes ? `Catatan: ${notes}` : '',
  ].filter(Boolean);

  return (
    <div
      className="modal-backdrop show"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
    >
      <div className="order-modal" ref={modalRef}>
        <div className="modal-heading">
          <div>
            <div className="eyebrow" style={{ color: 'var(--orange)' }}>
              FORMULIR PESANAN CEPAT
            </div>
            <h2 id="modal-title" style={{ marginTop: '6px' }}>
              Mau Kebab yang Mana?
            </h2>
          </div>
          <button
            type="button"
            className="modal-close"
            aria-label="Tutup formulir"
            onClick={onClose}
            ref={closeBtnRef}
          >
            ×
          </button>
        </div>

        <p className="form-intro">
          Pilih menu dan jumlah porsi. Rangkuman pesanan akan otomatis diteruskan ke WhatsApp resmi{' '}
          <strong>Kebab Al Firdaus ({BUSINESS_INFO.phoneDisplay})</strong> untuk konfirmasi stok & harga terbaru.
        </p>

        <form className="order-form" onSubmit={handleSubmit}>
          {/* Quick Select Chips */}
          <div className="field">
            <label>Pilih Varian Favorit</label>
            <div className="variant-chips">
              {MENU_VARIANTS.map((v) => (
                <button
                  type="button"
                  key={v.id}
                  className={`variant-chip ${product === v.name ? 'active' : ''}`}
                  onClick={() => setProduct(v.name)}
                >
                  {v.name}
                </button>
              ))}
              <button
                type="button"
                className={`variant-chip ${product === 'Tanya Menu / Kebutuhan Lain' ? 'active' : ''}`}
                onClick={() => setProduct('Tanya Menu / Kebutuhan Lain')}
              >
                Lainnya...
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label htmlFor="productSelect">Menu / Kebutuhan Terpilih</label>
              <select
                id="productSelect"
                name="productSelect"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                required
              >
                {MENU_VARIANTS.map((v) => (
                  <option key={v.id} value={v.name}>
                    {v.name} ({v.tag})
                  </option>
                ))}
                <option value="Tanya Menu / Kebutuhan Lain">Tanya Menu / Kebutuhan Lain</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="quantity">Jumlah Porsi</label>
              <div className="stepper-wrap">
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Kurangi jumlah"
                >
                  −
                </button>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  max="999"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  required
                />
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Tambah jumlah"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="customerName">Nama Pemesan (opsional)</label>
            <input
              id="customerName"
              name="customerName"
              autoComplete="name"
              placeholder="Contoh: Mas Budi / Mbak Rini"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="orderNotes">Catatan Tambahan (opsional)</label>
            <textarea
              id="orderNotes"
              name="orderNotes"
              placeholder="Misal: pedas sedang, tidak pakai bawang, atau opsi ambil langsung di Jl. Bali Medaeng."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* WhatsApp Preview Box */}
          <div className="order-preview-box">
            <div className="preview-label">
              <span>✆ Rangkuman Pesan WhatsApp:</span>
            </div>
            <div className="preview-content">
              {previewLines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>

          <button className="button button-lime modal-submit" type="submit">
            Kirim Rangkuman ke WhatsApp <span>↗</span>
          </button>
        </form>

        <p className="fine-print">
          Pesanan dan harga dianggap resmi terkonfirmasi setelah disetujui langsung melalui WhatsApp dengan penjual.
        </p>
      </div>
    </div>
  );
};
