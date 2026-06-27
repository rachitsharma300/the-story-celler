"use client";

import { useEffect, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, ZoomIn, ZoomOut, Loader2 } from "lucide-react";
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const flipbookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load PDF pages and convert to canvas image data urls
  useEffect(() => {
    if (!isOpen) return;

    // Reset state
    setPages([]);
    setError(null);
    setCurrentPage(0);
    setZoom(1);

    // If pre-rendered image URLs are supplied, load them instantly
    if (images && images.length > 0) {
      setPages(images);
      setLoading(false);
      return;
    }

    if (!pdfUrl) {
      // Generate premium placeholder pages if no PDF URL is supplied
      generateFallbackPages(pageCount);
      return;
    }

    let isMounted = true;
    setLoading(true);

    async function loadPdf() {
      try {
        const pdfjs = await import("pdfjs-dist");
        // Use CDN worker for ease of Next.js App router bundling
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        const renderedPages: string[] = [];
        const pagesToRender = Math.min(pdf.numPages, pageCount);

        for (let i = 1; i <= pagesToRender; i++) {
          if (!isMounted) return;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 }); // Higher scale for clear text zoom

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
        console.error("PDF loading error, falling back to mock layout pages:", err);
        if (isMounted) {
          generateFallbackPages(pageCount);
          setLoading(false);
        }
      }
    }

    loadPdf();

    return () => {
      isMounted = false;
    };
  }, [isOpen, pdfUrl, pageCount]);

  // Generate gorgeous mock layout template pages for display
  function generateFallbackPages(count: number) {
    const gradients = [
      "from-[#2c3e50] to-[#000000]", // Elegant Cover dark theme
      "from-[#f5f7fa] to-[#c3cfe2]", // Dedication page
      "from-[#e0c3fc] to-[#8ec5fc]", // Photo collage layout 1
      "from-[#fdfcfb] to-[#e2d1c3]", // Editorial quote layout
      "from-[#a1c4fd] to-[#c2e9fb]", // Photo collage layout 2
      "from-[#f5f0e8] to-[#d4c5a9]", // Special messages
      "from-[#fed6e3] to-[#a8caba]", // Memory board
      "from-[#2c3e50] to-[#000000]", // Back cover
    ];

    const fallback: string[] = [];
    for (let i = 0; i < count; i++) {
      const grad = gradients[i % gradients.length];
      const isCover = i === 0;
      const isBackCover = i === count - 1;

      // Draw fallback template page onto virtual canvas
      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 800;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, 600, 800);
        if (isCover || isBackCover) {
          gradient.addColorStop(0, "#2c2a29");
          gradient.addColorStop(1, "#1c1a19");
        } else {
          gradient.addColorStop(0, i % 2 === 0 ? "#fdfbf7" : "#faf6f0");
          gradient.addColorStop(1, i % 2 === 0 ? "#f5efe6" : "#ebe3d5");
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 600, 800);

        // Grid border
        ctx.strokeStyle = isCover || isBackCover ? "rgba(245, 158, 11, 0.2)" : "rgba(28, 26, 25, 0.05)";
        ctx.lineWidth = 20;
        ctx.strokeRect(10, 10, 580, 780);

        if (isCover) {
          // Cover layout
          ctx.fillStyle = "#f59e0b"; // Amber accent
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

          // Simulated image frame
          ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
          ctx.fillRect(150, 500, 300, 200);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
          ctx.strokeRect(150, 500, 300, 200);
          ctx.fillStyle = "#f59e0b";
          ctx.font = "32px Georgia";
          ctx.fillText("📖", 300, 610);
        } else if (isBackCover) {
          // Back cover layout
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 28px Georgia";
          ctx.textAlign = "center";
          ctx.fillText("The Story Celler", 300, 380);
          ctx.fillStyle = "#9ca3af";
          ctx.font = "14px Arial";
          ctx.fillText("Forever in Art, Forever in Heart", 300, 420);
          ctx.font = "12px Arial";
          ctx.fillText("www.storyceller.in", 300, 450);
        } else {
          // Content pages
          ctx.fillStyle = "#f59e0b";
          ctx.font = "bold 16px Georgia";
          ctx.fillText(`Chapter ${Math.ceil(i / 2)}`, 60, 50);

          ctx.fillStyle = "#2c2a29";
          ctx.font = "bold 28px Georgia";
          ctx.fillText(`Unforgettable Moments`, 60, 95);

          // Drawing text lines
          ctx.fillStyle = "#706d68";
          ctx.font = "16px Arial";
          const lines = [
            "Every picture tells a story, and every story carries",
            "a piece of our heart. Looking back on these sweet",
            "memories makes us realize how far we have come",
            "together, and how many milestones we've achieved.",
          ];
          lines.forEach((line, index) => {
            ctx.fillText(line, 60, 150 + index * 30);
          });

          // Picture placeholders
          ctx.fillStyle = "rgba(28, 26, 25, 0.02)";
          ctx.fillRect(60, 300, 480, 380);
          ctx.strokeStyle = "rgba(28, 26, 25, 0.08)";
          ctx.strokeRect(60, 300, 480, 380);
          ctx.fillStyle = "#b45309";
          ctx.font = "40px Georgia";
          ctx.textAlign = "center";
          ctx.fillText("🖼️", 300, 500);

          ctx.fillStyle = "#706d68";
          ctx.font = "italic 14px Arial";
          ctx.fillText("Insert Beautiful Memory Caption Here", 300, 640);

          // Page numbers
          ctx.fillStyle = "#706d68";
          ctx.font = "14px Arial";
          ctx.fillText(String(i + 1), i % 2 === 0 ? 550 : 50, 760);
        }

        fallback.push(canvas.toDataURL("image/jpeg", 0.9));
      }
    }
    setPages(fallback);
  }

  // Handle Fullscreen
  function toggleFullscreen() {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Fullscreen request failed:", err);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }

  // Monitor fullscreen events
  useEffect(() => {
    function handleFsChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
    };
  }, []);

  // Flipbook Nav helpers
  const prevPage = () => {
    if (flipbookRef.current) {
      flipbookRef.current.pageFlip().flipPrev();
    }
  };

  const nextPage = () => {
    if (flipbookRef.current) {
      flipbookRef.current.pageFlip().flipNext();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300">
      <div
        ref={containerRef}
        className="relative flex flex-col w-full h-full max-w-6xl max-h-[92vh] bg-stone-950 text-white rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8"
      >
        {/* HEADER BAR */}
        <div className="flex items-center justify-between border-b border-stone-900 pb-4 mb-4">
          <div>
            <h3 className="font-display text-xl font-bold text-amber-500">{productName} Sample</h3>
            <p className="font-sans-clean text-xs text-stone-400">
              Flipbook Preview — Page {currentPage + 1} of {pages.length}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <button
              onClick={() => setZoom((z) => Math.max(0.75, z - 0.15))}
              className="p-2 hover:bg-stone-800 rounded-lg text-stone-300 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
            <span className="font-sans-clean text-xs text-stone-400 w-10 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(2, z + 0.15))}
              className="p-2 hover:bg-stone-800 rounded-lg text-stone-300 transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={18} />
            </button>

            <div className="w-px h-6 bg-stone-800 mx-2" />

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-stone-800 rounded-lg text-stone-300 transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>

            <div className="w-px h-6 bg-stone-800 mx-2" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 bg-stone-800 hover:bg-red-600 rounded-lg text-white transition-colors"
              title="Close Preview"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* WORKSPACE AREA */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden select-none bg-stone-950 rounded-2xl border border-stone-900">
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={36} className="text-amber-500 animate-spin" />
              <p className="font-sans-clean text-sm text-stone-400">Loading Magazine Pages...</p>
            </div>
          ) : error ? (
            <p className="font-sans-clean text-red-400">{error}</p>
          ) : (
            <div
              className="transition-transform duration-300 ease-out flex items-center justify-center w-full max-w-5xl h-[70vh]"
              style={{ transform: `scale(${zoom})` }}
            >
              {pages.length > 0 && (
                <HTMLFlipBook
                  ref={flipbookRef}
                  width={460}
                  height={620}
                  size="stretch"
                  minWidth={300}
                  maxWidth={800}
                  minHeight={400}
                  maxHeight={1100}
                  maxShadowOpacity={0.4}
                  showCover={true}
                  usePortrait={false}
                  mobileScrollSupport={true}
                  onFlip={(e: any) => setCurrentPage(e.data)}
                  className="shadow-2xl rounded-sm"
                >
                  {pages.map((src, index) => (
                    <div key={index} className="bg-white relative overflow-hidden h-full shadow-inner">
                      <img
                        src={src}
                        alt={`Page ${index + 1}`}
                        className="w-full h-full object-fill pointer-events-none select-none"
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
                className="absolute left-4 p-4 rounded-full bg-stone-950/70 hover:bg-amber-500 border border-stone-800 hover:border-amber-400 text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-stone-950/70 transition-all shadow-lg z-10"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage >= pages.length - 1}
                className="absolute right-4 p-4 rounded-full bg-stone-950/70 hover:bg-amber-500 border border-stone-800 hover:border-amber-400 text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-stone-950/70 transition-all shadow-lg z-10"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* FOOTER NAV / PAGE NUMBERS */}
        <div className="flex justify-between items-center mt-4">
          <p className="font-sans-clean text-xs text-stone-500 hidden sm:block">
            Tip: Use standard keyboard keys or drag page corners to flip.
          </p>

          <div className="flex gap-2 mx-auto sm:mx-0">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold rounded-lg disabled:opacity-40 transition-colors"
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-stone-950 border border-stone-900 text-xs text-stone-300 rounded-lg">
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
    </div>
  );
}
