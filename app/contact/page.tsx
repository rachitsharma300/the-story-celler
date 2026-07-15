"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-widest uppercase text-amber-500 font-bold font-sans-clean mb-3">
            Get in Touch
          </p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-stone-900 mb-6">
            We're Here to Help
          </h1>
          <p className="font-sans-clean text-lg text-stone-500 max-w-2xl mx-auto">
            Have questions about our keepsakes? Want to collaborate? Or just want to chat? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          {[
            {
              icon: Phone,
              title: "Call Us",
              value: "+91 98718 74041",
              link: "tel:+919871874041",
            },
            {
              icon: Mail,
              title: "Email Us",
              value: "team@storyceller.in",
              link: "mailto:team@storyceller.in",
            },
            {
              icon: Clock,
              title: "Work Hours",
              value: "Mon-Fri 9AM-6PM IST",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.title}
                href={item.link || "#"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                className="rounded-3xl border border-stone-200 bg-white p-8 text-center hover:shadow-md hover:border-amber-200 transition-all group"
              >
                <Icon className="w-12 h-12 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-xl font-bold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="font-sans-clean text-stone-500 group-hover:text-amber-600 transition-colors">
                  {item.value}
                </p>
              </motion.a>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-3xl border border-stone-200 bg-white p-8"
          >
            <h2 className="font-display text-2xl font-bold text-stone-900 mb-6">
              Send us a message
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <p className="text-5xl mb-4">✨</p>
                <p className="font-display text-2xl font-bold text-stone-900 mb-2">
                  Thank you!
                </p>
                <p className="font-sans-clean text-stone-500">
                  We'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Rahul Sharma"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 focus:bg-white transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 focus:bg-white transition-all resize-none"
                  />
                </div>

                <Button type="submit" size="lg" variant="default" className="w-full">
                  <Send size={18} />
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>

          {/* FAQ & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <h3 className="font-display text-2xl font-bold text-stone-900 mb-6">
                Frequently Asked Questions
              </h3>

              <div className="space-y-5">
                {[
                  {
                    q: "How long does it take to deliver?",
                    a: "Most products ship within 7-10 days. Video reels take 2-4 days.",
                  },
                  {
                    q: "Can I request revisions?",
                    a: "Yes! Up to 3-4 revisions are included with every order.",
                  },
                  {
                    q: "Do you offer bulk orders?",
                    a: "Absolutely. Contact us for custom bulk pricing on bulk orders.",
                  },
                  {
                    q: "Is shipping free?",
                    a: "Yes, we offer free shipping across all of India.",
                  },
                ].map((faq, i) => (
                  <div key={i} className="pb-5 border-b border-stone-100 last:border-b-0">
                    <p className="font-sans-clean font-semibold text-stone-900 mb-2">
                      {faq.q}
                    </p>
                    <p className="font-sans-clean text-sm text-stone-500">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8">
              <p className="text-5xl mb-3">💬</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">
                Prefer WhatsApp?
              </h3>
              <p className="font-sans-clean text-stone-600 mb-4">
                Chat directly with our team on WhatsApp for instant support.
              </p>
              <Button asChild size="lg" variant="default" className="w-full">
                <a href="https://wa.me/919871874041" target="_blank" rel="noreferrer">
                  💬 Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
