import React from 'react';
import { FAQ_ITEMS } from '../data/content';

export const FaqSection: React.FC = () => {
  return (
    <section className="faq section-pad">
      <div>
        <div className="section-kicker">06 / FAQ</div>
        <h2>
          Ada yang ingin<br />
          <em>ditanyakan?</em>
        </h2>
      </div>

      <div className="faq-list">
        {FAQ_ITEMS.map((item, index) => (
          <details key={index}>
            <summary>
              {item.question}
              <span>+</span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
};
