"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type CartItem = {
  slug: string;
  name: string;
  emoji: string;
  price: number;
  originalPrice: number;
  qty: number;
  occasion: string;
  deliveryDays: string;
  pages: string;
  tag: string;
  tagColor: string;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );

  const discount = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.qty, 0),
    [cartItems]
  );

  function updateQuantity(slug: string, delta: number) {
    setCartItems((current) =>
      current
        .map((item) =>
          item.slug === slug
            ? { ...item, qty: Math.max(1, item.qty + delta) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function removeItem(slug: string) {
    setCartItems((current) => current.filter((item) => item.slug !== slug));
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <p className="text-xs tracking-widest uppercase text-amber-500 font-bold font-sans-clean mb-2">
              Your Cart
            </p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-stone-900">
              Ready to preserve your memories?
            </h1>
          </div>
          <Button asChild size="lg" variant="default" className="inline-flex items-center gap-2">
            <Link href="/shop">
              <ShoppingBag size={18} />
              Continue Shopping
            </Link>
          </Button>
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-stone-200 bg-white p-10 text-center shadow-sm"
          >
            <p className="text-6xl mb-6">🛒</p>
            <h2 className="font-display text-3xl font-bold text-stone-900 mb-3">
              Your cart is empty.
            </h2>
            <p className="font-sans-clean text-stone-500 mb-8 max-w-xl mx-auto">
              Add a keepsake from the shop to start building your memory collection.
            </p>
            <Button asChild size="lg" variant="default">
              <Link href="/shop">Browse Products</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_0.9fr] gap-8">
            <div className="space-y-6">
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                  <div>
                    <p className="text-sm uppercase tracking-widest text-stone-400 font-semibold font-sans-clean">
                      {cartItems.length} items in cart
                    </p>
                    <h2 className="font-display text-2xl font-bold text-stone-900">
                      Review your selections
                    </h2>
                  </div>
                  <Button
                    onClick={clearCart}
                    variant="ghost"
                    size="sm"
                    className="text-stone-500 hover:text-amber-500"
                  >
                    Clear cart
                  </Button>
                </div>

                <div className="space-y-5">
                  <AnimatePresence mode="popLayout">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.slug}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="rounded-3xl border border-stone-100 bg-stone-50 p-5"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 items-center">
                          <div className="flex items-center gap-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-5xl shadow-sm">
                              {item.emoji}
                            </div>
                            <div>
                              <p className="font-display text-xl font-bold text-stone-900">
                                {item.name}
                              </p>
                              <p className="text-sm text-stone-500 mt-1">
                                {item.pages} • {item.deliveryDays}
                              </p>
                              <span className={`inline-flex items-center gap-1 mt-3 rounded-full px-3 py-1 text-[11px] font-semibold ${item.tagColor}`}>
                                {item.tag}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-sm">
                              <Button
                                onClick={() => updateQuantity(item.slug, -1)}
                                variant="ghost"
                                size="icon"
                                className="text-stone-600 hover:text-amber-600"
                              >
                                <Minus size={16} />
                              </Button>
                              <span className="min-w-[46px] text-center font-sans-clean font-semibold text-stone-900">
                                {item.qty}
                              </span>
                              <Button
                                onClick={() => updateQuantity(item.slug, 1)}
                                variant="ghost"
                                size="icon"
                                className="text-stone-600 hover:text-amber-600"
                              >
                                <Plus size={16} />
                              </Button>
                            </div>
                            <Button
                              onClick={() => removeItem(item.slug)}
                              variant="ghost"
                              size="sm"
                              className="text-stone-500 hover:text-red-500"
                            >
                              <Trash2 size={16} /> Remove
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="font-display text-2xl font-bold text-stone-900">
                              ₹{(item.price * item.qty).toLocaleString()}
                            </p>
                            <p className="text-sm text-stone-500 line-through">
                              ₹{(item.originalPrice * item.qty).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <Sparkles size={18} className="text-amber-500" />
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Need help choosing?</p>
                    <p className="text-sm text-stone-500">Chat with us on WhatsApp anytime for product recommendations.</p>
                  </div>
                </div>
                <Button asChild size="lg" variant="default" className="w-full">
                  <a href="https://wa.me/919871874041" target="_blank" rel="noreferrer">
                    Chat with support
                  </a>
                </Button>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm uppercase tracking-widest text-stone-400 font-semibold font-sans-clean">
                      Order Summary
                    </p>
                    <h2 className="font-display text-2xl font-bold text-stone-900">Secure checkout</h2>
                  </div>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    50% advance
                  </span>
                </div>

                <div className="space-y-4 text-sm text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="text-green-600">-₹{discount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-200 pt-4 font-semibold text-stone-900">
                    <span>Total</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button asChild size="lg" variant="default" className="w-full">
                    <Link href={`/checkout?product=${cartItems[0]?.slug || "custom-magazine"}&qty=${cartItems[0]?.qty || 1}&occasion=${encodeURIComponent(cartItems[0]?.occasion || "Custom")}`}>
                      <CreditCard size={18} /> Proceed to Checkout
                    </Link>
                  </Button>
                  <p className="text-xs text-stone-400">
                    After checkout, our team will reach out to confirm details and start designing your keepsake.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6">
                <h3 className="font-sans-clean text-sm font-semibold text-stone-800 uppercase tracking-widest mb-4">
                  Why The Story Celler?
                </h3>
                <ul className="space-y-3 text-sm text-stone-500">
                  <li>• Handcrafted design for every order</li>
                  <li>• Free shipping across India</li>
                  <li>• Dedicated WhatsApp support</li>
                  <li>• Ready-to-share keepsakes</li>
                </ul>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
