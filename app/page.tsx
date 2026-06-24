"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const products = [
  {
    id: 1,
    name: "Custom Magazine",
    price: "From ₹1,200",
    tag: "Bestseller",
    desc: "Fully personalized magazine with your memories & stories.",
    emoji: "📖",
  },
  {
    id: 2,
    name: "Photo Album",
    price: "From ₹1,500",
    tag: "Premium",
    desc: "Beautifully bound album with custom layouts.",
    emoji: "🖼️",
  },
  {
    id: 3,
    name: "Recap Reels",
    price: "₹550",
    tag: "New",
    desc: "A cinematic video reel of your best memories.",
    emoji: "🎬",
  },
  {
    id: 4,
    name: "Custom Frame",
    price: "₹650",
    tag: "Popular",
    desc: "Premium framed print to display your favorite moment.",
    emoji: "🪞",
  },
];

const reviews = [
  {
    name: "Simran Agarwal",
    city: "New Delhi",
    text: "Insanely perfect! My partner loved the concept. Everything is top notch.",
    stars: 5,
  },
  {
    name: "Pratika Karnam",
    city: "Ahmedabad",
    text: "Got a 20 pager magazine for my anniversary. The team was very helpful throughout.",
    stars: 5,
  },
  {
    name: "Muskan Agarwal",
    city: "New Delhi",
    text: "They caught the essence I wanted and presented it in the most beautiful way. Exceeded all expectations!",
    stars: 5,
  },
  {
    name: "Ashwin Sharma",
    city: "Pune",
    text: "Very good quality of work and totally worth the price!",
    stars: 5,
  },
];

const faqs = [
  {
    q: "What happens after I place the order?",
    a: "Our team reviews your details and contacts you for confirmation. Once confirmed, we start working and provide updates throughout.",
  },
  {
    q: "How long does the process take?",
    a: "Magazines and albums take 7-10 days to deliver. Recap videos are ready within 2-4 days.",
  },
  {
    q: "How does payment work?",
    a: "50% advance payment to confirm the order. Remaining 50% after design approval before dispatch.",
  },
  {
    q: "Is free shipping available?",
    a: "Yes! We offer free shipping pan India on all orders.",
  },
  {
    q: "Can I request revisions?",
    a: "Yes, up to 3-4 revisions are included. Minor tweaks are always free.",
  },
];

const stats = [
  { value: 500, suffix: "+", label: "Stories Captured" },
  { value: 450, suffix: "+", label: "Keepsakes Delivered" },
  { value: 100, suffix: "+", label: "Happy Reviews" },
];

function StatCountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // 1.5s
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <>{count}{suffix}</>;
}

export default function HomePage() {
  return (
    <div className="overflow-x-hidden relative bg-background min-h-screen">

      {/* ── HERO REDESIGN ── */}
      <section className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden">
        
        {/* Subtle noise paper texture overlay */}
        <div className="bg-noise-overlay absolute inset-0 pointer-events-none" />

        {/* Ambient glows & cinematic lighting */}
        <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-gradient-to-br from-amber-500/10 to-transparent dark:from-amber-500/5 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-gradient-to-tl from-amber-600/8 to-transparent dark:from-amber-600/5 blur-[140px] rounded-full pointer-events-none" />
        
        {/* Central radial gold light spotlight */}
        <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-45 dark:opacity-60"
             style={{ backgroundImage: "radial-gradient(circle at 50% 30%, rgba(198,138,67,0.05) 0%, transparent 60%)" }} />

        {/* Subtle Vignette shadow */}
        <div className="absolute inset-0 pointer-events-none bg-vignette" />

        {/* Sparkles / Particles */}
        <div className="absolute top-1/4 right-[25%] pointer-events-none text-2xl animate-pulse text-amber-500/40 select-none hidden lg:block">✨</div>
        <div className="absolute bottom-1/3 left-1/3 pointer-events-none text-xl animate-pulse text-amber-600/30 select-none hidden lg:block">✨</div>
        <div className="absolute top-1/2 right-[10%] pointer-events-none w-3 h-3 bg-amber-500/15 rounded-full blur-sm animate-ping hidden lg:block" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh]">

            {/* ── LEFT COLUMN (EDITORIAL WRITER) ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="flex flex-col justify-center"
            >
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex px-4 py-1.5 border border-border bg-surface text-amber-500 font-sans-clean text-[10px] font-bold tracking-[0.25em] uppercase rounded-full mb-6 w-fit shadow-sm"
              >
                FOREVER IN ART, FOREVER IN HEART
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-stone-900 leading-[1.05] mb-6 uppercase tracking-tight"
              >
                YOUR MEMORIES<br />
                <span className="text-amber-500 italic font-normal font-serif lowercase pr-3">beautifully</span>
                <span className="font-extrabold text-amber-500 tracking-tighter">ARCHIVED</span><br />
                FOREVER.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="font-sans-clean text-sm sm:text-base text-stone-500 max-w-md mb-10 leading-relaxed"
              >
                Your memories deserve more than a digital screen.<br className="hidden sm:inline" />
                Transform your life's moments into timeless keepsakes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex flex-col sm:flex-row gap-4 mb-14"
              >
                <Link href="/shop"
                  className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white dark:text-stone-950 font-sans-clean font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-1 text-center text-xs tracking-widest uppercase">
                  Explore Collection
                </Link>
                <Link href="/shop"
                  className="px-8 py-4 border border-amber-500 text-amber-500 hover:bg-amber-500/5 font-sans-clean font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1 text-center text-xs tracking-widest uppercase">
                  Create Your Story
                </Link>
              </motion.div>

              {/* Stats Block */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap items-center gap-6 md:gap-10 mt-4"
              >
                {stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center">
                    {i > 0 && <div className="h-8 w-px bg-border mr-6 md:mr-10" />}
                    <div>
                      <p className="font-display text-3xl font-extrabold text-stone-900 leading-none mb-1">
                        <StatCountUp end={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="font-sans-clean text-[9px] text-stone-400 uppercase tracking-widest font-semibold">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── RIGHT COLUMN (FLOATING 3D PHOTO FRAMES) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="relative flex items-center justify-center h-[520px] lg:h-[620px] w-full max-w-lg mx-auto"
              style={{ perspective: "1200px" }}
            >
              {/* Frame 1: Center-Left Wedding Magazine Cover */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0], 
                  rotate: [-4, -2, -4],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateX: -12, 
                  rotateY: 12, 
                  zIndex: 40,
                  transition: { duration: 0.3 } 
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="absolute left-[3%] top-[10%] w-56 h-[320px] sm:w-64 sm:h-[360px] rounded-2xl bg-card border border-border p-3.5 shadow-2xl z-20 cursor-pointer"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden border border-border/20 shadow-inner flex flex-col justify-between bg-stone-100"
                     style={{ transform: "translateZ(10px)" }}>
                  <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover" alt="Wedding Magazine" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-stone-950/35" />
                  
                  {/* Glass Tag */}
                  <div className="relative z-10 p-3 flex justify-between items-start text-white">
                    <span className="font-sans-clean text-[8px] font-bold tracking-[0.2em] bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">VOGUE STYLE</span>
                    <span className="font-display text-[9px] font-bold text-amber-300">ED. 01</span>
                  </div>
                  
                  {/* Vogue style watermark */}
                  <div className="absolute inset-x-0 top-[35%] flex justify-center pointer-events-none">
                    <span className="font-display text-5xl sm:text-6xl text-white/15 tracking-[0.15em] uppercase select-none font-bold">VOGUE</span>
                  </div>

                  {/* Caption */}
                  <div className="relative z-10 p-4 text-white">
                    <p className="font-display text-[11px] font-semibold tracking-widest text-amber-300 mb-0.5 uppercase">The Wedding Journal</p>
                    <p className="font-display text-base font-black leading-none mb-1 tracking-tight">Amit & Priya</p>
                    <p className="font-sans-clean text-[9px] text-stone-300">December 18, 2024</p>
                  </div>
                </div>
              </motion.div>

              {/* Frame 2: Top-Right Classic Wedding Album Frame */}
              <motion.div
                animate={{ 
                  y: [0, 18, 0], 
                  rotate: [5, 7, 5],
                }}
                transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateX: -10, 
                  rotateY: -12, 
                  zIndex: 40,
                  transition: { duration: 0.3 } 
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="absolute right-[4%] top-[6%] w-48 h-[270px] sm:w-52 sm:h-[300px] rounded-xl bg-card border-[12px] border-card shadow-2xl p-0.5 z-10 cursor-pointer border border-border"
              >
                <div className="relative w-full h-full rounded border border-border/40 overflow-hidden flex flex-col justify-end bg-stone-100"
                     style={{ transform: "translateZ(8px)" }}>
                  <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover grayscale contrast-105 brightness-95" alt="B&W Frame" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
                  <div className="relative z-10 p-3 text-white bg-stone-950/20 backdrop-blur-[1px]">
                    <p className="font-display text-xs font-semibold tracking-wider leading-tight">Anniversary Book</p>
                    <p className="text-[7px] text-stone-300 tracking-widest uppercase mt-0.5">Matte Fine-Art Print</p>
                  </div>
                </div>
              </motion.div>

              {/* Frame 3: Center-Bottom Minimalist Travel Cover */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0], 
                  rotate: [-3, -1, -3],
                }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                whileHover={{ 
                  scale: 1.06, 
                  rotateX: 12, 
                  rotateY: 8, 
                  zIndex: 40,
                  transition: { duration: 0.3 } 
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="absolute left-[16%] bottom-[8%] w-44 h-[240px] sm:w-48 sm:h-[260px] rounded-2xl bg-card/65 backdrop-blur-md border border-border/80 p-3 shadow-xl z-30 cursor-pointer"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden flex flex-col justify-between p-3.5 bg-stone-100"
                     style={{ transform: "translateZ(12px)" }}>
                  <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover" alt="Travel Diaries" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-stone-950/20" />
                  <div className="relative z-10 flex justify-end">
                    <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded border border-white/20 text-[7px] font-sans-clean font-bold text-white uppercase tracking-wider">TRAVEL</span>
                  </div>
                  <div className="relative z-10 text-white">
                    <p className="font-serif text-[10px] italic text-amber-300">Edition 08</p>
                    <p className="font-display text-base font-bold tracking-tight">Wanderlust Days</p>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="font-sans-clean text-xs tracking-widest uppercase text-amber-500 font-semibold">Our Products</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-900 mt-3">
              Craft Your Keepsake
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-stone-50 hover:bg-amber-50 rounded-2xl p-6 border border-stone-100 hover:border-amber-200 transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-4">{p.emoji}</div>
                <span className="inline-block px-2.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-sans-clean font-bold tracking-wider uppercase rounded-full mb-3">
                  {p.tag}
                </span>
                <h3 className="font-display text-xl font-bold text-stone-900 mb-2">{p.name}</h3>
                <p className="font-sans-clean text-sm text-stone-500 mb-4 leading-relaxed">{p.desc}</p>
                <p className="font-sans-clean font-bold text-amber-600 text-lg">{p.price}</p>
                <Link href="/shop"
                  className="mt-4 block text-center py-2.5 bg-stone-900 group-hover:bg-amber-500 text-white text-sm font-sans-clean font-semibold rounded-xl transition-all duration-300">
                  Order Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-sans-clean text-xs tracking-widest uppercase text-amber-500 font-semibold">Simple Process</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-900 mt-3">How It Works</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Place Order", desc: "Choose your product and pay 50% advance to confirm.", icon: "🛒" },
              { step: "02", title: "Share Content", desc: "Send us your photos, videos and memories via WhatsApp.", icon: "📤" },
              { step: "03", title: "We Design", desc: "Our team crafts your personalized keepsake in 24-48 hrs.", icon: "🎨" },
              { step: "04", title: "Delivered!", desc: "Approve the design and receive your keepsake at home.", icon: "📦" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  {item.icon}
                </div>
                <span className="font-sans-clean text-xs text-amber-400 font-bold tracking-widest">{item.step}</span>
                <h3 className="font-display text-xl font-bold text-stone-900 mt-1 mb-2">{item.title}</h3>
                <p className="font-sans-clean text-sm text-stone-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-sans-clean text-xs tracking-widest uppercase text-amber-500 font-semibold">Testimonials</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-900 mt-3">What People Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-stone-50 rounded-2xl p-6 border border-stone-100"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(r.stars)].map((_, j) => (
                    <span key={j} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="font-sans-clean text-sm text-stone-600 leading-relaxed mb-4">"{r.text}"</p>
                <div>
                  <p className="font-sans-clean font-semibold text-stone-900 text-sm">{r.name}</p>
                  <p className="font-sans-clean text-xs text-stone-400">{r.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-sans-clean text-xs tracking-widest uppercase text-amber-500 font-semibold">FAQ</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-900 mt-3">Common Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-stone-100"
              >
                <h3 className="font-sans-clean font-semibold text-stone-900 mb-2">{faq.q}</h3>
                <p className="font-sans-clean text-sm text-stone-500 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-white mb-6">
              Ready to Archive Your{" "}
              <span className="text-amber-400 italic">Story?</span>
            </h2>
            <p className="font-sans-clean text-stone-400 text-lg mb-10 max-w-xl mx-auto">
              Join 500+ happy customers who turned their memories into forever keepsakes.
            </p>
            <Link href="/shop"
              className="inline-block px-10 py-4 bg-amber-500 hover:bg-amber-400 text-white font-sans-clean font-bold text-lg rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-1">
              Start Your Order
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}