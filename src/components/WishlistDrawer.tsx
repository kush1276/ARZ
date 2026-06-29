'use client';

import React from 'react';
import Link from 'next/link';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose }) => {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  
  // Get all product objects that are in the wishlist
  const wishlistItems = wishlist
    .map(id => PRODUCTS[id])
    .filter(Boolean);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-charcoal/40 backdrop-blur-xs z-50"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="fixed top-0 right-0 w-full sm:w-[480px] h-full bg-brand-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-charcoal/10 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Heart className="w-5 h-5 text-brand-gold fill-brand-gold" />
                <h3 className="font-editorial text-lg tracking-wider text-brand-charcoal">
                  My Wishlist
                </h3>
                {wishlistItems.length > 0 && (
                  <span className="text-xs text-brand-charcoal/50">({wishlistItems.length})</span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-brand-charcoal hover:text-brand-gold transition-colors duration-300 p-1"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Wishlist Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {wishlistItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-brand-cream/40 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-brand-charcoal/40" />
                  </div>
                  <h4 className="font-editorial text-lg tracking-wide text-brand-charcoal">Your wishlist is empty</h4>
                  <p className="text-xs text-brand-charcoal/50 max-w-xs leading-relaxed">
                    Save pieces you love to this page to review or purchase them later.
                  </p>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="text-xs uppercase tracking-[0.2em] font-medium border-b border-brand-charcoal pb-1 hover:text-brand-gold hover:border-brand-gold transition-all duration-300 inline-block mt-4"
                  >
                    Shop Collections
                  </Link>
                </div>
              ) : (
                wishlistItems.map((product) => (
                  <div
                    key={product.id}
                    className="flex space-x-4 pb-6 border-b border-brand-charcoal/5"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-24 bg-brand-cream flex-shrink-0 overflow-hidden relative border border-brand-charcoal/5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-medium tracking-wide text-brand-charcoal hover:text-brand-gold transition-colors duration-300">
                            <Link href={`/product/${product.id}`} onClick={onClose}>
                              {product.name}
                            </Link>
                          </h4>
                          <span className="text-sm font-light text-brand-charcoal ml-2">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p className="text-[0.65rem] tracking-wider text-brand-charcoal/40 uppercase mt-1">
                          Category: {product.category}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-4">
                        <button
                          onClick={() => {
                            addToCart(product.id, 'm', 1);
                            onClose();
                          }}
                          className="bg-brand-charcoal hover:bg-brand-gold text-brand-white text-[0.65rem] uppercase tracking-widest font-medium px-4 py-2 flex items-center space-x-1.5 transition-colors duration-300"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Bag</span>
                        </button>
                        
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-brand-charcoal/40 hover:text-red-500 transition-colors duration-300 p-1.5"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {wishlistItems.length > 0 && (
              <div className="border-t border-brand-charcoal/10 p-6 bg-brand-cream/20 text-center">
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="text-xs uppercase tracking-[0.2em] font-medium border-b border-brand-charcoal pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-all duration-300"
                >
                  Continue Browsing
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
