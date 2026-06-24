"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, Shield, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const productData: Record<string, { name: string; price: number; emoji: string; deliveryDays: string }> = {
  "custom-magazine": { name: "Custom Magazine", price: 1200, emoji: "📖", deliveryDays: "7-10 days" },
  "photo-album": { name: "Photo Album", price: 1500, emoji: "🖼️", deliveryDays: "7-10 days" },
  "recap-reel": { name: "Recap Reel", price: 550, emoji: "🎬", deliveryDays: "2-4 days" },
  "custom-frame": { name: "Custom Frame", price: 650, emoji: "🪞", deliveryDays: "5-7 days" },
  "birthday-magazine": { name: "Birthday Magazine", price: 1400, emoji: "🎂", deliveryDays: "7-10 days" },
  "anniversary-album": { name: "Anniversary Album", price: 1800, emoji: "💑", deliveryDays: "7-10 days" },
};

function CheckoutForm() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("product") || "custom-magazine";
  const qty = parseInt(searchParams.get("qty") || "1");
  const occasion = searchParams.get("occasion") || "";

  const product = productData[slug] || productData["custom-magazine"];
  const totalPrice = product.price * qty;
  const advanceAmount = Math.round(totalPrice * 0.5);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    note: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim() || form.phone.length < 10) newErrors.phone = "Valid phone required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.pincode.trim() || form.pincode.length < 6) newErrors.pincode = "Valid pincode required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleContinue() {
    if (validate()) setStep(2);
  }

  async function handlePayment() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
    }, 2000);
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl p-10 text-center border border-stone-100 shadow-xl"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-green-600" />
          </div>
          <h1 className="font-display text-3xl font-bold text-stone-900 mb-3">Order Placed!</h1>
          <p className="font-sans-clean text-stone-500 mb-2">
            Thank you, <span className="font-semibold text-stone-700">{form.name}</span>!
          </p>
          <p className="font-sans-clean text-sm text-stone-400 mb-8">
            We will contact you on WhatsApp at <span className="font-semibold text-stone-600">{form.phone}</span> within 24 hours to get started.
          </p>
          <div className="bg-amber-50 rounded-2xl p-4 mb-8 text-left border border-amber-100">
            <div className="flex justify-between font-sans-clean text-sm mb-2">
              <span className="text-stone-500">Product</span>
              <span className="font-semibold text-stone-800">{product.name}</span>
            </div>
            <div className="flex justify-between font-sans-clean text-sm mb-2">
              <span className="text-stone-500">Advance Paid</span>
              <span className="font-semibold text-green-600">{"Rs. " + advanceAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-sans-clean text-sm">
              <span className="text-stone-500">Delivery</span>
              <span className="font-semibold text-stone-800">{product.deliveryDays}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button asChild size="lg" variant="default" className="w-full">
              <a
                href="https://wa.me/917903316723"
                target="_blank"
                rel="noreferrer"
              >
                💬 Chat on WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Back */}
        <Button asChild variant="ghost" size="sm" className="inline-flex items-center gap-2">
          <Link href={"product/" + slug}>
            <ChevronLeft size={16} />
            Back to product
          </Link>
        </Button>

        {/* Steps indicator */}
        <div className="flex items-center gap-3 mb-10">
          {["Delivery Details", "Payment"].map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={
                  "w-8 h-8 rounded-full flex items-center justify-center font-sans-clean text-sm font-bold transition-all " +
                  (step > i + 1
                    ? "bg-green-500 text-white"
                    : step === i + 1
                    ? "bg-amber-500 text-white"
                    : "bg-stone-200 text-stone-500")
                }>
                  {step > i + 1 ? <Check size={14} /> : i + 1}
                </div>
                <span className={
                  "font-sans-clean text-sm " +
                  (step === i + 1 ? "text-stone-800 font-semibold" : "text-stone-400")
                }>
                  {label}
                </span>
              </div>
              {i === 0 && <div className="w-12 h-px bg-stone-200" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT — Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 lg:p-8 border border-stone-100 shadow-sm"
              >
                <h2 className="font-display text-2xl font-bold text-stone-900 mb-6">Delivery Details</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-sans-clean text-sm font-semibold text-stone-700 mb-1.5 block">Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Rahul Sharma"
                      className={
                        "w-full px-4 py-3 rounded-xl border font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none transition-all " +
                        (errors.name
                          ? "border-red-300 bg-red-50 focus:border-red-400"
                          : "border-stone-200 bg-stone-50 focus:border-amber-400 focus:bg-white")
                      }
                    />
                    {errors.name && <p className="font-sans-clean text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="font-sans-clean text-sm font-semibold text-stone-700 mb-1.5 block">Phone Number *</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={
                        "w-full px-4 py-3 rounded-xl border font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none transition-all " +
                        (errors.phone
                          ? "border-red-300 bg-red-50 focus:border-red-400"
                          : "border-stone-200 bg-stone-50 focus:border-amber-400 focus:bg-white")
                      }
                    />
                    {errors.phone && <p className="font-sans-clean text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-sans-clean text-sm font-semibold text-stone-700 mb-1.5 block">Email Address *</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="rahul@example.com"
                      className={
                        "w-full px-4 py-3 rounded-xl border font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none transition-all " +
                        (errors.email
                          ? "border-red-300 bg-red-50 focus:border-red-400"
                          : "border-stone-200 bg-stone-50 focus:border-amber-400 focus:bg-white")
                      }
                    />
                    {errors.email && <p className="font-sans-clean text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-sans-clean text-sm font-semibold text-stone-700 mb-1.5 block">Full Address *</label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House no, Street, Area"
                      className={
                        "w-full px-4 py-3 rounded-xl border font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none transition-all " +
                        (errors.address
                          ? "border-red-300 bg-red-50 focus:border-red-400"
                          : "border-stone-200 bg-stone-50 focus:border-amber-400 focus:bg-white")
                      }
                    />
                    {errors.address && <p className="font-sans-clean text-xs text-red-500 mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="font-sans-clean text-sm font-semibold text-stone-700 mb-1.5 block">City *</label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="New Delhi"
                      className={
                        "w-full px-4 py-3 rounded-xl border font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none transition-all " +
                        (errors.city
                          ? "border-red-300 bg-red-50 focus:border-red-400"
                          : "border-stone-200 bg-stone-50 focus:border-amber-400 focus:bg-white")
                      }
                    />
                    {errors.city && <p className="font-sans-clean text-xs text-red-500 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="font-sans-clean text-sm font-semibold text-stone-700 mb-1.5 block">Pincode *</label>
                    <input
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="110001"
                      maxLength={6}
                      className={
                        "w-full px-4 py-3 rounded-xl border font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none transition-all " +
                        (errors.pincode
                          ? "border-red-300 bg-red-50 focus:border-red-400"
                          : "border-stone-200 bg-stone-50 focus:border-amber-400 focus:bg-white")
                      }
                    />
                    {errors.pincode && <p className="font-sans-clean text-xs text-red-500 mt-1">{errors.pincode}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-sans-clean text-sm font-semibold text-stone-700 mb-1.5 block">Special Note (optional)</label>
                    <textarea
                      name="note"
                      value={form.note}
                      onChange={handleChange}
                      placeholder="Any specific instructions or message for the team..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 focus:bg-white transition-all resize-none"
                    />
                  </div>
                </div>

                <Button onClick={handleContinue} size="lg" variant="default" className="w-full">
                  Continue to Payment
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 lg:p-8 border border-stone-100 shadow-sm"
              >
                <h2 className="font-display text-2xl font-bold text-stone-900 mb-2">Payment</h2>
                <p className="font-sans-clean text-sm text-stone-400 mb-8">
                  You are paying 50% advance — remaining after design approval.
                </p>

                {/* Payment methods */}
                <div className="space-y-3 mb-8">
                  {[
                    { id: "upi", label: "UPI Payment", sub: "GPay, PhonePe, Paytm, BHIM", emoji: "📱" },
                    { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay", emoji: "💳" },
                    { id: "netbanking", label: "Net Banking", sub: "All major banks supported", emoji: "🏦" },
                    { id: "cod", label: "Cash on Delivery", sub: "Pay when delivered (extra Rs. 50)", emoji: "💵" },
                  ].map((method) => (
                    <div key={method.id} className="flex items-center gap-4 p-4 rounded-xl border border-stone-100 bg-stone-50 hover:border-amber-200 hover:bg-amber-50 transition-all cursor-pointer">
                      <span className="text-2xl">{method.emoji}</span>
                      <div>
                        <p className="font-sans-clean text-sm font-semibold text-stone-800">{method.label}</p>
                        <p className="font-sans-clean text-xs text-stone-400">{method.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 font-sans-clean text-xs text-stone-400 mb-6">
                  <Lock size={12} className="text-green-500" />
                  <span>Secured by Razorpay — 256-bit SSL encryption</span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-sans-clean font-semibold rounded-xl transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 text-white font-sans-clean font-bold text-base rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? "Processing..." : "Pay Rs. " + advanceAmount.toLocaleString() + " Now"}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT — Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm sticky top-24">
              <h3 className="font-sans-clean text-sm font-bold text-stone-500 uppercase tracking-widest mb-5">Order Summary</h3>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-stone-100">
                <div className="w-16 h-16 bg-amber-50 rounded-xl flex items-center justify-center text-3xl">
                  {product.emoji}
                </div>
                <div>
                  <p className="font-sans-clean font-semibold text-stone-800 text-sm">{product.name}</p>
                  {occasion && <p className="font-sans-clean text-xs text-amber-600 mt-0.5">{occasion}</p>}
                  <p className="font-sans-clean text-xs text-stone-400 mt-0.5">Qty: {qty}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-sans-clean text-sm">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="text-stone-800">{"Rs. " + totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-sans-clean text-sm">
                  <span className="text-stone-500">Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between font-sans-clean text-sm text-stone-400">
                  <span>Remaining (after approval)</span>
                  <span>{"Rs. " + (totalPrice - advanceAmount).toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-4">
                <div className="flex justify-between font-sans-clean font-bold text-base">
                  <span className="text-stone-700">Pay Now (50%)</span>
                  <span className="text-amber-600">{"Rs. " + advanceAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 p-3 bg-stone-50 rounded-xl border border-stone-100">
                <div className="flex items-center gap-2 font-sans-clean text-xs text-stone-500">
                  <Shield size={12} className="text-green-500" />
                  <span>Delivery in {product.deliveryDays} after approval</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CheckoutForm />
    </Suspense>
  );
}