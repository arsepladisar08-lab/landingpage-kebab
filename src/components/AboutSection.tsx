import React from 'react';
import { getWhatsAppLink } from '../data/content';

export const AboutSection: React.FC = () => {
  const consultUrl = getWhatsAppLink(
    'Halo, Toko Kebab Al Firdaus. Saya ingin konsultasi kebutuhan bahan kebab dan frozen food.'
  );

  return (
    <section className="section" id="tentang">
      <div className="container intro-grid">
        <div className="section-head">
          <div className="eyebrow">Kenalan dengan kami</div>
          <h2>Stok kebab untuk rumah, warung, sampai katering.</h2>
          <p>Toko Kebab Al Firdaus menyediakan bahan kebab dan frozen food homemade dari Taman, Sidoarjo.</p>
        </div>
        <div className="intro-copy">
          <p>Belanja untuk sajian keluarga, kebutuhan acara, atau persediaan usaha kuliner? Tanyakan produk yang tersedia kepada admin. Pembelian satuan dan permintaan grosir sama-sama bisa dikonsultasikan melalui WhatsApp.</p>
          <p>Untuk memastikan pilihan produk, jumlah, harga, ongkos kirim, dan cara pengambilan sesuai kebutuhan, admin akan membantu mengonfirmasi detail sebelum pesanan disepakati.</p>
          <div className="audience-chips" aria-label="Cocok untuk">
            <span className="chip">Konsumen rumahan</span>
            <span className="chip">Warung kebab</span>
            <span className="chip">Reseller frozen food</span>
            <span className="chip">Katering &amp; kantin</span>
            <span className="chip">Acara keluarga</span>
          </div>
          <aside className="intro-aside" style={{ marginTop: 25 }}>
            <strong>Belum yakin mulai dari mana?</strong>
            <p>Ceritakan kebutuhan dan perkiraan jumlahnya. Admin dapat membantu mengarahkan pertanyaan produk dan harga yang sesuai.</p>
            <a className="btn btn-red" href={consultUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: 16 }}>
              Konsultasi produk <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
};
