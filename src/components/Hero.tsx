import React from 'react';
import { BUSINESS_INFO } from '../data/content';

interface HeroProps { onOpenOrderModal: () => void; }

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal }) => (
  <section className="hero" aria-labelledby="hero-title">
    <div className="hero-grain" aria-hidden="true" />
    <div className="hero-copy">
      <p className="eyebrow light"><span /> DARI MEDAENG, UNTUK KAMU</p>
      <h1 id="hero-title">Gigit hangatnya.<br /><em>Nikmati</em> rasanya.</h1>
      <p className="hero-intro">
        Kebab siap santap dengan pilihan rasa untuk menemani waktu santai dan makan bersama.
        Ada roti maryam, bahan kebab grosir, dan layanan pesanan acara sebagai pilihan tambahan.
      </p>
      <div className="hero-actions">
        <button type="button" className="button button-lime" onClick={onOpenOrderModal}>
          Pesan via WhatsApp <span>↗</span>
        </button>
        <a className="text-link light-link" href="#menu-varian">Pilih varian rasa <span>↓</span></a>
      </div>
      <div className="hero-proof">
        <div className="proof-stars" aria-label={'Rating direktori ' + BUSINESS_INFO.rating.toString().replace('.', ',') + ' dari 5'}>★★★★★</div>
        <div>
          <strong>{BUSINESS_INFO.rating.toString().replace('.', ',')}/5 di Google</strong>
          <small>{BUSINESS_INFO.reviewCount} ulasan publik · Medaeng Kulon, Sidoarjo</small>
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
          <div className="grill g1" /><div className="grill g2" /><div className="grill g3" />
        </div>
      </div>
      <div className="art-leaf leaf-a">✳</div>
      <div className="art-leaf leaf-b">✦</div>
      <div className="art-label"><span>AL FIRDAUS</span><b>GOOD FOOD<br />GOOD MOOD.</b></div>
      <div className="art-sticker sticker-two">MADE FOR<br />YOUR CRAVINGS</div>
    </div>
    <div className="hero-bottom">
      <span>01 — 04</span>
      <span>KEBAB · ROTI MARYAM · GROSIR · PESANAN ACARA</span>
      <span>SCROLL TO EXPLORE ↓</span>
    </div>
  </section>
);
