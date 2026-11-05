import React, { FormEvent, useState } from 'react';
import { BUSINESS_INFO } from '../data/content';

interface WholesaleForm {
  name: string;
  phone: string;
  businessType: string;
  product: string;
  monthlyNeed: string;
  notes: string;
}

const INITIAL_FORM: WholesaleForm = {
  name: '',
  phone: '',
  businessType: '',
  product: '',
  monthlyNeed: '',
  notes: '',
};

export const WholesaleSection: React.FC = () => {
  const [form, setForm] = useState<WholesaleForm>(INITIAL_FORM);
  const [status, setStatus] = useState('');

  const update = (field: keyof WholesaleForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleaned = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [key, value.trim()])
    ) as WholesaleForm;

    if (!cleaned.name || !cleaned.phone || !cleaned.businessType || !cleaned.product || !cleaned.monthlyNeed) {
      setStatus('Lengkapi semua kolom bertanda bintang terlebih dahulu.');
      return;
    }

    const message = [
      'Halo, Toko Kebab Al Firdaus. Saya ingin bertanya tentang harga grosir / reseller.',
      '',
      `Nama: ${cleaned.name}`,
      `Nomor WhatsApp: ${cleaned.phone}`,
      `Jenis usaha: ${cleaned.businessType}`,
      `Produk yang diminati: ${cleaned.product}`,
      `Perkiraan kebutuhan per bulan: ${cleaned.monthlyNeed}`,
      `Catatan: ${cleaned.notes || '-'}`,
      '',
      'Mohon info harga, ketersediaan, minimum pemesanan bila ada, serta opsi pengiriman. Terima kasih.',
    ].join('\n');

    const url = `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
    const opened = window.open(url, '_blank');
    if (opened) {
      opened.opener = null;
      setStatus('WhatsApp telah dibuka dengan ringkasan permintaan. Tinjau pesannya lalu tekan Kirim di WhatsApp untuk mengirim ke admin.');
    } else {
      setStatus('Popup WhatsApp terhalang browser. Izinkan popup atau gunakan tombol kontak untuk melanjutkan.');
    }
  };

  return (
    <section className="section wholesale" id="grosir" aria-labelledby="wholesale-title">
      <div className="container wholesale-grid">
        <div className="wholesale-copy">
          <div className="eyebrow">Untuk mitra usaha</div>
          <h2 id="wholesale-title">Butuh pasokan kebab untuk bisnis?</h2>
          <p>Warung kebab, reseller frozen food, katering, kantin, dan pelaku usaha kuliner bisa mengirim kebutuhan melalui formulir ini. Admin akan menerima detailnya di WhatsApp agar pembahasan lebih terarah.</p>
          <div className="wholesale-points">
            <div className="wholesale-point"><span className="check">✓</span><span>Ajukan pertanyaan harga grosir sesuai kebutuhan.</span></div>
            <div className="wholesale-point"><span className="check">✓</span><span>Sampaikan kategori produk dan perkiraan kuantitas.</span></div>
            <div className="wholesale-point"><span className="check">✓</span><span>Diskusikan ketersediaan dan pola pemesanan langsung dengan admin.</span></div>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <h3>Minta info grosir / reseller</h3>
          <p className="form-intro">Isi data di bawah. WhatsApp akan dibuka dengan ringkasan permintaan yang bisa kamu tinjau sebelum dikirim.</p>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="wholesaleName">Nama *</label>
              <input id="wholesaleName" name="name" autoComplete="name" required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Nama kamu" />
            </div>
            <div className="field">
              <label htmlFor="wholesalePhone">Nomor WhatsApp *</label>
              <input id="wholesalePhone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="08xx atau +62xx" />
              <span className="hint">Nomor untuk memudahkan admin menghubungi kamu.</span>
            </div>
            <div className="field">
              <label htmlFor="businessType">Jenis usaha *</label>
              <select id="businessType" name="businessType" required value={form.businessType} onChange={(e) => update('businessType', e.target.value)}>
                <option value="">Pilih jenis usaha</option><option>Warung kebab</option><option>Reseller frozen food</option><option>Katering</option><option>Kantin / usaha kuliner</option><option>Lainnya</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="interestProduct">Produk yang diminati *</label>
              <select id="interestProduct" name="product" required value={form.product} onChange={(e) => update('product', e.target.value)}>
                <option value="">Pilih produk</option><option>Daging kebab frozen</option><option>Kulit kebab / tortilla</option><option>Kebab frozen</option><option>Frozen food</option><option>Paket kebutuhan usaha</option><option>Masih ingin konsultasi</option>
              </select>
            </div>
            <div className="field full">
              <label htmlFor="monthlyNeed">Perkiraan kebutuhan per bulan *</label>
              <input id="monthlyNeed" name="monthlyNeed" required value={form.monthlyNeed} onChange={(e) => update('monthlyNeed', e.target.value)} placeholder="Contoh: 20 bungkus atau 10 kg" />
              <span className="hint">Boleh tulis perkiraan atau “belum tahu, ingin konsultasi”.</span>
            </div>
            <div className="field full">
              <label htmlFor="wholesaleNotes">Catatan tambahan</label>
              <textarea id="wholesaleNotes" name="notes" value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Kota pengiriman, kebutuhan rutin, atau pertanyaan lain" />
            </div>
          </div>
          <p className="privacy-note">Data ini hanya dimasukkan ke pesan WhatsApp yang kamu tinjau dan kirim sendiri. Halaman ini tidak menyimpan data formulir ke server.</p>
          <button className="btn btn-primary" type="submit">Kirim Permintaan via WhatsApp <span aria-hidden="true">↗</span></button>
          {status && <div className="form-status show" role="status" aria-live="polite">{status}</div>}
        </form>
      </div>
    </section>
  );
};
