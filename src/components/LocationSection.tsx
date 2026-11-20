import React, { useState } from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

export const LocationSection: React.FC = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <section className="location section-pad" id="lokasi" aria-labelledby="lokasi-title">
      <div className="location-copy">
        <div className="section-kicker">06 / Lokasi Outlet</div>
        <h2 id="lokasi-title">
          Mampir ke<br />
          <em>Al Firdaus.</em>
        </h2>
        <p className="location-desc">
          Outlet kami berada di kawasan Medaeng Kulon, Kedungturi, Kecamatan Taman, Kabupaten Sidoarjo.
        </p>

        <div className="address">
          <span className="address-icon" aria-hidden="true">
            <MapPin className="w-4 h-4" />
          </span>
          <div>
            <small>Alamat</small>
            <strong>{BUSINESS_INFO.address}</strong>
          </div>
        </div>

        <div className="address">
          <span className="address-icon" aria-hidden="true">
            <Clock className="w-4 h-4" />
          </span>
          <div>
            <small>Jam Buka</small>
            <strong>
              {BUSINESS_INFO.hoursWeekday}
              <br />
              {BUSINESS_INFO.hoursSunday}
            </strong>
          </div>
        </div>

        <div className="address">
          <span className="address-icon" aria-hidden="true">
            <Phone className="w-4 h-4" />
          </span>
          <div>
            <small>Telepon / WhatsApp</small>
            <strong>{BUSINESS_INFO.phoneDisplay}</strong>
          </div>
        </div>

        <div className="location-actions">
          <a
            className="button button-dark"
            href={BUSINESS_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buka Google Maps <span aria-hidden="true">↗</span>
          </a>
        </div>

        <p className="data-note">
          Jam buka dapat berubah pada hari libur tertentu. Hubungi kami lewat WhatsApp jika ingin memastikan stok sebelum berkunjung.
        </p>
      </div>

      <div className="map-panel">
        {!isMapLoaded && (
          <div className="map-loading-state" role="status" aria-live="polite">
            <p className="text-sm font-extrabold text-[#2b1810] mb-1">
              Memuat peta lokasi Medaeng Kulon...
            </p>
            <p className="text-xs text-[#543729] m-0">
              Jika peta belum tampil, gunakan tombol Buka Google Maps di samping.
            </p>
          </div>
        )}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.2404!2d112.698709!3d-7.36497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e34363d77ca1%3A0x4138462fb3aba69c!2sKEBAB%20MURAH%20DI%20SIDOARJO%20ALFIRDAUS!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
          title="Lokasi Kebab Al Firdaus di Google Maps"
          width="600"
          height="480"
          className="map-iframe"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsMapLoaded(true)}
        />
        <a
          className="map-open"
          href={BUSINESS_INFO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Buka lokasi Kebab Al Firdaus di aplikasi Google Maps"
          title="Buka rute langsung di Google Maps"
        >
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
};
