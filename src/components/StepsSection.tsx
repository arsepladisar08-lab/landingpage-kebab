import React from 'react';
import { ORDERING_STEPS } from '../data/content';

export const StepsSection: React.FC = () => (
  <section className="section steps" id="cara-pesan" aria-labelledby="steps-title">
    <div className="container">
      <div className="section-heading">
        <div>
          <div className="section-kicker">05 / Cara Pemesanan</div>
          <h2 id="steps-title">
            Dari pilih menu sampai<br />
            <em>pesanan beres.</em>
          </h2>
        </div>
        <p>Admin kami mengonfirmasi harga terbaru, ketersediaan stok, ongkir, dan cara bayar sebelum pesanan diproses.</p>
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
    </div>
  </section>
);
