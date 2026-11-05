import React from 'react';
import { BUSINESS_INFO, getWhatsAppLink } from '../data/content';

export const ContactSection: React.FC = () => {
  const generalUrl = getWhatsAppLink('Halo, Toko Kebab Al Firdaus. Saya ingin bertanya tentang produk, harga, ongkir, atau kebutuhan grosir.');
  return (
    <section className="section contact" id="kontak" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-card">
          <div>
            <div className="eyebrow">Kontak &amp; lokasi</div>
            <h2 id="contact-title">Mau tanya atau langsung pesan?</h2>
            <p>Hubungi admin untuk konfirmasi produk, harga, ongkir, atau kebutuhan grosir.</p>
            <div className="contact-info">
              <div className="contact-line"><span className="contact-symbol" aria-hidden="true">📍</span><span><strong>{BUSINESS_INFO.area}</strong><br /><span className="contact-subtext">Alamat jalan lengkap dan jam operasional perlu dikonfirmasi.</span></span></div>
              <div className="contact-line"><span className="contact-symbol" aria-hidden="true">☎</span><span><strong>{BUSINESS_INFO.phoneDisplay}</strong><br /><span className="contact-subtext">Nomor WhatsApp yang tercantum di proyek; konfirmasi kembali sebelum publikasi.</span></span></div>
              <div className="contact-line"><span className="contact-symbol" aria-hidden="true">📷</span><span>Instagram toko: <a href={BUSINESS_INFO.instagramStoreUrl} target="_blank" rel="noopener noreferrer"><strong>{BUSINESS_INFO.instagramStoreHandle}</strong></a></span></div>
              <div className="contact-line"><span className="contact-symbol" aria-hidden="true">🌯</span><span>Instagram produk: <a href={BUSINESS_INFO.instagramProductUrl} target="_blank" rel="noopener noreferrer"><strong>{BUSINESS_INFO.instagramProductHandle}</strong></a></span></div>
            </div>
          </div>
          <div className="contact-actions">
            <a className="btn btn-primary" href={generalUrl} target="_blank" rel="noopener noreferrer">Chat WhatsApp <span aria-hidden="true">↗</span></a>
            <a className="btn btn-light" href={BUSINESS_INFO.mapsUrl} target="_blank" rel="noopener noreferrer">Buka area Taman di Google Maps <span aria-hidden="true">↗</span></a>
            <p className="contact-subnote">Peta membuka area Taman, Sidoarjo, bukan pin toko yang presisi.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
