import React from 'react';
import { ORDERING_STEPS } from '../data/content';
import { getWhatsAppLink } from '../data/content';

export const StepsSection: React.FC = () => (
  <section className="section steps" id="cara-pesan" aria-labelledby="steps-title">
    <div className="container">
      <div className="section-head">
        <div className="eyebrow">Cara pemesanan</div>
        <h2 id="steps-title">Dari pilih produk sampai pesanan beres.</h2>
        <p>Harga, ketersediaan, ongkir, dan cara bayar dikonfirmasi admin sebelum pesanan disepakati.</p>
      </div>
      <div className="step-grid">
        {ORDERING_STEPS.map((step) => (
          <article className="step-card" key={step.number}>
            <div className="step-num">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
      <div className="steps-action">
        <a className="btn btn-primary" href={getWhatsAppLink('Halo, saya ingin mulai pesan produk Kebab Al Firdaus.')} target="_blank" rel="noopener noreferrer">
          Mulai Pesan via WhatsApp <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </section>
);
