import React from 'react';
import { BUSINESS_INFO, getWhatsAppLink } from '../data/content';

export const Hero: React.FC = () => {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-copy">
        <p className="eyebrow light">
          <span aria-hidden="true" /> Medaeng Kulon, Sidoarjo · Maknyus Banget
        </p>
        <h1 id="hero-title">
          Gigit hangatnya.<br />
          <em>Nikmati</em> rasanya.
        </h1>
        <p className="hero-intro">
          Kebab panggang siap santap dan kemasan frozen praktis (isi 5, 6, 10) yang <strong>Maknyus Banget</strong>. Melayani pembelian harian, stok bahan kebab untuk usaha, dan pesanan acara di Sidoarjo.
        </p>

        <div className="hero-actions">
          <a
            className="button button-lime"
            href={getWhatsAppLink('Halo Kebab Al Firdaus, saya mau pesan kebab.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pesan via WhatsApp
          </a>
          <a className="text-link light-link" href="#menu-varian">
            Lihat pilihan menu
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
            <small>{BUSINESS_INFO.reviewCount} ulasan publik · Medaeng Kulon, Sidoarjo</small>
          </div>
        </div>
      </div>

      <div className="hero-art">
        <div className="art-ring" aria-hidden="true" />

        <div className="hero-packaging-frame">
          <img
            src="/assets/aistudio/visual_identitas_Kebab_Al_Firdaus_a36c5ca9.jpg"
            alt="Kemasan resmi Kebab Al Firdaus Maknyus Banget, tersedia isi 5, 6, dan 10"
            width={644}
            height={643}
            decoding="async"
            className="hero-packaging-img"
            {...({ fetchpriority: 'high' } as Record<string, string>)}
          />
        </div>

        <div className="art-sticker sticker-one">PRAY BEFORE EAT · HALAL</div>
        <div className="art-sticker sticker-two">
          FROZEN &amp; HANGAT<br />
          ISI : 5 · 6 · 10
        </div>
        <div className="art-label">
          <span>KEBAB AL FIRDAUS</span>
          <b>
            MAKNYUS<br />
            BANGET!
          </b>
        </div>
      </div>

      <div className="hero-bottom">
        <span>KEBAB · ROTI MARYAM · FROZEN (ISI 5, 6, 10) · BAHAN GROSIR · PESANAN ACARA</span>
        <span>BUKA SETIAP HARI · MEDAENG KULON</span>
      </div>
    </section>
  );
};
