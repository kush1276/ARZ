'use client';

import React from 'react';
import Link from 'next/link';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_CATALOG = 'https://wa.me/c/918708170528';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartSubtotal, cartCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-charcoal/40 backdrop-blur-xs z-50"
          />

          {/* Cart Drawer Panel */}
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
                <ShoppingBag className="w-5 h-5 text-brand-charcoal" />
                <h3 className="font-editorial text-lg tracking-wider text-brand-charcoal">
                  Shopping Bag
                </h3>
                {cartCount > 0 && (
                  <span className="text-xs text-brand-charcoal/50">({cartCount})</span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-brand-charcoal hover:text-brand-gold transition-colors duration-300 p-1"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items Area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-brand-cream/40 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-brand-charcoal/40" />
                  </div>
                  <h4 className="font-editorial text-lg tracking-wide text-brand-charcoal">Your bag is empty</h4>
                  <p className="text-xs text-brand-charcoal/50 max-w-xs leading-relaxed">
                    Discover our curated collections and select timeless pieces to add to your wardrobe.
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
                cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex space-x-4 pb-6 border-b border-brand-charcoal/5"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-24 bg-brand-cream flex-shrink-0 overflow-hidden relative border border-brand-charcoal/5">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-medium tracking-wide text-brand-charcoal hover:text-brand-gold transition-colors duration-300">
                            <Link href={`/product/${item.product.id}`} onClick={onClose}>
                              {item.product.name}
                            </Link>
                          </h4>
                          <span className="text-sm font-light text-brand-charcoal ml-2">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p className="text-[0.65rem] tracking-wider text-brand-charcoal/40 uppercase mt-1">
                          Size: {item.size}
                        </p>
                      </div>

                      {/* Quantity & Remove actions */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-brand-charcoal/10 rounded-sm bg-brand-cream/20">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="px-2 py-1 text-brand-charcoal/60 hover:text-brand-charcoal transition-colors duration-300"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-light text-brand-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="px-2 py-1 text-brand-charcoal/60 hover:text-brand-charcoal transition-colors duration-300"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="text-[0.65rem] uppercase tracking-widest text-brand-charcoal/40 hover:text-brand-gold transition-colors duration-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary (Sticky at bottom) */}
            {cart.length > 0 && (
              <div className="border-t border-brand-charcoal/10 p-6 bg-brand-cream/20">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs uppercase tracking-widest font-medium text-brand-charcoal/60">
                    Subtotal
                  </span>
                  <span className="font-editorial text-xl font-light text-brand-charcoal">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[0.65rem] text-brand-charcoal/50 tracking-wide leading-relaxed mb-6">
                  Shipping, taxes, and duties calculated at checkout. Complimentary carbon-neutral standard delivery on orders above ₹15,000.
                </p>
                <button
                  onClick={() => window.open(WHATSAPP_CATALOG, '_blank')}
                  className="w-full bg-[#25D366] hover:bg-[#1ebe5c] text-white text-xs uppercase tracking-[0.2em] font-medium py-4 text-center flex items-center justify-center space-x-3 transition-colors duration-300 shadow-md"
                >
                  {/* WhatsApp icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.885a.5.5 0 0 0 .606.61l6.198-1.629A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.725 9.725 0 0 1-5.015-1.393l-.36-.214-3.722.977.995-3.635-.235-.374A9.713 9.713 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                  <span>Order on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
