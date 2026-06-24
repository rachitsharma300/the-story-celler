import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { Toaster } from "react-hot-toast";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Story Celler — Archiving Your Memories Forever",
    template: "%s | The Story Celler",
  },
  description:
    "Turn your memories into beautifully crafted keepsakes — custom magazines, photo albums, recap reels and more.",
  keywords: ["custom magazine", "memory keepsake", "photo album", "personalized gift", "recap reel"],
  openGraph: {
    title: "The Story Celler — Archiving Your Memories Forever",
    description: "Turn your memories into beautifully crafted keepsakes.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${playfair.variable} ${jakarta.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "hsl(224 71% 4%)",
              color: "hsl(240 20% 98%)",
              border: "1px solid hsl(263 90% 51% / 0.3)",
              fontFamily: "var(--font-jakarta)",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}