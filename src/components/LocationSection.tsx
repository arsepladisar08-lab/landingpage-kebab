import React from 'react';
import { BUSINESS_INFO } from '../data/content';

export const LocationSection: React.FC = () => {
  return (
    <section className="location section-pad" id="lokasi">
      <div className="location-copy">
        <div className="section-kicker">TEMUKAN KAMI</div>
        <h2>Mampir ke<br /><em>Al Firdaus.</em></h2>
        <p className="location-desc">Kami berada di kawasan Medaeng Kulon, Kedungturi, Kecamatan Taman, Kabupaten Sidoarjo.</p>
        <div className="address">
          <span className="address-icon">◷</span>
          <div>
            <small>INFO SEBELUM BERKUNJUNG</small>
            <strong>Hubungi admin untuk memastikan alamat lengkap, pin lokasi, dan jam operasional terbaru.</strong>
          </div>
        </div>
        <div className="location-actions">
          <a className="button button-dark" href={BUSINESS_INFO.mapsUrl} target="_blank" rel="noopener noreferrer">Buka referensi Maps <span>↗</span></a>
        </div>
        <p className="data-note">Peta dan informasi lokasi ini merupakan referensi dari listing publik. Konfirmasikan alamat serta jam operasional kepada admin sebelum berkunjung.</p>
      </div>
      <div className="map-panel" style={{ padding: 0, overflow: 'hidden', borderRadius: 16, border: '2px solid var(--ink)', minHeight: 480, position: 'relative', boxShadow: '4px 6px 0 var(--ink)' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.2404!2d112.698709!3d-7.36497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e34363d77ca1%3A0x4138462fb3aba69c!2sKEBAB%20MURAH%20DI%20SIDOARJO%20ALFIRDAUS!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
          title="Lokasi Kebab Al Firdaus di Google Maps"
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: 480, width: '100%', height: '100%', display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a
          className="map-open"
          href={BUSINESS_INFO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Buka lokasi Kebab Al Firdaus di Google Maps"
          title="Buka rute langsung di aplikasi Google Maps"
        >
          ↗
        </a>
      </div>
    </section>
  );
};
