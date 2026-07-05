'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { AtelierLayout } from '@/components/AtelierLayout';

export default function Home() {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [loading, setLoading] = useState(true);

  const [lookbookModalImage, setLookbookModalImage] = useState<string | null>(null);

  // Newsletter Form State
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Best sellers select items
  const bestSellers = Object.values(PRODUCTS).filter(p => p.isBestSeller);

  // Lookbook items — ALL product images from every product
  const lookbookImages = [
    // Row 1
    { src: '/images/black_n_check_2.jpg', span: 'col-span-2 row-span-2', caption: "Black N' Check | Full Silhouette" },
    { src: '/images/pastel_poetry_1.jpg', span: 'col-span-1 row-span-1', caption: 'Pastel Poetry | Cotton Floral' },
    { src: '/images/warm_petals_1.jpg', span: 'col-span-1 row-span-2', caption: 'Warm Petals | Hand Painted' },
    { src: '/images/midnight_check_1.jpg', span: 'col-span-1 row-span-1', caption: 'Midnight Check | Full Outfit' },
    // Row 2
    { src: '/images/dusty_blue_1.jpg', span: 'col-span-1 row-span-1', caption: 'Dusty Blue | A-Line Set' },
    { src: '/images/navy_blossom_3.jpg', span: 'col-span-1 row-span-1', caption: 'Navy Blossom | Floral Prints' },
    // Row 3
    { src: '/images/warm_petals_2.jpg', span: 'col-span-1 row-span-1', caption: 'Warm Petals | Dupatta Detail' },
    { src: '/images/black_n_check_1.jpg', span: 'col-span-1 row-span-1', caption: "Black N' Check | Cuff Detail" },
    { src: '/images/pastel_poetry_3.jpg', span: 'col-span-2 row-span-2', caption: 'Pastel Poetry | Print Close-Up' },
    { src: '/images/midnight_check_2.jpg', span: 'col-span-1 row-span-1', caption: 'Midnight Check | Scallop Cuffs' },
    // Row 4
    { src: '/images/dusty_blue_2.jpg', span: 'col-span-1 row-span-1', caption: 'Dusty Blue | Side View' },
    { src: '/images/navy_blossom_1.jpg', span: 'col-span-1 row-span-1', caption: 'Navy Blossom | Lace Detail' },
    // Row 5
    { src: '/images/warm_petals_3.jpg', span: 'col-span-1 row-span-1', caption: 'Warm Petals | Petal Drape' },
    { src: '/images/black_n_check_3.jpg', span: 'col-span-2 row-span-1', caption: "Black N' Check | Flatlay" },
    { src: '/images/dusty_blue_3.jpg', span: 'col-span-1 row-span-1', caption: 'Dusty Blue | Fabric Detail' },
    // Row 6
    { src: '/images/midnight_check_3.jpg', span: 'col-span-1 row-span-1', caption: 'Midnight Check | Collar Detail' },
    { src: '/images/navy_blossom_2.jpg', span: 'col-span-1 row-span-1', caption: 'Navy Blossom | Embroidery' },
    { src: '/images/pastel_poetry_2.jpg', span: 'col-span-1 row-span-1', caption: 'Pastel Poetry | Full Length' },
    // Row 7
    { src: '/images/palm_set_1.jpg', span: 'col-span-2 row-span-2', caption: 'Palm Set | Lilac Palm Motif' },
    { src: '/images/palm_set_2.jpg', span: 'col-span-1 row-span-1', caption: 'Palm Set | Trousers Details' },
    { src: '/images/palm_set_3.jpg', span: 'col-span-1 row-span-1', caption: 'Palm Set | Sleeve & Print Detail' },
  ];

  // Auto transition hero slide (or simple manual)
  useEffect(() => {
    // Hide loading screen after 2.2 seconds
    const loadTimer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(loadTimer);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <>
      {/* --- CINEMATIC LOADING SCREEN --- */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-brand-white z-50 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <motion.span
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                animate={{ opacity: 1, letterSpacing: '0.3em' }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="font-editorial text-4xl md:text-5xl font-light text-brand-charcoal uppercase"
              >
                ARZ
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-[0.55rem] tracking-[0.25em] uppercase text-brand-charcoal font-light mt-1"
              >
                Made to feel effortless
              </motion.span>
            </div>
            <div className="absolute bottom-12 w-24 h-[1px] bg-brand-charcoal/10 overflow-hidden">
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 bottom-0 w-12 bg-brand-gold"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AtelierLayout>
        {/* --- HERO SECTION --- */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-cream/10">
          {/* Hero Slide image background */}
          <div className="absolute inset-0">
            <motion.div
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: 'easeOut' }}
              className="relative w-full h-full"
            >
              <img
                src="/images/hero_bg_new.jpg"
                alt="ARZ luxury fashion editorial"
                className="w-full h-full object-cover object-[center_70%]"
              />
              <div className="absolute inset-0 bg-brand-charcoal/20" />
            </motion.div>
          </div>

          {/* Hero Content */}
          <div className="editorial-container relative z-10 text-center text-brand-white flex flex-col items-center max-w-4xl px-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="text-[0.6rem] uppercase tracking-[0.4em] font-light text-brand-white/60 mb-6"
            >
              Maison ARZ
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-editorial text-[3.5rem] md:text-[7rem] font-light tracking-[0.15em] uppercase mb-5 leading-[1.05]"
            >
              Luxury<br />Redefined.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ delay: 0.9, duration: 1.2 }}
              className="text-[0.7rem] tracking-[0.25em] leading-loose max-w-md text-brand-white font-light mb-12 uppercase"
            >
              Timeless fashion crafted for those who value elegance above all.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center"
            >
              <Link
                href="/shop"
                className="border border-brand-white/50 text-brand-white hover:bg-brand-white hover:text-brand-charcoal text-[0.65rem] uppercase tracking-[0.3em] font-light px-10 py-4 transition-all duration-700 min-w-[180px]"
              >
                Shop Collection
              </Link>
              <Link
                href="#founder"
                className="text-brand-white/70 hover:text-brand-white text-[0.65rem] uppercase tracking-[0.3em] font-light px-10 py-4 border border-transparent hover:border-brand-white/20 transition-all duration-700 min-w-[180px]"
              >
                Discover ARZ
              </Link>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70">
            <span className="text-[0.55rem] uppercase tracking-[0.3em] text-brand-white mb-2 font-light">Scroll Down</span>
            <div className="w-[1px] h-12 bg-brand-white/25 relative overflow-hidden">
              <motion.div
                animate={{ y: ['0%', '100%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 left-0 w-full h-4 bg-brand-white"
              />
            </div>
          </div>
        </section>

        {/* --- FOUNDER SPOTLIGHT SECTION --- */}
        <section id="founder" className="bg-brand-beige/30 py-24 md:py-32 border-b border-brand-charcoal/5">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              {/* Left Column: portrait (5 cols) */}
              <div className="lg:col-span-5 relative">
                <div className="aspect-[3/4] relative overflow-hidden border border-brand-charcoal/10 bg-brand-cream/50">
                  <img
                    src="/images/founder_aarshiya.jpg"
                    alt="Aarshiya Grover - Founder of ARZ"
                    className="w-full h-full object-cover object-[center_15%]"
                  />
                  <div className="absolute inset-0 bg-brand-charcoal/[0.03]" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-36 h-36 border border-brand-gold/30 -z-10 pointer-events-none hidden md:block" />
              </div>

              {/* Right Column: Storytelling content (7 cols) */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-3">
                  <span className="text-brand-gold text-xs uppercase tracking-[0.3em] font-medium block">
                    Meet the Founder
                  </span>
                  <h2 className="font-editorial text-4xl md:text-5xl font-light tracking-wide text-brand-charcoal">
                    I&rsquo;m Aarshiya
                  </h2>
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-charcoal/50 font-medium">
                    Founder &amp; Creative Director, ARZ
                  </p>
                </div>

                <div className="text-sm md:text-base font-light text-brand-charcoal/80 leading-relaxed space-y-5 max-w-2xl">
                  <p>
                    As the founder of ARZ, my world has always revolved around creativity. Whether it&rsquo;s exploring fashion, diving into design, or obsessing over the tiny details that elevate the ordinary, I&rsquo;ve always been drawn to things made with intention.
                  </p>
                  <p>
                    I started ARZ to turn that lifelong passion into something meaningful, purposeful, and real.
                  </p>
                </div>

                {/* Featured Quote */}
                <div className="border-l-2 border-brand-gold pl-6 py-2 my-2">
                  <p className="font-editorial text-xl italic text-brand-charcoal/90 leading-relaxed">
                    &ldquo;I&rsquo;ve always been drawn to things made with intention.&rdquo;
                  </p>
                  <span className="text-[0.65rem] uppercase tracking-wider text-brand-charcoal/40 font-medium mt-2 block">
                    — Aarshiya Grover
                  </span>
                </div>

                {/* Credentials */}
                <div className="pt-4 border-t border-brand-charcoal/10">
                  <h4 className="text-[0.7rem] uppercase tracking-[0.2em] font-medium text-brand-charcoal mb-4">
                    Brand Credentials
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs text-brand-charcoal/70">
                    {['Founder & Creative Director of ARZ', 'Advocate of Timeless Luxury Fashion', 'Fashion Designer & Brand Visionary', 'Champion of Premium Craftsmanship', 'Building a Global Luxury Fashion Brand'].map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- FEATURED COLLECTIONS --- */}
        <section className="py-24 md:py-32">
          <div className="editorial-container">
            <div className="text-center space-y-3 mb-16">
              <span className="text-brand-gold text-xs uppercase tracking-[0.3em] font-medium">Curated Edits</span>
              <h2 className="font-editorial text-3xl md:text-4xl font-light tracking-wider text-brand-charcoal">
                Featured Collections
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[
                { name: 'Palm Set', img: '/images/palm_set_1.jpg', link: '/product/palm_set', subtitle: 'Lilac Edit' },
                { name: "Black N' Check", img: '/images/black_n_check_2.jpg', link: '/product/black_n_check', subtitle: 'New Arrival' },
                { name: 'Pastel Poetry', img: '/images/pastel_poetry_1.jpg', link: '/product/pastel_poetry', subtitle: 'On Sale' },
                { name: 'Midnight Check', img: '/images/midnight_check_1.jpg', link: '/product/midnight_check', subtitle: 'Plaid Edit' },
                { name: 'Warm Petals', img: '/images/warm_petals_1.jpg', link: '/product/warm_petals', subtitle: 'Hand Painted' },
                { name: 'Navy Blossom', img: '/images/navy_blossom_3.jpg', link: '/product/navy_blossom', subtitle: 'Floral Prints' },
                { name: 'Dusty Blue', img: '/images/dusty_blue_1.jpg', link: '/product/dusty_blue_suit', subtitle: 'Suit Set' },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="group relative aspect-[3/4] overflow-hidden bg-brand-cream flex flex-col justify-end p-6 border border-brand-charcoal/5"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 via-brand-charcoal/10 to-transparent opacity-80" />

                  <div className="relative z-10 text-brand-white space-y-1 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[0.6rem] uppercase tracking-[0.2em] text-brand-gold/90 font-medium block">
                      {item.subtitle}
                    </span>
                    <h3 className="font-editorial text-lg tracking-wider font-light">
                      {item.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-[0.65rem] uppercase tracking-wider text-brand-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-2">
                      <span>Discover Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* --- LUXURY LOOKBOOK SECTION --- */}
        <section id="lookbook" className="py-24 md:py-32 bg-brand-beige/20 border-t border-brand-charcoal/5">
          <div className="editorial-container">

            <div className="text-center space-y-3 mb-16">
              <span className="text-brand-gold text-xs uppercase tracking-[0.3em] font-medium">Maison Editorial</span>
              <h2 className="font-editorial text-3xl md:text-4xl font-light tracking-wider text-brand-charcoal">
                Luxury Lookbook
              </h2>
              <p className="text-xs text-brand-charcoal/50 uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                A visual narrative of silent luxury, texture play, and minimalist aesthetics.
              </p>
            </div>

            {/* Large Pinterest-style masonry grid showing ALL product images */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[280px] md:auto-rows-[320px]">
              {lookbookImages.map((image, idx) => (
                <div
                  key={idx}
                  onClick={() => setLookbookModalImage(image.src)}
                  className={`group relative overflow-hidden border border-brand-charcoal/5 bg-brand-cream cursor-zoom-in ${image.span}`}
                >
                  <img
                    src={image.src}
                    alt={image.caption}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6" />

                  {/* Subtle caption bottom */}
                  <div className="absolute bottom-4 left-4 text-brand-white z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <p className="text-xs uppercase tracking-[0.25em] font-medium font-editorial">{image.caption}</p>
                    <span className="text-[0.55rem] tracking-widest text-brand-gold uppercase">Click to expand</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* --- LOOKBOOK LIGHTBOX MODAL --- */}
        <AnimatePresence>
          {lookbookModalImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLookbookModalImage(null)}
              className="fixed inset-0 bg-brand-charcoal/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
            >
              <button
                onClick={() => setLookbookModalImage(null)}
                className="absolute top-6 right-6 text-brand-white hover:text-brand-gold p-2"
                aria-label="Close lookbook item"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative max-w-4xl max-h-[85vh] overflow-hidden"
              >
                <img
                  src={lookbookModalImage}
                  alt="Expanded luxury lookup visual"
                  className="max-w-full max-h-[85vh] object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- NEWSLETTER SECTION --- */}
        <section className="py-20 md:py-28 bg-brand-beige/40 border-t border-brand-charcoal/[0.06]">
          <div className="editorial-container max-w-3xl text-center space-y-8">
            <div className="space-y-4">
              <span className="text-brand-gold text-[0.6rem] uppercase tracking-[0.35em] font-light block">
                Exclusive Access
              </span>
              <h2 className="font-editorial text-3xl md:text-4xl font-light tracking-wider text-brand-charcoal leading-tight">
                Become Part of the ARZ Circle
              </h2>
              <p className="text-xs tracking-widest leading-relaxed text-brand-charcoal/55 font-light max-w-md mx-auto">
                Receive exclusive access to new collections, private launches, and rare experiences from our design atelier.
              </p>
            </div>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-brand-gold/30 p-6 max-w-sm mx-auto space-y-2 flex flex-col items-center"
              >
                <Check className="w-5 h-5 text-brand-gold mb-1" />
                <h4 className="text-xs font-light uppercase tracking-[0.25em] text-brand-charcoal">
                  You&apos;re on the list
                </h4>
                <p className="text-[0.65rem] text-brand-charcoal/45 tracking-wider">
                  Welcome to the ARZ Circle.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border border-brand-charcoal/12 overflow-hidden">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email Address for newsletter"
                  className="flex-grow bg-brand-white focus:bg-brand-white border-none text-xs py-4 px-6 focus:outline-none tracking-wider text-brand-charcoal placeholder-brand-charcoal/35"
                />
                <button
                  type="submit"
                  className="bg-brand-charcoal hover:bg-brand-gold text-brand-white text-[0.65rem] uppercase tracking-[0.25em] font-light py-4 px-7 transition-colors duration-500"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="text-[0.55rem] tracking-[0.25em] uppercase text-brand-charcoal/30 mt-4">
              Maison ARZ &copy; {new Date().getFullYear()}
            </p>
          </div>
        </section>

      </AtelierLayout>
    </>
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
