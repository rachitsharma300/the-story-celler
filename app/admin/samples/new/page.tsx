"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Loader2, CheckCircle2, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function AddSamplePage() {
  const router = useRouter();
  
  // State variables matching the database model
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Wedding");
  const [pdfUrl, setPdfUrl] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");

  // Upload progress / status states
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Categories list matching standard occasions
  const categoriesList = [
    "Wedding",
    "Anniversary",
    "Birthday",
    "Travel",
    "Engagement",
    "Custom"
  ];

  // Handler for uploading files to Next.js API endpoint
  const handleFileUpload = async (
    file: File, 
    type: "pdf" | "cover"
  ) => {
    const isPdf = type === "pdf";
    if (isPdf) {
      setUploadingPdf(true);
      setPdfName(file.name);
    } else {
      setUploadingCover(true);
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", isPdf ? "storyceller/samples/pdf" : "storyceller/samples/covers");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload request failed");
      }

      const data = await response.json();
      if (data.success && data.url) {
        if (isPdf) {
          setPdfUrl(data.url);
          toast.success("PDF uploaded successfully!");
        } else {
          setCoverImageUrl(data.url);
          toast.success("Cover image uploaded successfully!");
        }
      } else {
        throw new Error(data.error || "Failed to get upload URL");
      }
    } catch (error: any) {
      console.error(`Error uploading ${type}:`, error);
      toast.error(`Failed to upload ${type === "pdf" ? "PDF file" : "cover image"}`);
      if (isPdf) {
        setPdfName("");
      }
    } finally {
      if (isPdf) {
        setUploadingPdf(false);
      } else {
        setUploadingCover(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a sample name");
      return;
    }
    if (!pdfUrl) {
      toast.error("Please upload a PDF file");
      return;
    }

    setSubmitting(true);
    try {
      // POST payload matching Sample.java entity
      const payload = {
        title,
        category,
        pdfUrl,
        coverImageUrl: coverImageUrl || null
      };

      const response = await api.post("/api/samples", payload);
      if (response.status === 201 || response.status === 200) {
        toast.success("Sample created successfully!");
        router.push("/admin/samples");
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error: any) {
      console.error("Error creating sample:", error);
      toast.error("Failed to create sample in database");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link 
          href="/admin/samples" 
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-4 font-sans-clean font-semibold"
        >
          <ArrowLeft size={16} />
          Back to Samples
        </Link>
        <h1 className="font-display text-3xl font-bold text-stone-900 mb-2">
          Add New Sample
        </h1>
        <p className="font-sans-clean text-stone-500">
          Upload and create a new PDF sample to show on your website
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-white border border-stone-200 p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="pb-6 border-b border-stone-200">
            <h2 className="font-display text-lg font-bold text-stone-900 mb-4">
              Basic Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                  Sample Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Nandita's Wedding Album"
                  required
                  disabled={submitting}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={submitting}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 outline-none focus:border-amber-400 focus:bg-white transition-all"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Media Files */}
          <div className="pb-6 border-b border-stone-200">
            <h2 className="font-display text-lg font-bold text-stone-900 mb-4">
              File Uploads
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PDF upload field */}
              <div className="flex flex-col">
                <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                  Sample PDF File *
                </label>
                
                {pdfUrl ? (
                  <div className="border border-stone-200 rounded-xl p-4 bg-stone-50 flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                        <FileText size={20} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-stone-850 truncate" title={pdfName || "uploaded.pdf"}>
                          {pdfName || "uploaded.pdf"}
                        </p>
                        <p className="text-xs text-green-600 font-medium flex items-center gap-1 mt-0.5">
                          <CheckCircle2 size={12} /> Uploaded to Cloudinary
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => { setPdfUrl(""); setPdfName(""); }}
                      disabled={submitting}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-stone-300 hover:border-amber-400 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all bg-stone-50 hover:bg-stone-50/50">
                    {uploadingPdf ? (
                      <div className="flex flex-col items-center gap-2 text-center">
                        <Loader2 size={32} className="animate-spin text-amber-500" />
                        <span className="font-sans-clean text-sm text-stone-600">Uploading PDF to Cloudinary...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-center">
                        <Upload size={32} className="text-stone-400" />
                        <span className="font-sans-clean text-sm font-semibold text-stone-700">Choose PDF File</span>
                        <span className="text-xs text-stone-400">PDF up to 100MB</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      disabled={uploadingPdf || submitting}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, "pdf");
                      }}
                    />
                  </label>
                )}
              </div>

              {/* Cover Image upload field */}
              <div className="flex flex-col">
                <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                  Cover Image (Optional)
                </label>

                {coverImageUrl ? (
                  <div className="border border-stone-200 rounded-xl p-4 bg-stone-50 flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-stone-200">
                        <img src={coverImageUrl} alt="Cover preview" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-850">Cover Photo</p>
                        <p className="text-xs text-green-600 font-medium flex items-center gap-1 mt-0.5">
                          <CheckCircle2 size={12} /> Uploaded to Cloudinary
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setCoverImageUrl("")}
                      disabled={submitting}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-stone-300 hover:border-amber-400 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all bg-stone-50 hover:bg-stone-50/50">
                    {uploadingCover ? (
                      <div className="flex flex-col items-center gap-2 text-center">
                        <Loader2 size={32} className="animate-spin text-amber-500" />
                        <span className="font-sans-clean text-sm text-stone-600">Uploading Image to Cloudinary...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-center">
                        <Upload size={32} className="text-stone-400" />
                        <span className="font-sans-clean text-sm font-semibold text-stone-700">Choose Image File</span>
                        <span className="text-xs text-stone-400">PNG, JPG or WEBP</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingCover || submitting}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, "cover");
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <Button 
              type="submit" 
              size="lg" 
              variant="default"
              disabled={submitting || uploadingPdf || uploadingCover}
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                "Create Sample"
              )}
            </Button>
            <Button
              type="button"
              asChild
              size="lg"
              variant="outline"
              disabled={submitting}
            >
              <Link href="/admin/samples">Cancel</Link>
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
