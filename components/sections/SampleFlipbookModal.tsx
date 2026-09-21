"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2, Volume2, VolumeX } from "lucide-react";
import dynamic from "next/dynamic";

// Load react-pageflip dynamically to prevent SSR document/window crashes
const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false }) as any;

interface SampleFlipbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
  images?: string[]; // Direct image URLs support
  pageCount: number;
  productName: string;
}

export default function SampleFlipbookModal({
  isOpen,
  onClose,
  pdfUrl,
  images,
  pageCount,
  productName,
}: SampleFlipbookModalProps) {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 400, height: 560, isMobile: false });
  const flipbookRef = useRef<any>(null);

  // Realistic paper turn audio effect synthesized via Web Audio API
  const playPageFlipSound = useCallback(() => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Generate paper rustle noise buffer
      const duration = 0.12; // 120ms paper slide sound
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        // Soft white noise burst with exponential fade
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter to model paper texture (~1500Hz)
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1500, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(ctx.currentTime);
    } catch {
      // Ignore audio autoplay restrictions
    }
  }, [isMuted]);

  // Compute exact fit-to-screen dimensions to prevent any cropping & scrollbars
  const calculateDimensions = useCallback(() => {
    if (typeof window === "undefined") return;
    const isMob = window.innerWidth < 768;
    const availWidth = window.innerWidth;
    const availHeight = window.innerHeight - 150; // Reserve header + footer height

    let pageHeight: number;
    let pageWidth: number;

    if (isMob) {
      pageHeight = Math.min(availHeight, 520);
      pageWidth = Math.min(availWidth - 32, Math.floor(pageHeight * 0.72));
    } else {
      // Double page spread side-by-side mode
      const maxSpreadWidth = availWidth - 140;
      const maxSingleWidth = Math.floor(maxSpreadWidth / 2);
      pageHeight = Math.min(availHeight, 660);
      pageWidth = Math.min(maxSingleWidth, Math.floor(pageHeight * 0.72));
      // Re-calculate exact height based on width ratio
      pageHeight = Math.floor(pageWidth / 0.72);
    }

    setDimensions({ width: pageWidth, height: pageHeight, isMobile: isMob });
  }, []);

  useEffect(() => {
    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);
    return () => window.removeEventListener("resize", calculateDimensions);
  }, [calculateDimensions]);

  // Load PDF pages and convert to canvas image data urls
  useEffect(() => {
    if (!isOpen) return;

    setPages([]);
    setError(null);
    setCurrentPage(0);
    setZoom(1);

    if (images && images.length > 0) {
      setPages(images);
      setLoading(false);
      return;
    }

    if (!pdfUrl) {
      generateFallbackPages(pageCount || 12);
      return;
    }

    // Clean double .pdf.pdf if present
    const cleanPdfUrl = pdfUrl ? pdfUrl.replace(/\.pdf\.pdf$/i, ".pdf") : "";

    let isMounted = true;
    setLoading(true);

    // ⚡ INSTANT LIGHTNING SPEED CLOUDINARY PDF-TO-IMAGE OPTIMIZATION
    if (cleanPdfUrl.includes("res.cloudinary.com")) {
      const baseJpgUrl = cleanPdfUrl.replace(/\.pdf$/i, ".jpg");

      const buildPgUrl = (pg: number) => {
        let clean = baseJpgUrl;
        if (clean.includes("/raw/upload/")) {
          clean = clean.replace("/raw/upload/", `/image/upload/f_auto,q_auto,w_1000,pg_${pg}/`);
        } else if (clean.includes("/upload/")) {
          clean = clean.replace("/upload/", `/upload/f_auto,q_auto,w_1000,pg_${pg}/`);
        }
        return clean;
      };

      const count = Math.max(pageCount || 20, 20);
      const pageImages: string[] = [];
      for (let i = 1; i <= count; i++) {
        pageImages.push(buildPgUrl(i));
      }

      setPages(pageImages);
      setLoading(false);
      return;
    }

    async function renderPagesWithPdfJs(url: string) {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

        const loadingTask = pdfjs.getDocument(url);
        const pdf = await loadingTask.promise;
        const totalPages = pdf.numPages;

        const renderedPages: string[] = [];
        for (let i = 1; i <= totalPages; i++) {
          if (!isMounted) return;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          if (context) {
            await page.render({ canvasContext: context, viewport }).promise;
            renderedPages.push(canvas.toDataURL("image/jpeg", 0.85));
          }
        }

        if (isMounted) {
          setPages(renderedPages);
          setLoading(false);
        }
      } catch (err: any) {
        console.warn("Could not load PDF document via pdfjs, showing preview pages:", err?.message || err);
        if (isMounted) {
          generateFallbackPages(pageCount || 12);
          setLoading(false);
        }
      }
    }

    renderPagesWithPdfJs(cleanPdfUrl);

    return () => {
      isMounted = false;
    };
  }, [isOpen, pdfUrl, pageCount]);

  function generateFallbackPages(count: number) {
    const fallback: string[] = [];
    for (let i = 0; i < count; i++) {
      const isCover = i === 0;
      const isBackCover = i === count - 1;

      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 833; // 1:1.38 ratio
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 600, 833);
        if (isCover || isBackCover) {
          gradient.addColorStop(0, "#2c2a29");
          gradient.addColorStop(1, "#1c1a19");
        } else {
          gradient.addColorStop(0, i % 2 === 0 ? "#fdfbf7" : "#faf6f0");
          gradient.addColorStop(1, i % 2 === 0 ? "#f5efe6" : "#ebe3d5");
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 600, 833);

        ctx.strokeStyle = isCover || isBackCover ? "rgba(245, 158, 11, 0.2)" : "rgba(28, 26, 25, 0.05)";
        ctx.lineWidth = 20;
        ctx.strokeRect(10, 10, 580, 813);

        if (isCover) {
          ctx.fillStyle = "#f59e0b";
          ctx.font = "bold 24px Georgia";
          ctx.textAlign = "center";
          ctx.fillText("THE STORY CELLER EDITION", 300, 150);

          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 44px Georgia";
          ctx.fillText("OUR STORIES", 300, 320);
          ctx.font = "34px Georgia";
          ctx.fillText("IN PRINT", 300, 380);

          ctx.strokeStyle = "#f59e0b";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(200, 420);
          ctx.lineTo(400, 420);
          ctx.stroke();

          ctx.fillStyle = "#d1d5db";
          ctx.font = "italic 18px Georgia";
          ctx.fillText("Personalized Memory Keepsake", 300, 460);

          ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
          ctx.fillRect(150, 520, 300, 220);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
          ctx.strokeRect(150, 520, 300, 220);
          ctx.fillStyle = "#f59e0b";
          ctx.font = "36px Georgia";
          ctx.fillText("📖", 300, 640);
        } else if (isBackCover) {
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 28px Georgia";
          ctx.textAlign = "center";
          ctx.fillText("The Story Celler", 300, 390);
          ctx.fillStyle = "#9ca3af";
          ctx.font = "14px Arial";
          ctx.fillText("Forever in Art, Forever in Heart", 300, 430);
          ctx.font = "12px Arial";
          ctx.fillText("www.storyceller.in", 300, 460);
        } else {
          ctx.fillStyle = "#f59e0b";
          ctx.font = "bold 16px Georgia";
          ctx.fillText(`Chapter ${Math.ceil(i / 2)}`, 60, 60);

          ctx.fillStyle = "#2c2a29";
          ctx.font = "bold 28px Georgia";
          ctx.fillText(`Unforgettable Moments`, 60, 105);

          ctx.fillStyle = "#706d68";
          ctx.font = "16px Arial";
          const lines = [
            "Every picture tells a story, and every story carries",
            "a piece of our heart. Looking back on these sweet",
            "memories makes us realize how far we have come",
            "together, and how many milestones we've achieved.",
          ];
          lines.forEach((line, index) => {
            ctx.fillText(line, 60, 160 + index * 30);
          });

          ctx.fillStyle = "rgba(28, 26, 25, 0.02)";
          ctx.fillRect(60, 320, 480, 400);
          ctx.strokeStyle = "rgba(28, 26, 25, 0.08)";
          ctx.strokeRect(60, 320, 480, 400);
          ctx.fillStyle = "#b45309";
          ctx.font = "40px Georgia";
          ctx.textAlign = "center";
          ctx.fillText("🖼️", 300, 520);

          ctx.fillStyle = "#706d68";
          ctx.font = "italic 14px Arial";
          ctx.fillText("Insert Beautiful Memory Caption Here", 300, 660);

          ctx.fillStyle = "#706d68";
          ctx.font = "14px Arial";
          ctx.fillText(String(i + 1), i % 2 === 0 ? 550 : 50, 790);
        }

        fallback.push(canvas.toDataURL("image/jpeg", 0.9));
      }
    }
    setPages(fallback);
  }

  // Flipbook Nav helpers with sound trigger
  const prevPage = useCallback(() => {
    if (flipbookRef.current) {
      flipbookRef.current.pageFlip().flipPrev();
    }
  }, []);

  const nextPage = useCallback(() => {
    if (flipbookRef.current) {
      flipbookRef.current.pageFlip().flipNext();
    }
  }, []);

  // Keyboard navigation (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevPage();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextPage();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, prevPage, nextPage, onClose]);

  const handleFlip = (e: any) => {
    setCurrentPage(e.data);
    playPageFlipSound();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col w-screen h-screen bg-stone-950 text-white overflow-hidden p-3 md:p-6 select-none border-0 ring-0">
      {/* HEADER BAR */}
      <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 mb-2 shrink-0">
        <div>
          <h3 className="font-display text-lg md:text-xl font-bold text-amber-500">{productName} Magazine</h3>
          <p className="font-sans-clean text-xs text-stone-400">
            Interactive Flipbook — Page {currentPage + 1} of {pages.length}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 hover:bg-stone-800 rounded-xl text-stone-300 transition-colors"
            title={isMuted ? "Unmute Page Sound" : "Mute Page Sound"}
          >
            {isMuted ? <VolumeX size={18} className="text-stone-500" /> : <Volume2 size={18} className="text-amber-400" />}
          </button>

          {/* Zoom Controls — hidden on mobile */}
          <div className="hidden md:flex items-center gap-1 bg-stone-900/80 px-2 py-1 rounded-xl border border-stone-800">
            <button
              onClick={() => setZoom((z) => Math.max(0.7, parseFloat((z - 0.1).toFixed(2))))}
              className="p-1 hover:bg-stone-800 rounded-lg text-stone-300 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <span className="font-sans-clean text-xs text-stone-400 w-10 text-center font-medium">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(1.5, parseFloat((z + 0.1).toFixed(2))))}
              className="p-1 hover:bg-stone-800 rounded-lg text-stone-300 transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
          </div>

          <div className="w-px h-6 bg-stone-800 mx-1" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 bg-stone-800 hover:bg-rose-600 rounded-xl text-white transition-colors"
            title="Close Fullscreen View"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* FULLSCREEN WORKSPACE AREA — NO SCROLLBARS */}
      <div className="flex-1 w-full h-full flex items-center justify-center relative overflow-hidden select-none bg-stone-950">
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={38} className="text-amber-500 animate-spin" />
            <p className="font-sans-clean text-sm text-stone-400">Opening Magazine View...</p>
          </div>
        ) : error ? (
          <p className="font-sans-clean text-red-400">{error}</p>
        ) : (
          <div
            className="transition-transform duration-300 ease-out flex items-center justify-center w-full h-full"
            style={{ transform: dimensions.isMobile ? "scale(1)" : `scale(${zoom})` }}
          >
            {pages.length > 0 && (
              <HTMLFlipBook
                ref={flipbookRef}
                width={dimensions.width}
                height={dimensions.height}
                size="fixed"
                minWidth={dimensions.width}
                maxWidth={dimensions.width}
                minHeight={dimensions.height}
                maxHeight={dimensions.height}
                maxShadowOpacity={0.4}
                showCover={true}
                usePortrait={dimensions.isMobile}
                mobileScrollSupport={true}
                onFlip={handleFlip}
                className="shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-sm overflow-hidden"
              >
                {pages.map((src, index) => (
                  <div key={index} className="bg-white relative overflow-hidden h-full shadow-inner">
                    <img
                      src={src}
                      alt={`Preview page ${index + 1} of ${productName} keepsake design`}
                      className="w-full h-full object-fill pointer-events-none select-none"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.dataset.failed) return;
                        target.dataset.failed = "true";

                        // If page 404 occurs on page 9+ (end of PDF reached), auto-truncate pages array!
                        setPages((prevPages) => {
                          if (prevPages.length > index && index >= 1) {
                            return prevPages.slice(0, index);
                          }
                          return prevPages;
                        });
                      }}
                    />
                  </div>
                ))}
              </HTMLFlipBook>
            )}
          </div>
        )}

        {/* Navigation Overlay arrows */}
        {!loading && pages.length > 0 && (
          <>
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="absolute left-2 md:left-6 p-3 md:p-4 rounded-full bg-stone-900/80 hover:bg-amber-500 border border-stone-700/60 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-2xl z-20 backdrop-blur-md"
              title="Previous Page"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage >= pages.length - 1}
              className="absolute right-2 md:right-6 p-3 md:p-4 rounded-full bg-stone-900/80 hover:bg-amber-500 border border-stone-700/60 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-2xl z-20 backdrop-blur-md"
              title="Next Page"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* FOOTER NAV BAR */}
      <div className="flex justify-between items-center pt-2 shrink-0 border-t border-stone-900">
        <p className="font-sans-clean text-xs text-stone-500 hidden sm:block">
          Tip: Click arrows, drag page edges, or use Arrow Keys (← / →) to flip pages.
        </p>

        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold rounded-lg disabled:opacity-40 transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-1.5 bg-stone-900 border border-stone-800 text-xs text-amber-400 font-bold rounded-lg font-mono">
            {currentPage + 1} / {pages.length}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage >= pages.length - 1}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold rounded-lg disabled:opacity-40 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

