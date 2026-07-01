"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Star, BookOpen, ChevronDown, Heart, ArrowRight } from "lucide-react";
import SampleFlipbookModal from "@/components/sections/SampleFlipbookModal";
import api from "@/lib/axios";

function AutoImageSlider({ images, className = "" }: { images: string[]; className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <div 
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div key={idx} className="w-full h-full flex-shrink-0 relative animate-fade-in">
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const customCollection = [
  {
    id: "custom-magazine",
    name: "Custom Magazine",
    slug: "custom-magazine",
    price: "From ₹1,200.00",
    tag: "Sale!",
    desc: "Crafted around your memories with personalized storytelling, custom layouts, and thoughtful details.",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&auto=format&fit=crop&q=80"
    ],
    rating: "4.9",
    reviewsCount: "127 reviews"
  },
  {
    id: "photo-album",
    name: "Photo Album",
    slug: "photo-album",
    price: "From ₹1,500.00",
    tag: "Sale!",
    desc: "Beautifully bound album with custom layouts and premium paper quality.",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=200&auto=format&fit=crop&q=80"
    ],
    rating: "4.9",
    reviewsCount: "94 reviews"
  }
];

const quickCreate = [
  {
    id: "recap-reel",
    name: "Recap Reels",
    slug: "recap-reel",
    price: "₹550.00",
    originalPrice: "₹750.00",
    tag: "Sale!",
    desc: "A cinematic video reel of your best memories. Perfect for sharing on socials.",
    images: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "custom-frame",
    name: "Custom Frame",
    slug: "custom-frame",
    price: "₹650.00",
    originalPrice: "₹850.00",
    tag: "Sale!",
    desc: "Premium framed print to display your favorite moment on any wall.",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=200&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "birthday-magazine",
    name: "Birthday Magazine – Quick",
    slug: "birthday-magazine",
    price: "From ₹699.00",
    tag: "Trending",
    desc: "Surprise your loved one with a birthday-themed custom magazine.",
    images: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=200&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "anniversary-album",
    name: "Anniversary Magazine – Quick",
    slug: "anniversary-album",
    price: "From ₹699.00",
    tag: "Bestseller",
    desc: "Celebrate your love story with a beautifully crafted anniversary photo album.",
    images: [
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=200&auto=format&fit=crop&q=80"
    ]
  }
];

const staticSamples = [
  {
    id: "wedding-nandita",
    title: "Nandita's Wedding",
    pageText: "12 Pages",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-rose-100 text-rose-700",
    pdfUrl: "/samples/nandita-wedding.pdf",
    pageCount: 12
  },
  {
    id: "anniversary-ashish",
    title: "Ashish's Anniversary",
    pageText: "12 Pages",
    coverImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-amber-100 text-amber-700",
    pdfUrl: "/samples/ashish-anniversary.pdf",
    pageCount: 12
  },
  {
    id: "wedding-timeless",
    title: "Timeless Wedding",
    pageText: "12 Pages",
    coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-rose-100 text-rose-700",
    pdfUrl: "/samples/timeless-wedding.pdf",
    pageCount: 12
  },
  {
    id: "birthday-sonali",
    title: "Sonali's Birthday",
    pageText: "16 Pages",
    coverImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-yellow-100 text-yellow-700",
    pdfUrl: "/samples/sonali-birthday.pdf",
    pageCount: 16
  },
  {
    id: "travel-amandeep",
    title: "Amandeep's Travel",
    pageText: "20 Pages",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-emerald-100 text-emerald-700",
    pdfUrl: "/samples/amandeep-travel.pdf",
    pageCount: 20
  },
  {
    id: "engagement-fenil",
    title: "Fenil's Engagement",
    pageText: "16 Pages",
    coverImage: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-purple-100 text-purple-700",
    pdfUrl: "/samples/fenil-engagement.pdf",
    pageCount: 16
  },
  {
    id: "honeymoon-sarthak",
    title: "Sarthak's Honeymoon",
    pageText: "12 Pages",
    coverImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-indigo-100 text-indigo-700",
    pdfUrl: "/samples/sarthak-honeymoon.pdf",
    pageCount: 12
  },
  {
    id: "engagement-denish",
    title: "Denish's Engagement",
    pageText: "20 Pages",
    coverImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-rose-100 text-rose-700",
    pdfUrl: "/samples/denish-engagement.pdf",
    pageCount: 20
  },
  {
    id: "prewedding-parsha",
    title: "Parsha's Pre-Wedding",
    pageText: "12 Pages",
    coverImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-slate-100 text-slate-700",
    pdfUrl: "/samples/parsha-prewedding.pdf",
    pageCount: 12
  },
  {
    id: "valentines-aditi",
    title: "Aditi's Valentine",
    pageText: "16 Pages",
    coverImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-sky-100 text-sky-700",
    pdfUrl: "/samples/aditi-valentines.pdf",
    pageCount: 16
  },
  {
    id: "birthday-yash",
    title: "Yash's Birthday",
    pageText: "12 Pages",
    coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-teal-100 text-teal-700",
    pdfUrl: "/samples/yash-birthday.pdf",
    pageCount: 12
  },
  {
    id: "travel-yashanjli",
    title: "Yashanjli's Travel",
    pageText: "8 Pages",
    coverImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-amber-100 text-amber-700",
    pdfUrl: "/samples/yashanjli-travel.pdf",
    pageCount: 8
  }
];

const reviews = [
  {
    name: "Shameena Shahin",
    city: "Chennai",
    stars: 5,
    text: "Their product was absolutely amazing, and working with the team was a truly pleasant experience. They provided thoughtful, understanding support every step of the way. I had a wonderful experience and I highly recommend this creative, dedicated team to anyone looking for exceptional results.✨"
  },
  {
    name: "Yashvi Changela",
    city: "Ahmedabad",
    stars: 5,
    text: "A heartfelt thank you to the MSA team for making my husband’s birthday so special! Your efforts created lifelong memories for us, making our evening truly unforgettable."
  },
  {
    name: "Ashwin Sharma",
    city: "Pune",
    stars: 5,
    text: "Very good quality of work and totally worth the price! Lovedddd ittt"
  },
  {
    name: "Akanksha Razdan",
    city: "Gurgaon",
    stars: 5,
    text: "Absolutely loved their work. The way they narrated the entire story and gave it a life gave me goosebumps. Every emotion was written beautifully 💗 Thankyou so much for making such a special thing for us ."
  },
  {
    name: "Simran Agarwal",
    city: "New Delhi",
    stars: 5,
    text: "I recently ordered my first magazine with them. It was insanely perfect♥️ My partner loved the concept. From Printing to Concept visualisation everything is top notch. Thank you team MSA"
  },
  {
    name: "Pratika Karnam",
    city: "Ahmedabad",
    stars: 5,
    text: "Got a 20 pager magazine done from My Story Archive for my first wedding anniversary. It has come beautifully. The team was very helpful throughout. Very patient during the planning and design phase. The end result is just amazing. I loved it. Keep up the good work guys ❤️"
  },
  {
    name: "Shruti Shrivastava",
    city: "New Delhi",
    stars: 5,
    text: "If you decide to gift your partner this magazine then will be the best thoughtful gift for them. The print quality of the product is very nice. People at MSA are also cooperative, they appreciate and accept the feedback gracefully."
  },
  {
    name: "Muskan Agarwal",
    city: "New Delhi",
    stars: 5,
    text: "My story Archive made amazing magazine for my anniversary. They caught the essence that I wanted and presented in the most beautiful way possible. Exceeded all my expectations. Great work done by the entire team!"
  }
];

const faqs = [
  {
    q: "What happens after I place the order?",
    a: "Our team will review your details and contact you for confirmation. Once confirmed, we start working on your order and provide updates throughout the process."
  },
  {
    q: "What is the process for custom magazines?",
    a: "After order confirmation, we create a dedicated WhatsApp group. You fill out our questionnaire content form (sharing layout styles, facts, milestones, quotes), and upload your photos. Our team designs a draft preview, sends it to you, and makes revisions based on your feedback until you approve it for print."
  },
  {
    q: "What is the process for Recap Video?",
    a: "You share your video clips, photos, and music preferences with us via WhatsApp. Our editor constructs a high-quality, synchronized 60-90 second cinematic recap reel. We send a draft for quick revisions and export the final reel in HD."
  },
  {
    q: "How do you write content for my magazine or album?",
    a: "We have an in-house team of creative editorial writers. Based on the notes, facts, and timelines you supply in the content form, we write customized captions, storytelling descriptions, and quotes to narrate your memories beautifully."
  },
  {
    q: "How long does the process take?",
    a: "The custom design and drafting phase takes 2-4 days. Printing and assembly take 2-3 days, and shipping takes 3-5 days. Most physical orders are delivered in 7-12 days. Digital-only recap reels are ready in 2-4 days."
  },
  {
    q: "How many pictures are required for magazines?",
    a: "It varies by page selection: 8 pages require 16-25 photos, 12 pages require 25-30 photos, 16 pages require 35-40 photos, and 20 pages require 50-70 photos."
  },
  {
    q: "How does the payment process work?",
    a: "We charge a 50% advance payment to confirm your order and begin layout customization. The remaining 50% is paid after you review and approve the final digital preview, prior to printing and dispatch."
  },
  {
    q: "Is free shipping available?",
    a: "Yes! Free shipping is included across India for all our catalog items."
  },
  {
    q: "Is Cash on Delivery (COD) available?",
    a: "Yes, Cash on Delivery is available for all products across India. We charge a standard COD handling fee of ₹50."
  },
  {
    q: "Can I fully customize my order?",
    a: "Absolutely. You can request specific themes, color schemes, custom layouts, unique text details, and even select the specific cover styles."
  },
  {
    q: "Is a hardcover available for magazines?",
    a: "Yes, standard magazines come with a premium 300 GSM softcover, but you can upgrade to a deluxe matte-finished hardcover during the layout process."
  },
  {
    q: "Can I ask for revisions?",
    a: "Yes, up to 3-4 revision cycles are fully supported. We want your keepsake to be absolutely perfect, so we don't proceed to print until you give your final nod."
  },
  {
    q: "Can I include text, quotes, or special messages in my product?",
    a: "Definitely! You can include letters, short poems, personalized quotes, date details, and scan images of handwritten messages."
  }
];

const stats = [
  { value: 500, suffix: "+", label: "Stories Captured" },
  { value: 450, suffix: "+", label: "Keepsakes Delivered" },
  { value: 100, suffix: "+", label: "Happy Reviews" }
];

const marqueeItems = [
  "Free Shipping on All Orders",
  "Cash on Delivery Available",
  "100+ Happy Clients",
  "Easy WhatsApp Support",
  "Perfect for Gifting",
  "Custom Designed",
  "Fast and Easy Process"
];

// Staggered Container Animation Settings for high-perf rendering
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 25 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } 
  }
};

function StatCountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
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
  // Sample flipbook modal state
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [samplePdfUrl, setSamplePdfUrl] = useState<string | undefined>(undefined);
  const [sampleImages, setSampleImages] = useState<string[] | undefined>(undefined);
  const [samplePageCount, setSamplePageCount] = useState(12);
  const [sampleProductName, setSampleProductName] = useState("");

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Carousel states for Magazine Samples (12 items, showing 3 on desktop, 2 on tablet, 1 on mobile)
  const [sampleIndex, setSampleIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  const [samplesList, setSamplesList] = useState(staticSamples);

  useEffect(() => {
    async function loadDbSamples() {
      try {
        const response = await api.get("/api/samples");
        if (response.data && response.data.length > 0) {
          const formatted = response.data.map((s: any) => ({
            id: `db-${s.id}`,
            title: s.title,
            pageText: "12 Pages",
            coverImage: s.coverImageUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80",
            tagColor: "bg-amber-100 text-amber-700",
            pdfUrl: s.pdfUrl,
            pageCount: 12
          }));
          setSamplesList(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch database samples, falling back to static assets:", error);
      }
    }
    loadDbSamples();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      let currentItemsToShow = 3;
      if (window.innerWidth < 640) {
        currentItemsToShow = 1;
      } else if (window.innerWidth < 1024) {
        currentItemsToShow = 2;
      } else {
        currentItemsToShow = 3;
      }
      setItemsToShow(currentItemsToShow);
      setSampleIndex((prev) => Math.min(prev, Math.max(0, samplesList.length - currentItemsToShow)));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [samplesList]);

  useEffect(() => {
    if (samplesList.length <= itemsToShow) return;
    const timer = setInterval(() => {
      setSampleIndex((prev) => {
        const next = prev + 1;
        return next >= samplesList.length - itemsToShow + 1 ? 0 : next;
      });
    }, 4500); // auto-scrolling speed (4.5s)
    return () => clearInterval(timer);
  }, [itemsToShow, samplesList]);

  const openSample = (title: string, pages: number, pdf?: string, images?: string[]) => {
    setSampleProductName(title);
    setSamplePageCount(pages);
    setSamplePdfUrl(pdf);
    setSampleImages(images);
    setIsSampleModalOpen(true);
  };

  return (
    <div className="overflow-x-hidden relative bg-background min-h-screen">
      
      {/* Noise paper texture overlay */}
      <div className="bg-noise-overlay absolute inset-0 pointer-events-none z-[1]" />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden">
        {/* Ambient glows & cinematic lighting */}
        <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-gradient-to-br from-amber-500/10 to-transparent dark:from-amber-500/5 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-gradient-to-tl from-amber-600/8 to-transparent dark:from-amber-600/5 blur-[140px] rounded-full pointer-events-none" />
        
        {/* Central radial gold light spotlight */}
        <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-45 dark:opacity-60"
             style={{ backgroundImage: "radial-gradient(circle at 50% 30%, rgba(198,138,67,0.05) 0%, transparent 60%)" }} />

        {/* Vignette shadow */}
        <div className="absolute inset-0 pointer-events-none bg-vignette" />

        {/* Sparkles / Particles */}
        <div className="absolute top-1/4 right-[25%] pointer-events-none text-2xl animate-pulse text-amber-500/40 select-none hidden lg:block">✨</div>
        <div className="absolute bottom-1/3 left-1/3 pointer-events-none text-xl animate-pulse text-amber-600/30 select-none hidden lg:block">✨</div>
        <div className="absolute top-1/2 right-[10%] pointer-events-none w-3 h-3 bg-amber-500/15 rounded-full blur-sm animate-ping hidden lg:block" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

            {/* ── LEFT COLUMN (EDITORIAL WRITER) ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="flex flex-col justify-center text-left"
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
              className="relative flex items-center justify-center h-[400px] sm:h-[520px] lg:h-[620px] w-full max-w-lg mx-auto will-change-transform"
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
                className="absolute left-1/2 -translate-x-1/2 sm:left-[3%] sm:translate-x-0 top-[10%] w-56 h-[320px] sm:w-64 sm:h-[360px] rounded-2xl bg-card border border-border p-3.5 shadow-2xl z-20 cursor-pointer will-change-transform"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden border border-border/20 shadow-inner flex flex-col justify-between bg-stone-100"
                     style={{ transform: "translateZ(10px)" }}>
                  <AutoImageSlider images={["https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&auto=format&fit=crop&q=80"]} className="absolute inset-0 w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-stone-950/35" />
                  
                  <div className="relative z-10 p-3 flex justify-between items-start text-white">
                     <span className="font-sans-clean text-[8px] font-bold tracking-[0.2em] bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">VOGUE STYLE</span>
                     <span className="font-display text-[9px] font-bold text-amber-300">ED. 01</span>
                  </div>
                  
                  <div className="absolute inset-x-0 top-[35%] flex justify-center pointer-events-none">
                     <span className="font-display text-5xl sm:text-6xl text-white/15 tracking-[0.15em] uppercase select-none font-bold">VOGUE</span>
                  </div>

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
                className="hidden sm:block absolute right-[4%] top-[6%] w-48 h-[270px] sm:w-52 sm:h-[300px] rounded-xl bg-card border-[12px] border-card shadow-2xl p-0.5 z-10 cursor-pointer border border-border will-change-transform"
              >
                <div className="relative w-full h-full rounded border border-border/40 overflow-hidden flex flex-col justify-end bg-stone-100"
                     style={{ transform: "translateZ(8px)" }}>
                  <AutoImageSlider images={["https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&auto=format&fit=crop&q=80"]} className="absolute inset-0 w-full h-full grayscale contrast-105 brightness-95" />
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
                className="hidden sm:block absolute left-[16%] bottom-[8%] w-44 h-[240px] sm:w-48 sm:h-[260px] rounded-2xl bg-card/65 backdrop-blur-md border border-border/80 p-3 shadow-xl z-30 cursor-pointer will-change-transform"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden flex flex-col justify-between p-3.5 bg-stone-100"
                     style={{ transform: "translateZ(12px)" }}>
                  <AutoImageSlider images={["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&auto=format&fit=crop&q=80"]} className="absolute inset-0 w-full h-full" />
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

      {/* ── HIGH PERFORMANCE MARQUEE (CSS COMPOSITOR ONLY) ── */}
      <div className="w-full overflow-hidden bg-stone-900 text-stone-200 dark:bg-stone-950 dark:text-stone-300 py-4 relative z-10 border-y border-stone-850 flex items-center shadow-lg">
        <div className="animate-marquee gap-16 uppercase">
          <div className="flex gap-16 items-center">
            {marqueeItems.map((item, idx) => (
              <span key={idx} className="flex items-center gap-3">
                <span>{item}</span>
                <span className="text-amber-500 text-[10px]">✦</span>
              </span>
            ))}
          </div>
          <div className="flex gap-16 items-center" aria-hidden="true">
            {marqueeItems.map((item, idx) => (
              <span key={idx} className="flex items-center gap-3">
                <span>{item}</span>
                <span className="text-amber-500 text-[10px]">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── CUSTOM COLLECTION ── */}
      <section className="py-28 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <span className="font-sans-clean text-xs tracking-[0.2em] uppercase text-amber-500 font-bold block mb-4">Luxury Keepsakes</span>
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-stone-900">
              Custom Collection
            </h2>
            <p className="font-sans-clean text-stone-500 max-w-2xl mx-auto mt-4 text-sm sm:text-base leading-relaxed">
              Crafted around your memories with personalized storytelling, custom layouts, and thoughtful details. Best for deeply personal keepsakes & gifts!
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto"
          >
            {customCollection.map((p, i) => (
              <motion.div
                key={p.id}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                className="group relative bg-cream border border-stone-100 hover:border-amber-300 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between will-change-transform"
              >
                <div className="absolute top-6 right-6 bg-rose-500 text-white text-[10px] font-sans-clean font-extrabold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm z-10">
                  {p.tag}
                </div>

                <div>
                  {/* Photo Album Style Container */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-square mb-6 bg-white p-3.5 pb-5 shadow-lg rounded-r-2xl rounded-l-sm border-l-[10px] border-stone-900 overflow-hidden flex flex-col justify-center before:absolute before:left-0 before:top-0 before:bottom-0 before:w-2.5 before:bg-black/20 before:z-10 shadow-[8px_8px_15px_-3px_rgba(0,0,0,0.15)] outline outline-1 outline-stone-200/50">
                    <AutoImageSlider images={p.images} className="w-full h-full rounded shadow-inner" />
                  </div>
                  
                  {/* Reviews rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={12} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="font-sans-clean text-xs text-stone-400 font-semibold">{p.rating} ({p.reviewsCount})</span>
                  </div>

                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-stone-900 mb-3 group-hover:text-amber-600 transition-colors">
                    {p.name}
                  </h3>
                  <p className="font-sans-clean text-stone-500 text-sm leading-relaxed mb-6">
                    {p.desc}
                  </p>
                </div>

                <div>
                  <div className="border-t border-stone-100 pt-5 mt-4">
                    <p className="font-sans-clean text-[10px] text-stone-400 tracking-wider uppercase mb-1">Price Details</p>
                    <p className="font-display text-3xl font-extrabold text-stone-900 group-hover:text-amber-500 transition-colors">{p.price}</p>
                    <p className="font-sans-clean text-[10px] text-stone-400 leading-tight mt-2 italic">
                      This product has multiple variants. The options may be chosen on the product page.
                    </p>
                  </div>
                  
                  <Link href={`/product/${p.slug}`}
                    className="mt-6 flex items-center justify-center gap-2 w-full py-4 bg-stone-900 hover:bg-amber-500 text-white dark:text-stone-950 text-xs tracking-widest font-sans-clean font-bold uppercase rounded-xl transition-all duration-300 shadow-md">
                    Select options <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── QUICK CREATE ── */}
      <section className="py-28 bg-stone-50 relative border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="font-sans-clean text-xs tracking-[0.2em] uppercase text-amber-500 font-bold block mb-4">Fast Keepsakes</span>
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-stone-900">
              Quick Create
            </h2>
            <p className="font-sans-clean text-stone-500 max-w-2xl mx-auto mt-4 text-sm sm:text-base leading-relaxed">
              Choose a design, upload your memories, and create meaningful keepsakes in just a few clicks. Best for last-minute gifting.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {quickCreate.map((p, i) => (
              <motion.div
                key={p.id}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                className="group bg-cream border border-stone-100 hover:border-amber-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between will-change-transform"
              >
                <div>
                  {/* Photo Frame Style Container */}
                  <div className="relative w-full h-56 mb-4 bg-white p-3 border-[10px] border-stone-900 shadow-xl rounded-sm overflow-hidden flex flex-col justify-center">
                    <AutoImageSlider images={p.images} className="w-full h-full rounded-sm" />
                    <span className="absolute top-4 right-4 px-2.5 py-0.5 bg-rose-500 text-white text-[9px] font-sans-clean font-bold tracking-wider uppercase rounded-full shadow-md z-10">
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-stone-900 mb-2 group-hover:text-amber-500 transition-colors">
                    {p.name}
                  </h3>
                  <p className="font-sans-clean text-xs text-stone-500 mb-6 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div>
                  <div className="border-t border-stone-100 pt-4 mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-xl font-black text-stone-900">{p.price}</span>
                      {p.originalPrice && (
                        <span className="font-sans-clean text-xs text-stone-400 line-through">{p.originalPrice}</span>
                      )}
                    </div>
                    <p className="font-sans-clean text-[9px] text-stone-400 mt-1.5 italic">
                      Variants available on checkout.
                    </p>
                  </div>
                  <Link href={`/product/${p.slug}`}
                    className="block text-center py-3 bg-stone-900 group-hover:bg-amber-500 text-white dark:text-stone-950 text-[10px] tracking-wider font-sans-clean font-bold uppercase rounded-lg transition-all duration-300">
                    Select options
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MAGAZINE SAMPLES ── */}
      <section className="py-28 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-sans-clean text-amber-500 text-xs font-bold tracking-[0.25em] uppercase block mb-4">Sample Designs</span>
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-stone-900">
              Magazine Samples
            </h2>
            <p className="font-sans-clean text-stone-500 max-w-xl mx-auto mt-3 text-sm">
              Click on any sample cover below to view real sample pages using our interactive 3D flipbook page turner.
            </p>
          </motion.div>

          <div className="relative w-full overflow-hidden max-w-6xl mx-auto px-1 py-4">
            <motion.div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${sampleIndex * (100 / samplesList.length)}%)`,
                width: `${(samplesList.length / itemsToShow) * 100}%`
              }}
            >
              {samplesList.map((sample, i) => (
                <div 
                  key={sample.id} 
                  style={{ width: `${100 / samplesList.length}%` }}
                  className="px-3.5 flex-shrink-0"
                >
                  <motion.div
                    onClick={() => openSample(sample.title, sample.pageCount, sample.pdfUrl)}
                    className="group cursor-pointer h-full"
                  >
                    <div className="relative rounded-3xl border border-stone-200/60 bg-cream p-4 hover:shadow-2xl hover:border-amber-300 transition-all duration-300 flex flex-col hover:-translate-y-2 h-full will-change-transform">
                      {/* Photo Frame Style Container */}
                      <div className="relative h-64 sm:h-72 bg-white border-[10px] border-white shadow-lg rounded-2xl overflow-hidden flex items-center justify-center outline outline-1 outline-stone-200/50 group-hover:shadow-2xl transition-shadow">
                        <div className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-700" 
                             style={{ backgroundImage: `url('${sample.coverImage}')` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/75" />
                        
                        <div className="relative z-10 text-center p-4 flex flex-col justify-between h-full w-full">
                          <div className="flex justify-between items-start">
                            <span className="text-white/50 font-display text-[9px] uppercase tracking-widest font-bold bg-black/20 px-2 py-0.5 rounded backdrop-blur-sm">THE JOURNAL</span>
                            <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[8px] uppercase tracking-wider rounded font-bold backdrop-blur-sm">{sample.pageText}</span>
                          </div>
                          
                          <div className="my-auto">
                            <div className="w-14 h-14 bg-amber-500/20 border border-amber-500/40 rounded-full flex items-center justify-center text-amber-400 mx-auto mb-3 shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
                              <BookOpen size={22} />
                            </div>
                            <h4 className="font-display text-white text-lg font-bold uppercase tracking-wide px-2 leading-tight">
                              {sample.title}
                            </h4>
                            <div className="h-0.5 w-10 bg-amber-500 mx-auto mt-2.5" />
                          </div>
                          
                          <span className="text-[8px] text-amber-400 font-sans-clean font-bold tracking-widest uppercase flex items-center justify-center gap-1 hover:text-white transition-colors">
                            <BookOpen size={10} /> View Sample
                          </span>
                        </div>
                      </div>

                      <div className="p-4 text-center mt-3 flex-grow flex flex-col justify-between">
                        <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-amber-500 transition-colors">
                          {sample.title}
                        </h3>
                        <p className="font-sans-clean text-xs text-stone-400 mt-1 font-semibold">{sample.pageText} • Digital & Print</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-16">
            <Link href="/product/custom-magazine"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white dark:text-stone-950 font-sans-clean font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20 text-xs tracking-wider uppercase text-center w-full sm:w-auto">
              Customize My Magazine
            </Link>
            <Link href="/samples"
              className="px-8 py-4 border border-stone-200 hover:border-amber-500 hover:bg-amber-50/5 text-stone-700 font-sans-clean font-bold rounded-xl transition-all duration-300 text-xs tracking-wider uppercase text-center w-full sm:w-auto">
              View More Samples
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRODUCT FEATURES ── */}
      <section className="py-28 bg-stone-50 border-y border-stone-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="font-sans-clean text-xs tracking-[0.2em] uppercase text-amber-500 font-bold block mb-4">Why Choose Us</span>
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-stone-900">
              Product Features
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Custom-Made Designs",
                desc: "Every product is crafted from your memories, tailored to your story.",
                images: [
                  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=200&auto=format&fit=crop&q=80"
                ]
              },
              {
                title: "Best For Gifting",
                desc: "Every order is packed and designed to wow! perfect for birthdays, weddings, or surprises.",
                images: [
                  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=200&auto=format&fit=crop&q=80"
                ]
              },
              {
                title: "Fast & Friendly Process",
                desc: "WhatsApp support, easy forms, and 7-12 day delivery on most orders.",
                images: [
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=200&auto=format&fit=crop&q=80"
                ]
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={staggerItem}
                className="bg-cream p-8 rounded-3xl border border-stone-100 shadow-sm text-center flex flex-col justify-between items-center will-change-transform hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Photo Frame Style for Feature Card */}
                  <div className="relative w-full h-48 mb-6 bg-white p-3 border-[8px] border-white shadow-md rounded-xl overflow-hidden flex flex-col justify-center outline outline-1 outline-stone-200/40">
                    <AutoImageSlider images={feature.images} className="w-full h-full rounded" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-stone-900 mb-3">{feature.title}</h3>
                  <p className="font-sans-clean text-sm text-stone-500 leading-relaxed mb-6">{feature.desc}</p>
                </div>
                <Link href="/shop"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-600 font-bold font-sans-clean uppercase tracking-wider">
                  Shop Now <ArrowRight size={12} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── COMBO PROMO ── */}
      <section className="py-24 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute left-[-10%] bottom-[-10%] w-96 h-96 bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            <div className="md:col-span-7 flex flex-col items-start text-left">
              <span className="px-3.5 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-sans-clean font-bold tracking-[0.2em] uppercase rounded-full mb-6">
                Premium Combo Pack
              </span>
              
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-6">
                Flip the Pages,<br />
                <span className="font-black text-amber-500">Scan the Moments</span>
              </h2>
              
              <p className="font-sans-clean text-stone-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                Get the best of both worlds! A beautifully designed magazine filled with memories and a recap reel video linked through a scannable QR. Perfect for gifts, surprises, and forever moments.
              </p>
              
              <a href="https://wa.me/917903316723?text=Hi!%20I%20want%20to%20order%20the%20Combo%20(Magazine%20%2B%20Recap%20Reel)%20seen%20on%20your%20website."
                 target="_blank"
                 rel="noopener noreferrer"
                 className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-sans-clean font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/25 hover:-translate-y-0.5 flex items-center gap-2">
                💬 Get My Combo
              </a>
            </div>

            <div className="md:col-span-5 flex justify-center relative">
              <div className="relative w-72 h-80 bg-stone-800 rounded-3xl p-4 border border-stone-700 shadow-2xl flex flex-col justify-between overflow-hidden will-change-transform">
                <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/90 to-amber-500/10 pointer-events-none" />
                <div className="flex justify-between items-center text-white/50 text-[10px] tracking-widest font-sans-clean font-bold">
                  <span>MAGAZINE</span>
                  <span>+ REEL</span>
                </div>
                
                <div className="w-32 h-32 bg-white/95 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center p-3.5 shadow-xl relative border border-white/20">
                  <div className="w-full h-full border-4 border-stone-900 border-dashed opacity-85 flex items-center justify-center">
                    <span className="text-xl">🎬</span>
                  </div>
                  <motion.div 
                    className="absolute left-0 right-0 h-0.5 bg-amber-500/80 shadow-md shadow-amber-500"
                    animate={{ top: ["10%", "90%", "10%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  />
                </div>

                <div className="text-center">
                  <p className="font-display text-base font-bold text-white mb-0.5">Scannable Experience</p>
                  <p className="font-sans-clean text-[10px] text-amber-400">Scan QR Code inside book to play Recap Reel</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-28 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="font-sans-clean text-xs tracking-[0.2em] uppercase text-amber-500 font-bold block mb-4">Customer Love</span>
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-stone-900">
              Our Reviews
            </h2>
            <p className="font-sans-clean text-stone-500 max-w-2xl mx-auto mt-4 text-sm sm:text-base">
              Every review is a love letter from someone who trusted us with their most personal moments and loved what they got back.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="bg-cream p-6 rounded-3xl border border-stone-155 shadow-sm flex flex-col justify-between h-fit hover:shadow-lg transition-all duration-300 will-change-transform"
              >
                <div>
                  <div className="flex gap-0.5 mb-4 text-amber-400 text-sm">
                    {[...Array(r.stars)].map((_, idx) => (
                      <span key={idx}>★</span>
                    ))}
                  </div>
                  <p className="font-sans-clean text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 italic">
                    "{r.text}"
                  </p>
                </div>
                
                <div className="flex justify-between items-center border-t border-stone-100 pt-4">
                  <div>
                    <h5 className="font-sans-clean font-bold text-stone-900 text-xs sm:text-sm">{r.name}</h5>
                    <p className="font-sans-clean text-[10px] text-stone-400 mt-0.5">{r.city}</p>
                  </div>
                  <span className="text-rose-500 opacity-60"><Heart size={14} className="fill-rose-500" /></span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── THE STORY OF MYSTORYARCHIVE ── */}
      <section className="py-28 bg-stone-50 border-t border-stone-100 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-sans-clean text-xs tracking-[0.2em] uppercase text-amber-500 font-bold block mb-4">Our Narrative</span>
            
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-stone-900 mb-8">
              The Story Of MyStoryArchive
            </h2>
            
            <p className="font-sans-clean text-stone-500 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl mx-auto">
              At MyStoryArchive, we believe that every story, every moment deserves to be told beautifully. Whether it’s celebrating love, friendships, milestones, or adventures, we capture the essence of your memories and turn them into one-of-a-kind keepsakes.
            </p>
            
            <p className="font-sans-clean text-stone-500 text-sm sm:text-base leading-relaxed mb-10 max-w-2xl mx-auto">
              A team of highly creative minds working together to create special keepsakes for lifelong memory.
            </p>
            
            <Link href="/our-story"
              className="inline-block px-10 py-4 bg-stone-900 hover:bg-amber-500 text-white dark:text-stone-950 font-sans-clean font-bold text-xs tracking-widest uppercase rounded-xl transition-all duration-300 shadow-md">
              Join Our Journey
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-28 bg-background relative border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-sans-clean text-xs tracking-[0.2em] uppercase text-amber-500 font-bold block mb-4">Learn More</span>
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-stone-900">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="font-sans-clean text-stone-500 max-w-2xl mx-auto mt-4 text-xs sm:text-sm">
              From design timelines to payment queries, Browse answers to popular questions about timelines, customization, shipping, and more.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4 max-w-3xl mx-auto"
          >
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <motion.div
                  key={idx}
                  variants={staggerItem}
                  className="bg-cream border border-stone-155 rounded-2xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-5 text-left font-sans-clean font-bold text-sm text-stone-855 hover:bg-stone-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-stone-400 shrink-0 transition-transform duration-250 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="p-5 border-t border-stone-100 bg-stone-50/50 font-sans-clean text-xs sm:text-sm text-stone-500 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SAMPLE FLIPBOOK PREVIEW MODAL */}
      <SampleFlipbookModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        pdfUrl={samplePdfUrl}
        images={sampleImages}
        pageCount={samplePageCount}
        productName={sampleProductName}
      />

    </div>
  );
}