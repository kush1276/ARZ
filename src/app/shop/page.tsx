'use client';

import React, { Suspense } from 'react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { AtelierLayout } from '@/components/AtelierLayout';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';

function ShopContent() {
  const { addToCart, wishlist, toggleWishlist } = useCart();

  // Show all collection products
  const collectionIds = ['dusty_blue_suit', 'navy_blossom', 'warm_petals', 'midnight_check', 'pastel_poetry', 'black_n_check', 'palm_set'];
  const collectionProducts = collectionIds
    .map(id => PRODUCTS[id])
    .filter(Boolean);

  return (
    <AtelierLayout>
      {/* --- SHOP BANNER --- */}
      <section className="relative h-[35vh] flex items-center justify-center bg-brand-cream/15 overflow-hidden border-b border-brand-charcoal/5 pt-16">
        <div className="absolute inset-0">
          <img
            src="/images/hero_bg_new.jpg"
            alt="ARZ Catalog Header"
            className="w-full h-full object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-brand-white/80 backdrop-blur-xs" />
        </div>
        <div className="editorial-container relative z-10 text-center space-y-2">
          <span className="text-[0.6rem] uppercase tracking-[0.3em] font-medium text-brand-gold">Maison Collection</span>
          <h1 className="font-editorial text-4xl md:text-5xl font-light tracking-widest text-brand-charcoal uppercase">
            The Collection
          </h1>
          <p className="text-xs text-brand-charcoal/50 tracking-widest font-light">
            Curated minimalist essentials in linen, cotton, and light cashmere knitwear.
          </p>
        </div>
      </section>

      {/* --- MAIN SHOP CONTENT --- */}
      <section className="py-16 md:py-24">
        <div className="editorial-container">
          
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <h2 className="font-editorial text-2xl md:text-3xl font-light tracking-wider text-brand-charcoal uppercase">
              Featured Suit Sets
            </h2>
            <div className="w-12 h-[1px] bg-brand-gold" />
            <p className="text-xs text-brand-charcoal/55 tracking-widest uppercase">
              Showing {collectionProducts.length} premium essentials
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center">
              {collectionProducts.map((product) => {
                const isFavorite = wishlist.includes(product.id);
                return (
                  <div
                    key={product.id}
                    className="group flex flex-col p-4 border border-brand-charcoal/5 hover:border-brand-gold/20 bg-brand-white transition-all duration-500 shadow-xs"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] bg-brand-cream overflow-hidden cursor-pointer">
                      <Link href={`/product/${product.id}`} className="absolute inset-0">
                        {/* Primary Image */}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                        />
                        {/* Secondary Hover Image */}
                        <img
                          src={product.hoverImage}
                          alt={`${product.name} alternate view`}
                          className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                        />
                      </Link>

                      {/* Top Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-brand-gold text-brand-white text-[0.55rem] tracking-wider uppercase font-medium px-2.5 py-1 shadow-sm">
                          New Season
                        </span>
                      </div>

                      {/* Wishlist Toggle */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-4 right-4 bg-brand-white/80 hover:bg-brand-white text-brand-charcoal hover:text-brand-gold p-2 rounded-full shadow-xs transition-colors duration-300 z-10"
                        aria-label="Add to wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors duration-300 ${
                            isFavorite ? 'text-brand-gold fill-brand-gold' : 'text-brand-charcoal'
                          }`}
                        />
                      </button>

                      {/* Quick Add overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-brand-charcoal/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex gap-2">
                        <button
                          onClick={() => addToCart(product.id, 'm', 1)}
                          className="flex-grow bg-brand-white hover:bg-brand-gold hover:text-brand-white text-brand-charcoal text-[0.65rem] uppercase tracking-widest font-medium py-3 transition-colors duration-300 flex items-center justify-center space-x-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Quick Add</span>
                        </button>
                        <Link
                          href={`/product/${product.id}`}
                          className="bg-brand-white/20 hover:bg-brand-white text-brand-white hover:text-brand-charcoal p-3 backdrop-blur-xs transition-colors duration-300"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Meta details */}
                    <div className="pt-6 flex flex-col space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-base font-medium tracking-wide text-brand-charcoal hover:text-brand-gold transition-colors duration-300">
                          <Link href={`/product/${product.id}`}>{product.name}</Link>
                        </h3>
                        <span className="text-base font-light text-brand-charcoal flex items-center gap-2">
                          {product.originalPrice && (
                            <span className="line-through text-brand-charcoal/40 text-sm">
                              {product.currencySymbol || '₹'}{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                          {product.currencySymbol || '₹'}{product.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      
                      <p className="text-xs text-brand-charcoal/60 leading-relaxed font-light line-clamp-2">
                        {product.description}
                      </p>

                      <div className="text-[0.6rem] tracking-wider text-brand-charcoal/40 uppercase pt-2">
                        {product.color} / {product.category}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </AtelierLayout>
  );
}

// Suspense Boundary Wrapper for ShopContent
export default function Shop() {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen bg-brand-white flex flex-col items-center justify-center text-center">
        <span className="font-editorial text-2xl tracking-[0.2em] text-brand-charcoal uppercase animate-pulse">ARZ</span>
        <span className="text-[0.55rem] tracking-[0.3em] uppercase text-brand-charcoal/40 mt-1">Atelier</span>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
