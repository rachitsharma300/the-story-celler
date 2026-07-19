"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import SampleFlipbookModal from "@/components/sections/SampleFlipbookModal";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Sample {
  id: number;
  title: string;
  pdfUrl: string;
  coverImageUrl?: string;
  category?: string;
}

// ── Stagger variants ───────────────────────────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};

// ── Tape corner decoration (same as homepage) ──────────────────────────────────
function TapeCorner({
  className = "",
  rotate = -10,
  tone = "light",
}: {
  className?: string;
  rotate?: number;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={`absolute z-20 w-8 h-3 pointer-events-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        className={`w-full h-full ${
          tone === "dark"
            ? "bg-stone-800/60 border-t border-stone-700/40"
            : "bg-amber-100/90 border-t border-amber-200/60"
        } shadow-sm`}
        style={{ borderRadius: "1px 1px 0 0" }}
      />
    </div>
  );
}

// ── 3-D Book Card (exactly like homepage slider) ───────────────────────────────
function BookCard({
  sample,
  onOpen,
  focusRing,
}: {
  sample: Sample;
  onOpen: (s: Sample) => void;
  focusRing: string;
}) {
  const coverSrc =
    sample.coverImageUrl ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80";

  return (
    <motion.div
      variants={item}
      className="flex flex-col items-center"
    >
      {/* 3-D book wrapper */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`View ${sample.title} sample`}
        onClick={() => onOpen(sample)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(sample);
          }
        }}
        className={`group cursor-pointer select-none ${focusRing} rounded-xl`}
      >
        {/* Relative container gives consistent size across all cards */}
        <div
          className="relative mx-auto w-[130px] h-[173px] sm:w-[200px] sm:h-[267px]"
        >
          {/* Shadow pages — bundle illusion */}
          <div
            className="absolute rounded-sm bg-stone-300"
            style={{ top: "8px", left: "8px", right: "-8px", bottom: "-8px" }}
          />
          <div
            className="absolute rounded-sm bg-stone-200"
            style={{ top: "4px", left: "4px", right: "-4px", bottom: "-4px" }}
          />

          {/* Main cover */}
          <div
            className="absolute inset-0 rounded-sm overflow-hidden shadow-[0_16px_40px_-6px_rgba(0,0,0,0.28)] cursor-pointer"
            style={{ transition: "transform 0.4s ease, box-shadow 0.4s ease" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-12px) rotate(-3deg) scale(1.04)";
              el.style.boxShadow = "0 28px 56px -8px rgba(166,91,98,0.55)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "";
              el.style.boxShadow = "";
            }}
          >
            {/* Cover image */}
            <img
              src={coverSrc}
              alt={sample.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Spine shadow overlay */}
            <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-black/45 to-transparent pointer-events-none" />

            {/* Bottom gradient + title */}
            <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-black/92 via-black/55 to-transparent flex flex-col justify-end px-3.5 pb-3">
              <span className="text-white font-display text-[13px] font-bold leading-tight drop-shadow line-clamp-2">
                {sample.title}
              </span>
            </div>

            {/* Category badge */}
            {sample.category && (
              <div className="absolute top-3 right-3">
                <span className="bg-[#A65B62] text-white font-sans-clean text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full shadow">
                  {sample.category}
                </span>
              </div>
            )}

            {/* Hover "View Flipbook" pill */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/12">
              <span className="bg-white/95 backdrop-blur text-[#A65B62] font-sans-clean font-black text-[9px] tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <BookOpen size={10} /> View Flipbook
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Label below card */}
      <div className="mt-5 text-center w-[130px] sm:w-[200px]">
        <p className="font-display text-sm font-bold text-stone-850 leading-snug group-hover:text-[#A65B62] transition-colors">
          {sample.title}
        </p>
        {sample.category && (
          <p className="font-sans-clean text-[10px] text-stone-400 mt-1 uppercase tracking-wider">
            {sample.category}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function SamplesPage() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSample, setModalSample] = useState<Sample | null>(null);

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65B62] focus-visible:ring-offset-2";

  // ── Fetch samples from API ───────────────────────────────────────────────────
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    fetch(`${BACKEND}/api/samples`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Sample[]) => setSamples(Array.isArray(data) ? data : []))
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Failed to load samples:", err);
          setError("Could not load samples. Please try again later.");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  // ── Derive categories ────────────────────────────────────────────────────────
  const categories = [
    "All",
    ...Array.from(new Set(samples.map((s) => s.category).filter(Boolean))),
  ] as string[];

  const filtered =
    activeCategory === "All"
      ? samples
      : samples.filter((s) => s.category === activeCategory);

  // ── Open modal ───────────────────────────────────────────────────────────────
  const openSample = (s: Sample) => {
    setModalSample(s);
    setModalOpen(true);
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF4F5] pt-24 pb-20">

      {/* ── HERO HEADER ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-stone-100 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#A65B62]/6 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-rose-100/40 blur-[80px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-sans-clean text-[10px] tracking-[0.3em] uppercase text-[#A65B62] font-bold block mb-4">
              ✦ Real Sample Designs ✦
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 mb-5 leading-tight">
              Magazine Samples
            </h1>
            <p className="font-sans-clean text-stone-400 max-w-lg mx-auto text-sm leading-relaxed mb-8">
              Browse through real designs we've crafted for our clients. Click
              any cover to flip through the pages in our interactive 3D viewer.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/product/custom-magazine"
                className={`px-7 py-3.5 bg-[#A65B62] hover:bg-[#8F4A50] text-white font-sans-clean font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#A65B62]/20 hover:-translate-y-0.5 text-xs tracking-widest uppercase flex items-center justify-center gap-2 ${focusRing}`}
              >
                <Sparkles size={14} /> Create Mine
              </Link>
              <Link
                href="/shop"
                className={`px-7 py-3.5 border-2 border-[#A65B62]/30 text-[#A65B62] hover:bg-[#A65B62]/5 hover:border-[#A65B62] font-sans-clean font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-xs tracking-widest uppercase flex items-center justify-center gap-2 ${focusRing}`}
              >
                View All Products <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER BAR ──────────────────────────────────────────────────────── */}
      {!loading && !error && categories.length > 1 && (
        <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full font-sans-clean text-xs font-bold tracking-wide transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#A65B62] text-white shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── SAMPLES GRID ────────────────────────────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 size={36} className="text-[#A65B62] animate-spin" />
            <p className="font-sans-clean text-sm text-stone-400">
              Loading samples…
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <AlertCircle size={36} className="text-rose-400" />
            <p className="font-sans-clean text-sm text-stone-500 max-w-sm">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-5 py-2 bg-[#A65B62] text-white text-xs font-bold rounded-xl font-sans-clean hover:bg-[#8F4A50] transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <BookOpen size={40} className="text-stone-300" />
            <p className="font-display text-xl font-bold text-stone-400">
              No samples yet
            </p>
            <p className="font-sans-clean text-sm text-stone-400 max-w-sm">
              {activeCategory === "All"
                ? "New samples will appear here once uploaded from the admin panel."
                : `No samples found in the "${activeCategory}" category.`}
            </p>
            {activeCategory !== "All" && (
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-1 text-[#A65B62] font-sans-clean text-xs font-bold underline decoration-dotted"
              >
                View all categories
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filtered.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-14"
          >
            {filtered.map((sample) => (
              <BookCard
                key={sample.id}
                sample={sample}
                onOpen={openSample}
                focusRing={focusRing}
              />
            ))}
          </motion.div>
        )}
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────────────────── */}
      {!loading && !error && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 p-10 sm:p-14 text-center text-white relative overflow-hidden"
          >
            {/* Decorative blobs */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-[#A65B62]/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute left-[-5%] bottom-[-10%] w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <span className="font-sans-clean text-[10px] tracking-[0.3em] uppercase text-[#A65B62] font-bold block mb-4">
                Your Turn
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Create Your Own?
              </h2>
              <p className="font-sans-clean text-stone-300 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                Inspired by these samples? Start creating your personalized
                keepsake today. Upload your photos and stories to bring your
                memories to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/product/custom-magazine"
                  className={`px-8 py-4 bg-[#A65B62] hover:bg-[#8F4A50] text-white font-sans-clean font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#A65B62]/25 hover:-translate-y-0.5 flex items-center justify-center gap-2 ${focusRing}`}
                >
                  <Sparkles size={14} /> Start Creating
                </Link>
                <a
                  href="https://wa.me/919871874041?text=Hi!%20I%20want%20to%20create%20a%20custom%20magazine%20like%20the%20samples%20I%20saw."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-8 py-4 border border-white/20 text-white hover:bg-white/10 font-sans-clean font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 ${focusRing}`}
                >
                  💬 Ask on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ── FLIPBOOK MODAL ───────────────────────────────────────────────────── */}
      {modalSample && (
        <SampleFlipbookModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setModalSample(null);
          }}
          pdfUrl={modalSample.pdfUrl}
          pageCount={12}
          productName={modalSample.title}
        />
      )}
    </div>
  );
}
