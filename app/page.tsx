"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/home/HeroSection";
import FeaturesRow from "@/components/sections/home/FeaturesRow";
import QuickCreateSection from "@/components/sections/home/QuickCreateSection";
import FeaturedCollectionSection from "@/components/sections/home/FeaturedCollectionSection";
import SamplesSection from "@/components/sections/home/SamplesSection";
import ExploreCategoryGrid from "@/components/sections/home/ExploreCategoryGrid";
import CraftedFeaturesGrid from "@/components/sections/home/CraftedFeaturesGrid";
import ProcessSection from "@/components/sections/home/ProcessSection";
import ComboPromoSection from "@/components/sections/home/ComboPromoSection";
import TestimonialsSection from "@/components/sections/home/TestimonialsSection";
import ReelsSection from "@/components/sections/home/ReelsSection";
import AboutSection from "@/components/sections/home/AboutSection";
import FaqSection from "@/components/sections/home/FaqSection";

// Dynamically import heavy flipbook & configurator modals
const SampleFlipbookModal = dynamic(() => import("@/components/sections/SampleFlipbookModal"), { ssr: false });
const ProductConfiguratorModal = dynamic(() => import("@/components/sections/ProductConfiguratorModal"), { ssr: false });

export default function HomePage() {
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [samplePdfUrl, setSamplePdfUrl] = useState<string | undefined>(undefined);
  const [sampleImages, setSampleImages] = useState<string[] | undefined>(undefined);
  const [samplePageCount, setSamplePageCount] = useState(12);
  const [sampleProductName, setSampleProductName] = useState("");

  // Configurator Modal state
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [configProductSlug, setConfigProductSlug] = useState("custom-magazine");
  const [configProductName, setConfigProductName] = useState("Custom Magazine");
  const [configBasePrice, setConfigBasePrice] = useState(1200);

  const openSample = (title: string, pages: number, pdf?: string, images?: string[]) => {
    setSampleProductName(title);
    setSamplePageCount(pages);
    setSamplePdfUrl(pdf);
    setSampleImages(images);
    setIsSampleModalOpen(true);
  };

  const openConfigurator = (slug: string, name: string, price: number) => {
    setConfigProductSlug(slug);
    setConfigProductName(name);
    setConfigBasePrice(price);
    setIsConfiguratorOpen(true);
  };

  return (
    <div className="overflow-x-hidden relative bg-[#FAF4F5] min-h-screen text-stone-800">
      {/* Noise paper texture overlay */}
      <div className="bg-noise-overlay absolute inset-0 pointer-events-none z-[1] opacity-[0.03]" />

      {/* Hero Banner & Marquee */}
      <HeroSection />

      {/* Key Product Features Bar */}
      <FeaturesRow />

      {/* Quick Create Items */}
      <QuickCreateSection onOpenConfigurator={openConfigurator} />

      {/* Custom Collection Luxury Items */}
      <FeaturedCollectionSection />

      {/* Interactive Flipbook Samples */}
      <SamplesSection onOpenSample={openSample} />

      {/* Category Grid */}
      <ExploreCategoryGrid />

      {/* Crafted Features */}
      <CraftedFeaturesGrid />

      {/* Process (How It Works) */}
      <ProcessSection />

      {/* Combo Promo Banner */}
      <ComboPromoSection />

      {/* Customer Reviews & Testimonials */}
      <TestimonialsSection />

      {/* 4 Shorts Video Section (Plays on Hover, No Modals) */}
      <ReelsSection />

      {/* About Section */}
      <AboutSection />

      {/* FAQs Section */}
      <FaqSection />

      {/* Dynamically Loaded Flipbook Sample Modal */}
      <SampleFlipbookModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        pdfUrl={samplePdfUrl}
        images={sampleImages}
        pageCount={samplePageCount}
        productName={sampleProductName}
      />

      {/* Quick Create Interactive Product Configurator Modal */}
      {isConfiguratorOpen && (
        <ProductConfiguratorModal
          isOpen={isConfiguratorOpen}
          onClose={() => setIsConfiguratorOpen(false)}
          productSlug={configProductSlug}
          productName={configProductName}
          basePrice={configBasePrice}
        />
      )}
    </div>
  );
}
