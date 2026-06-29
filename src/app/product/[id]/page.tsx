'use client';

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { AtelierLayout } from '@/components/AtelierLayout';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowLeft, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  // Resolve dynamic params in Next.js 15 Client Component
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  const { addToCart, wishlist, toggleWishlist, addToRecentlyViewed } = useCart();
  const product = PRODUCTS[id];

  // State management
  const [selectedSize, setSelectedSize] = useState<string>('m');
  const [activeImage, setActiveImage] = useState<string>('');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  
  // Accordion active state
  const [activeAccordion, setActiveAccordion] = useState<string | null>('materials');

  // Track product view and set default image on load
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      addToRecentlyViewed(product.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  if (!product) {
    return (
      <AtelierLayout>
        <div className="h-screen flex flex-col items-center justify-center text-center space-y-4">
          <h2 className="font-editorial text-2xl text-brand-charcoal">Garment Not Found</h2>
          <p className="text-xs text-brand-charcoal/50 max-w-xs leading-relaxed">
            The premium item you are searching for is either out of season or unavailable at this URL.
          </p>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-[0.2em] font-medium border-b border-brand-charcoal pb-1 hover:text-brand-gold hover:border-brand-gold transition-all duration-300"
          >
            Back to Catalog
          </Link>
        </div>
      </AtelierLayout>
    );
  }

  // Get recommendations (products in same category, excluding current)
  const recommendations = Object.values(PRODUCTS)
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Fallback recommendations if category is empty
  const fallbackRecommendations = Object.values(PRODUCTS)
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  const finalRecommendations = recommendations.length > 0 ? recommendations : fallbackRecommendations;

  const handleAddToBag = () => {
    addToCart(product.id, selectedSize, 1);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const isFavorite = wishlist.includes(product.id);

  return (
    <AtelierLayout>
      <div className="pt-24 md:pt-32 pb-24">
        <div className="editorial-container">
          
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Link
              href="/shop"
              className="text-[0.65rem] uppercase tracking-[0.2em] font-medium text-brand-charcoal/50 hover:text-brand-charcoal transition-colors duration-300 inline-flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all staples</span>
            </Link>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* --- LEFT: GALLERY PANEL (7 cols) --- */}
            <div className="lg:col-span-7 space-y-4">
              <div className="aspect-[3/4] bg-brand-cream relative overflow-hidden border border-brand-charcoal/5 group">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>

              {/* Thumbnails list */}
              <div className="flex space-x-3">
                {(product.images && product.images.length > 0
                  ? product.images
                  : [product.image, product.hoverImage].filter(Boolean)
                ).map((imgSrc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgSrc)}
                    className={`w-20 h-24 bg-brand-cream overflow-hidden border relative transition-all duration-300 ${
                      activeImage === imgSrc ? 'border-brand-gold scale-105' : 'border-brand-charcoal/5 hover:border-brand-charcoal/30'
                    }`}
                    aria-label={`Switch to image ${idx + 1}`}
                  >
                    <img src={imgSrc} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* --- RIGHT: DETAIL CONTROL PANEL (5 cols) --- */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              
              {/* Product Header */}
              <div className="space-y-3">
                <span className="text-brand-gold text-[0.65rem] uppercase tracking-[0.3em] font-medium block capitalize">
                  Atelier / {product.category}
                </span>
                <h1 className="font-editorial text-3xl md:text-4xl font-light tracking-wide text-brand-charcoal leading-tight">
                  {product.name}
                </h1>
                <div className="text-xl font-light text-brand-charcoal flex items-center gap-3">
                  {product.originalPrice && (
                    <span className="line-through text-brand-charcoal/40 text-lg">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span>₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice && (
                    <span className="text-xs bg-brand-gold/10 text-brand-gold px-2 py-0.5 tracking-wider uppercase font-medium">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>

              {/* Product Story Description */}
              <p className="text-xs md:text-sm font-light text-brand-charcoal/80 leading-relaxed">
                {product.description}
              </p>


              {/* Sizes Selection selector */}
              <div className="space-y-4 border-t border-brand-charcoal/5 pt-6">
                <div className="flex justify-between items-center text-[0.65rem] uppercase tracking-[0.2em] font-medium text-brand-charcoal/60">
                  <span>Select Size</span>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-brand-gold hover:text-brand-charcoal transition-colors duration-300 font-bold"
                  >
                    Size Guide
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border text-xs uppercase tracking-widest font-medium transition-all duration-300 flex items-center justify-center ${
                        selectedSize === size
                          ? 'border-brand-gold bg-brand-gold text-brand-white'
                          : 'border-brand-charcoal/10 hover:border-brand-charcoal bg-transparent text-brand-charcoal'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Bag and Wishlist buttons */}
              <div className="flex gap-4 border-t border-brand-charcoal/5 pt-8">
                <button
                  onClick={handleAddToBag}
                  className="flex-grow bg-brand-charcoal hover:bg-brand-gold text-brand-white text-xs uppercase tracking-[0.2em] font-medium py-4 transition-colors duration-500 shadow-md flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
                
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`px-4 border border-brand-charcoal/10 hover:border-brand-gold flex items-center justify-center transition-colors duration-300 ${
                    isFavorite ? 'text-brand-gold border-brand-gold' : 'text-brand-charcoal/70'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-brand-gold text-brand-gold' : ''}`} />
                </button>
              </div>

              {/* Accordions details */}
              <div className="border-t border-brand-charcoal/10 pt-6 space-y-4">
                
                {/* Accordion Item: Materials & Care */}
                <div className="border-b border-brand-charcoal/5 pb-4">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'materials' ? null : 'materials')}
                    className="w-full flex justify-between items-center text-left py-2 font-editorial text-sm tracking-wide text-brand-charcoal"
                  >
                    <span>Materials & Care</span>
                    <ChevronDown className={`w-4 h-4 text-brand-charcoal/40 transition-transform duration-300 ${
                      activeAccordion === 'materials' ? 'rotate-180' : ''
                    }`} />
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'materials' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden text-xs text-brand-charcoal/75 leading-relaxed space-y-2 pt-2 font-light"
                      >
                        <p><strong className="font-medium">Fabric:</strong> {product.materials}</p>
                        <p><strong className="font-medium">Care:</strong> {product.care}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion Item: Sizing & Fit */}
                <div className="border-b border-brand-charcoal/5 pb-4">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'fit' ? null : 'fit')}
                    className="w-full flex justify-between items-center text-left py-2 font-editorial text-sm tracking-wide text-brand-charcoal"
                  >
                    <span>Sizing & Fit</span>
                    <ChevronDown className={`w-4 h-4 text-brand-charcoal/40 transition-transform duration-300 ${
                      activeAccordion === 'fit' ? 'rotate-180' : ''
                    }`} />
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'fit' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden text-xs text-brand-charcoal/75 leading-relaxed pt-2 font-light"
                      >
                        <p>{product.fit}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion Item: Shipping & Returns */}
                <div className="border-b border-brand-charcoal/5 pb-4">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')}
                    className="w-full flex justify-between items-center text-left py-2 font-editorial text-sm tracking-wide text-brand-charcoal"
                  >
                    <span>Shipping & Returns</span>
                    <ChevronDown className={`w-4 h-4 text-brand-charcoal/40 transition-transform duration-300 ${
                      activeAccordion === 'shipping' ? 'rotate-180' : ''
                    }`} />
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'shipping' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden text-xs text-brand-charcoal/75 leading-relaxed pt-2 font-light"
                      >
                        <p>Complimentary carbon-neutral standard delivery on orders above ₹15,000. Returns are accepted within 30 days of shipment receipt, provided the garment is unworn, in original packaging, with all designer tags attached.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>
          </div>



        </div>
      </div>

      {/* --- STICKY MOBILE ADD-TO-BAG BAR --- */}
      <div className="fixed bottom-0 left-0 w-full bg-brand-white border-t border-brand-charcoal/10 p-4 z-30 lg:hidden flex gap-4 items-center">
        <div className="flex flex-col">
          <span className="text-[0.55rem] uppercase tracking-widest text-brand-charcoal/40">Price</span>
          <span className="text-sm font-medium text-brand-charcoal">₹{product.price.toLocaleString('en-IN')}</span>
        </div>
        <button
          onClick={handleAddToBag}
          className="flex-grow bg-brand-charcoal text-brand-white text-xs uppercase tracking-[0.2em] font-semibold py-3 flex items-center justify-center space-x-1.5"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Bag</span>
        </button>
      </div>

      {/* --- SIZE GUIDE MODAL OVERLAY --- */}
      <AnimatePresence>
        {sizeGuideOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSizeGuideOpen(false)}
            className="fixed inset-0 bg-brand-charcoal/45 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-white p-6 md:p-8 max-w-md w-full border border-brand-charcoal/10 shadow-2xl relative space-y-6"
            >
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="absolute top-4 right-4 text-brand-charcoal hover:text-brand-gold p-1"
                aria-label="Close size guide"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-brand-gold text-[0.6rem] uppercase tracking-[0.25em] font-semibold">Atelier Fit Guide</span>
                <h3 className="font-editorial text-xl font-light text-brand-charcoal uppercase tracking-wider">
                  Sizing Guide
                </h3>
              </div>

              {/* Guide content */}
              <div className="space-y-4 text-xs font-light text-brand-charcoal/80 leading-relaxed">
                <p>
                  Our garments are designed for a relaxed, modern luxury fit. Most garments run true to size, but we recommend checking specific fit characteristics below:
                </p>
                <table className="w-full text-left border-collapse border border-brand-charcoal/10">
                  <thead>
                    <tr className="bg-brand-cream/30">
                      <th className="p-2.5 font-medium border border-brand-charcoal/10">Size</th>
                      <th className="p-2.5 font-medium border border-brand-charcoal/10">Chest (in)</th>
                      <th className="p-2.5 font-medium border border-brand-charcoal/10">Waist (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2.5 border border-brand-charcoal/10">XS</td>
                      <td className="p-2.5 border border-brand-charcoal/10">32 - 34</td>
                      <td className="p-2.5 border border-brand-charcoal/10">24 - 26</td>
                    </tr>
                    <tr className="bg-brand-cream/10">
                      <td className="p-2.5 border border-brand-charcoal/10">S</td>
                      <td className="p-2.5 border border-brand-charcoal/10">34 - 36</td>
                      <td className="p-2.5 border border-brand-charcoal/10">26 - 28</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border border-brand-charcoal/10 font-bold">M</td>
                      <td className="p-2.5 border border-brand-charcoal/10 font-bold">36 - 38</td>
                      <td className="p-2.5 border border-brand-charcoal/10 font-bold">28 - 30</td>
                    </tr>
                    <tr className="bg-brand-cream/10">
                      <td className="p-2.5 border border-brand-charcoal/10">L</td>
                      <td className="p-2.5 border border-brand-charcoal/10">38 - 40</td>
                      <td className="p-2.5 border border-brand-charcoal/10">30 - 32</td>
                    </tr>
                  </tbody>
                </table>
                <p className="italic text-[0.65rem] text-brand-gold">
                   *Model is 178 cm / 5&apos;10&rdquo; and wears a size Medium.
                </p>
              </div>

              <button
                onClick={() => setSizeGuideOpen(false)}
                className="w-full bg-brand-charcoal hover:bg-brand-gold text-brand-white text-xs uppercase tracking-widest py-3.5 transition-colors duration-300"
              >
                Close Fit Guide
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ADDED TO BAG TOAST BANNER --- */}
      <AnimatePresence>
        {addedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-6 left-1/2 bg-brand-charcoal text-brand-white text-xs py-3.5 px-6 uppercase tracking-widest shadow-xl flex items-center space-x-3.5 z-40 border border-brand-gold/30"
          >
            <Check className="w-4 h-4 text-brand-gold" />
            <span>Added to Shopping Bag</span>
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
