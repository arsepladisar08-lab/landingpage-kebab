import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VisualShowcaseCarousel } from './components/VisualShowcaseCarousel';
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
import { formatRupiah } from './data/content';

const CART_STORAGE_KEY = 'alfirdaus_kebab_cart_v1';

export const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [previewVariant, setPreviewVariant] = useState<MenuVariant | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      return [];
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Storage may be unavailable in private browsing modes.
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const handleAddToCart = (variant: MenuVariant, portionOption?: string) => {
    setCartItems((prev) => {
      const resolvedOption = portionOption || (variant.category === 'snack' ? 'Siap Santap' : 'Reguler');
      const matchIndex = prev.findIndex(
        (item) => item.menuId === variant.id && item.portionOption === resolvedOption
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
        portionOption: resolvedOption,
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
      <a href="#main-content" className="skip-link">
        Langsung ke konten utama
      </a>

      <Header
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
      />

      <main id="main-content" tabIndex={-1}>
        <Hero />

        <VisualShowcaseCarousel />

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

      {totalCartCount > 0 && !isCartOpen && (
        <aside
          aria-label="Keranjang belanja aktif"
          className="fixed bottom-20 sm:bottom-6 left-4 sm:left-5 z-30"
        >
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 min-h-[48px] py-2.5 px-4 rounded-xl bg-[#a91d22] hover:bg-[#7d1216] text-[#fffdf4] border-2 border-[#2b1810] shadow-[4px_4px_0_#2b1810] active:translate-y-0.5 transition-all"
            aria-label={`Buka keranjang pesanan, ${totalCartCount} item seharga ${formatRupiah(totalCartPrice)}`}
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#f5d328]" aria-hidden="true" />
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#f5d328] text-[#2b1810] border border-[#2b1810] text-[10px] font-black flex items-center justify-center">
                {totalCartCount}
              </span>
            </div>
            <div className="text-left">
              <div className="text-xs font-black text-[#fffdf4] leading-tight">
                {formatRupiah(totalCartPrice)}
              </div>
              <div className="text-[11px] text-[#f5d328] font-bold leading-tight">
                Lihat keranjang
              </div>
            </div>
          </button>
        </aside>
      )}

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

      <MenuDetailModal
        item={previewVariant}
        onClose={() => setPreviewVariant(null)}
        onAddToCart={(item) => handleAddToCart(item)}
      />
    </>
  );
};

export default App;
