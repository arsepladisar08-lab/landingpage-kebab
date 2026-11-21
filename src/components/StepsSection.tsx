import React from 'react';
import { ORDERING_STEPS } from '../data/content';
import { AnimatedWords, AnimatedAccentWord } from './AnimatedText';
import { Reveal } from './Reveal';
import { getStaggerDelayMs } from '../utils/motion';

export const StepsSection: React.FC = () => (
  <section className="section steps" id="cara-pesan" aria-labelledby="steps-title">
    <div className="container">
      <div className="section-heading">
        <div>
          <div className="section-kicker">05 / Cara Pemesanan</div>
          <h2 id="steps-title">
            <AnimatedWords text="Dari pilih menu sampai" baseDelayMs={0} stepMs={55} />
            <br />
            <AnimatedAccentWord delayMs={200}>pesanan beres.</AnimatedAccentWord>
          </h2>
        </div>
      </div>
      <div className="step-grid">
        {ORDERING_STEPS.map((step, idx) => (
          <Reveal
            key={step.number}
            as="article"
            variant="fade-up"
            delayMs={getStaggerDelayMs(idx, 30, 80, 270)}
            className="step-card"
          >
            <div className="step-num">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
