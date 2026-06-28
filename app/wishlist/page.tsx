import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

interface WishlistItem {
  slug: string;
  name: string;
  emoji: string;
  price: number;
  originalPrice: number;
  tag: string;
  tagColor: string;
}

const mockWishlist: WishlistItem[] = [];

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase text-amber-500 font-bold font-sans-clean mb-2">
            Saved
          </p>
          <h1 className="font-display text-4xl font-bold text-stone-900">
            Your Wishlist
          </h1>
          <p className="mt-4 max-w-2xl text-stone-600">
            Keep track of your favorite keepsakes and return to them when you are ready to order.
          </p>
        </div>

        {mockWishlist.length === 0 ? (
          <div className="rounded-3xl border border-stone-200 bg-white p-10 text-center">
            <p className="text-5xl mb-4">❤️</p>
            <p className="font-display text-2xl font-bold text-stone-900 mb-2">
              Your wishlist is empty
            </p>
            <p className="font-sans-clean text-stone-500 mb-6">
              Save your favorite keepsakes to view them later.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-sans-clean font-semibold rounded-full transition-all"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockWishlist.map((item) => (
              <div
                key={item.slug}
                className="rounded-3xl border border-stone-200 bg-white overflow-hidden hover:shadow-md transition-all group"
              >
                <div className="relative h-40 bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 flex items-center justify-center">
                  <span className="text-6xl">{item.emoji}</span>
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-all">
                    <Heart size={18} className="text-red-500 fill-red-500" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-stone-900">
                    {item.name}
                  </h3>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold mt-2 ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="font-display text-2xl font-bold text-stone-900">
                        ₹{item.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-stone-400 line-through">
                        ₹{item.originalPrice.toLocaleString()}
                      </p>
                    </div>
                    <Link
                      href={`/product/${item.slug}`}
                      className="p-3 bg-amber-50 group-hover:bg-amber-500 rounded-xl text-amber-600 group-hover:text-white transition-all"
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
