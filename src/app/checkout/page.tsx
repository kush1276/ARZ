'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { AtelierLayout } from '@/components/AtelierLayout';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_CATALOG = 'https://wa.me/c/918708170528';

export default function CheckoutPage() {
  const { cart, cartSubtotal, clearCart } = useCart();
  
  // Checkout Form State
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  
  // Credit Card Info
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Success screen state
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Calculations
  const shippingFee = cartSubtotal >= 15000 || cartSubtotal === 0 ? 0 : 500;
  const estimatedTax = cartSubtotal * 0.08; // 8% simulated tax
  const totalAmount = cartSubtotal - discount + shippingFee + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ATELIER10') {
      setDiscount(cartSubtotal * 0.1); // 10% discount
      setPromoApplied(true);
    } else {
      alert('Invalid Promo Code. Try "ATELIER10" for 10% off.');
    }
  };

  // Build a WhatsApp message with cart items
  const buildWhatsAppMessage = () => {
    const lines = cart.map(
      (item) =>
        `• ${item.product.name} (Size: ${item.size.toUpperCase()}, Qty: ${item.quantity}) — ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}`
    );
    const msg = [
      '🛍️ *ARZ Order Enquiry*',
      '',
      ...lines,
      '',
      `*Subtotal: ₹${cartSubtotal.toLocaleString('en-IN')}*`,
      '',
      'I would like to place this order and make payment via WhatsApp. Please confirm availability and share payment details.',
    ].join('\n');
    return encodeURIComponent(msg);
  };

  const handleWhatsAppOrder = () => {
    const msg = buildWhatsAppMessage();
    window.open(`https://wa.me/918708170528?text=${msg}`, '_blank');
  };

  return (
    <AtelierLayout>
      <div className="pt-24 md:pt-32 pb-24 bg-brand-cream/10">
        <div className="editorial-container max-w-5xl">
          
          <div className="text-center space-y-2 mb-12">
            <span className="text-brand-gold text-[0.6rem] uppercase tracking-[0.3em] font-medium">Secured Server</span>
            <h1 className="font-editorial text-3xl font-light tracking-widest text-brand-charcoal uppercase">
              Checkout
            </h1>
          </div>

          {cart.length === 0 && !orderCompleted ? (
            <div className="bg-brand-white border border-brand-charcoal/5 p-12 text-center space-y-4 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-full bg-brand-cream/50 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-5 h-5 text-brand-charcoal/40" />
              </div>
              <h2 className="font-editorial text-lg text-brand-charcoal">Your bag is empty</h2>
              <p className="text-xs text-brand-charcoal/50 leading-relaxed">
                Add pieces to your bag before proceeding to the checkout simulation.
              </p>
              <Link
                href="/shop"
                className="bg-brand-charcoal hover:bg-brand-gold text-brand-white text-xs uppercase tracking-widest px-8 py-3.5 block transition-colors duration-300"
              >
                Shop Collections
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* --- LEFT COLUMN: WHATSAPP ORDERING (7 cols) --- */}
              <div className="lg:col-span-7 space-y-6">

                {/* WhatsApp CTA Card */}
                <div className="bg-brand-white p-6 md:p-10 border border-brand-charcoal/5 space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366" className="w-7 h-7">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.885a.5.5 0 0 0 .606.61l6.198-1.629A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.725 9.725 0 0 1-5.015-1.393l-.36-.214-3.722.977.995-3.635-.235-.374A9.713 9.713 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                      </svg>
                    </div>
                    <div>
                      <h2 className="font-editorial text-xl font-light text-brand-charcoal tracking-wide">Order via WhatsApp</h2>
                      <p className="text-[0.7rem] text-brand-charcoal/50 tracking-wide mt-0.5">Personalised service · Secure payment · Fast confirmation</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm font-light text-brand-charcoal/70 leading-relaxed">
                    <p>Click the button below to send your order directly to our team on WhatsApp. Your selected items will be included automatically in the message.</p>
                    <p>Our team will confirm your order, share payment options (UPI, bank transfer, or card link), and arrange delivery — all within WhatsApp.</p>
                  </div>

                  {/* Steps */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { n: '01', label: 'Send your order on WhatsApp' },
                      { n: '02', label: 'Confirm items & get payment link' },
                      { n: '03', label: 'Pay & receive dispatch update' },
                    ].map((s) => (
                      <div key={s.n} className="text-center space-y-2">
                        <span className="font-editorial text-2xl font-light text-brand-gold/60">{s.n}</span>
                        <p className="text-[0.65rem] uppercase tracking-wider text-brand-charcoal/50 leading-snug">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Main CTA */}
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-[#25D366] hover:bg-[#1ebe5c] text-white text-sm uppercase tracking-[0.2em] font-semibold py-5 flex items-center justify-center space-x-3 transition-colors duration-300 shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.885a.5.5 0 0 0 .606.61l6.198-1.629A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.725 9.725 0 0 1-5.015-1.393l-.36-.214-3.722.977.995-3.635-.235-.374A9.713 9.713 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                    </svg>
                    <span>Place Order on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Browse catalog link */}
                  <p className="text-center text-[0.7rem] text-brand-charcoal/40 tracking-wide">
                    Or browse our{' '}
                    <a href={WHATSAPP_CATALOG} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-gold transition-colors duration-300">
                      WhatsApp Catalogue
                    </a>{' '}to discover more styles.
                  </p>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: <ShieldCheck className="w-5 h-5 text-brand-gold" />, label: 'Safe & Secure', sub: 'End-to-end encrypted' },
                    { icon: <Truck className="w-5 h-5 text-brand-gold" />, label: 'Fast Dispatch', sub: 'Within 24–48 hours' },
                    { icon: <RotateCcw className="w-5 h-5 text-brand-gold" />, label: 'Easy Returns', sub: '30-day return policy' },
                  ].map((b) => (
                    <div key={b.label} className="bg-brand-white border border-brand-charcoal/5 p-4 text-center space-y-2">
                      <div className="flex justify-center">{b.icon}</div>
                      <p className="text-[0.65rem] font-medium text-brand-charcoal uppercase tracking-wider">{b.label}</p>
                      <p className="text-[0.6rem] text-brand-charcoal/40">{b.sub}</p>
                    </div>
                  ))}
                </div>

              </div>

              {/* --- RIGHT COLUMN: ORDER SUMMARY PANEL (5 cols) --- */}
              <aside className="lg:col-span-5 bg-brand-white p-6 border border-brand-charcoal/5 space-y-6 lg:sticky lg:top-28">
                <h3 className="font-editorial text-base font-medium text-brand-charcoal border-b border-brand-charcoal/5 pb-2 uppercase tracking-wider">
                  Order Summary
                </h3>

                {/* Items list */}
                <div className="space-y-4 max-h-[30vh] overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex justify-between items-center text-xs">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-14 bg-brand-cream overflow-hidden flex-shrink-0 relative border border-brand-charcoal/5">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-medium text-brand-charcoal line-clamp-1">{item.product.name}</h4>
                          <p className="text-[0.6rem] text-brand-charcoal/50 uppercase mt-0.5">Size: {item.size} &bull; Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-light text-brand-charcoal">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                {/* Coupon Discount Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2 border-t border-b border-brand-charcoal/5 py-4">
                  <input
                    type="text"
                    placeholder="Enter Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    className="flex-grow bg-brand-cream/15 border border-brand-charcoal/10 focus:border-brand-gold text-xs px-3 focus:outline-none tracking-widest text-brand-charcoal uppercase"
                  />
                  <button
                    type="submit"
                    disabled={promoApplied}
                    className="bg-brand-charcoal hover:bg-brand-gold text-brand-white text-xs uppercase tracking-widest px-4 py-2.5 transition-colors duration-300 disabled:bg-brand-charcoal/30"
                  >
                    Apply
                  </button>
                </form>

                {/* Price calculations */}
                <div className="space-y-3.5 text-xs text-brand-charcoal/80">
                  <div className="flex justify-between">
                    <span className="text-brand-charcoal/50">Subtotal</span>
                    <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-brand-gold">
                      <span>Promo Discount (10% off)</span>
                      <span>-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-brand-charcoal/50">Shipping</span>
                    <span>{shippingFee === 0 ? 'Complimentary' : `₹${shippingFee.toLocaleString('en-IN')}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-charcoal/50">Estimated Tax</span>
                    <span>₹{estimatedTax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-brand-charcoal/10 pt-4 font-medium text-brand-charcoal">
                    <span className="text-sm uppercase tracking-wider">Total</span>
                    <span className="font-editorial text-lg">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="border-t border-brand-charcoal/5 pt-6 space-y-4 text-xs text-brand-charcoal/60 font-light">
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-brand-gold flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-brand-charcoal text-[0.7rem] uppercase tracking-wider">Carbon-Neutral Shipping</h4>
                      <p className="text-[0.65rem] text-brand-charcoal/50 mt-0.5">Every parcel delivery offset by certified green initiatives.</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="w-5 h-5 text-brand-gold flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-brand-charcoal text-[0.7rem] uppercase tracking-wider">30-Day Atelier Guarantee</h4>
                      <p className="text-[0.65rem] text-brand-charcoal/50 mt-0.5">Easy, trackable returns in original packaging tags.</p>
                    </div>
                  </div>
                </div>

              </aside>

            </div>
          )}

        </div>
      </div>

      {/* --- ORDER SUCCESS OVERLAY SCREEN --- */}
      <AnimatePresence>
        {orderCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-brand-white z-50 overflow-y-auto flex items-center justify-center p-6"
          >
            <div className="max-w-md w-full text-center space-y-8 p-8 border border-brand-gold/30 bg-brand-cream/5 shadow-xl flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366" className="w-9 h-9">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.885a.5.5 0 0 0 .606.61l6.198-1.629A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.725 9.725 0 0 1-5.015-1.393l-.36-.214-3.722.977.995-3.635-.235-.374A9.713 9.713 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                </svg>
              </div>
              <div className="space-y-3">
                <span className="text-[#25D366] text-[0.6rem] uppercase tracking-[0.3em] font-semibold block">Order Ready to Send</span>
                <h2 className="font-editorial text-3xl font-light text-brand-charcoal uppercase tracking-wider leading-tight">
                  Complete on WhatsApp
                </h2>
                <p className="text-xs text-brand-charcoal/50 leading-relaxed font-light">
                  Your cart is ready. Tap the button below to open WhatsApp — your order details will be pre-filled. Our team will confirm and share payment options.
                </p>
              </div>
              <div className="w-full space-y-3">
                <button
                  onClick={() => { handleWhatsAppOrder(); clearCart(); }}
                  className="w-full bg-[#25D366] hover:bg-[#1ebe5c] text-white text-xs uppercase tracking-[0.2em] font-semibold py-4 flex items-center justify-center space-x-3 transition-colors duration-300 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.885a.5.5 0 0 0 .606.61l6.198-1.629A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.725 9.725 0 0 1-5.015-1.393l-.36-.214-3.722.977.995-3.635-.235-.374A9.713 9.713 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                  <span>Open WhatsApp &amp; Send Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/shop"
                  onClick={() => clearCart()}
                  className="text-[0.65rem] uppercase tracking-widest text-brand-charcoal/40 hover:text-brand-charcoal transition-colors duration-300 block text-center py-2"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </AtelierLayout>
  );
}

// X close icon helper
const X = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
