import React from 'react';
import { getWhatsAppLink } from '../data/content';

export const AboutSection: React.FC = () => {
  const whatsappAboutUrl = getWhatsAppLink('Halo, saya ingin mengenal produk Kebab Al Firdaus.');

  return (
    <section className="intro section-pad" id="cerita">
      <div className="section-kicker">01 / CERITA KAMI</div>
      <div className="intro-content">
        <h2>
          Lebih dari sekadar<br />
          <span>tempat beli kebab.</span>
        </h2>
        <div className="intro-text">
          <p>
            Kebab Al Firdaus hadir di kawasan Medaeng, Sidoarjo, untuk menemani kebutuhan kuliner
            sehari-hari—mulai dari kudapan siap santap hingga kebutuhan bahan kebab.
          </p>
          <p>
            Untuk kamu yang ingin menikmati, menyiapkan acara, atau mulai berjualan, kami terbuka untuk
            diajak ngobrol soal kebutuhanmu.
          </p>
          <a
            className="text-link dark-link"
            href={whatsappAboutUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Kenali pilihan kami <span>↗</span>
          </a>
        </div>
      </div>

      <div className="intro-marquee" aria-hidden="true">
        <span>FRESH IDEAS · GOOD FOOD · LOCAL HEART · </span>
        <span>FRESH IDEAS · GOOD FOOD · LOCAL HEART · </span>
      </div>
    </section>
  );
};
