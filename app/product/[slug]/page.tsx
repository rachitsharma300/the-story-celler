"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Check, Star, Shield, Truck, RefreshCw, BookOpen, Sparkles, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import SampleFlipbookModal from "@/components/sections/SampleFlipbookModal";
import ProductConfiguratorModal from "@/components/sections/ProductConfiguratorModal";

// Types
interface FAQ { question: string; answer: string }
interface PageOption { pages: number; price: number; photosRequired: string }
interface Product {
  slug?: string;
  name: string;
  price: number;
  originalPrice: number;
  images: string[];
  tag?: string;
  types?: string[];
  desc: string;
  longDesc: string;
  deliveryDays?: string;
  pages?: string;
  includes: string[];
  occasions: string[];
  steps: string[];
  pageOptions?: PageOption[];
  process?: string[];
  faq?: FAQ[];
  shipping?: string;
  tracking?: string;
  paperQuality?: string;
  contentWriting?: string;
  timeline?: string;
  codAvailable?: boolean;
  samplePdf?: string;
}

const PAGE_OPTIONS_DEFAULT = [
  { pages: 8, price: 699, photosRequired: "16-25 images" },
  { pages: 12, price: 999, photosRequired: "25-30 images" },
  { pages: 16, price: 1299, photosRequired: "35-40 images" },
  { pages: 20, price: 1699, photosRequired: "50-70 images" }
];

const productData: Record<string, Product> = {
  "custom-magazine": {
    name: "Custom Magazine",
    price: 1200,
    originalPrice: 1800,
    tag: "Bestseller",
    images: [
      "/images/products/custom-magazine/1.jpg",
      "/images/products/custom-magazine/2.jpg",
      "/images/products/custom-magazine/3.jpg",
    ],
    desc: "Fully personalized magazine with your memories and stories.",
    longDesc: "Turn your most cherished memories into a professionally designed custom magazine. Our team of expert designers will craft every page to tell your unique story — from the cover to the last page.",
    deliveryDays: "7-10 days",
    pages: "8-20 pages",
    includes: ["Custom cover design", "Professional layout", "High-quality print", "Free shipping", "Up to 4 revisions"],
    occasions: ["Birthday", "Anniversary", "Farewell", "Friendship", "Wedding", "Custom"],
    steps: ["Place order and pay 50% advance", "Share your photos and stories via WhatsApp", "Receive design preview in 24-48 hrs", "Approve and pay remaining 50%", "Delivered to your doorstep"],
    pageOptions: PAGE_OPTIONS_DEFAULT,
    samplePdf: "/samples/magazine-sample.pdf",
  },
  "photo-album": {
    name: "Photo Album",
    price: 1500,
    originalPrice: 2000,
    tag: "Premium",
    images: [
      "/images/products/photo-album/1.jpg",
      "/images/products/photo-album/2.jpg",
      "/images/products/photo-album/3.jpg",
    ],
    desc: "Beautifully bound album with custom layouts and premium paper quality.",
    longDesc: "A timeless photo album that preserves your memories for generations. Hardbound cover, premium matte paper, and custom layouts make this the perfect keepsake.",
    deliveryDays: "7-10 days",
    pages: "8-20 pages",
    includes: ["Hardbound cover", "Premium matte paper", "Custom layout", "Free shipping", "Up to 4 revisions"],
    occasions: ["Wedding", "Anniversary", "Birthday", "Travel", "Family", "Custom"],
    steps: ["Place order and pay 50% advance", "Share your photos via WhatsApp", "Receive design preview in 24-48 hrs", "Approve and pay remaining 50%", "Delivered to your doorstep"],
    pageOptions: PAGE_OPTIONS_DEFAULT,
    samplePdf: "/samples/album-sample.pdf",
  },
  "recap-reel": {
    name: "Recap Reel",
    price: 550,
    originalPrice: 800,
    tag: "New",
    images: [
      "/images/products/recap-reel/1.jpg",
      "/images/products/recap-reel/2.jpg",
    ],
    desc: "A cinematic video reel of your best memories.",
    longDesc: "A beautifully edited 60-90 second video reel of your best moments. Perfect for sharing on Instagram, WhatsApp, or keeping as a digital memory.",
    deliveryDays: "2-4 days",
    pages: "60-90 sec",
    includes: ["Cinematic editing", "Background music", "Transitions and effects", "HD quality export", "Up to 2 revisions"],
    occasions: ["Birthday", "Anniversary", "Wedding", "Farewell", "New Year", "Custom"],
    steps: ["Place order and pay full amount", "Share your photos and videos via WhatsApp", "Receive preview in 24 hrs", "Approve and receive final file"],
  },
  "custom-frame": {
    name: "Custom Frame",
    price: 650,
    originalPrice: 900,
    tag: "Popular",
    images: [
      "/images/products/custom-frame/1.jpg",
      "/images/products/custom-frame/2.jpg",
    ],
    desc: "Premium framed print to display your favorite moment on any wall.",
    longDesc: "Transform your favorite photo into a stunning wall art piece. Premium quality frame with UV-protected glass for long-lasting display.",
    deliveryDays: "5-7 days",
    pages: "A4 / A3",
    includes: ["Premium wood frame", "UV-protected glass", "High-res print", "Free shipping", "Ready to hang"],
    occasions: ["Birthday", "Anniversary", "Wedding", "Housewarming", "Valentine", "Custom"],
    steps: ["Place order and pay full amount", "Share your photo via WhatsApp", "Receive design preview", "Approve and get delivered"],
  },
  "birthday-magazine": {
    name: "Birthday Magazine",
    price: 1400,
    originalPrice: 2000,
    tag: "Trending",
    images: [
      "/images/products/birthday-magazine/1.jpg",
      "/images/products/birthday-magazine/2.jpg",
    ],
    desc: "Surprise your loved one with a birthday-themed custom magazine.",
    longDesc: "Make their birthday unforgettable with a magazine dedicated entirely to them. Features their photos, memories, messages from friends and family, and more.",
    deliveryDays: "7-10 days",
    pages: "8-20 pages",
    includes: ["Birthday theme design", "Custom cover", "Messages from loved ones", "Free shipping", "Up to 4 revisions"],
    occasions: ["Birthday", "Milestone Birthday", "Surprise Gift", "Custom"],
    steps: ["Place order and pay 50% advance", "Share photos and messages via WhatsApp", "Receive design preview in 24-48 hrs", "Approve and pay remaining 50%", "Delivered to your doorstep"],
    pageOptions: PAGE_OPTIONS_DEFAULT,
    samplePdf: "/samples/birthday-sample.pdf",
  },
  "anniversary-album": {
    name: "Anniversary Album",
    price: 1800,
    originalPrice: 2500,
    tag: "Premium",
    images: [
      "/images/products/anniversary-album/1.jpg",
      "/images/products/anniversary-album/2.jpg",
      "/images/products/anniversary-album/3.jpg",
    ],
    desc: "Celebrate your love story with a beautifully crafted anniversary photo album.",
    longDesc: "Relive every beautiful moment of your journey together. This premium anniversary album is crafted to celebrate your love story from the very beginning.",
    deliveryDays: "7-10 days",
    pages: "8-20 pages",
    includes: ["Luxury hardbound cover", "Premium paper", "Custom love story layout", "Free shipping", "Up to 4 revisions"],
    occasions: ["1st Anniversary", "25th Anniversary", "50th Anniversary", "Valentine", "Custom"],
    steps: ["Place order and pay 50% advance", "Share your photos and story via WhatsApp", "Receive design preview in 24-48 hrs", "Approve and pay remaining 50%", "Delivered to your doorstep"],
    pageOptions: PAGE_OPTIONS_DEFAULT,
    samplePdf: "/samples/anniversary-sample.pdf",
  },
};

const reviews = [
  { name: "Simran A.", city: "Delhi", text: "Absolutely loved it! Exceeded all expectations.", stars: 5 },
  { name: "Rahul M.", city: "Mumbai", text: "Perfect gift for my parents anniversary. They cried happy tears!", stars: 5 },
  { name: "Priya K.", city: "Bangalore", text: "Amazing quality and super fast delivery. Will order again!", stars: 5 },
];

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = productData[slug];

  // Modals visibility states
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [selectedSamplePages, setSelectedSamplePages] = useState(8);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

  // Gallery state
  const [selectedImage, setSelectedImage] = useState<number>(0);

  // Page index selections
  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  // Accordion active tab
  const [activeAccordion, setActiveAccordion] = useState<string | null>("highlights");

  // selected page specs
  const selectedPageOption = useMemo(() => {
    return product?.pageOptions && product.pageOptions.length > 0
      ? product.pageOptions[selectedPageIndex] ?? product.pageOptions[0]
      : undefined;
  }, [product, selectedPageIndex]);

  const currentUnitPrice = selectedPageOption ? selectedPageOption.price : product?.price || 0;

  // Expected Delivery calculations based on current date
  const computeExpectedDelivery = (timelineText?: string) => {
    const today = new Date();
    const text = timelineText || product?.timeline || product?.deliveryDays || "7-10 days";
    const match = text.match(/(\d+)\s*-\s*(\d+)/);
    let min = 7, max = 10;
    if (match) {
      min = parseInt(match[1], 10);
      max = parseInt(match[2], 10);
    }
    
    function addDaysSkippingWeekends(d: Date, days: number) {
      const res = new Date(d);
      let added = 0;
      while (added < days) {
        res.setDate(res.getDate() + 1);
        const day = res.getDay();
        if (day !== 0 && day !== 6) added++;
      }
      return res;
    }
    
    const minDate = addDaysSkippingWeekends(today, min);
    const maxDate = addDaysSkippingWeekends(today, max);
    const fmt = (d: Date) => d.toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' });
    return `${fmt(minDate)} - ${fmt(maxDate)}`;
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <p className="text-6xl mb-4">404</p>
          <h1 className="font-display text-2xl font-bold text-stone-900 mb-4">Product not found</h1>
          <Link href="/shop" className="px-6 py-3 bg-amber-500 text-white rounded-full font-sans-clean font-semibold">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - currentUnitPrice) / product.originalPrice) * 100);
  const totalPrice = currentUnitPrice * quantity;
  const advanceAmount = Math.round(totalPrice * 0.5);

  // Accordion Items
  const accordionItems = [
    {
      id: "highlights",
      title: "Product Highlights",
      content: (
        <ul className="list-disc pl-5 space-y-1 text-stone-600 text-sm">
          <li>Custom layout curated by professional design editors</li>
          <li>Printed on premium 300 GSM glossy art paper</li>
          <li>Water-resistant protective lamination option available</li>
          <li>Thick, high-definition photo print colors</li>
          <li>100% personalized according to provided stories</li>
        </ul>
      ),
    },
    {
      id: "how-it-works",
      title: "How It Works",
      content: (
        <div className="relative pl-6 border-l border-amber-200 space-y-4 py-1">
          {[
            { step: "Place Order", desc: "Select your options and pay 50% advance" },
            { step: "WhatsApp Group Creation", desc: "Our team creates a dedicated WhatsApp group for you" },
            { step: "Fill Content Form", desc: "Submit milestones, personal facts, and guidelines" },
            { step: "Share Photos", desc: "Send photos directly in the WhatsApp group or configurator" },
            { step: "First Preview in 3-4 Days", desc: "Review the initial draft created by our editors" },
            { step: "Revisions", desc: "Request tweaks until it matches your exact expectations" },
            { step: "Approval", desc: "Confirm draft, pay remaining 50%, and dispatch order" },
          ].map((item, index) => (
            <div key={item.step} className="relative text-sm">
              <span className="absolute -left-[31px] top-0.5 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                {index + 1}
              </span>
              <p className="font-semibold text-stone-800">{item.step}</p>
              <p className="text-stone-500 text-xs mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "shipping",
      title: "Shipping & Returns",
      content: (
        <p className="text-stone-600 text-sm leading-relaxed">
          We ship across India via Delhivery and Shiprocket. Tracking details are shared via WhatsApp and Email.
          Delivery in 3–7 working days after shipping. Due to customization limits, keepsakes are non-returnable.
        </p>
      ),
    },
    {
      id: "photos",
      title: "Photos Required",
      content: (
        <div className="grid grid-cols-2 gap-3 text-sm font-sans-clean">
          <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
            <p className="font-bold text-stone-700">8 Pages</p>
            <p className="text-stone-500 text-xs">16 - 25 Photos</p>
          </div>
          <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
            <p className="font-bold text-stone-700">12 Pages</p>
            <p className="text-stone-500 text-xs">25 - 30 Photos</p>
          </div>
          <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
            <p className="font-bold text-stone-700">16 Pages</p>
            <p className="text-stone-500 text-xs">35 - 40 Photos</p>
          </div>
          <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
            <p className="font-bold text-stone-700">20 Pages</p>
            <p className="text-stone-500 text-xs">50 - 70 Photos</p>
          </div>
        </div>
      ),
    },
    {
      id: "faq",
      title: "Frequently Asked Questions",
      content: (
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-bold text-stone-700">Can I request revisions?</p>
            <p className="text-stone-500 text-xs">Yes, 3-4 rounds of revisions are included in the package.</p>
          </div>
          <div>
            <p className="font-bold text-stone-700">Are my photos secure?</p>
            <p className="text-stone-500 text-xs">Absolutely, all uploaded photos are encrypted and deleted post printing.</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 font-sans-clean text-sm text-stone-400">
          <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-amber-500 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-stone-700">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT — Product Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="sticky top-24"
          >
            {/* Main Display - Image Gallery */}
            <div className="rounded-3xl overflow-hidden border border-stone-100 shadow-sm">
              <div className="relative bg-white">
                <motion.img
                  key={product.images ? product.images[selectedImage] : slug}
                  src={product.images && product.images.length ? product.images[selectedImage] : "/images/placeholder.png"}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  className="w-full h-96 object-contain bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50"
                />

                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((s) => (s - 1 + product.images.length) % product.images.length)}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white p-2.5 rounded-full shadow-md"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setSelectedImage((s) => (s + 1) % product.images.length)}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white p-2.5 rounded-full shadow-md"
                    >
                      <ChevronLeft size={18} className="rotate-180" />
                    </button>
                  </>
                )}

                <span className="absolute top-4 left-4 px-3 py-1.5 bg-amber-500 text-white text-xs font-sans-clean font-bold rounded-full">
                  {product.tag || "Premium"}
                </span>
                <span className="absolute top-4 right-4 px-3 py-1.5 bg-green-500 text-white text-xs font-sans-clean font-bold rounded-full">
                  {discount}% OFF
                </span>
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="px-3 py-3 bg-white flex gap-3 overflow-x-auto border-t border-stone-100">
                  {product.images.map((img, idx) => (
                    <button
                      key={img}
                      onClick={() => setSelectedImage(idx)}
                      className={
                        "flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border transition-all " +
                        (selectedImage === idx ? "ring-2 ring-amber-500" : "border-stone-150 hover:opacity-80")
                      }
                    >
                      <img src={img} alt={product.name + " " + (idx + 1)} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Click To View Sample Section */}
            {product.samplePdf && (
              <div className="mt-6 bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
                <h3 className="font-display text-base font-bold text-stone-850 flex items-center gap-2 mb-3">
                  <BookOpen size={18} className="text-amber-500" /> Click To View Sample
                </h3>
                <p className="font-sans-clean text-xs text-stone-500 mb-4">
                  See how a completed {product.name} looks with real pages flipping animation.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedSamplePages(8);
                      setIsSampleModalOpen(true);
                    }}
                    className="flex-1 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold font-sans-clean rounded-xl border border-stone-200 transition-colors"
                  >
                    📖 8 Pages Sample
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSamplePages(12);
                      setIsSampleModalOpen(true);
                    }}
                    className="flex-1 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold font-sans-clean rounded-xl border border-stone-200 transition-colors"
                  >
                    📖 12 Pages Sample
                  </button>
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: <Truck size={16} />, label: "Free Shipping" },
                { icon: <Shield size={16} />, label: "100% Secure" },
                { icon: <RefreshCw size={16} />, label: "Free Revisions" },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col items-center gap-1.5 bg-white rounded-xl p-3 border border-stone-100 shadow-sm">
                  <span className="text-amber-500">{badge.icon}</span>
                  <span className="font-sans-clean text-xs text-stone-500 text-center">{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Product Info + Order */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-stone-900 mb-3">
                {product.name}
              </h1>

              {/* Stars */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-sans-clean text-sm text-stone-500">4.9 (127 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-bold text-stone-900">
                {"Rs. " + currentUnitPrice.toLocaleString()}
              </span>
              <span className="font-sans-clean text-lg text-stone-400 line-through">
                {"Rs. " + product.originalPrice.toLocaleString()}
              </span>
              <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-sm font-sans-clean font-bold rounded-full">
                Save {"Rs. " + (product.originalPrice - currentUnitPrice).toLocaleString()}
              </span>
            </div>

            <p className="font-sans-clean text-stone-500 leading-relaxed">
              {product.longDesc}
            </p>

            {/* Occasion Selector */}
            {product.occasions && product.occasions.length > 0 && (
              <div>
                <label className="font-sans-clean text-sm font-semibold text-stone-700 mb-3 block">
                  Select Occasion
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.occasions.map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setSelectedOccasion(occ)}
                      className={
                        "px-4 py-2 rounded-full font-sans-clean text-sm font-medium transition-all duration-200 " +
                        (selectedOccasion === occ
                          ? "bg-amber-500 text-white shadow-md"
                          : "bg-stone-100 text-stone-600 hover:bg-amber-50 hover:text-amber-600")
                      }
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Page Options */}
            {product.pageOptions && product.pageOptions.length > 0 && (
              <div>
                <label className="font-sans-clean text-sm font-semibold text-stone-700 mb-3 block">Choose Pages</label>
                <div className="grid grid-cols-2 gap-3">
                  {product.pageOptions.map((opt, i) => (
                    <button
                      key={opt.pages}
                      onClick={() => setSelectedPageIndex(i)}
                      className={
                        "p-4 rounded-xl font-sans-clean text-left transition-all duration-200 border flex flex-col justify-between h-24 " +
                        (selectedPageIndex === i
                          ? "bg-amber-50 border-amber-500 shadow-sm text-stone-900"
                          : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50")
                      }
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm font-bold">{opt.pages} pages</span>
                        {selectedPageIndex === i && <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" />}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-1">{opt.photosRequired}</div>
                      <div className="text-sm font-extrabold text-amber-600 mt-1">Rs. {opt.price.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="font-sans-clean text-sm font-semibold text-stone-700 mb-3 block">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 font-sans-clean font-bold text-stone-700 transition-colors flex items-center justify-center text-lg"
                >
                  -
                </button>
                <span className="font-display text-xl font-bold text-stone-900 w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 font-sans-clean font-bold text-stone-700 transition-colors flex items-center justify-center text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
              <p className="font-sans-clean text-sm font-bold text-stone-850 mb-2">Payment Breakdown</p>
              <div className="flex justify-between font-sans-clean text-sm text-stone-600 mb-1">
                <span>Total Amount</span>
                <span className="font-semibold">{"Rs. " + totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-sans-clean text-sm text-stone-600 mb-1">
                <span>Pay Now (50% advance)</span>
                <span className="font-semibold text-amber-600">{"Rs. " + advanceAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-sans-clean text-sm text-stone-600">
                <span>Pay After Approval</span>
                <span className="font-semibold">{"Rs. " + (totalPrice - advanceAmount).toLocaleString()}</span>
              </div>
            </div>

            {/* CTA Buttons - Configurator Trigger */}
            <div className="space-y-3">
              {product.pageOptions ? (
                /* Configurator trigger for customizable products */
                <button
                  onClick={() => setIsConfiguratorOpen(true)}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-sans-clean font-bold text-base rounded-2xl text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles size={18} /> Start Creating — Custom Configurator
                </button>
              ) : (
                /* Standard Checkout fallback */
                <Link
                  href={"/checkout?product=" + slug + "&qty=" + quantity + "&occasion=" + selectedOccasion}
                  className="w-full block py-4 bg-amber-500 hover:bg-amber-600 text-white font-sans-clean font-bold text-base rounded-2xl text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  {"Order Now — Rs. " + advanceAmount.toLocaleString() + " Advance"}
                </Link>
              )}

              {/* Direct Booking & Support Options */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/917903316723?text=Hi!%20I%20want%20to%20book%20a%20${product.name}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-green-500 hover:bg-green-600 text-white text-xs font-sans-clean font-bold rounded-xl text-center transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  💬 Book via WhatsApp
                </a>
                <a
                  href="tel:+917903316723"
                  className="py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-sans-clean font-bold rounded-xl text-center transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Phone size={12} /> Book via Call
                </a>
              </div>
            </div>

            {/* Delivery estimate */}
            <div className="flex items-center gap-2 font-sans-clean text-sm text-stone-500">
              <Truck size={14} className="text-green-500" />
              <span>Expected Delivery: <span className="font-semibold text-stone-700">{computeExpectedDelivery()}</span></span>
            </div>

            {/* Premium Process Accordions */}
            <div className="mt-10 border-t border-stone-200 pt-8 space-y-3">
              <h3 className="font-display text-lg font-bold text-stone-850 mb-4">Product Details & Guidelines</h3>
              {accordionItems.map((item) => {
                const isOpen = activeAccordion === item.id;
                return (
                  <div key={item.id} className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={() => setActiveAccordion(isOpen ? null : item.id)}
                      className="w-full flex justify-between items-center p-4 text-left font-sans-clean font-bold text-sm text-stone-800 hover:bg-stone-50 transition-colors"
                    >
                      {item.title}
                      <ChevronDown
                        size={16}
                        className={`text-stone-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-4 border-t border-stone-100 bg-stone-50/50">
                        {item.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* SAMPLE FLIPBOOK MODAL */}
      <SampleFlipbookModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        pdfUrl={product.samplePdf}
        pageCount={selectedSamplePages}
        productName={product.name}
      />

      {/* CREATOR CONFIGURATOR MODAL */}
      <ProductConfiguratorModal
        isOpen={isConfiguratorOpen}
        onClose={() => setIsConfiguratorOpen(false)}
        productSlug={slug}
        productName={product.name}
        basePrice={currentUnitPrice}
      />
    </div>
  );
}