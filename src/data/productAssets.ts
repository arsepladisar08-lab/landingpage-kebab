import { ProductImageAsset } from '../types';

export const PRODUCT_ASSETS: Record<string, ProductImageAsset> = {
  original: {
    src: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&h=600&q=80',
    webpSrc: null,
    expectedFile: '/assets/products/kebab-original.webp',
    fallbackType: 'original',
    alt: 'Kebab Original panggang dengan daging rempah, sayuran segar, dan saus khas (foto placeholder)',
    width: 800,
    height: 600,
    isPlaceholder: true,
  },
  keju: {
    src: 'https://images.unsplash.com/photo-1633321702518-7feccafb94d5?auto=format&fit=crop&w=800&h=600&q=80',
    webpSrc: null,
    expectedFile: '/assets/products/kebab-keju.webp',
    fallbackType: 'keju',
    alt: 'Kebab Keju dengan lumuran saus creamy gurih dan keju parut (foto placeholder)',
    width: 800,
    height: 600,
    isPlaceholder: true,
  },
  pedas: {
    src: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&h=600&q=80',
    webpSrc: null,
    expectedFile: '/assets/products/kebab-pedas.webp',
    fallbackType: 'pedas',
    alt: 'Kebab Pedas panggang dengan daging berbumbu dan saus sambal (foto placeholder)',
    width: 800,
    height: 600,
    isPlaceholder: true,
  },
  komplit: {
    src: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&h=600&q=80',
    webpSrc: null,
    expectedFile: '/assets/products/kebab-komplit.webp',
    fallbackType: 'komplit',
    alt: 'Kebab Komplit porsi jumbo dengan daging dobel, keju, dan sayuran segar (foto placeholder)',
    width: 800,
    height: 600,
    isPlaceholder: true,
  },
  maryam: {
    src: 'https://images.pexels.com/photos/38834853/pexels-photo-38834853/free-photo-of-delicious-parathas-cooking-on-tawa-grill.jpeg?auto=compress&cs=tinysrgb&w=800',
    webpSrc: null,
    expectedFile: '/assets/products/roti-maryam.webp',
    fallbackType: 'maryam',
    alt: 'Roti Maryam hangat berlapis renyah kecokelatan di atas panggangan (foto placeholder)',
    width: 800,
    height: 600,
    isPlaceholder: true,
  },
  'bahan-grosir': {
    src: 'https://images.pexels.com/photos/28881694/pexels-photo-28881694/free-photo-of-assorted-raw-meats-on-rustic-kitchen-counter.jpeg?auto=compress&cs=tinysrgb&w=800',
    webpSrc: null,
    expectedFile: '/assets/products/bahan-grosir.webp',
    fallbackType: 'bahan-grosir',
    alt: 'Daging olahan dan bahan baku kebab grosir untuk usaha kuliner (foto placeholder)',
    width: 800,
    height: 600,
    isPlaceholder: true,
  },
  'pesanan-acara': {
    src: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&h=600&q=80',
    webpSrc: null,
    expectedFile: '/assets/products/pesanan-acara.webp',
    fallbackType: 'pesanan-acara',
    alt: 'Sajian katering paket pesanan untuk acara, hajatan, dan arisan (foto placeholder)',
    width: 800,
    height: 600,
    isPlaceholder: true,
  },
};

export function resolveProductAsset(
  productId: string,
  fallbackAlt?: string,
  fallbackType?: string
): ProductImageAsset {
  const registered = PRODUCT_ASSETS[productId];
  if (registered) {
    return registered;
  }

  return {
    src: null,
    webpSrc: null,
    expectedFile: `/assets/products/${productId}.webp`,
    fallbackType: fallbackType || productId || 'original',
    alt: fallbackAlt || 'Menu Kebab Al Firdaus',
    width: 800,
    height: 600,
  };
}

export function hasRealProductPhoto(asset: ProductImageAsset | undefined): boolean {
  return Boolean(asset && (asset.src || asset.webpSrc));
}
