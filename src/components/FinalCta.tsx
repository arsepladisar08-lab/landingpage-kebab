import React from 'react';
import { getWhatsAppLink } from '../data/content';

export const FinalCta: React.FC = () => (
  <section className="final-cta">
    <div className="final-asterisk">✳</div>
    <div className="eyebrow">Ada yang bisa kami bantu?</div>
    <h2>Mau tanya atau<br /><em>langsung pesan?</em></h2>
    <p>Tanyakan produk, harga, ongkir, atau kebutuhan grosir kepada admin Al Firdaus.</p>
    <a className="btn btn-primary" href={getWhatsAppLink('Halo, Toko Kebab Al Firdaus. Saya ingin bertanya tentang produk dan harga terbaru.')} target="_blank" rel="noopener noreferrer">
      Hubungi Al Firdaus <span aria-hidden="true">↗</span>
    </a>
  </section>
);
