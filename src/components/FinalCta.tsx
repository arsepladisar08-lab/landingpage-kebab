import React from 'react';
import { getWhatsAppLink } from '../data/content';

export const FinalCta: React.FC = () => {
  const whatsappFinalUrl = getWhatsAppLink('Halo Kebab Al Firdaus, saya ingin bertanya.');

  return (
    <section className="final-cta">
      <div className="final-asterisk">✳</div>
      <div className="section-kicker light">ADA YANG BISA KAMI BANTU?</div>
      <h2>
        Yuk, mulai<br />
        <em>pesan hari ini.</em>
      </h2>
      <p>Tanyakan menu, kebutuhan grosir, atau rencana pesanan acaramu kepada tim Al Firdaus.</p>
      <a
        className="button button-lime"
        href={whatsappFinalUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Hubungi Al Firdaus <span>↗</span>
      </a>
    </section>
  );
};
