"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

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

export default function FaqSection() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65B62] focus-visible:ring-offset-2";

  return (
    <section className="py-24 bg-[#FFFBFB] relative border-t border-stone-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-sans-clean text-xs tracking-[0.2em] uppercase text-[#A65B62] font-bold block mb-4">Learn More</span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-stone-900">
            Frequently Asked Questions (FAQs)
          </h2>
          <p className="font-sans-clean text-stone-500 max-w-2xl mx-auto mt-4 text-xs sm:text-sm">
            From design timelines to payment queries, Browse answers to popular questions about timelines, customization, shipping, and more.
          </p>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className={`bg-[#FFFBFB] border-2 border-dashed rounded-2xl overflow-hidden shadow-sm transition-colors duration-200 ${isOpen ? "border-[#A65B62]/50" : "border-stone-200"}`}
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className={`w-full flex justify-between items-center gap-4 p-5 text-left font-sans-clean font-bold text-sm text-stone-800 hover:bg-[#FFFBFB]/80 cursor-pointer ${focusRing}`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#A65B62] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 border-t border-stone-100 bg-white font-sans-clean text-xs sm:text-sm text-stone-500 leading-relaxed animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
