import { create } from "zustand";

export type CartItem = {
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

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }, qtyCount?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, qty: number) => void;
  clearCart: () => void;
  initializeCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  initializeCart: () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart");
      if (stored) {
        try {
          set({ items: JSON.parse(stored) });
        } catch (e) {
          localStorage.removeItem("cart");
        }
      }
    }
  },
  addItem: (item, qtyCount = 1) => {
    set((state) => {
      const existingIndex = state.items.findIndex((i) => i.slug === item.slug);
      let newItems;
      if (existingIndex > -1) {
        newItems = state.items.map((i, idx) =>
          idx === existingIndex ? { ...i, qty: i.qty + qtyCount } : i
        );
      } else {
        newItems = [...state.items, { ...item, qty: qtyCount }];
      }
      localStorage.setItem("cart", JSON.stringify(newItems));
      return { items: newItems };
    });
  },
  removeItem: (slug) => {
    set((state) => {
      const newItems = state.items.filter((i) => i.slug !== slug);
      localStorage.setItem("cart", JSON.stringify(newItems));
      return { items: newItems };
    });
  },
  updateQuantity: (slug, qty) => {
    set((state) => {
      const newItems = state.items
        .map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0);
      localStorage.setItem("cart", JSON.stringify(newItems));
      return { items: newItems };
    });
  },
  clearCart: () => {
    localStorage.removeItem("cart");
    set({ items: [] });
  },
}));
