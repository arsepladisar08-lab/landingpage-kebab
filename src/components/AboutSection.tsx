import React from 'react';
import { getWhatsAppLink } from '../data/content';

export const AboutSection: React.FC = () => {
  const aboutUrl = getWhatsAppLink('Halo, saya ingin bertanya tentang menu dan kemasan frozen Kebab Al Firdaus.');

  return (
    <section className="intro section-pad" id="cerita" aria-labelledby="cerita-title">
      <div className="section-kicker">01 / Cerita &amp; Penyajian</div>
      <div className="intro-content">
        <div>
          <h2 id="cerita-title">
            Kebab hangat dan stok frozen<br />
            <span>dari Medaeng.</span>
          </h2>

          <div className="mt-8 bg-[#a91d22] text-[#fffdf4] p-5 sm:p-6 rounded-2xl border-2 border-[#2b1810] shadow-[6px_6px_0_#2b1810] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f5d328]/35 pb-3">
              <h3 className="text-sm font-black tracking-wide uppercase text-[#f5d328] m-0">
                Saran Penyajian Frozen (-18°C)
              </h3>
              <span className="text-xs font-black px-3 py-1 rounded-lg bg-[#f5d328] text-[#2b1810] border border-[#2b1810]">
                Pilihan Isi: 5 · 6 · 10
              </span>
            </div>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#fffdf4] font-medium leading-relaxed list-none p-0 m-0">
              <li className="flex gap-2.5 items-start bg-[#7d1216] p-3 rounded-xl border border-[#f5d328]/30">
                <span className="font-black text-[#f5d328] shrink-0">1.</span>
                <span>Keluarkan kebab dari freezer, tunggu hingga tidak beku.</span>
              </li>
              <li className="flex gap-2.5 items-start bg-[#7d1216] p-3 rounded-xl border border-[#f5d328]/30">
                <span className="font-black text-[#f5d328] shrink-0">2.</span>
                <span>Panaskan teflon dengan sedikit margarin di api kecil.</span>
              </li>
              <li className="flex gap-2.5 items-start bg-[#7d1216] p-3 rounded-xl border border-[#f5d328]/30">
                <span className="font-black text-[#f5d328] shrink-0">3.</span>
                <span>Panggang kebab bolak-balik hingga kulit kecokelatan.</span>
              </li>
              <li className="flex gap-2.5 items-start bg-[#7d1216] p-3 rounded-xl border border-[#f5d328]/30">
                <span className="font-black text-[#f5d328] shrink-0">4.</span>
                <span>Angkat dan sajikan hangat bersama saus atau topping pilihan.</span>
              </li>
            </ol>
          </div>
        </div>

        <div className="intro-text">
          <p>
            <strong>Kebab Al Firdaus</strong> melayani pelanggan dari kawasan Medaeng Kulon, Sidoarjo, setiap hari. Kamu bisa membeli kebab panggang siap santap atau membawa pulang kemasan <em>Frozen Product</em> isi 5, 6, dan 10 untuk stok di freezer rumah.
          </p>
          <p>
            Selain kebab, kami juga menyiapkan roti maryam hangat, pasokan bahan baku kebab untuk pedagang dan reseller, serta pesanan kotak untuk acara keluarga atau kantor.
          </p>
          <a className="text-link dark-link" href={aboutUrl} target="_blank" rel="noopener noreferrer">
            Tanya menu dan harga via WhatsApp
          </a>
        </div>
      </div>
      <div className="intro-marquee" aria-hidden="true">
        <span>KEBAB AL FIRDAUS · MAKNYUS BANGET · MEDAENG · </span>
        <span>KEBAB AL FIRDAUS · MAKNYUS BANGET · MEDAENG · </span>
      </div>
    </section>
  );
};
