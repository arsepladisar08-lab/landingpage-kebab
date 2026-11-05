import React from 'react';
import { BUSINESS_INFO, getWhatsAppLink } from '../data/content';

export const LocationSection: React.FC = () => {
  const whatsappUrl = getWhatsAppLink('Halo Kebab Al Firdaus. Saya ingin bertanya sebelum berkunjung.');

  return (
    <section className="location section-pad" id="lokasi">
      <div className="location-copy">
        <div className="section-kicker">TEMUKAN KAMI</div>
        <h2>Mampir ke<br /><em>Al Firdaus.</em></h2>
        <p className="location-desc">Kami berada di kawasan Medaeng Kulon, Kedungturi, Kecamatan Taman, Kabupaten Sidoarjo.</p>
        <div className="address">
          <span className="address-icon">↗</span>
          <div><small>ALAMAT</small><strong>{BUSINESS_INFO.address}</strong></div>
        </div>
        <div className="address">
          <span className="address-icon">◷</span>
          <div>
            <small>JAM OPERASIONAL (TERCANTUM DI DIREKTORI)</small>
            <strong>{BUSINESS_INFO.hoursWeekday}<br />{BUSINESS_INFO.hoursSunday}</strong>
          </div>
        </div>
        <div className="address">
          <span className="address-icon">☎</span>
          <div><small>TELEPON / WHATSAPP</small><strong>{BUSINESS_INFO.phoneDisplay}</strong></div>
        </div>
        <div className="location-actions">
          <a className="button button-dark" href={BUSINESS_INFO.mapsUrl} target="_blank" rel="noopener noreferrer">Buka Google Maps <span>↗</span></a>
          <a className="text-link dark-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Chat WhatsApp <span>↗</span></a>
        </div>
        <p className="data-note">Alamat dan jam di atas berasal dari referensi listing publik dan perlu dikonfirmasi pemilik sebelum dipublikasikan sebagai informasi final.</p>
      </div>
      <div className="map-panel">
        <div className="map-grid" aria-hidden="true" />
        <div className="map-route"><span className="route-dot" /><span className="route-line" /><span className="route-pin">AF</span></div>
        <div className="map-label">
          <small>YOU CAN FIND US HERE</small>
          <strong>KEBAB {BUSINESS_INFO.name}</strong>
          <span>Medaeng Kulon · Sidoarjo</span>
        </div>
        <a className="map-open" href={BUSINESS_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Buka lokasi Kebab Al Firdaus di Google Maps">↗</a>
      </div>
    </section>
  );
};
