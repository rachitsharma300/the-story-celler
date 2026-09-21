"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, Star, Heart } from "lucide-react";

const heroBackgrounds = ["/default.png", "/default2.png"];

const marqueeItems = [
  "Free Shipping on All Orders",
  "Cash on Delivery Available",
  "10,000+ Happy Customers",
  "500+ Couples Helped",
  "Easy WhatsApp Support",
  "Perfect for Gifting",
  "Custom Designed",
  "Fast and Easy Process"
];

export default function HeroSection() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBgIndex((p) => (p + 1) % heroBackgrounds.length), 10000);
    return () => clearInterval(t);
  }, []);

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65B62] focus-visible:ring-offset-2";

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-[#FAF4F5]">
        {/* Background Image Crossfade Slider */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#FAF4F5]">
          <AnimatePresence initial={false}>
            <motion.div
              key={bgIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <Image
                src={heroBackgrounds[bgIndex]}
                alt="Mockup background scene showing couple photo frame"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center lg:object-right"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/[0.02] z-[1]" />

          {/* Overlay gradients for readability */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[60%] bg-gradient-to-r from-[#FAF4F5]/98 via-[#FAF4F5]/90 via-[#FAF4F5]/50 to-transparent z-10 hidden lg:block pointer-events-none" />
          <div className="absolute inset-0 bg-[#FAF4F5]/85 lg:hidden z-10 pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-8 flex flex-col justify-center text-left">
              {/* Badge with Floating Hearts */}
              <div className="relative w-fit mb-6">
                <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
                  <span className="absolute text-rose-400/90 animate-float-heart-1 left-[10%] text-xs" style={{ animationDelay: "0s", animationDuration: "4s" }}>❤️</span>
                  <span className="absolute text-rose-500/80 animate-float-heart-2 left-[28%] text-[10px]" style={{ animationDelay: "0.8s", animationDuration: "3.5s" }}>❤️</span>
                  <span className="absolute text-pink-500/85 animate-float-heart-1 left-[48%] text-sm" style={{ animationDelay: "1.5s", animationDuration: "4.5s" }}>❤️</span>
                  <span className="absolute text-rose-400/80 animate-float-heart-2 left-[65%] text-xs" style={{ animationDelay: "2.2s", animationDuration: "3.8s" }}>❤️</span>
                  <span className="absolute text-rose-500/75 animate-float-heart-1 left-[82%] text-[10px]" style={{ animationDelay: "2.9s", animationDuration: "4.2s" }}>❤️</span>
                  <span className="absolute text-pink-400/70 animate-float-heart-2 left-[95%] text-xs" style={{ animationDelay: "1.1s", animationDuration: "3.9s" }}>❤️</span>
                </div>

                <div className="relative z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/95 border border-[#A65B62]/20 text-[#A65B62] font-sans-clean text-[10px] font-bold tracking-[0.2em] uppercase rounded-full shadow-sm">
                  <Sparkles size={11} className="text-[#A65B62]" /> Turn your moments into timeless art
                </div>
              </div>

              {/* Headline */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-stone-900 leading-[1.08] mb-6 tracking-tight">
                Your Memories,<br />
                <span className="text-[#A65B62] italic font-serif lowercase">beautifully</span> Framed.
              </h1>

              {/* Subheading */}
              <p className="font-sans-clean text-sm sm:text-base text-stone-500 max-w-md mb-8 leading-relaxed">
                Custom designed photo frames that preserve your story forever.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
                <Link href="/shop"
                  className={`group px-7 py-3.5 bg-[#A65B62] hover:bg-[#8F4A50] text-white font-sans-clean font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#A65B62]/20 hover:-translate-y-0.5 text-center text-xs tracking-widest uppercase flex items-center justify-center gap-1 w-full sm:w-auto ${focusRing}`}>
                  Design Your Frame <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link href="/shop"
                  className={`px-7 py-3.5 border-2 border-[#A65B62] text-[#A65B62] hover:bg-[#A65B62]/5 font-sans-clean font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-center text-xs tracking-widest uppercase flex items-center justify-center gap-1 w-full sm:w-auto ${focusRing}`}>
                  View Collections
                </Link>
              </div>

              {/* Premium Trust Social Proof Block */}
              <div className="flex flex-col gap-3 w-fit">
                <div className="flex items-stretch gap-0 bg-white/90 backdrop-blur-md border border-[#A65B62]/15 rounded-2xl overflow-hidden shadow-[0_8px_30px_-8px_rgba(166,91,98,0.12)] w-fit">
                  {/* Left Pill: 10K+ Happy Customers */}
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-[#FAF4F5] to-white border-r border-[#A65B62]/10">
                    <div className="flex -space-x-2 overflow-hidden shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                        alt="Customer portrait preview"
                        width={28}
                        height={28}
                        className="inline-block rounded-full ring-2 ring-white object-cover"
                      />
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                        alt="Customer portrait preview"
                        width={28}
                        height={28}
                        className="inline-block rounded-full ring-2 ring-white object-cover"
                      />
                      <Image
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                        alt="Customer portrait preview"
                        width={28}
                        height={28}
                        className="inline-block rounded-full ring-2 ring-white object-cover"
                      />
                    </div>

                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-1">
                        <span className="font-display font-black text-sm text-stone-900 leading-none">10,000+</span>
                        <span className="font-sans-clean text-[9px] font-bold text-[#A65B62] uppercase tracking-wider">Keepsakes</span>
                      </div>
                      <span className="font-sans-clean text-[10px] text-stone-500 font-medium">Delivered across India</span>
                    </div>
                  </div>

                  {/* Right Pill: Star Rating */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-white">
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-1">
                        <div className="flex items-center text-amber-500">
                          <Star size={11} className="fill-current" />
                          <Star size={11} className="fill-current" />
                          <Star size={11} className="fill-current" />
                          <Star size={11} className="fill-current" />
                          <Star size={11} className="fill-current" />
                        </div>
                        <span className="font-display font-bold text-xs text-stone-900 leading-none">4.9/5</span>
                      </div>
                      <span className="font-sans-clean text-[10px] text-stone-500 font-medium">Customer Satisfaction</span>
                    </div>
                  </div>
                </div>

                {/* Sub-trust guarantee badge */}
                <div className="flex items-center gap-3 px-1 text-[11px] font-sans-clean text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                    Free Proof Before Print
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A65B62] inline-block"></span>
                    100% Custom Handmade
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile-Only Visual Mockup Card */}
            <div className="lg:hidden flex justify-center relative mt-4">
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/50 bg-white/40 backdrop-blur-sm p-3 group">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/default.png"
                    alt="The Story Celler luxury memory frame showcase"
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 backdrop-blur-md rounded-xl border border-white/40 shadow-lg flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-sans-clean font-bold text-[#A65B62] uppercase tracking-wider block">Featured Artwork</span>
                      <p className="font-display text-sm font-bold text-stone-900">Custom Memory Magazine & Frame</p>
                    </div>
                    <Link href="/product/custom-magazine" className="px-3.5 py-1.5 bg-[#A65B62] text-white text-[11px] font-sans-clean font-bold rounded-lg hover:bg-[#8F4A50] transition-colors">
                      Customize
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Marquee Announcement Bar */}
      <div className="bg-[#A65B62] text-white py-3 overflow-hidden border-y border-white/10 select-none">
        <div className="animate-marquee flex items-center space-x-12 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-4 font-sans-clean text-xs font-bold tracking-widest uppercase text-white/90">
              <Sparkles size={12} className="text-amber-300" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
