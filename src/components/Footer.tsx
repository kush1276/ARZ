import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-cream/20 border-t border-brand-charcoal/[0.05] pt-20 pb-10">
      <div className="editorial-container">
        
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-12 mb-16">
          
          {/* Brand Identity */}
          <div className="col-span-2 md:col-span-1 space-y-5">
            <div className="flex flex-col">
              <span className="font-editorial text-lg font-light tracking-[0.3em] text-brand-charcoal">
                ARZ
              </span>
              <span className="text-[0.45rem] tracking-[0.4em] uppercase text-brand-charcoal/40 font-light mt-[-1px]">
                Made to feel effortless
              </span>
            </div>
            <p className="text-[0.7rem] text-brand-charcoal/50 leading-relaxed font-light max-w-[200px]">
              Timeless luxury fashion by Aarshiya Grover. Crafted for those who value authenticity over trend.
            </p>
            <p className="text-[0.6rem] italic text-brand-gold/80 tracking-[0.1em] font-editorial">
              &ldquo;Where Elegance Becomes Identity.&rdquo;
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-[0.6rem] uppercase tracking-[0.25em] font-medium text-brand-charcoal/40 mb-5">
              Collections
            </h4>
            <ul className="space-y-3 text-[0.7rem] font-light text-brand-charcoal/60">
              <li><Link href="/shop?cat=knitwear" className="hover:text-brand-gold transition-colors duration-400">Knitwear</Link></li>
              <li><Link href="/shop?cat=linen" className="hover:text-brand-gold transition-colors duration-400">Organic Linen</Link></li>
              <li><Link href="/shop?cat=outerwear" className="hover:text-brand-gold transition-colors duration-400">Outerwear</Link></li>
              <li><Link href="/shop" className="hover:text-brand-gold transition-colors duration-400">New Arrivals</Link></li>
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h4 className="text-[0.6rem] uppercase tracking-[0.25em] font-medium text-brand-charcoal/40 mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-[0.7rem] font-light text-brand-charcoal/60">
              <li><a href="mailto:atelier@arz.com" className="hover:text-brand-gold transition-colors duration-400">atelier@arz.com</a></li>
              <li><a href="tel:+18005550190" className="hover:text-brand-gold transition-colors duration-400">1.800.555.0190</a></li>
              <li className="text-brand-charcoal/40 text-[0.65rem]">Fifth Avenue, New York</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-charcoal/[0.05] pt-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[0.6rem] tracking-[0.2em] text-brand-charcoal/30 font-light">
            &copy; {new Date().getFullYear()} ARZ Made to feel effortless. All rights reserved.
          </span>
          <div className="flex space-x-7 text-[0.6rem] uppercase tracking-[0.25em] font-light text-brand-charcoal/40">
            <a href="https://www.instagram.com/arzbyaarshiya/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors duration-400">Instagram</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
