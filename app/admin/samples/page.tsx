"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Trash2, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import toast from "react-hot-toast";

interface Sample {
  id: number;
  title: string;
  pdfUrl: string;
  coverImageUrl?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function SamplesPage() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    setLoading(true);
    try {
      const response = await api.get<Sample[]>("/api/samples");
      setSamples(response.data || []);
    } catch (error) {
      console.error("Error fetching samples:", error);
      toast.error("Failed to load samples from backend");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this sample?")) return;

    try {
      await api.delete(`/api/samples/${id}`);
      setSamples(samples.filter((s) => s.id !== id));
      toast.success("Sample deleted successfully");
    } catch (error) {
      console.error("Error deleting sample:", error);
      toast.error("Failed to delete sample");
    }
  };

  const filteredSamples = samples.filter((sample) => {
    const matchesSearch = sample.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || sample.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "all",
    ...Array.from(new Set(samples.map((s) => s.category).filter(Boolean) as string[])),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-3xl font-bold text-stone-900 mb-2">
            Samples Management
          </h1>
          <p className="font-sans-clean text-stone-500">
            Manage your product PDF samples and collections
          </p>
        </div>
        <Button asChild size="lg" variant="default">
          <Link href="/admin/samples/new">
            <Plus size={18} className="mr-1" />
            Add Sample
          </Link>
        </Button>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search samples by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 transition-all"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-3 rounded-lg border border-stone-200 bg-white font-sans-clean text-sm text-stone-800 outline-none focus:border-amber-400 transition-all"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={40} className="animate-spin text-amber-500 mb-4" />
          <p className="font-sans-clean text-stone-500">Loading samples from database...</p>
        </div>
      ) : (
        <>
          {/* Samples Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSamples.map((sample, i) => (
              <motion.div
                key={sample.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-stone-200 bg-white overflow-hidden hover:shadow-lg transition-all group"
              >
                {/* Image Area */}
                <div className="relative h-48 bg-stone-100 flex items-center justify-center overflow-hidden border-b border-stone-100">
                  {sample.coverImageUrl ? (
                    <img
                      src={sample.coverImageUrl}
                      alt={sample.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-stone-400">
                      <span className="text-6xl group-hover:scale-110 transition-transform duration-500">📖</span>
                      <span className="text-xs">No Cover Image</span>
                    </div>
                  )}
                  {sample.category && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        {sample.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-stone-900 mb-4 line-clamp-1">
                    {sample.title}
                  </h3>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={sample.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Eye size={16} className="mr-1" />
                        View PDF
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(sample.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredSamples.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="font-sans-clean text-stone-500">No samples found</p>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
