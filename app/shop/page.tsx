"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";

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
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&auto=format&fit=crop&q=80",
    deliveryDays: "7-10 days",
    pages: "30-50 pages",
    popular: true,
  },
];

const sortOptions = ["Popular", "Price: Low to High", "Price: High to Low", "Newest"];

export default function ShopPage() {
  const bannerImages = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&auto=format&fit=crop&q=80"
  ];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");
  const [showSort, setShowSort] = useState(false);
  const [liveProducts, setLiveProducts] = useState(products);

  useEffect(() => {
    async function fetchLiveProducts() {
      try {
        const res = await api.get("/api/products");
        if (res.data && res.data.length > 0) {
          const merged = products.map(p => {
            const dbP = res.data.find((item: any) => item.slug === p.slug);
            if (dbP) {
              return {
                ...p,
                name: dbP.name || p.name,
                price: dbP.price || p.price,
                originalPrice: dbP.originalPrice || p.originalPrice,
                desc: dbP.description || p.desc,
                image: dbP.imageUrl || p.image,
              };
            }
            return p;
          });

          const extra = res.data
            .filter((dbP: any) => !products.some(p => p.slug === dbP.slug))
            .map((dbP: any, index: number) => ({
              id: 100 + index,
              slug: dbP.slug,
              name: dbP.name,
              category: "Magazine",
              price: dbP.price,
              originalPrice: dbP.originalPrice || dbP.price * 1.5,
              tag: "New",
              tagColor: "bg-green-100 text-green-700",
              desc: dbP.description || "",
              image: dbP.imageUrl || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80",
              deliveryDays: "7-10 days",
              pages: "12 pages",
              popular: false,
            }));

          setLiveProducts([...merged, ...extra]);
        }
      } catch (err) {
        console.error("Failed to load products from database:", err);
      }
    }
    fetchLiveProducts();
  }, []);

  const filtered = liveProducts
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      if (sortBy === "Popular") return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-background pt-24">

      <section className="relative h-[55vh] w-full flex items-center justify-center overflow-hidden">
        {/* Sliding Background Images */}
        <div className="absolute inset-0 z-0">
          {bannerImages.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: bgIndex === idx ? 0.65 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${src}')` }}
            />
          ))}
          {/* Vignettes and dark romantic overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/30 via-stone-950/60 to-background" />
          <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-50"
            style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(198,138,67,0.15) 0%, transparent 70%)" }} />
        </div>

        {/* Floating Ambient Sparks */}
        <div className="absolute top-1/4 left-1/4 text-white/20 text-xl animate-pulse select-none z-10">✨</div>
        <div className="absolute bottom-1/4 right-1/4 text-white/20 text-2xl animate-pulse select-none z-10">✨</div>

        {/* Centered Glassmorphic Content Card */}
        <div className="relative z-10 max-w-2xl mx-4 px-6 py-8 sm:p-10 bg-stone-950/40 backdrop-blur-xl border border-white/10 rounded-3xl text-center shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-sans-clean text-xs tracking-[0.25em] uppercase text-amber-400 font-bold block mb-4">
              The Celler of Love Stories
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-light text-white tracking-tight leading-none uppercase mb-5">
              Craft Your <span className="text-amber-400 font-serif font-normal italic lowercase">forever</span> Keepsake
            </h1>
            <p className="font-sans-clean text-stone-200 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Your beautiful milestones, romantic anniversaries, and forever adventures — woven into elegant print magazines, fine-art books, and cinematic reels. Handcrafted with love to last generations.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
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
              className="flex items-center gap-2 font-sans-clean text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 rounded-xl"
            >
              Sort by: {sortBy}
              <ChevronDown size={14} />
            </Button>

            {showSort && (
              <div className="absolute right-0 top-10 bg-white border border-stone-100 rounded-xl shadow-xl overflow-hidden z-50 w-48">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSortBy(opt);
                      setShowSort(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-stone-50 text-stone-700 text-xs font-medium font-sans-clean transition-colors border-b border-stone-50 last:border-0"
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
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-100 flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <span className={"absolute top-3 left-3 px-3 py-1 text-[10px] font-sans-clean font-bold tracking-wider uppercase rounded-full shadow-md " + p.tagColor}>
                  {p.tag}
                </span>
                <span className="absolute top-3 right-3 px-2 py-1 bg-amber-500 text-stone-900 text-[10px] font-sans-clean font-bold rounded-full shadow-md">
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
                    <Link href={"/product/" + p.slug}>
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
            href="https://wa.me/9871874041"
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