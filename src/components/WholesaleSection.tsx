import React from 'react';
import { getWhatsAppLink } from '../data/content';

export const WholesaleSection: React.FC = () => (
  <section className="wholesale" id="grosir">
    <div className="wholesale-pattern" aria-hidden="true">AF AF AF AF AF AF AF AF</div>
    <div className="wholesale-inner">
      <div className="section-kicker light">LAYANAN TAMBAHAN · UNTUK USAHA</div>
      <h2>Punya rencana<br />jualan kebab?</h2>
      <p>Untuk warung, reseller, atau pelaku usaha kuliner, konsultasikan kebutuhan bahan kebab, jumlah perkiraan, dan pola pasokan yang kamu perlukan.</p>
      <a
        href={getWhatsAppLink('Halo Kebab Al Firdaus, saya ingin konsultasi kebutuhan bahan baku kebab grosir.')}
        target="_blank"
        rel="noopener noreferrer"
        className="button button-dark"
      >
        Konsultasi bahan grosir <span>↗</span>
      </a>
    </div>
    <div className="wholesale-side">
      <div className="big-asterisk">✳</div>
    </div>
  </section>
);
