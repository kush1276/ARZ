'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { CartDrawer } from './CartDrawer';
import { WishlistDrawer } from './WishlistDrawer';
import { Footer } from './Footer';

interface AtelierLayoutProps {
  children: React.ReactNode;
}

export const AtelierLayout: React.FC<AtelierLayoutProps> = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Global Navbar */}
      <Navbar 
        onCartToggle={() => setCartOpen(prev => !prev)} 
        onWishlistToggle={() => setWishlistOpen(prev => !prev)} 
      />

      {/* Main Content Page */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer 
        isOpen={wishlistOpen} 
        onClose={() => setWishlistOpen(false)} 
      />
    </div>
  );
};
export default AtelierLayout;
