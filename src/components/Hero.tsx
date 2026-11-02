import React from 'react';
import { BUSINESS_INFO, getWhatsAppLink } from '../data/content';

export const Hero: React.FC = () => {
  const whatsappHeroUrl = getWhatsAppLink('Halo Kebab Al Firdaus, saya ingin pesan kebab.');

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-copy">
        <p className="eyebrow light">
          <span /> DARI MEDAENG, UNTUK KAMU
        </p>
        <h1 id="hero-title">
          Gigit hangatnya.<br />
          <em>Nikmati</em> rasanya.
        </h1>
        <p className="hero-intro">
          Temukan kebab dan aneka kudapan untuk teman santai. Butuh bahan kebab untuk jualan atau
          pesanan acara? Al Firdaus siap jadi tempatmu mulai bertanya.
        </p>

        <div className="hero-actions">
          <a
            className="button button-lime"
            href={whatsappHeroUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pesan via WhatsApp <span>↗</span>
          </a>
          <a className="text-link light-link" href="#pilihan">
            Jelajahi pilihan <span>↓</span>
          </a>
        </div>

        <div className="hero-proof">
          <div
            className="proof-stars"
            aria-label={`Rating direktori ${BUSINESS_INFO.rating.toString().replace('.', ',')} dari 5`}
          >
            ★★★★★
          </div>
          <div>
            <strong>{BUSINESS_INFO.rating.toString().replace('.', ',')}/5 di Google</strong>
            <small>{BUSINESS_INFO.reviewCount} ulasan publik · cek ulasan terbaru</small>
          </div>
        </div>
      </div>

      <div className="hero-art" aria-label="Ilustrasi komposisi kebab dengan sayuran segar" role="img">
        <div className="art-sticker sticker-one">DIBUAT DENGAN SEPENUH HATI</div>
        <div className="art-ring" />

        <div className="kebab-wrap">
          <div className="kebab-shadow" />
          <div className="kebab">
            <div className="tortilla" />
            <div className="filling filling-a" />
            <div className="filling filling-b" />
            <div className="filling filling-c" />
            <div className="sauce" />
            <div className="grill g1" />
            <div className="grill g2" />
            <div className="grill g3" />
          </div>
        </div>

        <div className="art-leaf leaf-a">✳</div>
        <div className="art-leaf leaf-b">✦</div>
        <div className="art-label">
          <span>AL FIRDAUS</span>
          <b>
            GOOD FOOD<br />
            GOOD MOOD.
          </b>
        </div>
        <div className="art-sticker sticker-two">
          MADE FOR<br />
          YOUR CRAVINGS
        </div>
      </div>

      <div className="hero-bottom">
        <span>01 — 04</span>
        <span>KEBAB · KUDAPAN · GROSIR · PESANAN ACARA</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </section>
  );
};
