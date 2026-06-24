"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SampleData {
  id: number;
  title: string;
  category: string;
  pages: number;
  emoji: string;
  preview: string;
  description: string;
}

const samples: SampleData[] = [
  {
    id: 1,
    title: "Anniversary Special",
    category: "Album",
    pages: 20,
    emoji: "💑",
    preview: "Love story captured in pages",
    description: "A beautiful journey through your together moments",
  },
  {
    id: 2,
    title: "Birthday Bash",
    category: "Magazine",
    pages: 24,
    emoji: "🎂",
    preview: "Celebrate in style",
    description: "Party moments and memories from your special day",
  },
  {
    id: 3,
    title: "Travel Diaries",
    category: "Magazine",
    pages: 28,
    emoji: "✈️",
    preview: "Wanderlust captured",
    description: "Adventures and discoveries from your travels",
  },
  {
    id: 4,
    title: "Family Reunion",
    category: "Album",
    pages: 30,
    emoji: "👨‍👩‍👧‍👦",
    preview: "Generations united",
    description: "Cherished moments with loved ones",
  },
  {
    id: 5,
    title: "New Beginnings",
    category: "Magazine",
    pages: 22,
    emoji: "🌟",
    preview: "Fresh chapters",
    description: "Celebrations and milestones of new chapters",
  },
  {
    id: 6,
    title: "Pet Paradise",
    category: "Album",
    pages: 20,
    emoji: "🐾",
    preview: "Furry friends forever",
    description: "Cute and hilarious moments with your pets",
  },
];

// Mock page content generator
const generatePageContent = (pageNum: number, totalPages: number) => {
  const colors = ["bg-amber-50", "bg-orange-50", "bg-stone-50", "bg-slate-50"];
  const color = colors[pageNum % colors.length];

  return (
    <div
      className={`${color} w-full h-full p-8 flex flex-col justify-between border-r-8 border-stone-300`}
    >
      <div>
        <p className="text-4xl mb-4">
          {["📖", "✨", "💫", "🎨", "🌸", "💝", "🎯", "🌈"][
            pageNum % 8
          ]}
        </p>
        <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">
          Page {pageNum}
        </h2>
        <p className="font-sans-clean text-stone-600 leading-relaxed">
          This is a sample page from our collection. In the actual product, you'll see your beautiful photos and stories laid out perfectly across {totalPages} pages with premium printing quality.
        </p>
      </div>
      <div className="text-center">
        <p className="font-sans-clean text-xs text-stone-400">
          {pageNum} / {totalPages}
        </p>
      </div>
    </div>
  );
};

// Page component for FlipBook
const Page = ({ number, children }: { number: number; children: React.ReactNode }) => (
  <div className="bg-white shadow-lg rounded-sm h-full flex items-center justify-center overflow-hidden">
    {children}
  </div>
);

export default function SamplesPage() {
  const [selectedSample, setSelectedSample] = useState<SampleData | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const bookRef = useRef<any>(null);

  const playSound = () => {
    if (soundEnabled) {
      // Simple beep sound effect (you can replace with actual audio file)
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = "sine";
      
      gain.gain.setValueAtTime(0.1, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  const handleNextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().next();
      playSound();
    }
  };

  const handlePrevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().prev();
      playSound();
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-widest uppercase text-amber-500 font-bold font-sans-clean mb-3">
            Inspiration
          </p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-stone-900 mb-6">
            Sample Keepsakes
          </h1>
          <p className="font-sans-clean text-lg text-stone-500 max-w-2xl mx-auto">
            Flip through our collection of beautiful sample designs. Click any sample to experience the full interactive book view.
          </p>
        </motion.div>

        <AnimatePresence>
          {selectedSample ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-auto">
                <div className="sticky top-0 bg-white border-b border-stone-200 p-6 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-stone-900">
                      {selectedSample.emoji} {selectedSample.title}
                    </h2>
                    <p className="font-sans-clean text-sm text-stone-500 mt-1">
                      {selectedSample.pages} pages • {selectedSample.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      variant="ghost"
                      size="icon"
                    >
                      {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    </Button>
                    <Button
                      onClick={() => setSelectedSample(null)}
                      variant="ghost"
                      size="sm"
                    >
                      Close
                    </Button>
                  </div>
                </div>

                <div className="p-8 flex items-center justify-center min-h-96 bg-gradient-to-br from-stone-50 to-amber-50">
                  <div className="w-full max-w-2xl">
                    <HTMLFlipBook
                      width={400}
                      height={500}
                      size="fixed"
                      minWidth={300}
                      maxWidth={1000}
                      minHeight={400}
                      maxHeight={1533}
                      maxShadowOpacity={0.5}
                      showCover={true}
                      useMouseEvents={true}
                      ref={bookRef}
                      className="rounded-lg shadow-2xl"
                    >
                      {Array.from({ length: selectedSample.pages }).map(
                        (_, idx) => (
                          <Page key={idx} number={idx + 1}>
                            {generatePageContent(idx + 1, selectedSample.pages)}
                          </Page>
                        )
                      )}
                    </HTMLFlipBook>

                    <div className="flex items-center justify-center gap-4 mt-8">
                      <Button
                        onClick={handlePrevPage}
                        variant="outline"
                        size="icon"
                      >
                        <ChevronLeft size={20} />
                      </Button>
                      <span className="font-sans-clean text-sm text-stone-600">
                        Click pages or use arrows to navigate
                      </span>
                      <Button
                        onClick={handleNextPage}
                        variant="outline"
                        size="icon"
                      >
                        <ChevronRight size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Samples Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {samples.map((sample, i) => (
            <motion.div
              key={sample.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setSelectedSample(sample)}
              className="group cursor-pointer"
            >
              <div className="rounded-3xl border border-stone-200 bg-white overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                {/* Image Area */}
                <div className="relative h-48 bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 flex items-center justify-center overflow-hidden group-hover:bg-gradient-to-br group-hover:from-amber-100 group-hover:via-orange-50 group-hover:to-stone-100 transition-all">
                  <motion.span
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-7xl group-hover:scale-110 transition-transform"
                  >
                    {sample.emoji}
                  </motion.span>

                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-bold rounded-full">
                      {sample.category}
                    </span>
                    <span className="px-3 py-1 bg-stone-200 text-stone-700 text-[10px] font-bold rounded-full">
                      {sample.pages} pages
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-display text-xl font-bold text-stone-900 mb-2">
                    {sample.title}
                  </h3>
                  <p className="font-sans-clean text-sm text-stone-600 mb-4 flex-grow">
                    {sample.description}
                  </p>
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full group-hover:bg-amber-500"
                  >
                    View Sample
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 rounded-3xl bg-stone-900 p-12 text-center text-white"
        >
          <h2 className="font-display text-3xl font-bold mb-4">
            Ready to Create Your Own?
          </h2>
          <p className="font-sans-clean text-stone-300 mb-8 max-w-xl mx-auto">
            Inspired by these samples? Start creating your personalized keepsake today. Upload your photos and stories to bring your memories to life.
          </p>
          <Button asChild size="lg" variant="secondary">
            <a href="/shop">Start Creating</a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
