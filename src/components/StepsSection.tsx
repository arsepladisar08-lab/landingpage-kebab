import React from 'react';
import { ORDERING_STEPS } from '../data/content';

export const StepsSection: React.FC = () => {
  return (
    <section className="steps section-pad">
      <div className="section-kicker">04 / CARA MEMESAN</div>
      <div className="steps-head">
        <h2>
          Gampang. Tinggal<br />
          <em>mulai ngobrol.</em>
        </h2>
        <p>
          Hubungi kami untuk memastikan detail produk dan kebutuhanmu sebelum datang atau melakukan
          pemesanan.
        </p>
      </div>

      <div className="steps-row">
        {ORDERING_STEPS.map((step) => (
          <div key={step.number} className="step">
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
