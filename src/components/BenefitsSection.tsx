import React from 'react';
import { BENEFITS } from '../data/content';

export const BenefitsSection: React.FC = () => (
  <section className="section" id="keunggulan" aria-labelledby="benefit-title">
    <div className="container">
      <div className="section-head">
        <div className="eyebrow">Kenapa pesan di sini?</div>
        <h2 id="benefit-title">Info jelas, pesan lebih praktis.</h2>
        <p>Hal yang perlu kamu ketahui sebelum menghubungi admin.</p>
      </div>
      <div className="benefit-grid">
        {BENEFITS.map((benefit) => (
          <article className="benefit-card" key={benefit.title}>
            <div className="benefit-icon" aria-hidden="true">{benefit.icon}</div>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
