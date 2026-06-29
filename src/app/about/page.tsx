'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AtelierLayout } from '@/components/AtelierLayout';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.18 } },
};

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <AtelierLayout>
      {/* ─── HERO BANNER ─── */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-brand-charcoal">
        {/* Decorative grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Gradient veil */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-charcoal via-[#1a1510] to-[#0d0b08]" />

        {/* Decorative gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent origin-left"
        />

        <div className="relative editorial-container pb-20 pt-40">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[0.65rem] tracking-[0.4em] uppercase text-brand-gold/70 font-light mb-5"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-editorial text-5xl md:text-7xl lg:text-8xl font-light text-brand-white leading-[0.95] tracking-[-0.01em]"
          >
            About
            <br />
            <span className="italic text-brand-gold/90">Us</span>
          </motion.h1>

          {/* Bottom divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-charcoal/20 origin-left"
          />
        </div>
      </section>

      {/* ─── OPENING STATEMENT ─── */}
      <section className="py-28 md:py-36 bg-brand-white">
        <div className="editorial-container">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <motion.p
              variants={fadeUp}
              className="text-[0.6rem] tracking-[0.45em] uppercase text-brand-gold font-medium mb-10"
            >
              ARZ — Made to feel effortless
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="font-editorial text-3xl md:text-4xl lg:text-5xl font-light text-brand-charcoal leading-[1.25] tracking-[-0.01em]"
            >
              ARZ began with a simple love for beautiful fabrics, thoughtful details, and timeless traditions.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── DECORATIVE RULE ─── */}
      <div className="editorial-container">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-brand-charcoal/10 to-transparent" />
      </div>

      {/* ─── STORY BLOCKS ─── */}
      <section className="py-28 md:py-36 bg-brand-white">
        <div className="editorial-container">

          {/* Block 1 */}
          <AnimatedSection className="grid md:grid-cols-2 gap-16 md:gap-24 items-center mb-32 md:mb-40">
            {/* Number accent */}
            <motion.div variants={fadeUp} className="flex flex-col">
              <span className="font-editorial text-[7rem] md:text-[10rem] font-light text-brand-charcoal/[0.04] leading-none select-none mb-[-1rem]">
                01
              </span>
              <h2 className="font-editorial text-3xl md:text-4xl font-light text-brand-charcoal leading-snug mb-7">
                The Brand Was Created to Bring Together Classic Silhouettes
              </h2>
              <p className="text-sm md:text-base font-light text-brand-charcoal/60 leading-relaxed tracking-wide">
                Intricate craftsmanship and contemporary aesthetics—woven into every garment we make. We believe that clothing should carry meaning, not just fabric.
              </p>
            </motion.div>

            {/* Pull-quote card */}
            <motion.div
              variants={fadeUp}
              className="relative bg-brand-cream/40 border border-brand-charcoal/[0.06] p-10 md:p-14"
            >
              <div className="absolute top-6 left-8 text-5xl font-editorial text-brand-gold/30 leading-none select-none">&ldquo;</div>
              <p className="font-editorial text-xl md:text-2xl font-light text-brand-charcoal/80 leading-relaxed pt-6">
                What started as a passion soon became a dream—to create clothing that makes women feel confident, comfortable, and effortlessly elegant.
              </p>
              <div className="mt-8 w-10 h-[1px] bg-brand-gold/50" />
            </motion.div>
          </AnimatedSection>

          {/* Thin gold divider */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent mb-32 md:mb-40" />

          {/* Block 2 */}
          <AnimatedSection className="grid md:grid-cols-2 gap-16 md:gap-24 items-center mb-32 md:mb-40">
            {/* Pull-quote card (opposite side) */}
            <motion.div
              variants={fadeUp}
              className="relative bg-brand-charcoal p-10 md:p-14 order-2 md:order-1"
            >
              <div className="absolute top-6 left-8 text-5xl font-editorial text-brand-gold/20 leading-none select-none">&ldquo;</div>
              <p className="font-editorial text-xl md:text-2xl font-light text-brand-white/80 leading-relaxed pt-6">
                At ARZ, every piece is designed with intention, blending timeless elegance with modern sensibilities.
              </p>
              <div className="mt-8 w-10 h-[1px] bg-brand-gold/50" />
            </motion.div>

            <motion.div variants={fadeUp} className="order-1 md:order-2 flex flex-col">
              <span className="font-editorial text-[7rem] md:text-[10rem] font-light text-brand-charcoal/[0.04] leading-none select-none mb-[-1rem]">
                02
              </span>
              <h2 className="font-editorial text-3xl md:text-4xl font-light text-brand-charcoal leading-snug mb-7">
                More Than Just Clothing
              </h2>
              <p className="text-sm md:text-base font-light text-brand-charcoal/60 leading-relaxed tracking-wide">
                Our designs become a part of everyday moments, family celebrations, and cherished memories. We craft for the life you actually live—not just the one on a runway.
              </p>
            </motion.div>
          </AnimatedSection>

        </div>
      </section>

      {/* ─── CLOSING STATEMENT — FULL BLEED ─── */}
      <section className="relative bg-[#f9f5ef] overflow-hidden py-32 md:py-44">
        {/* Decorative large ARZ watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="font-editorial text-[18vw] font-light text-brand-charcoal/[0.03] uppercase tracking-[0.25em]">
            ARZ
          </span>
        </div>

        <div className="editorial-container relative">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <motion.p
              variants={fadeUp}
              className="text-[0.6rem] tracking-[0.45em] uppercase text-brand-gold font-medium mb-10"
            >
              Our Promise
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="font-editorial text-3xl md:text-4xl lg:text-5xl font-light text-brand-charcoal leading-[1.25] tracking-[-0.01em] mb-14"
            >
              Every ARZ piece is made to be worn, loved, and remembered.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/shop"
                className="inline-flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.3em] font-medium text-brand-charcoal border border-brand-charcoal/20 px-10 py-4 hover:bg-brand-charcoal hover:text-brand-white transition-all duration-500 group"
              >
                <span>Explore the Collection</span>
                <span className="block w-5 h-[1px] bg-current group-hover:w-8 transition-all duration-500" />
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── VALUES ROW ─── */}
      <section className="border-t border-brand-charcoal/[0.06] py-24 bg-brand-white">
        <div className="editorial-container">
          <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                num: '—01',
                title: 'Craftsmanship',
                body: 'Every stitch is placed with care. We work with skilled artisans who share our love for precision and detail.',
              },
              {
                num: '—02',
                title: 'Intentional Design',
                body: 'Nothing is accidental. From the drape of a fabric to the cut of a collar, each element serves a purpose.',
              },
              {
                num: '—03',
                title: 'Timeless Elegance',
                body: 'We design beyond seasons. ARZ pieces live in your wardrobe for years, growing more meaningful over time.',
              },
            ].map((v) => (
              <motion.div
                key={v.num}
                variants={fadeUp}
                className="flex flex-col border-t-2 border-brand-gold/30 pt-8"
              >
                <span className="text-[0.6rem] tracking-[0.35em] uppercase text-brand-gold/60 font-medium mb-5">
                  {v.num}
                </span>
                <h3 className="font-editorial text-xl font-light text-brand-charcoal mb-4">{v.title}</h3>
                <p className="text-[0.78rem] font-light text-brand-charcoal/55 leading-relaxed tracking-wide">{v.body}</p>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>
    </AtelierLayout>
  );
}
