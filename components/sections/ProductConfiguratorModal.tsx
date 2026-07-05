"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, ArrowLeft, Upload, FileUp, Trash2, ArrowUp, ArrowDown, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import api from "@/lib/axios";


interface ProductConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  productSlug: string;
  productName: string;
  basePrice: number;
}

const PAGE_OPTIONS = [
  { pages: 8, price: 699, photosRequired: "16-25 images" },
  { pages: 12, price: 999, photosRequired: "25-30 images" },
  { pages: 16, price: 1299, photosRequired: "35-40 images" },
  { pages: 20, price: 1699, photosRequired: "50-70 images" },
];

const PRINTING_OPTIONS = [
  { id: "normal", name: "300 GSM Glossy", price: 0, desc: "Standard high quality glossy print" },
  { id: "laminated", name: "Water Resistant Lamination", price: 200, desc: "Glossy print with matte lamination coating" },
];

export default function ProductConfiguratorModal({
  isOpen,
  onClose,
  productSlug,
  productName,
  basePrice,
}: ProductConfiguratorModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState<any>(null);

  // Configuration State
  const [selectedPages, setSelectedPages] = useState(PAGE_OPTIONS[0]);
  const [selectedPrinting, setSelectedPrinting] = useState(PRINTING_OPTIONS[0]);

  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    age: "",
    relationship: "",
    aboutPerson: "",
    specialMessage: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedPhotos, setUploadedPhotos] = useState<{ id: string; url: string; name: string; size: number }[]>([]);
  const [frontCoverPhoto, setFrontCoverPhoto] = useState<{ url: string; name: string } | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Steps labels
  const steps = [
    "Select Pages",
    "Printing Type",
    "Personal Details",
    "Upload Images",
    "Front Cover",
    "Review & Order",
  ];

  // Dynamic calculations
  const extraPageCharge = 0;
  const totalPrice = selectedPages.price + selectedPrinting.price + extraPageCharge;
  const advanceAmount = Math.round(totalPrice * 0.5);

  // Compute Expected Delivery Estimate (e.g. tomorrow - +6 days)
  const deliveryEstimate = (() => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 1);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 6);

    const fmt = (d: Date) =>
      d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    return `${fmt(minDate)} - ${fmt(maxDate)}`;
  })();

  // Validation step 3 (Personal Details)
  function validateDetails() {
    const newErrors: Record<string, string> = {};
    if (!personalDetails.name.trim()) {
      newErrors.name = "Person Name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Handle step updates
  function handleNext() {
    if (currentStep === 3) {
      if (!validateDetails()) {
        toast.error("Please fill in required fields.");
        return;
      }
    }
    if (currentStep === 4) {
      // Photo count check recommendation
      const requiredMin = parseInt(selectedPages.photosRequired.split("-")[0]);
      if (uploadedPhotos.length < requiredMin) {
        toast.error(`Minimum ${requiredMin} photos are recommended for ${selectedPages.pages} pages!`);
        return;
      }
    }
    if (currentStep === 5) {
      if (!frontCoverPhoto) {
        toast.error("Please upload a cover image.");
        return;
      }
    }
    setCurrentStep((s) => Math.min(steps.length, s + 1));
  }

  function handleBack() {
    setCurrentStep((s) => Math.max(1, s - 1));
  }

  // Handle file drops / selection for gallery
  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>, isDrag = false) {
    let files: FileList | null = null;
    if (isDrag) {
      const de = e as React.DragEvent<HTMLDivElement>;
      files = de.dataTransfer.files;
    } else {
      const ce = e as React.ChangeEvent<HTMLInputElement>;
      files = ce.target.files;
    }

    if (!files || files.length === 0) return;

    setUploadProgress(0);
    const validFiles: { id: string; url: string; name: string; size: number }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // 35MB check
      if (file.size > 35 * 1024 * 1024) {
        toast.error(`File ${file.name} exceeds 35MB limit!`);
        continue;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", `storyceller/orders/${productSlug}`);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Upload failed");

        const data = await response.json();
        if (data.success && data.url) {
          validFiles.push({
            id: Math.random().toString(36).substring(7),
            url: data.url,
            name: file.name,
            size: file.size,
          });
        }
      } catch (err) {
        console.error("Error uploading file:", err);
        toast.error(`Failed to upload ${file.name}`);
      }

      setUploadProgress(Math.round(((i + 1) / files.length) * 100));
    }

    setUploadedPhotos((prev) => [...prev, ...validFiles]);
    setTimeout(() => setUploadProgress(null), 800);
  }

  // Handle Cover Page Photo Upload
  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 35 * 1024 * 1024) {
      toast.error(`Cover Image exceeds 35MB limit!`);
      return;
    }

    setUploadProgress(10);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", `storyceller/orders/${productSlug}/covers`);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      if (data.success && data.url) {
        setFrontCoverPhoto({
          url: data.url,
          name: file.name,
        });
        toast.success("Cover image uploaded successfully!");
      } else {
        throw new Error(data.error || "Failed to upload cover image");
      }
    } catch (err) {
      console.error("Error uploading cover:", err);
      toast.error("Failed to upload cover image");
    } finally {
      setUploadProgress(null);
    }
  }

  // Reorder list items
  function moveItem(index: number, direction: "up" | "down") {
    const list = [...uploadedPhotos];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const [removed] = list.splice(index, 1);
    list.splice(targetIndex, 0, removed);
    setUploadedPhotos(list);
  }

  function removeItem(index: number) {
    const list = [...uploadedPhotos];
    URL.revokeObjectURL(list[index].url);
    list.splice(index, 1);
    setUploadedPhotos(list);
  }

  // Submit configuration
  async function handleSubmitOrder() {
    setLoading(true);
    try {
      // Simulate real cloud uploads/post payload
      const payload = {
        productSlug,
        productName,
        occasion: personalDetails.relationship || "Custom Gift",
        pages: selectedPages.pages,
        printingType: selectedPrinting.name,
        personalDetails: {
          name: personalDetails.name,
          age: personalDetails.age ? parseInt(personalDetails.age) : undefined,
          relationship: personalDetails.relationship,
          aboutPerson: personalDetails.aboutPerson,
          specialMessage: personalDetails.specialMessage,
        },
        uploadedPhotos: uploadedPhotos.map((p) => p.url),
        frontCoverPhoto: frontCoverPhoto?.url || "",
        totalAmount: totalPrice,
        advanceAmount: advanceAmount,
      };

      const res = await api.post("/api/orders", payload);
      const responseData = res.data;

      const statusMap: Record<string, string> = {
        PENDING: "Pending",
        DESIGNING: "Designing",
        REVIEW: "Review",
        PRINTING: "Printing",
        SHIPPED: "Shipped",
        DELIVERED: "Delivered",
      };

      if (responseData && responseData.orderId) {
        if (responseData.status) {
          responseData.status = statusMap[responseData.status] || responseData.status;
        }
        setOrderPlaced(responseData);
        toast.success("Order Created Successfully!");
      } else {
        throw new Error("Order creation failed");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message || "Failed to submit configurator order");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-4xl h-full max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col m-4">
        {/* MODAL CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-2 bg-stone-100 hover:bg-stone-200 text-stone-500 rounded-full z-20 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* TOP HEADER & PROGRESS */}
        <div className="p-6 md:p-8 border-b border-stone-100 bg-stone-50">
          <span className="text-amber-600 font-sans-clean text-xs font-bold uppercase tracking-widest block mb-1">
            Product Creator — {productName}
          </span>
          <h2 className="font-display text-2xl font-bold text-stone-900 mb-5">Customize Your Keepsake</h2>

          {/* Progress Bar */}
          {!orderPlaced && (
            <div>
              <div className="flex justify-between text-xs text-stone-400 font-medium mb-2">
                <span>Step {currentStep} of {steps.length}: {steps[currentStep - 1]}</span>
                <span>{Math.round((currentStep / steps.length) * 100)}% Complete</span>
              </div>
              <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-amber-500 rounded-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* WORK AREA */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {orderPlaced ? (
            /* ORDER CONFIRMATION VIEW */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-md mx-auto py-10"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-green-600 animate-bounce" />
              </div>
              <h3 className="font-display text-3xl font-bold text-stone-900 mb-2">Order Confirmed!</h3>
              <p className="font-sans-clean text-stone-500 mb-2">
                Order ID: <span className="font-bold text-amber-600">{orderPlaced.orderId}</span>
              </p>
              <p className="font-sans-clean text-sm text-stone-400 mb-8 leading-relaxed">
                Thank you, {orderPlaced.personalDetails?.name}! We have saved your keepsake configuration. Click below to confirm details on WhatsApp.
              </p>

              {/* Breakdown */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-left mb-8 space-y-2.5">
                <div className="flex justify-between font-sans-clean text-sm">
                  <span className="text-stone-500">Selected Pages</span>
                  <span className="font-semibold text-stone-800">{orderPlaced.pages} Pages</span>
                </div>
                <div className="flex justify-between font-sans-clean text-sm">
                  <span className="text-stone-500">Printing Type</span>
                  <span className="font-semibold text-stone-800">{orderPlaced.printingType}</span>
                </div>
                <div className="flex justify-between font-sans-clean text-sm">
                  <span className="text-stone-500">Total Price</span>
                  <span className="font-semibold text-stone-800">₹{orderPlaced.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-sans-clean text-sm text-green-600 font-bold border-t border-amber-200 pt-2">
                  <span>Advance Paid (50%)</span>
                  <span>₹{orderPlaced.advanceAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button asChild size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white">
                  <a
                    href={`https://wa.me/919871874041?text=Hi%20The%20Story%20Celler!%20I%20have%20just%20completed%20the%20creator%20configurator%20for%20an%20order.%20Order%20ID:%20${orderPlaced.orderId}.%20Name:%20${orderPlaced.personalDetails?.name}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💬 Confirm on WhatsApp
                  </a>
                </Button>
                <Button onClick={onClose} variant="secondary" size="lg" className="w-full">
                  Close Window
                </Button>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {/* STEP 1: Select Pages */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center max-w-lg mx-auto">
                    <h3 className="font-display text-xl font-bold text-stone-800 mb-2">How many pages do you need?</h3>
                    <p className="font-sans-clean text-sm text-stone-500">Select the magazine size. The price updates dynamically.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-4">
                    {PAGE_OPTIONS.map((opt) => {
                      const isSelected = selectedPages.pages === opt.pages;
                      return (
                        <div
                          key={opt.pages}
                          onClick={() => setSelectedPages(opt)}
                          className={`relative rounded-2xl p-6 border-2 transition-all cursor-pointer select-none flex flex-col justify-between ${
                            isSelected
                              ? "border-amber-500 bg-amber-50/50 shadow-md"
                              : "border-stone-100 bg-stone-50 hover:bg-amber-50/20 hover:border-amber-200"
                          }`}
                        >
                          {isSelected && (
                            <span className="absolute top-4 right-4 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              ✓
                            </span>
                          )}
                          <div>
                            <span className="font-display text-2xl font-bold text-stone-900 block mb-1">
                              {opt.pages} Pages
                            </span>
                            <span className="font-sans-clean text-xs text-stone-500 bg-stone-200/50 px-2.5 py-1 rounded-full font-semibold">
                              Requires {opt.photosRequired}
                            </span>
                          </div>
                          <div className="mt-8">
                            <span className="font-display text-3xl font-extrabold text-amber-600">
                              ₹{opt.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-stone-400 font-sans-clean block mt-1">Including design & print</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Printing Type */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center max-w-lg mx-auto">
                    <h3 className="font-display text-xl font-bold text-stone-800 mb-2">Select Printing Paper Quality</h3>
                    <p className="font-sans-clean text-sm text-stone-500">Choose custom paper textures and laminate coatings.</p>
                  </div>

                  <div className="space-y-4 max-w-xl mx-auto pt-4">
                    {PRINTING_OPTIONS.map((opt) => {
                      const isSelected = selectedPrinting.id === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setSelectedPrinting(opt)}
                          className={`relative flex items-center gap-4 rounded-xl p-5 border-2 transition-all cursor-pointer ${
                            isSelected
                              ? "border-amber-500 bg-amber-50/50 shadow-sm"
                              : "border-stone-100 bg-stone-50 hover:bg-amber-50/20 hover:border-amber-200"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? "border-amber-500 bg-amber-500" : "border-stone-300"
                          }`}>
                            {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-sans-clean font-bold text-stone-800">{opt.name}</h4>
                            <p className="font-sans-clean text-xs text-stone-400 mt-0.5">{opt.desc}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-sans-clean font-bold text-amber-600 text-sm">
                              {opt.price === 0 ? "Included" : `+ ₹${opt.price}`}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Personal Details */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 max-w-xl mx-auto"
                >
                  <div className="text-center">
                    <h3 className="font-display text-xl font-bold text-stone-800 mb-2">Personalize Details</h3>
                    <p className="font-sans-clean text-sm text-stone-500">Provide information to help our content team write stories.</p>
                  </div>

                  <div className="space-y-5 pt-4">
                    <div>
                      <label className="font-sans-clean text-sm font-semibold text-stone-700 mb-1.5 block">
                        Person Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Who is this keepsake for? (e.g. Priyanshu)"
                        value={personalDetails.name}
                        onChange={(e) =>
                          setPersonalDetails({ ...personalDetails, name: e.target.value })
                        }
                        className={`w-full px-4 py-3 rounded-xl border font-sans-clean text-sm outline-none transition-all ${
                          errors.name
                            ? "border-red-300 bg-red-50 focus:border-red-400"
                            : "border-stone-200 bg-stone-50 focus:border-amber-400 focus:bg-white"
                        }`}
                      />
                      {errors.name && <p className="font-sans-clean text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-sans-clean text-sm font-semibold text-stone-700 mb-1.5 block">
                          Age (Optional)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 25"
                          value={personalDetails.age}
                          onChange={(e) =>
                            setPersonalDetails({ ...personalDetails, age: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 font-sans-clean text-sm outline-none focus:border-amber-400 focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="font-sans-clean text-sm font-semibold text-stone-700 mb-1.5 block">
                          Relationship (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Partner, Father, Friend"
                          value={personalDetails.relationship}
                          onChange={(e) =>
                            setPersonalDetails({ ...personalDetails, relationship: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 font-sans-clean text-sm outline-none focus:border-amber-400 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-sans-clean text-sm font-semibold text-stone-700 mb-1.5 block">
                        About the Person (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Mention hobbies, favorite foods, quirky habits, or special memories..."
                        value={personalDetails.aboutPerson}
                        onChange={(e) =>
                          setPersonalDetails({ ...personalDetails, aboutPerson: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 font-sans-clean text-sm outline-none focus:border-amber-400 focus:bg-white transition-all resize-none"
                      />
                    </div>

                    <div>
                      <label className="font-sans-clean text-sm font-semibold text-stone-700 mb-1.5 block">
                        Special Message / Dedication (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Write a sweet message to print at the end of the book..."
                        value={personalDetails.specialMessage}
                        onChange={(e) =>
                          setPersonalDetails({ ...personalDetails, specialMessage: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 font-sans-clean text-sm outline-none focus:border-amber-400 focus:bg-white transition-all resize-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Upload Images */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center max-w-lg mx-auto">
                    <h3 className="font-display text-xl font-bold text-stone-800 mb-2">Upload Photo Gallery</h3>
                    <p className="font-sans-clean text-sm text-stone-500">
                      Recommended photos count for {selectedPages.pages} pages is:{" "}
                      <span className="font-bold text-amber-600">{selectedPages.photosRequired}</span>. Max size per file 35MB.
                    </p>
                  </div>

                  {/* Drag and drop Area */}
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      handlePhotoUpload(e, true);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-stone-300 hover:border-amber-500 bg-stone-50 hover:bg-amber-50/10 rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3"
                  >
                    <Upload size={32} className="text-stone-400" />
                    <div>
                      <p className="font-sans-clean text-sm font-bold text-stone-700">Drag and Drop Images or ZIP file</p>
                      <p className="font-sans-clean text-xs text-stone-400 mt-1">Accepts JPEG, PNG, WEBP, and ZIP files up to 35MB</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,.zip"
                      className="hidden"
                      onChange={(e) => handlePhotoUpload(e)}
                    />
                  </div>

                  {/* Upload Progress Bar */}
                  {uploadProgress !== null && (
                    <div className="max-w-md mx-auto bg-stone-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-amber-500 h-full transition-all" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  )}

                  {/* Uploaded Count Info */}
                  <div className="flex justify-between items-center bg-stone-50 px-4 py-3 rounded-xl max-w-md mx-auto text-sm font-sans-clean">
                    <span className="text-stone-500">Photos Uploaded:</span>
                    <span className="font-bold text-stone-800">
                      {uploadedPhotos.length} / {selectedPages.photosRequired}
                    </span>
                  </div>

                  {/* Photo Previews & Reordering */}
                  {uploadedPhotos.length > 0 && (
                    <div className="space-y-3 pt-4">
                      <h4 className="font-sans-clean text-sm font-semibold text-stone-700">Review & Reorder Images</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        {uploadedPhotos.map((photo, index) => (
                          <div
                            key={photo.id}
                            className="relative group bg-stone-50 rounded-xl overflow-hidden border border-stone-200 shadow-sm aspect-square"
                          >
                            <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />

                            {/* Control overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                              {/* Remove */}
                              <button
                                onClick={() => removeItem(index)}
                                className="self-end p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              >
                                <Trash2 size={12} />
                              </button>

                              {/* Ordering */}
                              <div className="flex justify-between gap-1 w-full">
                                <button
                                  onClick={() => moveItem(index, "up")}
                                  disabled={index === 0}
                                  className="p-1 bg-white/80 hover:bg-white text-stone-800 rounded disabled:opacity-40"
                                >
                                  <ArrowLeft size={10} className="-rotate-90" />
                                </button>
                                <span className="text-[10px] text-white font-bold bg-black/85 px-2 py-0.5 rounded">
                                  {index + 1}
                                </span>
                                <button
                                  onClick={() => moveItem(index, "down")}
                                  disabled={index === uploadedPhotos.length - 1}
                                  className="p-1 bg-white/80 hover:bg-white text-stone-800 rounded disabled:opacity-40"
                                >
                                  <ArrowLeft size={10} className="rotate-90" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 5: Front Cover Image */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 max-w-xl mx-auto"
                >
                  <div className="text-center">
                    <h3 className="font-display text-xl font-bold text-stone-800 mb-2">Upload Front Cover Hero Image</h3>
                    <p className="font-sans-clean text-sm text-stone-500">
                      Select the primary image that will be rendered on the magazine cover page.
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-6 pt-4">
                    {frontCoverPhoto ? (
                      <div className="relative w-64 h-80 rounded-2xl overflow-hidden border border-stone-200 shadow-lg group">
                        <img src={frontCoverPhoto.url} alt="Cover Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                          <button
                            onClick={() => setFrontCoverPhoto(null)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-sans-clean text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => coverInputRef.current?.click()}
                        className="w-64 h-80 border-2 border-dashed border-stone-300 hover:border-amber-500 bg-stone-50 hover:bg-amber-50/10 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors p-4"
                      >
                        <FileUp size={36} className="text-stone-400" />
                        <p className="font-sans-clean text-sm font-bold text-stone-700 text-center">Select Cover Image</p>
                        <p className="font-sans-clean text-xs text-stone-400 text-center">Will be placed on Front Cover Page</p>
                      </div>
                    )}
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCoverUpload}
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 6: Review & Order */}
              {currentStep === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 max-w-xl mx-auto"
                >
                  <div className="text-center">
                    <h3 className="font-display text-xl font-bold text-stone-800 mb-2">Review Your Keepsake Order</h3>
                    <p className="font-sans-clean text-sm text-stone-500">Double-check customization settings before completing checkout.</p>
                  </div>

                  <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50/50 space-y-4">
                    <div className="flex justify-between border-b border-stone-100 pb-3 text-sm font-sans-clean">
                      <span className="text-stone-500">Customized Keepsake:</span>
                      <span className="font-bold text-stone-800">{productName}</span>
                    </div>

                    <div className="flex justify-between border-b border-stone-100 pb-3 text-sm font-sans-clean">
                      <span className="text-stone-500">Selected Pages:</span>
                      <span className="font-bold text-stone-800">{selectedPages.pages} Pages</span>
                    </div>

                    <div className="flex justify-between border-b border-stone-100 pb-3 text-sm font-sans-clean">
                      <span className="text-stone-500">Printing Type:</span>
                      <span className="font-bold text-stone-800">{selectedPrinting.name}</span>
                    </div>

                    <div className="flex justify-between border-b border-stone-100 pb-3 text-sm font-sans-clean">
                      <span className="text-stone-500">Person Name:</span>
                      <span className="font-bold text-stone-800">{personalDetails.name}</span>
                    </div>

                    <div className="flex justify-between border-b border-stone-100 pb-3 text-sm font-sans-clean">
                      <span className="text-stone-500">Uploaded Photos Count:</span>
                      <span className="font-bold text-stone-800">{uploadedPhotos.length} files</span>
                    </div>

                    <div className="flex justify-between border-b border-stone-100 pb-3 text-sm font-sans-clean">
                      <span className="text-stone-500">Expected Delivery:</span>
                      <span className="font-bold text-green-700">{deliveryEstimate}</span>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2 pt-2 text-xs font-sans-clean text-stone-500">
                      <div className="flex justify-between">
                        <span>Base Pages Price:</span>
                        <span>₹{selectedPages.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lamination/Printing add-on:</span>
                        <span>₹{selectedPrinting.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Extra Pages Charge:</span>
                        <span>₹{extraPageCharge.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Totals */}
                    <div className="border-t border-stone-200 pt-4 space-y-2">
                      <div className="flex justify-between font-sans-clean font-bold text-base text-stone-900">
                        <span>Total Price:</span>
                        <span>₹{totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-sans-clean font-extrabold text-lg text-amber-600">
                        <span>Advance Payable (50%):</span>
                        <span>₹{advanceAmount.toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] text-stone-400 font-sans-clean italic">
                        * Remaining amount is payable after you approve our designers' drafts.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* BOTTOM NAV BAR */}
        {!orderPlaced && (
          <div className="p-6 md:p-8 border-t border-stone-100 flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentStep === 1 || loading}
              className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 text-sm font-bold rounded-xl disabled:opacity-40 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={16} /> Back
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white dark:text-stone-950 text-sm font-bold rounded-xl transition-all flex items-center gap-1"
              >
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmitOrder}
                disabled={loading}
                className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Pay ₹{advanceAmount.toLocaleString()} Advance
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
