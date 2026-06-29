import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ARZ | Where Elegance Becomes Identity",
  description: "Discover ARZ, a luxury fashion house founded by Aarshiya Grover. Highly-crafted premium garments designed for the modern wardrobe. Cashmere, organic linen, and tailored staples.",
  keywords: ["ARZ", "ARZ Made to feel effortless", "Aarshiya Grover", "luxury fashion", "minimalist clothing", "slow fashion", "organic linen", "cashmere", "sustainable fashion"],
  authors: [{ name: "Aarshiya Grover" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${inter.variable} font-sans antialiased bg-brand-white text-brand-charcoal`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
