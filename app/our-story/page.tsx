"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Users, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-widest uppercase text-amber-500 font-bold font-sans-clean mb-3">
            Our Journey
          </p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-stone-900 mb-6">
            Forever in Art,<br />
            Forever in Heart
          </h1>
          <p className="font-sans-clean text-lg text-stone-500 max-w-2xl mx-auto">
            We believe memories are precious. They deserve to be preserved, celebrated, and shared in beautiful ways.
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="rounded-3xl bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 h-96 flex items-center justify-center text-9xl border border-stone-200">
              📖
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-display text-3xl font-bold text-stone-900 mb-4">
                How It Started
              </h2>
              <p className="font-sans-clean text-stone-600 leading-relaxed mb-4">
                In 2023, we realized something beautiful: memories are fleeting. Photos sit forgotten in phones, stories fade with time, and precious moments become just blurry recollections.
              </p>
              <p className="font-sans-clean text-stone-600 leading-relaxed">
                That's when The Story Celler was born. We created a platform to transform digital memories into tangible, beautiful keepsakes—custom magazines, albums, and reels that capture the essence of your moments.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">
                Our Promise
              </h3>
              <ul className="space-y-2 font-sans-clean text-stone-600">
                <li>✨ Every order is handcrafted with love and attention</li>
                <li>✨ Premium quality that lasts generations</li>
                <li>✨ Your stories deserve the best presentation</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-stone-900">
              Our Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: "Love",
                desc: "We care deeply about preserving your memories with excellence.",
              },
              {
                icon: Users,
                title: "Community",
                desc: "Your stories inspire us. Every keepsake strengthens bonds.",
              },
              {
                icon: Target,
                title: "Precision",
                desc: "Attention to detail in every design and delivery.",
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "Premium quality materials and craftsmanship always.",
              },
            ].map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="rounded-3xl border border-stone-200 bg-white p-8 text-center hover:shadow-md transition-all"
                >
                  <Icon className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-stone-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="font-sans-clean text-stone-500">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-stone-900 rounded-3xl p-12 text-white text-center mb-16"
        >
          <h2 className="font-display text-3xl font-bold mb-12">
            Our Impact So Far
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "500+", label: "Stories Archived" },
              { value: "450+", label: "Keepsakes Delivered" },
              { value: "100+", label: "Happy Memories" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-5xl font-bold text-amber-400 mb-2">
                  {stat.value}
                </p>
                <p className="font-sans-clean text-stone-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold text-stone-900 mb-4">
            Start Your Story With Us
          </h2>
          <p className="font-sans-clean text-stone-500 mb-8 max-w-xl mx-auto">
            Ready to turn your memories into beautiful keepsakes? Browse our collection and create something special today.
          </p>
          <Button asChild size="lg" variant="default">
            <Link href="/shop">Explore Our Collection</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
