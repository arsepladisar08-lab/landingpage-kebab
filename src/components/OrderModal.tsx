import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BUSINESS_INFO, buildOrderWhatsAppUrl, getMenuVariant, MENU_VARIANTS } from '../data/content';

interface OrderModalProps { isOpen: boolean; onClose: () => void; initialProduct?: string; }
const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function localDateValue(): string {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, initialProduct }) => {
  const [customerName, setCustomerName] = useState('');
  const [product, setProduct] = useState(initialProduct || 'Kebab Original');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('pack');
  const [notes, setNotes] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const previousOverflowRef = useRef('');

  useEffect(() => {
    if (!isOpen) return;
    setProduct(initialProduct || 'Kebab Original');
    setQuantity(1);
    setUnit(initialProduct === 'Bahan Baku Kebab Grosir' ? 'pack' : 'paket');
    setCustomerName('');
    setNotes('');
    setEventDate('');
    setEventLocation('');
  }, [isOpen, initialProduct]);

  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = window.requestAnimationFrame(() => closeBtnRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !modalRef.current) return;
      const controls = Array.from(modalRef.current.querySelectorAll<HTMLElement>(focusableSelector))
        .filter((element) => element.offsetParent !== null);
      if (!controls.length) {
        event.preventDefault();
        return;
      }
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflowRef.current;
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  const selected = getMenuVariant(product);
  const kind = selected?.kind ?? 'ready-to-eat';
  const isWholesale = kind === 'wholesale';
  const isEvent = kind === 'event';
  const isSnack = kind === 'snack';
  const quantityLabel = isWholesale ? 'PERKIRAAN KEBUTUHAN' : isEvent ? 'PERKIRAAN JUMLAH PORSI' : isSnack ? 'JUMLAH KUDAPAN' : 'JUMLAH PORSI';
  const quantityUnit = isWholesale || isSnack ? unit : 'porsi';

  const previewLines = useMemo(() => [
    'Halo Kebab Al Firdaus! Saya ingin bertanya dan memesan:',
    'Menu / Kebutuhan: ' + product,
    'Jumlah: ' + quantity + ' ' + quantityUnit,
    eventDate ? 'Tanggal acara: ' + eventDate : '',
    eventLocation.trim() ? 'Lokasi acara / tujuan: ' + eventLocation.trim() : '',
    customerName.trim() ? 'Nama pemesan: ' + customerName.trim() : '',
    notes.trim() ? 'Catatan tambahan: ' + notes.trim() : '',
  ].filter(Boolean), [product, quantity, quantityUnit, eventDate, eventLocation, customerName, notes]);

  if (!isOpen) return null;

  const setProductAndReset = (value: string) => {
    setProduct(value);
    setQuantity(1);
    setUnit(value === 'Bahan Baku Kebab Grosir' ? 'pack' : 'paket');
    setEventDate('');
    setEventLocation('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = buildOrderWhatsAppUrl({
      customerName,
      product,
      quantity,
      unit: quantityUnit,
      notes,
      eventDate: isEvent ? eventDate : undefined,
      eventLocation: isEvent || isWholesale ? eventLocation : undefined,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop show" role="presentation" onMouseDown={handleBackdropClick}>
      <div className="order-modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" tabIndex={-1}>
        <div className="modal-heading">
          <div>
            <div className="eyebrow" style={{ color: 'var(--orange)' }}>FORMULIR PESANAN CEPAT</div>
            <h2 id="modal-title">{isWholesale ? 'Butuh bahan untuk usaha?' : isEvent ? 'Ada acara spesial?' : 'Mau kebab yang mana?'}</h2>
          </div>
          <button type="button" className="modal-close" aria-label="Tutup formulir" onClick={onClose} ref={closeBtnRef}>×</button>
        </div>
        <p className="form-intro" id="modal-description">
          {isWholesale
            ? 'Ceritakan perkiraan kebutuhan bahan. Admin akan membantu mengonfirmasi jenis produk, harga, dan ketersediaan.'
            : isEvent
              ? 'Sampaikan tanggal, perkiraan jumlah porsi, dan lokasi acara agar admin dapat menindaklanjuti kebutuhanmu.'
              : 'Pilih menu dan jumlah porsi. Rangkuman akan diteruskan ke WhatsApp Kebab Al Firdaus (' + BUSINESS_INFO.phoneDisplay + ') untuk konfirmasi stok dan harga terbaru.'}
        </p>
        <form className="order-form" onSubmit={handleSubmit}>
          <div className="field">
            <label>PILIH MENU / KEBUTUHAN</label>
            <div className="variant-chips">
              {MENU_VARIANTS.map((item) => (
                <button type="button" key={item.id} className={'variant-chip ' + (product === item.name ? 'active' : '')} onClick={() => setProductAndReset(item.name)} aria-pressed={product === item.name}>
                  {item.name}
                </button>
              ))}
              <button type="button" className={'variant-chip ' + (product === 'Tanya Menu / Kebutuhan Lain' ? 'active' : '')} onClick={() => setProductAndReset('Tanya Menu / Kebutuhan Lain')} aria-pressed={product === 'Tanya Menu / Kebutuhan Lain'}>Lainnya…</button>
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="productSelect">MENU / KEBUTUHAN TERPILIH</label>
              <select id="productSelect" name="productSelect" value={product} onChange={(event) => setProductAndReset(event.target.value)} required>
                {MENU_VARIANTS.map((item) => <option key={item.id} value={item.name}>{item.name} ({item.tag})</option>)}
                <option value="Tanya Menu / Kebutuhan Lain">Tanya Menu / Kebutuhan Lain</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="quantity">{quantityLabel}</label>
              <div className="stepper-wrap">
                <button type="button" className="step-btn" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Kurangi jumlah">−</button>
                <input id="quantity" name="quantity" type="number" min="1" max="999" value={quantity} onChange={(event) => setQuantity(Math.min(999, Math.max(1, Number.parseInt(event.target.value, 10) || 1)))} required />
                <button type="button" className="step-btn" onClick={() => setQuantity((value) => Math.min(999, value + 1))} aria-label="Tambah jumlah">+</button>
              </div>
            </div>
          </div>
          {isWholesale || isSnack ? (
            <div className="field">
              <label htmlFor="unit">{isWholesale ? 'SATUAN PERKIRAAN' : 'SATUAN KUDAPAN'}</label>
              <select id="unit" value={unit} onChange={(event) => setUnit(event.target.value)}>
                {isWholesale
                  ? <><option value="pack">Pack</option><option value="kg">Kilogram (kg)</option><option value="karton">Karton</option><option value="belum pasti">Belum pasti / konsultasi</option></>
                  : <><option value="paket">Paket</option><option value="pcs">Pcs</option></>}
              </select>
            </div>
          ) : null}
          {isEvent ? (
            <div className="form-row">
              <div className="field">
                <label htmlFor="eventDate">TANGGAL ACARA</label>
                <input id="eventDate" type="date" min={localDateValue()} value={eventDate} onChange={(event) => setEventDate(event.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="eventLocation">LOKASI ACARA</label>
                <input id="eventLocation" value={eventLocation} onChange={(event) => setEventLocation(event.target.value)} placeholder="Kecamatan / alamat" />
              </div>
            </div>
          ) : null}
          {isWholesale ? (
            <div className="field">
              <label htmlFor="eventLocation">LOKASI / KOTA TUJUAN</label>
              <input id="eventLocation" value={eventLocation} onChange={(event) => setEventLocation(event.target.value)} placeholder="Kota atau kecamatan tujuan" />
            </div>
          ) : null}
          <div className="field">
            <label htmlFor="customerName">NAMA PEMESAN (OPSIONAL)</label>
            <input id="customerName" name="customerName" autoComplete="name" placeholder="Nama kamu" value={customerName} onChange={(event) => setCustomerName(event.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="orderNotes">CATATAN TAMBAHAN (OPSIONAL)</label>
            <textarea id="orderNotes" name="orderNotes" placeholder={isEvent ? 'Waktu acara, jenis acara, atau detail kebutuhan…' : isWholesale ? 'Jenis bahan, kebutuhan rutin, atau pertanyaan lain…' : 'Misal: pedas sedang, tanpa bawang, atau catatan lainnya…'} value={notes} onChange={(event) => setNotes(event.target.value)} />
          </div>
          <div className="order-preview-box">
            <div className="preview-label"><span>✆ RANGKUMAN PESAN WHATSAPP</span></div>
            <div className="preview-content">
              {previewLines.map((line, index) => <div key={index}>{line}</div>)}
            </div>
          </div>
          <button className="button button-lime modal-submit" type="submit">Kirim Rangkuman ke WhatsApp <span>↗</span></button>
        </form>
        <p className="fine-print">Pesanan dan harga baru dianggap terkonfirmasi setelah disetujui langsung melalui WhatsApp dengan penjual.</p>
      </div>
    </div>
  );
};
