import React from 'react';
import { getWhatsAppLink } from '../data/content';

export const WholesaleSection: React.FC = () => (
  <section className="wholesale" id="grosir" aria-labelledby="grosir-title">
    <div className="wholesale-pattern" aria-hidden="true">AF AF AF AF AF AF AF AF</div>
    <div className="wholesale-inner">
      <div className="section-kicker light">04 / Pasokan Usaha &amp; Reseller</div>
      <h2 id="grosir-title">
        Punya rencana<br />jualan kebab?
      </h2>
      <p>
        Untuk warung, gerobak kebab, reseller frozen, atau pelaku usaha kuliner di Sidoarjo dan Surabaya, konsultasikan jenis bahan, jumlah perkiraan, dan jadwal pasokan bersama kami.
      </p>
      <a
        href={getWhatsAppLink('Halo Kebab Al Firdaus, saya ingin konsultasi kebutuhan bahan baku kebab grosir.')}
        target="_blank"
        rel="noopener noreferrer"
        className="button button-dark"
      >
        Konsultasi bahan grosir
      </a>
    </div>

    <div className="wholesale-side">
      <div className="wholesale-spec-card">
        <span className="wholesale-spec-kicker">Pilihan Pasokan Rutin</span>
        <ul>
          <li>Kulit tortilla berbagai diameter</li>
          <li>Daging kebab olahan siap panggang</li>
          <li>Kebab frozen isi 5, 6, dan 10 untuk reseller</li>
          <li>Saus sambal, mayones, dan kemasan kebab</li>
        </ul>
      </div>
    </div>
  </section>
);
