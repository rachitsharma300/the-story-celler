"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import api from "@/lib/axios";

interface SampleItem {
  id: string;
  title: string;
  pageText: string;
  coverImage: string;
  tagColor: string;
  pdfUrl: string;
  pageCount: number;
  category?: string;
}

const staticSamples: SampleItem[] = [
  {
    id: "wedding-nandita",
    title: "Nandita's Wedding",
    pageText: "12 Pages",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-rose-100 text-rose-700",
    pdfUrl: "",
    pageCount: 12,
    category: "WEDDING"
  },
  {
    id: "anniversary-ashish",
    title: "Ashish's Anniversary",
    pageText: "12 Pages",
    coverImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-amber-100 text-amber-700",
    pdfUrl: "",
    pageCount: 12,
    category: "ANNIVERSARY"
  },
  {
    id: "wedding-timeless",
    title: "Timeless Wedding",
    pageText: "12 Pages",
    coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-rose-100 text-rose-700",
    pdfUrl: "",
    pageCount: 12,
    category: "WEDDING"
  },
  {
    id: "birthday-sonali",
    title: "Sonali's Birthday",
    pageText: "16 Pages",
    coverImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-yellow-100 text-yellow-700",
    pdfUrl: "",
    pageCount: 16,
    category: "BIRTHDAY"
  },
  {
    id: "travel-amandeep",
    title: "Amandeep's Travel",
    pageText: "20 Pages",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-emerald-100 text-emerald-700",
    pdfUrl: "",
    pageCount: 20,
    category: "TRAVEL"
  },
  {
    id: "engagement-fenil",
    title: "Fenil's Engagement",
    pageText: "16 Pages",
    coverImage: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-purple-100 text-purple-700",
    pdfUrl: "",
    pageCount: 16,
    category: "ENGAGEMENT"
  },
  {
    id: "honeymoon-sarthak",
    title: "Sarthak's Honeymoon",
    pageText: "12 Pages",
    coverImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-indigo-100 text-indigo-700",
    pdfUrl: "",
    pageCount: 12,
    category: "HONEYMOON"
  },
  {
    id: "engagement-denish",
    title: "Denish's Engagement",
    pageText: "20 Pages",
    coverImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-rose-100 text-rose-700",
    pdfUrl: "",
    pageCount: 20,
    category: "ENGAGEMENT"
  },
  {
    id: "prewedding-parsha",
    title: "Parsha's Pre-Wedding",
    pageText: "12 Pages",
    coverImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-slate-100 text-slate-700",
    pdfUrl: "",
    pageCount: 12,
    category: "PRE-WEDDING"
  },
  {
    id: "valentines-aditi",
    title: "Aditi's Valentine",
    pageText: "16 Pages",
    coverImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-sky-100 text-sky-700",
    pdfUrl: "",
    pageCount: 16,
    category: "VALENTINE"
  },
  {
    id: "birthday-yash",
    title: "Yash's Birthday",
    pageText: "12 Pages",
    coverImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80",
    tagColor: "bg-teal-100 text-teal-700",
    pdfUrl: "",
    pageCount: 12,
    category: "BIRTHDAY"
  },
  {
    id: "travel-yashanjli",
    title: "Yashanjli's Travel",
    pageText: "8 Pages",
    coverImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=80",
    tagColor: "bg-amber-100 text-amber-700",
    pdfUrl: "/samples/yashanjli-travel.pdf",
    pageCount: 8,
    category: "TRAVEL"
  }
];

interface SamplesSectionProps {
  onOpenSample: (title: string, pages: number, pdf?: string, images?: string[]) => void;
}

export default function SamplesSection({ onOpenSample }: SamplesSectionProps) {
  const [sampleIndex, setSampleIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [samplesList, setSamplesList] = useState<SampleItem[]>(staticSamples);

  useEffect(() => {
    async function loadDbSamples() {
      try {
        const response = await api.get("/api/samples");
        if (response.data && response.data.length > 0) {
          const formatted = response.data.map((s: any) => {
            const count = s.pageCount || 20;
            return {
              id: `db-${s.id}`,
              title: s.title,
              pageText: `${count} Pages`,
              coverImage: s.coverImageUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80",
              tagColor: "bg-amber-100 text-amber-700",
              pdfUrl: s.pdfUrl,
              pageCount: count
            };
          });
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

  // Keyboard arrow keys navigation for carousel (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === "ArrowLeft") {
        setSampleIndex((p) => Math.max(0, p - 1));
      } else if (e.key === "ArrowRight") {
        setSampleIndex((p) => Math.min(Math.max(0, samplesList.length - itemsToShow), p + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [itemsToShow, samplesList.length]);

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65B62] focus-visible:ring-offset-2";

  return (
    <section className="py-28 bg-[#FAF4F5] relative border-y border-stone-100 overflow-hidden">
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
                  <div
                    onClick={() => onOpenSample(sample.title, sample.pageCount, sample.pdfUrl)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onOpenSample(sample.title, sample.pageCount, sample.pdfUrl);
                      }
                    }}
                    className={`group cursor-pointer select-none ${focusRing}`}
                  >
                    <div className="relative mx-auto w-[180px] h-[245px] sm:w-[220px] sm:h-[300px] perspective-[1000px]">
                      {/* 3D Paper Stack Layers Illusion */}
                      <div className="absolute rounded-r-md bg-stone-300 border-r-2 border-stone-400/60" style={{ top: "8px", left: "8px", right: "-10px", bottom: "-8px" }} />
                      <div className="absolute rounded-r-md bg-stone-200 border-r-2 border-stone-300/80" style={{ top: "4px", left: "4px", right: "-5px", bottom: "-4px" }} />

                      {/* Main 3D Album Cover */}
                      <div
                        className="absolute inset-0 rounded-r-sm rounded-l-md overflow-hidden shadow-[0_20px_45px_-8px_rgba(0,0,0,0.35)] cursor-pointer bg-stone-900 border-l-2 border-amber-500/30"
                        style={{ transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.45s ease" }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.transform = "translateY(-14px) rotateY(-10deg) scale(1.04)";
                          el.style.boxShadow = "0 30px 60px -10px rgba(166,91,98,0.55), 0 15px 25px -5px rgba(0,0,0,0.4)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.transform = "";
                          el.style.boxShadow = "";
                        }}
                      >
                        <Image
                          src={sample.coverImage}
                          alt={`Cover of ${sample.title} magazine sample`}
                          fill
                          sizes="(max-width: 640px) 180px, 220px"
                          className="object-cover"
                          loading="lazy"
                        />
                        {/* Book Spine Fold & Shadow Overlay */}
                        <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-stone-950/70 via-black/30 to-transparent pointer-events-none border-l border-white/20" />
                        
                        {/* Shimmer Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Title Gradient Footer */}
                        <div className="absolute bottom-0 left-0 right-0 h-[85px] bg-gradient-to-t from-stone-950/95 via-stone-900/60 to-transparent flex flex-col justify-end px-3.5 pb-3">
                          <span className="text-white font-display text-[13px] sm:text-[14px] font-bold leading-snug drop-shadow-md line-clamp-2">
                            {sample.title}
                          </span>
                        </div>

                        {/* Category Pill */}
                        <div className="absolute top-2.5 right-2.5">
                          <span className="bg-[#A65B62] text-white font-sans-clean text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm">
                            {sample.category || "3D KEEPSAKE"}
                          </span>
                        </div>

                        {/* Hover View Flipbook Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-stone-950/20 backdrop-blur-[2px]">
                          <span className="bg-white/95 text-[#A65B62] font-sans-clean font-black text-[10px] tracking-widest uppercase px-4 py-2 rounded-full shadow-xl flex items-center gap-1.5 border border-stone-200/50 transform group-hover:scale-105 transition-transform">
                            <BookOpen size={12} /> View Flipbook
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 text-center w-[180px] sm:w-[220px]">
                      <p className="font-display text-sm font-bold text-stone-850 leading-snug group-hover:text-[#A65B62] transition-colors truncate" title={sample.title}>
                        {sample.title}
                      </p>
                      <p className="font-sans-clean text-[10px] text-stone-400 mt-1 tracking-wide uppercase font-semibold">
                        Interactive Keepsake • Digital & Print
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
  );
}
