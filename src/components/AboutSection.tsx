import React from 'react';
import { getWhatsAppLink } from '../data/content';

export const AboutSection: React.FC = () => {
  const aboutUrl = getWhatsAppLink('Halo, saya ingin mengenal menu Kebab Al Firdaus.');

  return (
    <section className="intro section-pad" id="cerita">
      <div className="section-kicker">01 / CERITA KAMI</div>
      <div className="intro-content">
        <h2>Lebih dari sekadar<br /><span>tempat beli kebab.</span></h2>
        <div className="intro-text">
          <p>Kebab Al Firdaus hadir di kawasan Medaeng, Sidoarjo, untuk menemani kebutuhan kuliner sehari-hari. Kebab siap santap menjadi pilihan utama, dengan varian rasa untuk selera yang berbeda.</p>
          <p>Roti maryam, bahan kebab grosir, dan pesanan acara melengkapi layanan bagi pelanggan rumahan maupun mitra usaha.</p>
          <a className="text-link dark-link" href={aboutUrl} target="_blank" rel="noopener noreferrer">Kenali pilihan kami <span>↗</span></a>
        </div>
      </div>
      <div className="intro-marquee" aria-hidden="true">
        <span>FRESH IDEAS · GOOD FOOD · LOCAL HEART · </span>
        <span>FRESH IDEAS · GOOD FOOD · LOCAL HEART · </span>
      </div>
    </section>
  );
};
