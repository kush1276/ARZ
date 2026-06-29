'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Heart, Search, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { AnimatePresence, motion } from 'framer-motion';

interface NavbarProps {
  onCartToggle: () => void;
  onWishlistToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCartToggle, onWishlistToggle }) => {
  const { cartCount, wishlist } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : Object.values(PRODUCTS).filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ease-out border-b ${
          scrolled 
            ? 'bg-brand-white/80 backdrop-blur-lg py-4 border-brand-charcoal/[0.04]' 
            : 'bg-transparent py-7 border-transparent'
        }`}
      >
        <div className="editorial-container flex items-center justify-between">
          
          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-brand-charcoal hover:text-brand-gold transition-colors duration-300"
            aria-label="Open menu"
          >
            <Menu className="w-5 height-5" />
          </button>

          {/* Nav Links - Left side on Desktop */}
          <nav className="hidden md:flex items-center space-x-12 text-[0.7rem] uppercase tracking-[0.25em] font-light">
            <Link 
              href="/shop" 
              className={`gold-hover transition-colors duration-300 ${pathname === '/shop' ? 'text-brand-gold' : 'text-brand-charcoal'}`}
            >
              Shop
            </Link>
            <Link 
              href="/about" 
              className={`gold-hover transition-colors duration-300 ${pathname === '/about' ? 'text-brand-gold' : 'text-brand-charcoal'}`}
            >
              About
            </Link>
            <Link 
              href="/#philosophy" 
              className="gold-hover text-brand-charcoal transition-colors duration-300"
            >
              Philosophy
            </Link>
            <Link 
              href="/#lookbook" 
              className="gold-hover text-brand-charcoal transition-colors duration-300"
            >
              Lookbook
            </Link>
          </nav>

          {/* Logo - Centered on Desktop, right/centered on mobile */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <Link href="/" className="group flex flex-col items-center">
              <span className="font-editorial text-2xl md:text-3xl font-light tracking-[0.25em] text-brand-charcoal group-hover:text-brand-gold transition-colors duration-500">
                ARZ
              </span>
              <span className="text-[0.55rem] tracking-[0.4em] uppercase text-brand-charcoal/60 font-light mt-[-2px]">
                Made to feel effortless
              </span>
            </Link>
          </div>

          {/* Actions - Right side */}
          <div className="flex items-center space-x-5 md:space-x-7">
            {/* Search Toggle */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="text-brand-charcoal hover:text-brand-gold transition-colors duration-300"
              aria-label="Search Catalog"
            >
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Wishlist Toggle */}
            <button 
              onClick={onWishlistToggle}
              className="relative text-brand-charcoal hover:text-brand-gold transition-colors duration-300"
              aria-label="Open Wishlist"
            >
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-brand-white text-[0.6rem] font-medium w-4 h-4 rounded-full flex items-center justify-center scale-95 shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Toggle */}
            <button 
              onClick={onCartToggle}
              className="relative text-brand-charcoal hover:text-brand-gold transition-colors duration-300 flex items-center"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-charcoal text-brand-white text-[0.6rem] font-medium w-4 h-4 rounded-full flex items-center justify-center scale-95 shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* --- MOBILE NAVIGATION DRAWER --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-charcoal/30 backdrop-blur-sm z-50 md:hidden"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
              className="fixed top-0 left-0 w-[80%] max-w-[340px] h-full bg-brand-white z-50 p-6 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between border-b border-brand-charcoal/10 pb-6 mb-8">
                <div className="flex flex-col">
                  <span className="font-editorial text-xl font-light tracking-[0.2em] text-brand-charcoal">
                    ARZ
                  </span>
                  <span className="text-[0.5rem] tracking-[0.3em] uppercase text-brand-charcoal/50">
                    Made to feel effortless
                  </span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-brand-charcoal hover:text-brand-gold transition-colors duration-300"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-6 text-xs uppercase tracking-[0.2em] font-medium">
                <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-brand-charcoal/5 flex justify-between items-center">
                  <span>Shop Catalog</span>
                  <ArrowRight className="w-4 h-4 text-brand-charcoal/30" />
                </Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-brand-charcoal/5 flex justify-between items-center">
                  <span>About Us</span>
                  <ArrowRight className="w-4 h-4 text-brand-charcoal/30" />
                </Link>
                <Link href="/#founder" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-brand-charcoal/5 flex justify-between items-center">
                  <span>The Designer</span>
                  <ArrowRight className="w-4 h-4 text-brand-charcoal/30" />
                </Link>
                <Link href="/#philosophy" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-brand-charcoal/5 flex justify-between items-center">
                  <span>Our Philosophy</span>
                  <ArrowRight className="w-4 h-4 text-brand-charcoal/30" />
                </Link>
                <Link href="/#lookbook" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-brand-charcoal/5 flex justify-between items-center">
                  <span>Luxury Lookbook</span>
                  <ArrowRight className="w-4 h-4 text-brand-charcoal/30" />
                </Link>
              </nav>

              <div className="mt-auto border-t border-brand-charcoal/10 pt-6">
                <p className="text-[0.65rem] tracking-[0.15em] text-brand-charcoal/50 uppercase mb-4">Maison ARZ</p>
                <a href="mailto:atelier@arz.com" className="text-xs tracking-wider text-brand-charcoal hover:text-brand-gold block mb-1">
                  atelier@arz.com
                </a>
                <p className="text-xs text-brand-charcoal/60 tracking-wider">
                  &ldquo;Where Elegance Becomes Identity.&rdquo;
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- LUXURY SEARCH OVERLAY --- */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-white z-50 flex flex-col p-6 md:p-12 overflow-y-auto"
          >
            <div className="editorial-container w-full max-w-4xl flex-grow flex flex-col justify-start mt-8 md:mt-16">
              
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <button 
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="group flex items-center space-x-2 text-[0.7rem] uppercase tracking-[0.2em] font-medium text-brand-charcoal/60 hover:text-brand-charcoal transition-colors duration-300"
                  aria-label="Close search"
                >
                  <span>Close Search</span>
                  <X className="w-5 h-5 text-brand-charcoal group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Title */}
              <h2 className="font-editorial text-3xl md:text-5xl font-light tracking-wide text-brand-charcoal mb-8 text-center">
                Search the Atelier
              </h2>

              {/* Input field */}
              <div className="relative border-b border-brand-charcoal/20 pb-4 mb-10 w-full">
                <input 
                  type="text" 
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xl md:text-3xl font-light tracking-wide placeholder-brand-charcoal/30 text-brand-charcoal focus:outline-none"
                  autoFocus
                />
                <Search className="absolute right-2 top-2 w-6 h-6 text-brand-charcoal/40" />
              </div>

              {/* Results Area */}
              <div className="flex-grow">
                {searchQuery.trim() === '' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    <div>
                      <h4 className="text-[0.75rem] uppercase tracking-[0.2em] text-brand-charcoal/50 font-bold mb-4">Suggested Categories</h4>
                      <div className="flex flex-wrap gap-3">
                        {['Knitwear', 'Linen', 'Outerwear', 'Signature'].map((cat) => (
                          <Link
                            key={cat}
                            href={`/shop?cat=${cat.toLowerCase()}`}
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="text-xs border border-brand-charcoal/10 hover:border-brand-gold bg-brand-cream/50 px-4 py-2 hover:text-brand-gold tracking-widest uppercase transition-all duration-300"
                          >
                            {cat}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[0.75rem] uppercase tracking-[0.2em] text-brand-charcoal/50 font-bold mb-4">Trending Search Suggestions</h4>
                      <ul className="space-y-3 text-sm text-brand-charcoal/70">
                        {['Trench', 'Cream Polo', 'Linen Trousers', 'Champagne Slip Dress'].map((item) => (
                          <li key={item}>
                            <button
                              onClick={() => setSearchQuery(item)}
                              className="hover:text-brand-gold tracking-wide transition-colors duration-300 text-left"
                            >
                              &ldquo;{item}&rdquo;
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center border-b border-brand-charcoal/5 pb-3 mb-6">
                      <span className="text-xs uppercase tracking-widest text-brand-charcoal/40">
                        {searchResults.length} search results
                      </span>
                    </div>

                    {searchResults.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {searchResults.map((product) => (
                          <Link 
                            key={product.id}
                            href={`/product/${product.id}`}
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="group flex gap-4 items-center p-3 border border-brand-charcoal/5 hover:border-brand-gold transition-all duration-300 bg-brand-cream/10"
                          >
                            <div className="w-16 h-20 bg-brand-cream relative overflow-hidden flex-shrink-0">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className="text-sm font-medium text-brand-charcoal group-hover:text-brand-gold transition-colors duration-300 line-clamp-1">
                                {product.name}
                              </h4>
                              <p className="text-xs text-brand-charcoal/50 capitalize mt-0.5">
                                {product.category}
                              </p>
                              <span className="text-sm font-light text-brand-charcoal block mt-1">
                                ₹{product.price.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-brand-charcoal/50">
                        <p className="text-lg">No products found matching &ldquo;{searchQuery}&rdquo;</p>
                        <p className="text-sm mt-1">Please check your spelling or try another search term.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
