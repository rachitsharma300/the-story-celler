"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, Trash2, Eye, Edit2, Loader2, Save, X, PackageOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import toast from "react-hot-toast";

interface Sample {
  id: number;
  title: string;
  pdfUrl: string;
  coverImageUrl?: string;
  category?: string;
}

interface Product {
  id?: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
}

export default function CatalogPage() {
  const [activeTab, setActiveTab] = useState<"products" | "samples">("products");
  
  // Products states
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Product Form states
  const [pName, setPName] = useState("");
  const [pSlug, setPSlug] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [pPrice, setPPrice] = useState(0);
  const [pOriginalPrice, setPOriginalPrice] = useState(0);
  const [pImageUrl, setPImageUrl] = useState("");

  // Samples states
  const [samples, setSamples] = useState<Sample[]>([]);
  const [samplesLoading, setSamplesLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (activeTab === "products") {
      fetchProducts();
    } else {
      fetchSamples();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const response = await api.get<Product[]>("/api/admin/products");
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load catalog products");
    } finally {
      setProductsLoading(false);
    }
  };

  const fetchSamples = async () => {
    setSamplesLoading(true);
    try {
      const response = await api.get<Sample[]>("/api/samples");
      setSamples(response.data || []);
    } catch (error) {
      console.error("Error fetching samples:", error);
      toast.error("Failed to load samples");
    } finally {
      setSamplesLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setPName("");
    setPSlug("");
    setPDescription("");
    setPPrice(0);
    setPOriginalPrice(0);
    setPImageUrl("");
    setShowProductModal(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setPName(product.name);
    setPSlug(product.slug);
    setPDescription(product.description || "");
    setPPrice(product.price);
    setPOriginalPrice(product.originalPrice || 0);
    setPImageUrl(product.imageUrl || "");
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName || !pSlug || pPrice <= 0) {
      toast.error("Please enter a name, unique slug, and valid price.");
      return;
    }

    const payload = {
      name: pName,
      slug: pSlug,
      description: pDescription,
      price: parseFloat(pPrice.toString()),
      originalPrice: pOriginalPrice ? parseFloat(pOriginalPrice.toString()) : parseFloat(pPrice.toString()) * 1.5,
      imageUrl: pImageUrl,
    };

    toast.loading("Saving catalog product...", { id: "product-save" });
    try {
      if (editingProduct?.id) {
        // Edit product
        const res = await api.put(`/api/admin/products/${editingProduct.id}`, payload);
        setProducts(products.map((p) => (p.id === editingProduct.id ? res.data : p)));
        toast.success("Product updated successfully", { id: "product-save" });
      } else {
        // Add new product
        const res = await api.post("/api/admin/products", payload);
        setProducts([...products, res.data]);
        toast.success("New product added successfully", { id: "product-save" });
      }
      setShowProductModal(false);
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product information", { id: "product-save" });
    }
  };

  const handleDeleteProduct = async (id: number, name: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete product "${name}"? This will remove it from the Shop catalog.`);
    if (!confirmed) return;

    try {
      await api.delete(`/api/admin/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Product deleted from database");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleDeleteSample = async (id: number) => {
    if (!confirm("Are you sure you want to delete this sample preview?")) return;

    try {
      await api.delete(`/api/samples/${id}`);
      setSamples(samples.filter((s) => s.id !== id));
      toast.success("Sample deleted successfully");
    } catch (error) {
      console.error("Error deleting sample:", error);
      toast.error("Failed to delete sample");
    }
  };

  const filteredSamples = samples.filter((sample) =>
    sample.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-stone-900 mb-2">
            Catalog Management
          </h1>
          <p className="font-sans-clean text-stone-500">
            Configure keepsake product offerings, prices, and PDF samples.
          </p>
        </div>

        <div className="flex gap-2">
          {activeTab === "products" ? (
            <Button onClick={handleOpenAddModal} size="lg" className="rounded-xl">
              <Plus size={18} className="mr-1" />
              Add Product
            </Button>
          ) : (
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/admin/samples/new">
                <Plus size={18} className="mr-1" />
                Add Sample
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-stone-200">
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 px-6 py-3 font-sans-clean font-semibold text-sm border-b-2 transition-all ${
            activeTab === "products"
              ? "border-amber-500 text-amber-600"
              : "border-transparent text-stone-500 hover:text-stone-700"
          }`}
        >
          <PackageOpen size={16} />
          Products Catalog ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("samples")}
          className={`flex items-center gap-2 px-6 py-3 font-sans-clean font-semibold text-sm border-b-2 transition-all ${
            activeTab === "samples"
              ? "border-amber-500 text-amber-600"
              : "border-transparent text-stone-500 hover:text-stone-700"
          }`}
        >
          <FileText size={16} />
          Samples PDF Library ({samples.length})
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === "products" && (
        <>
          {productsLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={36} className="animate-spin text-amber-500 mb-4" />
              <p className="font-sans-clean text-stone-500 text-sm">Retrieving database catalog...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image preview */}
                    <div className="h-44 bg-stone-50 border-b border-stone-100 relative">
                      <img
                        src={product.imageUrl || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-stone-900/80 text-amber-400 text-xs font-sans-clean font-bold rounded-lg backdrop-blur-sm">
                        {product.slug}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="font-display text-lg font-bold text-stone-900 leading-tight">
                        {product.name}
                      </h3>
                      <p className="font-sans-clean text-stone-500 text-xs line-clamp-3">
                        {product.description || "No description provided."}
                      </p>
                      
                      <div className="flex items-baseline gap-2 pt-2">
                        <span className="font-display text-xl font-bold text-stone-900">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="font-sans-clean text-xs text-stone-400 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 border-t border-stone-100 flex gap-2 bg-stone-50/50">
                    <Button
                      onClick={() => handleOpenEditModal(product)}
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-xl bg-white"
                    >
                      <Edit2 size={14} className="mr-1" /> Edit Details
                    </Button>
                    <Button
                      onClick={() => handleDeleteProduct(product.id!, product.name)}
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}

              {products.length === 0 && (
                <div className="col-span-full py-16 text-center text-stone-400 font-sans-clean">
                  No products configured in catalog database.
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* SAMPLES TAB */}
      {activeTab === "samples" && (
        <>
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search samples by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 transition-all"
            />
          </div>

          {samplesLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={36} className="animate-spin text-amber-500 mb-4" />
              <p className="font-sans-clean text-stone-500 text-sm">Retrieving samples library...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSamples.map((sample) => (
                <div
                  key={sample.id}
                  className="rounded-2xl border border-stone-200 bg-white overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative h-44 bg-stone-100 flex items-center justify-center overflow-hidden border-b border-stone-100">
                    {sample.coverImageUrl ? (
                      <img
                        src={sample.coverImageUrl}
                        alt={sample.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-stone-400">
                        <span className="text-5xl">📖</span>
                        <span className="text-xs">No Cover Image</span>
                      </div>
                    )}
                    {sample.category && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          {sample.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-md font-bold text-stone-900 mb-4 line-clamp-1">
                      {sample.title}
                    </h3>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href={sample.pdfUrl} target="_blank" rel="noopener noreferrer">
                          <Eye size={14} className="mr-1" /> View PDF
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSample(sample.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredSamples.length === 0 && (
                <div className="col-span-full py-16 text-center text-stone-400 font-sans-clean">
                  No preview samples found in database.
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      <AnimatePresence>
        {showProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 space-y-6"
            >
              {/* Close */}
              <button
                onClick={() => setShowProductModal(false)}
                className="absolute right-6 top-6 p-2 bg-stone-100 hover:bg-stone-200 text-stone-500 rounded-full"
              >
                <X size={18} />
              </button>

              <div>
                <span className="text-xs text-amber-600 font-bold uppercase tracking-widest block mb-1">
                  Product Customizer
                </span>
                <h2 className="font-display text-2xl font-bold text-stone-900">
                  {editingProduct ? "Modify Product Details" : "Create New Keepsake"}
                </h2>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 font-sans-clean text-sm">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Keepsake Memory Book"
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    className="w-full px-3.5 py-2 border border-stone-200 rounded-xl bg-stone-50 text-stone-800 outline-none focus:border-amber-400 focus:bg-white transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Price (₹)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="1200"
                      value={pPrice || ""}
                      onChange={(e) => setPPrice(parseFloat(e.target.value))}
                      className="w-full px-3.5 py-2 border border-stone-200 rounded-xl bg-stone-50 text-stone-800 outline-none focus:border-amber-400 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      placeholder="1800"
                      value={pOriginalPrice || ""}
                      onChange={(e) => setPOriginalPrice(parseFloat(e.target.value))}
                      className="w-full px-3.5 py-2 border border-stone-200 rounded-xl bg-stone-50 text-stone-800 outline-none focus:border-amber-400 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Unique Slug (URL path)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. keepsake-memory-book"
                    value={pSlug}
                    disabled={!!editingProduct}
                    onChange={(e) => setPSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
                    className="w-full px-3.5 py-2 border border-stone-200 rounded-xl bg-stone-50 text-stone-800 outline-none focus:border-amber-400 focus:bg-white transition-all disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Image URL</label>
                  <input
                    type="text"
                    placeholder="https://res.cloudinary.com/..."
                    value={pImageUrl}
                    onChange={(e) => setPImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2 border border-stone-200 rounded-xl bg-stone-50 text-stone-800 outline-none focus:border-amber-400 focus:bg-white transition-all text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Short description..."
                    value={pDescription}
                    onChange={(e) => setPDescription(e.target.value)}
                    className="w-full px-3.5 py-2 border border-stone-200 rounded-xl bg-stone-50 text-stone-800 outline-none focus:border-amber-400 focus:bg-white transition-all resize-none text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Button type="button" onClick={() => setShowProductModal(false)} variant="secondary" className="rounded-xl">
                    Cancel
                  </Button>
                  <Button type="submit" className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white">
                    <Save size={16} className="mr-1.5" />
                    Save Product
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
