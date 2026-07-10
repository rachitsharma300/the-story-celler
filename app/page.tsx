"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Star,
  BookOpen,
  ChevronDown,
  Heart,
  ArrowRight,
  ShieldCheck,
  Truck,
  Wallet,
  Eye,
  Upload,
  Sliders,
  Gift,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
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
          <div key={idx} className="w-full h-full flex-shrink-0 relative">
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

/**
 * Signature motif — a small washi-tape corner sticker.
 * The brand sells physical photo frames & scrapbook keepsakes,
 * so every framed image on the page gets a "mounted photo" corner
 * instead of a generic drop-shadow, tying the UI back to the product itself.
 */
function TapeCorner({
  className = "",
  rotate = -8,
  tone = "light"
}: {
  className?: string;
  rotate?: number;
  tone?: "light" | "dark";
}) {
  return (
    <span
      aria-hidden="true"
      className={`absolute w-12 h-5 rounded-[2px] pointer-events-none z-20 ${tone === "light"
          ? "bg-[#FBF1EC]/90 border border-[#A65B62]/15"
          : "bg-white/15 border border-white/20 backdrop-blur-sm"
        } shadow-[0_2px_6px_rgba(0,0,0,0.12)] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
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
    pdfUrl: "https://res.cloudinary.com/hco2g9ee/raw/upload/v1783178727/storyceller/samples/gdccmqgxonnqgq3qp0rr",
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
    pdfUrl: "https://res.cloudinary.com/hco2g9ee/raw/upload/v1783178723/storyceller/samples/jytelrhvgoj40zm9hson",
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
    pdfUrl: "https://res.cloudinary.com/hco2g9ee/raw/upload/v1783178717/storyceller/samples/iho5yfy91fveahxahuk9",
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
    text: "Their product was absolutely amazing, and working with the team was a truly pleasant experience. They provided thoughtful, understanding support every step of the way. I had a wonderful experience and I highly recommend this creative, dedicated team to anyone looking for exceptional results.✨",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Yashvi Changela",
    city: "Ahmedabad",
    stars: 5,
    text: "A heartfelt thank you to the MSA team for making my husband’s birthday so special! Your efforts created lifelong memories for us, making our evening truly unforgettable.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Ashwin Sharma",
    city: "Pune",
    stars: 5,
    text: "Very good quality of work and totally worth the price! Lovedddd ittt",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Akanksha Razdan",
    city: "Gurgaon",
    stars: 5,
    text: "Absolutely loved their work. The way they narrated the entire story and gave it a life gave me goosebumps. Every emotion was written beautifully 💗 Thankyou so much for making such a special thing for us .",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Simran Agarwal",
    city: "New Delhi",
    stars: 5,
    text: "I recently ordered my first magazine with them. It was insanely perfect♥️ My partner loved the concept. From Printing to Concept visualisation everything is top notch. Thank you team Story Celler",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Pratika Karnam",
    city: "Ahmedabad",
    stars: 5,
    text: "Got a 20 pager magazine done from The Story Celler for my first wedding anniversary. It has come beautifully. The team was very helpful throughout. Very patient during the planning and design phase. The end result is just amazing. I loved it. Keep up the good work guys ❤️",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Shruti Shrivastava",
    city: "New Delhi",
    stars: 5,
    text: "If you decide to gift your partner this magazine then will be the best thoughtful gift for them. The print quality of the product is very nice. People at Story Celler are also cooperative, they appreciate and accept the feedback gracefully.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Muskan Agarwal",
    city: "New Delhi",
    stars: 5,
    text: "The Story Celler made amazing magazine for my anniversary. They caught the essence that I wanted and presented in the most beautiful way possible. Exceeded all my expectations. Great work done by the entire team!",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&auto=format&fit=crop&q=80"
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
  { value: 10000, suffix: "+", label: "Happy Customers" },
  { value: 50000, suffix: "+", label: "Frames Delivered" },
  { value: 4.9, suffix: "/5", label: "Customer Rating" }
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
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }
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
        setCount(Math.floor(start) || start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <>{suffix === "/5" ? end.toFixed(1) : count.toLocaleString()}{suffix}</>;
}

const heroBackgrounds = ["/default.png", "/default2.png"];

export default function HomePage() {
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [samplePdfUrl, setSamplePdfUrl] = useState<string | undefined>(undefined);
  const [sampleImages, setSampleImages] = useState<string[] | undefined>(undefined);
  const [samplePageCount, setSamplePageCount] = useState(12);
  const [sampleProductName, setSampleProductName] = useState("");

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [sampleIndex, setSampleIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [samplesList, setSamplesList] = useState(staticSamples);

  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBgIndex((p) => (p + 1) % heroBackgrounds.length), 10000);
    return () => clearInterval(t);
  }, []);

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
    }, 4500);
    return () => clearInterval(timer);
  }, [itemsToShow, samplesList]);

  const openSample = (title: string, pages: number, pdf?: string, images?: string[]) => {
    setSampleProductName(title);
    setSamplePageCount(pages);
    setSamplePdfUrl(pdf);
    setSampleImages(images);
    setIsSampleModalOpen(true);
  };

  const scrollReviews = (direction: "left" | "right") => {
    if (reviewsContainerRef.current) {
      const scrollAmount = 340;
      reviewsContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65B62] focus-visible:ring-offset-2";

  return (
    <div className="overflow-x-hidden relative bg-[#FAF4F5] min-h-screen text-stone-800">

      {/* Scoped keyframes for the marquee ticker + reduced-motion fallback */}
      <style>{`
        @keyframes storyceller-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .storyceller-marquee-track {
          animation: storyceller-marquee 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .storyceller-marquee-track {
            animation: none;
          }
        }
      `}</style>

      {/* Noise paper texture overlay */}
      <div className="bg-noise-overlay absolute inset-0 pointer-events-none z-[1] opacity-[0.03]" />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-[#FAF4F5]">

        {/* Background Image Crossfade Slider */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#FAF4F5]">
          <AnimatePresence initial={false}>
            <motion.img
              key={bgIndex}
              src={heroBackgrounds[bgIndex]}
              alt="Mockup background scene showing couple photo frame"
              className="absolute inset-0 w-full h-full object-contain object-center lg:object-right pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/[0.02] z-[1]" />

          {/* Overlay gradients for readability */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[60%] bg-gradient-to-r from-[#FAF4F5]/98 via-[#FAF4F5]/90 via-[#FAF4F5]/50 to-transparent z-10 hidden lg:block pointer-events-none" />
          <div className="absolute inset-0 bg-[#FAF4F5]/85 z-10 lg:hidden pointer-events-none" />
        </div>



        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Info Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 flex flex-col justify-center text-left"
            >
              {/* Badge with Floating Hearts */}
              <div className="relative w-fit mb-6">
                {/* Floating Hearts Cloud */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
                  <span className="absolute text-rose-400/90 animate-float-heart-1 left-[10%] text-xs" style={{ animationDelay: "0s", animationDuration: "4s" }}>❤️</span>
                  <span className="absolute text-rose-500/80 animate-float-heart-2 left-[28%] text-[10px]" style={{ animationDelay: "0.8s", animationDuration: "3.5s" }}>❤️</span>
                  <span className="absolute text-pink-500/85 animate-float-heart-1 left-[48%] text-sm" style={{ animationDelay: "1.5s", animationDuration: "4.5s" }}>❤️</span>
                  <span className="absolute text-rose-400/80 animate-float-heart-2 left-[65%] text-xs" style={{ animationDelay: "2.2s", animationDuration: "3.8s" }}>❤️</span>
                  <span className="absolute text-rose-500/75 animate-float-heart-1 left-[82%] text-[10px]" style={{ animationDelay: "2.9s", animationDuration: "4.2s" }}>❤️</span>
                  <span className="absolute text-pink-400/70 animate-float-heart-2 left-[95%] text-xs" style={{ animationDelay: "1.1s", animationDuration: "3.9s" }}>❤️</span>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/95 border border-[#A65B62]/20 text-[#A65B62] font-sans-clean text-[10px] font-bold tracking-[0.2em] uppercase rounded-full shadow-sm"
                >
                  <Sparkles size={11} className="text-[#A65B62]" /> Turn your moments into timeless art
                </motion.div>
              </div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-stone-900 leading-[1.08] mb-6 tracking-tight"
              >
                Your Memories,<br />
                <span className="text-[#A65B62] italic font-serif lowercase">beautifully</span> Framed.
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="font-sans-clean text-sm sm:text-base text-stone-500 max-w-md mb-8 leading-relaxed"
              >
                Custom designed photo frames that preserve your story forever.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <Link href="/shop"
                  className={`group px-7 py-3.5 bg-[#A65B62] hover:bg-[#8F4A50] text-white font-sans-clean font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#A65B62]/20 hover:-translate-y-0.5 text-center text-xs tracking-widest uppercase flex items-center justify-center gap-1 ${focusRing}`}>
                  Design Your Frame <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link href="/shop"
                  className={`px-7 py-3.5 border-2 border-[#A65B62] text-[#A65B62] hover:bg-[#A65B62]/5 font-sans-clean font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-center text-xs tracking-widest uppercase flex items-center justify-center gap-1 ${focusRing}`}>
                  View Collections
                </Link>
              </motion.div>

              {/* Premium Trust Social Proof Block */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col gap-3 w-fit"
              >
                {/* Main Trust Card */}
                <div className="flex items-stretch gap-0 bg-white/90 backdrop-blur-md border border-[#A65B62]/15 rounded-2xl overflow-hidden shadow-[0_8px_30px_-8px_rgba(166,91,98,0.12)] w-fit">

                  {/* Rating Block */}
                  <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#A65B62] to-[#8F4A50] text-white px-4 py-3.5 shrink-0 min-w-[64px]">
                    <span className="font-display text-2xl font-black leading-none tracking-tight">4.9</span>
                    <div className="flex text-amber-300 gap-0.5 mt-1.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="fill-current" size={9} />
                      ))}
                    </div>
                    <span className="font-sans-clean text-[8px] text-white/70 uppercase tracking-widest mt-1">Rating</span>
                  </div>

                  {/* Info Block */}
                  <div className="flex flex-col justify-center px-4 py-3.5 border-r-0 sm:border-r border-stone-100">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <span className="text-emerald-650 text-[9px] font-black">✓</span>
                      </span>
                      <span className="font-sans-clean text-xs font-bold text-stone-850 leading-none">Loved by 500+ Couples</span>
                    </div>
                    <p className="font-sans-clean text-[10px] text-stone-400 leading-snug mt-0.5 pl-[22px]">
                      Premium Quality · 100% Satisfaction
                    </p>
                  </div>

                  {/* Avatars Block */}
                  <div className="hidden sm:flex flex-col items-center justify-center px-4 py-3.5 shrink-0">
                    <div className="flex -space-x-2">
                      <img className="h-7 w-7 rounded-full object-cover ring-2 ring-white shadow" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80" alt="Happy customer" />
                      <img className="h-7 w-7 rounded-full object-cover ring-2 ring-white shadow" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" alt="Happy customer" />
                      <img className="h-7 w-7 rounded-full object-cover ring-2 ring-white shadow" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80" alt="Happy customer" />
                      <div className="h-7 w-7 rounded-full ring-2 ring-white shadow bg-[#A65B62] flex items-center justify-center">
                        <span className="font-sans-clean text-[8px] font-black text-white">+497</span>
                      </div>
                    </div>
                    <span className="font-sans-clean text-[9px] text-stone-400 mt-1.5">Happy clients</span>
                  </div>

                </div>

                {/* Trust Pills Row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200/60 text-emerald-700 rounded-full text-[9px] font-sans-clean font-bold tracking-wide">
                    <span>🔒</span> 100% Secure
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-200/60 text-blue-700 rounded-full text-[9px] font-sans-clean font-bold tracking-wide">
                    <span>🚚</span> Free Shipping
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 border border-rose-200/60 text-rose-700 rounded-full text-[9px] font-sans-clean font-bold tracking-wide">
                    <span>🎁</span> Perfect for Gifting
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Graphic Column: Hidden on mobile to prevent empty spaces */}
            <div className="hidden lg:block lg:col-span-6 pointer-events-none" />

          </div>
        </div>
      </section>

      {/* ── TICKER STRIP ── continuous news-style scrolling trust band */}
      <section className="relative z-20 bg-stone-950 py-3 overflow-hidden border-y border-stone-800">
        <motion.div
          className="flex w-max"
          animate={{ x: [0, "-50%"] }}
          transition={{ repeat: Infinity, repeatType: "loop", duration: 28, ease: "linear" }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="mx-8 inline-flex items-center gap-2 font-sans-clean text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/75 whitespace-nowrap"
            >
              <Heart size={10} className="text-[#A65B62] fill-[#A65B62] shrink-0" /> {item}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── 2. PRODUCT FEATURES ROW ── */}
      <section className="relative z-20 -mt-0 mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-stone-100 shadow-xl rounded-2xl py-6 px-4 sm:px-8 md:px-12 flex overflow-x-auto snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-5 gap-y-6 gap-x-4 md:divide-x divide-stone-100">

          {/* Feature 1 */}
          <div className="flex items-center gap-3.5 px-4 md:px-2 shrink-0 min-w-[200px] md:min-w-0 snap-center group">
            <div className="p-2.5 bg-[#A65B62]/5 rounded-xl text-[#A65B62] shrink-0 transition-colors duration-300 group-hover:bg-[#A65B62] group-hover:text-white">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="font-sans-clean text-xs font-bold text-stone-900 leading-tight">Premium Quality</h4>
              <p className="font-sans-clean text-[10px] text-stone-400 mt-0.5">HD Prints</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-3.5 px-4 md:pl-4 md:px-0 shrink-0 min-w-[200px] md:min-w-0 snap-center group">
            <div className="p-2.5 bg-[#A65B62]/5 rounded-xl text-[#A65B62] shrink-0 transition-colors duration-300 group-hover:bg-[#A65B62] group-hover:text-white">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="font-sans-clean text-xs font-bold text-stone-900 leading-tight">Free Shipping</h4>
              <p className="font-sans-clean text-[10px] text-stone-400 mt-0.5">Across India</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-3.5 px-4 md:pl-4 md:px-0 shrink-0 min-w-[200px] md:min-w-0 snap-center group">
            <div className="p-2.5 bg-[#A65B62]/5 rounded-xl text-[#A65B62] shrink-0 transition-colors duration-300 group-hover:bg-[#A65B62] group-hover:text-white">
              <Wallet size={20} />
            </div>
            <div>
              <h4 className="font-sans-clean text-xs font-bold text-stone-900 leading-tight">COD Available</h4>
              <p className="font-sans-clean text-[10px] text-stone-400 mt-0.5">Easy & Secure</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center gap-3.5 px-4 md:pl-4 md:px-0 shrink-0 min-w-[200px] md:min-w-0 snap-center group">
            <div className="p-2.5 bg-[#A65B62]/5 rounded-xl text-[#A65B62] shrink-0 transition-colors duration-300 group-hover:bg-[#A65B62] group-hover:text-white">
              <Eye size={20} />
            </div>
            <div>
              <h4 className="font-sans-clean text-xs font-bold text-stone-900 leading-tight">Preview Before Print</h4>
              <p className="font-sans-clean text-[10px] text-stone-400 mt-0.5">100% Satisfaction</p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="flex items-center gap-3.5 px-4 md:pl-4 md:px-0 shrink-0 min-w-[200px] md:min-w-0 snap-center group">
            <div className="p-2.5 bg-[#A65B62]/5 rounded-xl text-[#A65B62] shrink-0 transition-colors duration-300 group-hover:bg-[#A65B62] group-hover:text-white">
              <Heart className="fill-current text-[#A65B62] group-hover:text-white" size={18} />
            </div>
            <div>
              <h4 className="font-sans-clean text-xs font-bold text-stone-900 leading-tight">Loved by 10,000+</h4>
              <p className="font-sans-clean text-[10px] text-stone-400 mt-0.5">Happy Customers</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. EXPLORE COLLECTIONS GRID ── */}
      <section className="py-24 bg-transparent relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <span className="font-sans-clean text-[10px] tracking-[0.25em] uppercase text-[#A65B62] font-bold block mb-3">
              ✦ Explore Our Collections ✦
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
              Find the perfect frame for your story
            </h2>
          </div>

          {/* 6 Category Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

            {[
              {
                href: "/shop?category=photo-frames",
                img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80",
                title: "Photo Frames",
                sub: "Timeless & Classic"
              },
              {
                href: "/shop?category=magazine-frames",
                img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80",
                title: "Magazine Frames",
                sub: "Trendy & Personal"
              },
              {
                href: "/shop?category=spotify-frames",
                img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
                title: "Spotify Frames",
                sub: "Your Music, Your Story"
              },
              {
                href: "/shop?category=qr-frames",
                img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&auto=format&fit=crop&q=80",
                title: "QR Memory Frames",
                sub: "Scan, Watch, Relive"
              },
              {
                href: "/shop?category=collage-frames",
                img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80",
                title: "Collage Frames",
                sub: "Multiple Memories"
              },
              {
                href: "/shop?category=scrapbook-frames",
                img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=80",
                title: "Scrapbook Frames",
                sub: "Handmade With Love"
              }
            ].map((c, i) => (
              <Link
                key={c.href}
                href={c.href}
                className={`group flex flex-col items-center ${focusRing} rounded-2xl`}
              >
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white p-3 shadow-md border border-stone-100 group-hover:shadow-xl group-hover:border-[#A65B62]/25 transition-all duration-300">
                  <TapeCorner className="-top-1.5 -left-1.5" rotate={i % 2 === 0 ? -10 : 8} />
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-display text-sm font-bold text-stone-850 mt-3.5 group-hover:text-[#A65B62] transition-colors text-center">
                  {c.title}
                </h3>
                <p className="font-sans-clean text-[10px] text-stone-400 mt-0.5 text-center">{c.sub}</p>
              </Link>
            ))}

          </div>

          <div className="flex justify-center mt-12">
            <Link href="/shop"
              className={`px-8 py-3.5 border-2 border-[#A65B62]/35 text-[#A65B62] hover:bg-[#A65B62]/5 hover:border-[#A65B62] font-sans-clean font-bold rounded-xl transition-all duration-300 text-xs tracking-widest uppercase ${focusRing}`}>
              View All Collections
            </Link>
          </div>

        </div>
      </section>

      {/* ── 4. MAGAZINE SAMPLES ── */}
      <section className="py-28 bg-white relative border-y border-stone-100 overflow-hidden">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#A65B62]/5 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-rose-100/40 blur-[80px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-sans-clean text-[#A65B62] text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">
              ✦ Sample Designs ✦
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
              Magazine Samples
            </h2>
            <p className="font-sans-clean text-stone-400 max-w-lg mx-auto text-sm leading-relaxed">
              Click on any cover to flip through real sample pages in our interactive 3D flipbook viewer.
            </p>
          </div>

          {/* Slider */}
          <div className="relative w-full max-w-6xl mx-auto">
            <div className="overflow-hidden px-4 sm:px-12 py-10">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${sampleIndex * (100 / samplesList.length)}%)`,
                  width: `${(samplesList.length / itemsToShow) * 100}%`
                }}
              >
                {samplesList.map((sample) => (
                  <div
                    key={sample.id}
                    style={{ width: `${100 / samplesList.length}%` }}
                    className="px-5 flex-shrink-0 flex flex-col items-center"
                  >
                    {/* Book card */}
                    <div
                      onClick={() => openSample(sample.title, sample.pageCount, sample.pdfUrl)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openSample(sample.title, sample.pageCount, sample.pdfUrl);
                        }
                      }}
                      className={`group cursor-pointer select-none ${focusRing}`}
                    >
                      {/* Book wrapper with explicit size */}
                      <div className="relative mx-auto" style={{ width: "160px", height: "213px" }}>
                        {/* Shadow pages behind — bundle illusion */}
                        <div className="absolute rounded-sm bg-stone-300" style={{ top: "7px", left: "7px", right: "-7px", bottom: "-7px" }} />
                        <div className="absolute rounded-sm bg-stone-200" style={{ top: "3.5px", left: "3.5px", right: "-3.5px", bottom: "-3.5px" }} />

                        {/* Main cover */}
                        <div
                          className="absolute inset-0 rounded-sm overflow-hidden shadow-[0_12px_35px_-5px_rgba(0,0,0,0.30)] cursor-pointer"
                          style={{ transition: "transform 0.4s ease, box-shadow 0.4s ease" }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.transform = "translateY(-10px) rotate(-3deg) scale(1.04)";
                            el.style.boxShadow = "0 24px 50px -8px rgba(166,91,98,0.5)";
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.transform = "";
                            el.style.boxShadow = "";
                          }}
                        >
                          {/* Cover image */}
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('${sample.coverImage}')` }}
                          />
                          {/* Spine shadow */}
                          <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
                          {/* Bottom gradient + name */}
                          <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end px-3 pb-2">
                            <span className="text-white font-display text-[12px] font-bold leading-tight drop-shadow line-clamp-2">
                              {sample.title}
                            </span>
                          </div>
                          {/* Page count */}
                          <div className="absolute top-2 right-2">
                            <span className="bg-[#A65B62] text-white font-sans-clean text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full shadow">
                              {sample.pageText}
                            </span>
                          </div>
                          {/* Hover "View Flipbook" pill */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                            <span className="bg-white/95 backdrop-blur text-[#A65B62] font-sans-clean font-black text-[9px] tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                              <BookOpen size={10} /> View Flipbook
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Label below card */}
                      <div className="mt-4 text-center" style={{ width: "160px" }}>
                        <p className="font-sans-clean text-[11px] font-bold text-stone-700 leading-snug">
                          {sample.pageText}: {sample.title}
                        </p>
                        <p className="font-sans-clean text-[9px] text-stone-400 mt-0.5">Digital & Print</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrows */}
            {samplesList.length > itemsToShow && (
              <>
                <button
                  aria-label="Previous"
                  onClick={() => setSampleIndex((p) => Math.max(0, p - 1))}
                  className={`absolute left-0 top-[42%] -translate-y-1/2 w-10 h-10 bg-white hover:bg-[#A65B62] text-stone-600 hover:text-white rounded-full shadow-lg border border-stone-200 flex items-center justify-center transition-all duration-200 hover:scale-110 z-10 ${focusRing}`}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  aria-label="Next"
                  onClick={() => setSampleIndex((p) => Math.min(samplesList.length - itemsToShow, p + 1))}
                  className={`absolute right-0 top-[42%] -translate-y-1/2 w-10 h-10 bg-white hover:bg-[#A65B62] text-stone-600 hover:text-white rounded-full shadow-lg border border-stone-200 flex items-center justify-center transition-all duration-200 hover:scale-110 z-10 ${focusRing}`}
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* Dots */}
            {samplesList.length > itemsToShow && (
              <div className="flex justify-center gap-1.5 mt-2">
                {Array.from({ length: Math.ceil(samplesList.length / itemsToShow) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSampleIndex(i * itemsToShow)}
                    aria-label={`Page ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${Math.floor(sampleIndex / itemsToShow) === i ? "w-6 bg-[#A65B62]" : "w-1.5 bg-stone-300 hover:bg-stone-400"}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-14">
            <Link href="/product/custom-magazine"
              className={`px-8 py-4 bg-[#A65B62] hover:bg-[#8F4A50] text-white font-sans-clean font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#A65B62]/20 hover:-translate-y-0.5 text-xs tracking-wider uppercase text-center w-full sm:w-auto ${focusRing}`}>
              Customize My Magazine
            </Link>
            <Link href="/samples"
              className={`px-8 py-4 border border-stone-200 hover:border-[#A65B62] hover:bg-[#FAF4F5] text-stone-700 font-sans-clean font-bold rounded-xl transition-all duration-300 text-xs tracking-wider uppercase text-center w-full sm:w-auto ${focusRing}`}>
              View More Samples
            </Link>
          </div>
        </div>
      </section>


      {/* ── 5. HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-[#FAF4F5] relative border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-20">
            <span className="font-sans-clean text-[#A65B62] text-[10px] tracking-[0.25em] uppercase font-bold block mb-3">
              ✦ How It Works ✦
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
              From your memories to your wall in 4 simple steps
            </h2>
          </div>

          {/* 4 Step Row with dotted lines */}
          <div className="relative">
            {/* Desktop connecting dotted line */}
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-[#A65B62]/35 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

              {[
                { icon: Upload, title: "1. Upload", desc: "Upload your favorite photos & details" },
                { icon: Sliders, title: "2. Customize", desc: "Choose frame, style & personalize" },
                { icon: Eye, title: "3. Preview", desc: "We create & share preview for you" },
                { icon: Truck, title: "4. Delivered", desc: "We print, pack & deliver with love" }
              ].map((step, i) => (
                <div key={step.title} className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-white border border-stone-100 shadow-md rounded-full flex items-center justify-center text-[#A65B62] relative z-10 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                    <step.icon size={28} />
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#A65B62] text-white text-xs rounded-full flex items-center justify-center font-sans-clean font-bold shadow-md">{i + 1}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-stone-850 mt-6 mb-2">{step.title}</h3>
                  <p className="font-sans-clean text-xs text-stone-500 max-w-[200px] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}

            </div>
          </div>

        </div>
      </section>

      {/* ── 6. QUICK CREATE ── */}
      <section className="py-24 bg-white relative border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <span className="font-sans-clean text-xs tracking-[0.2em] uppercase text-[#A65B62] font-bold block mb-4">Fast Keepsakes</span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-stone-900">
              Quick Create
            </h2>
            <p className="font-sans-clean text-stone-500 max-w-2xl mx-auto mt-4 text-xs sm:text-sm leading-relaxed">
              Choose a design, upload your memories, and create meaningful keepsakes in just a few clicks. Best for last-minute gifting.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {quickCreate.map((p) => (
              <motion.div
                key={p.id}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                className="group bg-white border border-stone-100 hover:border-[#A65B62]/20 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between will-change-transform"
              >
                <div>
                  {/* Photo Frame Style Container */}
                  <div className="relative w-full h-56 mb-4 bg-white p-3 border-[10px] border-stone-900 shadow-xl rounded-sm overflow-hidden flex flex-col justify-center">
                    <TapeCorner className="-top-2 -right-2" tone="dark" rotate={12} />
                    <AutoImageSlider images={p.images} className="w-full h-full rounded-sm" />
                    <span className="absolute top-4 right-4 px-2.5 py-0.5 bg-rose-500 text-white text-[9px] font-sans-clean font-bold tracking-wider uppercase rounded-full shadow-md z-10">
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-stone-900 mb-2 group-hover:text-[#A65B62] transition-colors">
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
                    className={`block text-center py-3 bg-[#A65B62] hover:bg-[#8F4A50] text-white text-[10px] tracking-wider font-sans-clean font-bold uppercase rounded-lg transition-all duration-300 ${focusRing}`}>
                    Select options
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── 7. CUSTOM COLLECTION ── */}
      <section className="py-24 bg-[#FAF4F5] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <span className="font-sans-clean text-xs tracking-[0.2em] uppercase text-[#A65B62] font-bold block mb-2">Luxury Keepsakes</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-stone-900">
              Custom Collection
            </h2>
            <p className="font-sans-clean text-stone-500 max-w-xl mx-auto mt-2 text-xs sm:text-sm leading-relaxed">
              Crafted around your memories with personalized storytelling, custom layouts, and thoughtful details. Best for deeply personal keepsakes & gifts!
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
          >
            {customCollection.map((p) => (
              <motion.div
                key={p.id}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                className="group relative bg-white border border-stone-100 hover:border-[#A65B62]/20 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between will-change-transform"
              >
                <div className="absolute top-5 right-5 bg-rose-500 text-white text-[10px] font-sans-clean font-extrabold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm z-10">
                  {p.tag}
                </div>

                <div>
                  {/* Photo Album Style Container */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/11] mb-4 bg-[#FAF4F5] p-2.5 pb-4 shadow-lg rounded-r-xl rounded-l-sm border-l-[6px] border-stone-900 overflow-hidden flex flex-col justify-center before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-black/20 before:z-10 shadow-[8px_8px_15px_-3px_rgba(0,0,0,0.15)] outline outline-1 outline-stone-200/50">
                    <TapeCorner className="top-2 left-8" rotate={-8} />
                    <AutoImageSlider images={p.images} className="w-full h-full rounded shadow-inner" />
                  </div>

                  {/* Reviews rating */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={11} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="font-sans-clean text-xs text-stone-400 font-semibold">{p.rating} ({p.reviewsCount})</span>
                  </div>

                  <h3 className="font-display text-xl lg:text-2xl font-bold text-stone-900 mb-2 group-hover:text-[#A65B62] transition-colors">
                    {p.name}
                  </h3>
                  <p className="font-sans-clean text-stone-500 text-xs leading-relaxed mb-4">
                    {p.desc}
                  </p>
                </div>

                <div>
                  <div className="border-t border-stone-100 pt-4 mt-3">
                    <p className="font-sans-clean text-[9px] text-stone-400 tracking-wider uppercase mb-0.5">Price Details</p>
                    <p className="font-display text-2xl font-extrabold text-stone-900 group-hover:text-[#A65B62] transition-colors">{p.price}</p>
                    <p className="font-sans-clean text-[9px] text-stone-400 leading-tight mt-1.5 italic">
                      This product has multiple variants. The options may be chosen on the product page.
                    </p>
                  </div>

                  <Link href={`/product/${p.slug}`}
                    className={`mt-4 flex items-center justify-center gap-2 w-full py-3 bg-[#A65B62] hover:bg-[#8F4A50] text-[#ffffff] text-xs tracking-widest font-sans-clean font-bold uppercase rounded-xl transition-all duration-300 shadow-md ${focusRing}`}>
                    Select options <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── 8. COMBO PROMO ── */}
      <section className="py-24 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#A65B62]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute left-[-10%] bottom-[-10%] w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

            <div className="md:col-span-7 flex flex-col items-start text-left">
              <span className="px-3.5 py-1 bg-[#A65B62]/20 border border-[#A65B62]/30 text-[#A65B62] text-[10px] font-sans-clean font-bold tracking-[0.2em] uppercase rounded-full mb-6 inline-flex items-center gap-1.5">
                <Gift size={11} /> Premium Combo Pack
              </span>

              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-6">
                Flip the Pages,<br />
                <span className="font-black text-[#A65B62]">Scan the Moments</span>
              </h2>

              <p className="font-sans-clean text-stone-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                Get the best of both worlds! A beautifully designed magazine filled with memories and a recap reel video linked through a scannable QR. Perfect for gifts, surprises, and forever moments.
              </p>

              <a href="https://wa.me/919871874041?text=Hi!%20I%20want%20to%20order%20the%20Combo%20(Magazine%20%2B%20Recap%20Reel)%20seen%20on%20your%20website."
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-4 bg-[#A65B62] hover:bg-[#8F4A50] text-white font-sans-clean font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#A65B62]/25 hover:-translate-y-0.5 flex items-center gap-2 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65B62] focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950`}>
                💬 Get My Combo
              </a>
            </div>

            <div className="md:col-span-5 flex justify-center relative">
              <div className="relative w-72 h-80 bg-stone-800 rounded-3xl p-4 border border-stone-700 shadow-2xl flex flex-col justify-between overflow-hidden will-change-transform">
                <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/90 to-[#A65B62]/10 pointer-events-none" />
                <div className="flex justify-between items-center text-white/50 text-[10px] tracking-widest font-sans-clean font-bold">
                  <span>MAGAZINE</span>
                  <span>+ REEL</span>
                </div>

                <div className="w-32 h-32 bg-white/95 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center p-3.5 shadow-xl relative border border-white/20">
                  <div className="w-full h-full border-4 border-stone-900 border-dashed opacity-85 flex items-center justify-center">
                    <span className="text-xl">🎬</span>
                  </div>
                  <motion.div
                    className="absolute left-0 right-0 h-0.5 bg-[#A65B62]/85 shadow-md shadow-[#A65B62]"
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

      {/* ── 9. REDESIGNED REVIEWS SECTION ── */}
      <section id="reviews" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Left Block (Burgundy Panel) */}
            <div className="lg:col-span-4 bg-[#A65B62] rounded-3xl p-8 sm:p-10 flex flex-col justify-between text-white relative overflow-hidden shadow-xl min-h-[350px]">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

              <div>
                <span className="text-white/80 font-sans-clean text-[10px] font-bold tracking-[0.25em] uppercase block mb-6">
                  Customer Love
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-normal leading-[1.2] text-white">
                  Trusted by thousands to <span className="italic">preserve</span> their most precious moments
                </h2>
              </div>

              {/* Stats Block — wired to the `stats` data with an animated count-up */}
              <div className="grid grid-cols-3 gap-2 border-t border-white/20 pt-8 mt-12">
                {stats.map((s) => (
                  <div key={s.label}>
                    <h4 className="font-display text-lg sm:text-xl font-bold">
                      <StatCountUp end={s.value} suffix={s.suffix} />
                    </h4>
                    <p className="font-sans-clean text-[9px] text-white/70 uppercase tracking-widest mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Block (Cards Carousel) */}
            <div className="lg:col-span-8 flex flex-col justify-center relative px-2">

              {/* Carousel Buttons */}
              <div className="absolute -top-12 right-2 flex items-center gap-2 lg:top-auto lg:bottom-full lg:mb-4">
                <button
                  onClick={() => scrollReviews("left")}
                  className={`w-10 h-10 rounded-full border border-stone-200 bg-white text-stone-600 hover:bg-[#A65B62] hover:text-white hover:border-[#A65B62] flex items-center justify-center transition-all duration-200 shadow-sm ${focusRing}`}
                  aria-label="Previous review"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => scrollReviews("right")}
                  className={`w-10 h-10 rounded-full border border-stone-200 bg-white text-stone-600 hover:bg-[#A65B62] hover:text-white hover:border-[#A65B62] flex items-center justify-center transition-all duration-200 shadow-sm ${focusRing}`}
                  aria-label="Next review"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Cards Container */}
              <div
                ref={reviewsContainerRef}
                className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory pt-2 scroll-smooth"
              >
                {reviews.map((r, i) => (
                  <div
                    key={i}
                    className="w-full sm:w-[340px] flex-shrink-0 snap-start"
                  >
                    <div className="bg-[#FAF4F5] border border-stone-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-350 h-full flex flex-col justify-between">
                      <div>
                        {/* Rating stars */}
                        <div className="flex gap-0.5 mb-4 text-amber-400 text-sm">
                          {[...Array(r.stars)].map((_, idx) => (
                            <span key={idx}>★</span>
                          ))}
                        </div>
                        {/* Comment text */}
                        <p className="font-sans-clean text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 italic">
                          "{r.text}"
                        </p>
                      </div>

                      {/* User Info Line */}
                      <div className="flex items-center gap-3 border-t border-stone-100 pt-4 mt-auto">
                        <img
                          src={r.avatar}
                          alt={r.name}
                          className="w-10 h-10 rounded-full object-cover shadow-sm border border-stone-200"
                        />
                        <div className="flex-grow">
                          <h5 className="font-sans-clean font-bold text-stone-900 text-xs sm:text-sm leading-tight">{r.name}</h5>
                          <p className="font-sans-clean text-[10px] text-stone-400 mt-0.5">{r.city}</p>
                        </div>
                        <span className="text-rose-500 opacity-60"><Heart size={14} className="fill-rose-500" /></span>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── 10. THE STORY OF THE STORY CELLER ── */}
      <section id="about-us" className="py-24 bg-[#FAF4F5] border-t border-stone-100 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-sans-clean text-xs tracking-[0.2em] uppercase text-[#A65B62] font-bold block mb-4">Our Narrative</span>

            <h2 className="font-display text-3xl lg:text-5xl font-bold text-stone-900 mb-8">
              The Story Of The Story Celler
            </h2>

            <p className="font-sans-clean text-stone-500 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl mx-auto">
              At The Story Celler, we believe that every story, every moment deserves to be told beautifully. Whether it's celebrating love, friendships, milestones, or adventures, we capture the essence of your memories and turn them into one-of-a-kind keepsakes.
            </p>

            <p className="font-sans-clean text-stone-500 text-sm sm:text-base leading-relaxed mb-10 max-w-2xl mx-auto">
              A team of highly creative minds working together to create special keepsakes for lifelong memory.
            </p>

            <Link href="/our-story"
              className={`inline-block px-10 py-4 bg-stone-900 hover:bg-[#A65B62] text-white font-sans-clean font-bold text-xs tracking-widest uppercase rounded-xl transition-all duration-300 shadow-md ${focusRing}`}>
              Join Our Journey
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 11. FAQs ── */}
      <section className="py-24 bg-white relative border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-sans-clean text-xs tracking-[0.2em] uppercase text-[#A65B62] font-bold block mb-4">Learn More</span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-stone-900">
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
                  className={`bg-[#FFFBFB] border-2 border-dashed rounded-2xl overflow-hidden shadow-sm transition-colors duration-300 ${isOpen ? "border-[#A65B62]/50" : "border-stone-200"}`}
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className={`w-full flex justify-between items-center gap-4 p-5 text-left font-sans-clean font-bold text-sm text-stone-800 hover:bg-[#FFFBFB]/80 transition-colors ${focusRing}`}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-[#A65B62] shrink-0 transition-transform duration-250 ${isOpen ? "rotate-180" : ""}`}
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
                        <div className="p-5 border-t border-stone-100 bg-white font-sans-clean text-xs sm:text-sm text-stone-500 leading-relaxed">
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
