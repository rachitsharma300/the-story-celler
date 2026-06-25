"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["All", "Magazine", "Album", "Reels", "Frame"];

const products = [
  {
    id: 1,
    slug: "custom-magazine",
    name: "Custom Magazine",
    category: "Magazine",
    price: 1200,
    originalPrice: 1800,
    tag: "Bestseller",
    tagColor: "bg-amber-100 text-amber-700",
    desc: "Fully personalized magazine with your memories and stories. Choose from 10-30 pages.",
    emoji: "📖",
    deliveryDays: "7-10 days",
    pages: "10-30 pages",
    popular: true,
  },
  {
    id: 2,
    slug: "photo-album",
    name: "Photo Album",
    category: "Album",
    price: 1500,
    originalPrice: 2000,
    tag: "Premium",
    tagColor: "bg-purple-100 text-purple-700",
    desc: "Beautifully bound album with custom layouts and premium paper quality.",
    emoji: "🖼️",
    deliveryDays: "7-10 days",
    pages: "20-50 pages",
    popular: true,
  },
  {
    id: 3,
    slug: "recap-reel",
    name: "Recap Reel",
    category: "Reels",
    price: 550,
    originalPrice: 800,
    tag: "New",
    tagColor: "bg-green-100 text-green-700",
    desc: "A cinematic video reel of your best memories. Perfect for sharing on socials.",
    emoji: "🎬",
    deliveryDays: "2-4 days",
    pages: "60-90 sec",
    popular: false,
  },
  {
    id: 4,
    slug: "custom-frame",
    name: "Custom Frame",
    category: "Frame",
    price: 650,
    originalPrice: 900,
    tag: "Popular",
    tagColor: "bg-rose-100 text-rose-700",
    desc: "Premium framed print to display your favorite moment on any wall.",
    emoji: "🪞",
    deliveryDays: "5-7 days",
    pages: "A4 / A3",
    popular: false,
  },
  {
    id: 5,
    slug: "birthday-magazine",
    name: "Birthday Magazine",
    category: "Magazine",
    price: 1400,
    originalPrice: 2000,
    tag: "Trending",
    tagColor: "bg-amber-100 text-amber-700",
    desc: "Surprise your loved one with a birthday-themed custom magazine full of memories.",
    emoji: "🎂",
    deliveryDays: "7-10 days",
    pages: "10-20 pages",
    popular: true,
  },
  {
    id: 6,
    slug: "anniversary-album",
    name: "Anniversary Album",
    category: "Album",
    price: 1800,
    originalPrice: 2500,
    tag: "Premium",
    tagColor: "bg-purple-100 text-purple-700",
    desc: "Celebrate your love story with a beautifully crafted anniversary photo album.",
    emoji: "💑",
    deliveryDays: "7-10 days",
    pages: "30-50 pages",
    popular: true,
  },
];

const sortOptions = ["Popular", "Price: Low to High", "Price: High to Low", "Newest"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");
  const [showSort, setShowSort] = useState(false);

  const filtered = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      if (sortBy === "Popular") return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-background pt-24">

      <section className="bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 py-16 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-sans-clean text-xs tracking-widest uppercase text-amber-500 font-bold">Our Collection</span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-stone-900 mt-3 mb-4">
              Craft Your Keepsake
            </h1>
            <p className="font-sans-clean text-stone-500 max-w-xl mx-auto text-base">
              Every product is handcrafted with love. Choose what fits your memory best.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter size={16} className="text-stone-400 shrink-0" />
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                variant={activeCategory === cat ? "default" : "secondary"}
                size="sm"
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="relative shrink-0">
            <Button
              onClick={() => setShowSort(!showSort)}
              variant="secondary"
              size="sm"
              className="flex items-center gap-2"
            >
              {sortBy}
              <ChevronDown size={14} className={showSort ? "rotate-180 transition-transform" : "transition-transform"} />
            </Button>
            {showSort && (
              <div className="absolute right-0 top-10 bg-white border border-stone-100 rounded-xl shadow-xl overflow-hidden z-50 w-48">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSortBy(opt); setShowSort(false); }}
                    className={
                      "w-full text-left px-4 py-3 font-sans-clean text-sm transition-colors " +
                      (sortBy === opt
                        ? "bg-amber-50 text-amber-600 font-semibold"
                        : "text-stone-600 hover:bg-stone-50")
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="font-sans-clean text-sm text-stone-400 mb-8">
          Showing <span className="text-stone-700 font-semibold">{filtered.length}</span> products
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-52 bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 flex items-center justify-center overflow-hidden">
                <motion.span
                  animate={{ scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  className="text-7xl"
                >
                  {p.emoji}
                </motion.span>
                <span className={"absolute top-3 left-3 px-3 py-1 text-[10px] font-sans-clean font-bold tracking-wider uppercase rounded-full " + p.tagColor}>
                  {p.tag}
                </span>
                <span className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-[10px] font-sans-clean font-bold rounded-full">
                  {Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-stone-900 mb-1">{p.name}</h3>
                <p className="font-sans-clean text-sm text-stone-500 leading-relaxed mb-4">{p.desc}</p>
                <div className="flex gap-4 mb-5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs">📦</span>
                    <span className="font-sans-clean text-xs text-stone-400">{p.deliveryDays}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs">📄</span>
                    <span className="font-sans-clean text-xs text-stone-400">{p.pages}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-display text-2xl font-bold text-stone-900">
                      {"₹" + p.price.toLocaleString()}
                    </span>
                    <span className="font-sans-clean text-sm text-stone-400 line-through ml-2">
                      {"₹" + p.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <Button asChild size="lg" variant="default">
                    <Link href={"product/" + p.slug}>
                      Order Now
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-stone-900 dark:bg-stone-950 mt-12 border-t dark:border-stone-850">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
            Not sure what to pick?
          </h2>
          <p className="font-sans-clean text-stone-400 mb-8">
            Chat with us on WhatsApp and we will help you choose the perfect keepsake.
          </p>
          <a
            href="https://wa.me/917903316723"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-sans-clean font-semibold rounded-full transition-all duration-300"
          >
            <span>💬</span>
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>

    </div>
  );
}