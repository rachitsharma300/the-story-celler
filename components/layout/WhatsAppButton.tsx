"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const whatsappNumber = "917903316723";
const whatsappMessage = "Hi%20The%20Story%20Celler%2C%20I%20need%20help%20with%20an%20order.%20Can%20you%20please%20assist%3F";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col items-end gap-3 sm:right-8">
      {open && (
        <div className="whatsapp-popup w-[280px] rounded-[28px] border border-stone-200 bg-white/95 shadow-2xl backdrop-blur-xl p-4 text-stone-900">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-amber-500 font-semibold mb-2">
                WhatsApp Help
              </p>
              <h2 className="text-lg font-bold">Chat with The Story Celler</h2>
            </div>
            <button
              type="button"
              className="rounded-full p-2 text-stone-500 hover:text-stone-900 transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Close WhatsApp popup"
            >
              <X size={18} />
            </button>
          </div>
          <p className="mt-3 text-sm text-stone-600">
            Send us a quick message and we will reply on WhatsApp as soon as possible.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
          >
            <MessageCircle size={18} />
            Open WhatsApp
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="whatsapp-button inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30 transition duration-300 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 active:scale-95"
        aria-label="Open WhatsApp chat"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
