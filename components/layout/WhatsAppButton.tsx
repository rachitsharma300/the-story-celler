"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

const whatsappNumber = "919871874041";

const presetQuestions = [
  {
    id: "q1",
    question: "How do I order a custom magazine?",
    answer: "To order, select a layout package (e.g. Birthday or Anniversary Magazine), place the order, and upload your text/photos. Our designers will craft a custom editorial style for you. Let's chat on WhatsApp to start!",
  },
  {
    id: "q2",
    question: "What is the delivery timeline?",
    answer: "We design, print, and deliver within 5 to 7 business days. Express shipping is available if you have an upcoming occasion. Let's align on your deadline via WhatsApp!",
  },
  {
    id: "q3",
    question: "Can I customize the design/pages?",
    answer: "Absolutely! Every page is tailored to your story. You decide the layouts, headings, and photo placements, and we handle the design magic. Let's connect on WhatsApp to get started!",
  },
];

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [lastQuery, setLastQuery] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages on client-side to prevent hydration mismatch
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "Hello! Welcome to The Story Celler. How can I assist you regarding this product or our custom keepsakes today?",
        time: "Just now",
      },
    ]);

    // Check localStorage interaction
    if (typeof window !== "undefined") {
      const interacted = localStorage.getItem("story_celler_wa_interacted") === "true";
      setHasInteracted(interacted);

      if (!interacted) {
        const timer = setTimeout(() => {
          setOpen(true);
        }, 4000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleInteraction = () => {
    if (typeof window !== "undefined" && !hasInteracted) {
      localStorage.setItem("story_celler_wa_interacted", "true");
      setHasInteracted(true);
    }
  };

  const handleToggle = () => {
    handleInteraction();
    setOpen((prev) => !prev);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleInteraction();
    setOpen(false);
  };

  const handleQuestionClick = (q: typeof presetQuestions[0]) => {
    handleInteraction();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: q.question,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLastQuery(q.question);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: q.answer,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    handleInteraction();
    const currentInput = inputValue.trim();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: currentInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLastQuery(currentInput);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "That sounds like a wonderful request! Let's connect directly on WhatsApp so our design team can help you customize your order.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  // Generate dynamic WhatsApp redirect URL
  const defaultMessage = "Hi! I am visiting The Story Celler and would like to chat about your custom products.";
  const encodedMsg = encodeURIComponent(
    lastQuery ? `Hi! I have a question about: "${lastQuery}"` : defaultMessage
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col items-end gap-3 sm:right-8">
      {open && (
        <div className="whatsapp-popup w-[350px] max-w-[90vw] overflow-hidden rounded-[24px] border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1A100E] shadow-2xl backdrop-blur-xl flex flex-col text-stone-900 dark:text-stone-100 transition-all duration-300">
          
          {/* Header */}
          <div className="bg-primary dark:bg-stone-900 p-4 text-white flex items-center justify-between border-b border-stone-100/10">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full bg-white/10 flex items-center justify-center shadow-md border border-white/20">
                <Sparkles size={18} className="text-white" />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-stone-900 bg-emerald-500 animate-pulse"></span>
              </div>
              <div className="flex flex-col text-left">
                <h3 className="text-sm font-semibold text-stone-100 font-sans-clean">Celler Assistant</h3>
                <span className="text-[10px] text-emerald-400 font-medium">Replies instantly</span>
              </div>
            </div>
            <button
              type="button"
              className="rounded-full p-1.5 text-stone-400 hover:text-stone-100 hover:bg-white/10 transition-colors"
              onClick={handleClose}
              aria-label="Close chat assistant"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Logs */}
          <div className="bg-[#F8F5F2] dark:bg-[#150d0b] h-[240px] overflow-y-auto p-4 space-y-3 flex flex-col scrollbar-thin scrollbar-thumb-stone-200 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[82%] ${
                  msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                }`}
              >
                <div
                  className={`p-3 text-xs md:text-sm shadow-sm ${
                    msg.sender === "user"
                      ? "bg-primary/10 dark:bg-primary/20 text-stone-900 dark:text-stone-100 border border-primary/25 dark:border-primary/30 rounded-[18px] rounded-tr-none text-right"
                      : "bg-white dark:bg-[#201412] text-stone-800 dark:text-stone-200 border border-stone-200/40 dark:border-stone-800/40 rounded-[18px] rounded-tl-none text-left"
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                </div>
                <span className="text-[9px] text-stone-400 dark:text-stone-500 mt-1 px-1 select-none">
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="self-start flex flex-col items-start max-w-[82%]">
                <div className="bg-white dark:bg-[#201412] border border-stone-200/40 dark:border-stone-800/40 rounded-[18px] rounded-tl-none p-3 shadow-sm">
                  <div className="flex space-x-1 py-1 px-1.5">
                    <div className="h-1.5 w-1.5 bg-stone-400 dark:bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="h-1.5 w-1.5 bg-stone-400 dark:bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="h-1.5 w-1.5 bg-stone-400 dark:bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick-reply Preset Questions */}
          <div className="flex gap-2 overflow-x-auto px-4 py-2 border-t border-stone-100 dark:border-stone-800/80 bg-stone-50/70 dark:bg-[#1A100E] scrollbar-none">
            {presetQuestions.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => handleQuestionClick(q)}
                className="flex-shrink-0 text-[11px] px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-850 bg-white dark:bg-[#2A1C1A] hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-450 transition whitespace-nowrap cursor-pointer"
              >
                {q.question}
              </button>
            ))}
          </div>

          {/* TextInput & Submit */}
          <div className="p-3 bg-white dark:bg-[#1A100E] border-t border-stone-100 dark:border-stone-800/80">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-stone-50 dark:bg-[#221614] border border-stone-200 dark:border-stone-800 rounded-full px-4 py-2 text-xs md:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 placeholder-stone-400"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark active:scale-95 transition flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send custom message"
              >
                <Send size={14} className="ml-0.5" />
              </button>
            </form>
          </div>

          {/* Action WhatsApp Connect Button */}
          <div className="px-4 pb-4 bg-white dark:bg-[#1A100E]">
            <a
              href={whatsappUrl}
              onClick={handleInteraction}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition duration-300 active:scale-[0.98]"
            >
              <MessageCircle size={16} />
              Open WhatsApp Chat
            </a>
          </div>

        </div>
      )}

      {/* Floating Button */}
      <button
        type="button"
        onClick={handleToggle}
        className="whatsapp-button relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_8px_30px_rgba(16,185,129,0.35)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.55)] transition duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        aria-label="Open WhatsApp chat"
      >
        {/* Radar Ring Glow Waves */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-pulse pointer-events-none" />

        {/* Modern WhatsApp Logo SVG Path */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-7 h-7 fill-current z-10 text-white relative drop-shadow-md">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>

        {!hasInteracted && !open && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 z-20">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] font-bold text-stone-950 items-center justify-center shadow-md shadow-amber-500/30">
              1
            </span>
          </span>
        )}
      </button>
    </div>
  );
}
