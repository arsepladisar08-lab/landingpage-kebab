import React from 'react';
import { BUSINESS_INFO, MENU_VARIANTS, formatRupiah, getWhatsAppLink } from '../data/content';
import { resolveProductAsset } from '../data/productAssets';
import { getVerifiedPrice } from '../utils/cart';
import { MenuVariant } from '../types';
import { ProductImage } from './ProductImage';

interface HeroProps {
  onPreviewMenu?: (item: MenuVariant) => void;
}

export const Hero: React.FC<HeroProps> = ({ onPreviewMenu }) => {
  const featuredLeft = MENU_VARIANTS.find((item) => item.id === 'keju');
  const featuredRight = MENU_VARIANTS.find((item) => item.id === 'komplit');

  const handleCardSelect = (item: MenuVariant | undefined) => {
    if (item && onPreviewMenu) {
      onPreviewMenu(item);
      return;
    }
    document.getElementById('menu-varian')?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderCardSubline = (item: MenuVariant) => {
    const verifiedPrice = getVerifiedPrice(item);
    if (verifiedPrice !== undefined) {
      return item.priceDisplay || formatRupiah(verifiedPrice);
    }
    return item.tag;
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-copy">
        <p className="eyebrow light">
          <span aria-hidden="true" /> Medaeng Kulon, Sidoarjo · Kebab Hangat &amp; Frozen
        </p>

        <h1 id="hero-title">
          Gigit hangatnya.
          <br />
          <em>Nikmati</em> rasanya.
        </h1>

        <p className="hero-intro">
          Kebab panggang siap santap dengan daging rempah dan saus khas <strong>Al Firdaus</strong>, tersedia juga kemasan frozen (isi 5, 6, 10), roti maryam hangat, pasokan bahan grosir, dan paket acara di Sidoarjo.
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
          <a className="button button-outline-hero" href="#menu-varian">
            Lihat pilihan menu
          </a>
        </div>

        {BUSINESS_INFO.ratingVerified && (
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
        )}
      </div>

      <div className="hero-stage" aria-label="Sorotan produk Kebab Al Firdaus">
        <div className="hero-stage-backdrop" aria-hidden="true" />

        {featuredLeft && (
          <button
            type="button"
            onClick={() => handleCardSelect(featuredLeft)}
            className="hero-stack-card hero-card-left"
            aria-label={`Lihat detail ${featuredLeft.name}`}
          >
            <div className="hero-stack-media">
              <ProductImage
                asset={
                  featuredLeft.image ||
                  resolveProductAsset(featuredLeft.id, featuredLeft.imageDummyAlt, featuredLeft.type)
                }
                showPlaceholderTag={false}
                sizes="(max-width: 680px) 150px, 220px"
              />
            </div>
            <div className="hero-stack-meta">
              <span className="hero-stack-name">{featuredLeft.name}</span>
              <span className="hero-stack-price tabular-nums">{renderCardSubline(featuredLeft)}</span>
            </div>
          </button>
        )}

        <div className="hero-stack-card hero-card-main">
          <div className="hero-main-media">
            <img
              src="/assets/aistudio/visual_identitas_Kebab_Al_Firdaus_a36c5ca9.jpg"
              alt="Kemasan resmi Kebab Al Firdaus Maknyus Banget, tersedia isi 5, 6, dan 10"
              width={644}
              height={643}
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              className="hero-packaging-img"
              {...({ fetchpriority: 'high' } as Record<string, string>)}
            />
          </div>
          <div className="hero-main-meta">
            <span className="hero-main-brand">Kebab Al Firdaus · Halal</span>
            <span className="hero-main-detail">Hangat &amp; Frozen · Isi 5 · 6 · 10</span>
          </div>
        </div>

        {featuredRight && (
          <button
            type="button"
            onClick={() => handleCardSelect(featuredRight)}
            className="hero-stack-card hero-card-right"
            aria-label={`Lihat detail ${featuredRight.name}`}
          >
            <div className="hero-stack-media">
              <ProductImage
                asset={
                  featuredRight.image ||
                  resolveProductAsset(featuredRight.id, featuredRight.imageDummyAlt, featuredRight.type)
                }
                showPlaceholderTag={false}
                sizes="(max-width: 680px) 150px, 220px"
              />
            </div>
            <div className="hero-stack-meta">
              <span className="hero-stack-name">{featuredRight.name}</span>
              <span className="hero-stack-price tabular-nums">{renderCardSubline(featuredRight)}</span>
            </div>
          </button>
        )}
      </div>

      <div className="hero-bottom">
        <span>KEBAB HANGAT · FROZEN (ISI 5, 6, 10) · ROTI MARYAM · BAHAN GROSIR · PESANAN ACARA</span>
        <span>BUKA SETIAP HARI · MEDAENG KULON</span>
      </div>
    </section>
  );
};
