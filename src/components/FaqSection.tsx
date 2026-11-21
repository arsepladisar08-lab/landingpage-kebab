import React from 'react';
import { FAQ_ITEMS } from '../data/content';

export const FaqSection: React.FC = () => (
  <section className="section faq" id="faq" aria-labelledby="faq-title">
    <div className="container">
      <div className="section-head">
        <div className="section-kicker">07 / Pertanyaan Umum</div>
        <h2 id="faq-title">Sebelum pesan, cek dulu.</h2>
      </div>
      <div className="faq-list">
        {FAQ_ITEMS.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);
