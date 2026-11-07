import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PromoGalleryBanner } from './components/PromoGalleryBanner';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { OfferSection } from './components/OfferSection';
import { WholesaleSection } from './components/WholesaleSection';
import { StepsSection } from './components/StepsSection';
import { QuoteBand } from './components/QuoteBand';
import { LocationSection } from './components/LocationSection';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MenuDetailModal } from './components/MenuDetailModal';
import { CartModal } from './components/CartModal';
import { MenuVariant, CartItem } from './types';
import { formatRupiah, MENU_VARIANTS } from './data/content';

const CART_STORAGE_KEY = 'alfirdaus_kebab_cart_v1';

const isValidCartItem = (value: unknown): value is CartItem => {
  if (!value || typeof value !== 'object') return false;

  const item = value as Partial<CartItem>;
  const variant = MENU_VARIANTS.find((entry) => entry.id === item.menuId);

  return Boolean(
    variant &&
      variant.kind !== 'wholesale' &&
      variant.kind !== 'event' &&
      item.name === variant.name &&
      typeof item.id === 'string' &&
      typeof item.tag === 'string' &&
      typeof item.price === 'number' &&
      Number.isFinite(item.price) &&
      Number.isInteger(item.quantity) &&
      (item.quantity ?? 0) > 0
  );
};

export const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [previewVariant, setPreviewVariant] = useState<MenuVariant | null>(null);

  // Cart state with localStorage fallback
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed.filter(isValidCartItem) : [];
      }
    } catch {
      // Fallback
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const handleAddToCart = (variant: MenuVariant, portionOption?: string) => {
    if (variant.kind === 'wholesale' || variant.kind === 'event') return;

    setCartItems((prev) => {
      const matchIndex = prev.findIndex(
        (item) => item.menuId === variant.id && item.portionOption === (portionOption || 'Reguler')
      );

      if (matchIndex > -1) {
        const copy = [...prev];
        copy[matchIndex] = {
          ...copy[matchIndex],
          quantity: copy[matchIndex].quantity + 1,
        };
        return copy;
      }

      const newItem: CartItem = {
        id: `${variant.id}-${Date.now()}`,
        menuId: variant.id,
        name: variant.name,
        tag: variant.tag,
        price: variant.price || 15000,
        quantity: 1,
        type: variant.type,
        portionOption: portionOption || (variant.category === 'snack' ? 'Siap Santap' : 'Reguler'),
      };
      return [...prev, newItem];
    });
  };


  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQuantity = item.quantity + delta;
            return nextQuantity > 0 ? { ...item, quantity: nextQuantity } : null;
          }
          return item;
        })
        .filter((i): i is CartItem => i !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
      />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Auto-Scrolling Promo & Gallery Banner (Right after Hero) */}
        <PromoGalleryBanner />

        <AboutSection />

        <MenuSection
          onPreviewMenu={(item) => setPreviewVariant(item)}
          onAddToCart={(item) => handleAddToCart(item)}
        />

        <OfferSection
          onViewMenu={() => {
            document.getElementById('menu-varian')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <WholesaleSection />

        <StepsSection />
        <QuoteBand />
        <LocationSection />
        <FaqSection />
        <FinalCta />
      </main>

      <Footer />
      <FloatingWhatsApp />

      {/* Floating Cart Indicator Pill (visible when items are in cart) */}
      {totalCartCount > 0 && !isCartOpen && (
        <aside
          aria-label="Keranjang belanja aktif"
          className="fixed bottom-6 left-5 z-30 animate-in fade-in slide-in-from-bottom duration-300"
        >
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 py-3 px-4 rounded-2xl bg-[#1c1b18] text-[#d5f264] border-2 border-[#d5f264]/60 shadow-2xl hover:scale-105 active:scale-95 transition-all group"
            aria-label={`Buka keranjang pesanan, ${totalCartCount} item seharga ${formatRupiah(totalCartPrice)}`}
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#d5f264]" />
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#ec6c3b] text-white text-[9px] font-black flex items-center justify-center">
                {totalCartCount}
              </span>
            </div>
            <div className="text-left">
              <div className="text-[11px] font-black text-white leading-tight">
                {formatRupiah(totalCartPrice)}
              </div>
              <div className="text-[9px] text-[#b8b3a7] font-semibold">
                Lihat Keranjang Pesanan
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#d5f264] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </aside>
      )}

      {/* Shopping Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onExploreMenu={() => {
          document.getElementById('menu-varian')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Minimalist Menu Detail Preview Modal */}
      <MenuDetailModal
        item={previewVariant}
        onClose={() => setPreviewVariant(null)}
        onAddToCart={(item) => handleAddToCart(item)}
      />
    </>
  );
};

export default App;
