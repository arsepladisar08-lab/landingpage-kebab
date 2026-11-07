import React from 'react';
import { getWhatsAppLink } from '../data/content';

export const FinalCta: React.FC = () => (
  <section className="final-cta">
    <div className="final-asterisk">✳</div>
    <div className="section-kicker light">LAGI INGIN KEBAB?</div>
    <h2>Yuk, mulai<br /><em>pesan hari ini.</em></h2>
    <p>Pilih varian kebab favoritmu dan kirim rangkuman pesanan melalui WhatsApp.</p>
    <a
      href={getWhatsAppLink('Halo Kebab Al Firdaus, saya mau pesan kebab sekarang.')}
      target="_blank"
      rel="noopener noreferrer"
      className="button button-lime"
    >
      Pesan Kebab Sekarang <span>↗</span>
    </a>
  </section>
);
