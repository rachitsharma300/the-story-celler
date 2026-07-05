"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, Eye, Edit2, Download, Filter, FileText, Check, Loader2, RefreshCw, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";


interface Order {
  orderId: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  customerCity?: string;
  customerState?: string;
  customerPincode?: string;
  productSlug: string;
  productName: string;
  quantity: number;
  occasion: string;
  pages: number;
  printingType: string;
  personalDetails: {
    name: string;
    age?: number;
    relationship?: string;
    aboutPerson?: string;
    specialMessage?: string;
  };
  uploadedPhotos: string[];
  frontCoverPhoto?: string;
  totalAmount: number;
  advanceAmount: number;
  status: "Pending" | "Designing" | "Review" | "Printing" | "Shipped" | "Delivered";
  finalPdfUrl?: string;
  createdAt: string;
}

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Designing: "bg-blue-100 text-blue-700",
  Review: "bg-purple-100 text-purple-700",
  Printing: "bg-pink-100 text-pink-700",
  Shipped: "bg-orange-100 text-orange-700",
  Delivered: "bg-green-100 text-green-700",
};

const statusLabels = {
  Pending: "Pending",
  Designing: "Designing",
  Review: "Design Review",
  Printing: "Printing",
  Shipped: "Shipped",
  Delivered: "Delivered",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // States for updating an order in the details modal
  const [updatingStatus, setUpdatingStatus] = useState<string>("");
  const [pdfUrlInput, setPdfUrlInput] = useState<string>("");
  const [actionLoading, setActionLoading] = useState(false);
  const [zipping, setZipping] = useState(false);

  const downloadPhotosAsZip = async (order: Order) => {
    const urls = [...order.uploadedPhotos];
    if (order.frontCoverPhoto) {
      urls.push(order.frontCoverPhoto);
    }
    
    if (urls.length === 0) {
      toast.error("This order has no uploaded photos.");
      return;
    }
    
    setZipping(true);
    toast.loading("Downloading and zipping files...", { id: "zip-download" });
    
    try {
      const zip = new JSZip();
      
      const downloadPromises = urls.map(async (url, index) => {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          
          let ext = "jpg";
          const match = url.match(/\.([a-zA-Z0-9]+)(?:[\?#]|$)/);
          if (match) {
            ext = match[1];
          }
          
          const isCover = url === order.frontCoverPhoto;
          const fileName = isCover ? `front_cover.${ext}` : `photo_${index + 1}.${ext}`;
          
          zip.file(fileName, blob);
        } catch (err) {
          console.error(`Failed to fetch photo from url: ${url}`, err);
        }
      });
      
      await Promise.all(downloadPromises);
      
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `order_${order.orderId}_photos.zip`);
      toast.success("Photos zipped and downloaded successfully!", { id: "zip-download" });
    } catch (err) {
      console.error("Zipping failed:", err);
      toast.error("Failed to package photos into a ZIP file.", { id: "zip-download" });
    } finally {
      setZipping(false);
    }
  };

  // Fetch orders from backend API
  async function fetchOrders() {
    setLoading(true);
    try {
      const response = await api.get("/api/admin/orders");
      const data = response.data;
      
      const statusMap: Record<string, Order["status"]> = {
        PENDING: "Pending",
        DESIGNING: "Designing",
        REVIEW: "Review",
        PRINTING: "Printing",
        SHIPPED: "Shipped",
        DELIVERED: "Delivered",
      };

      const normalized = data.map((order: any) => ({
        ...order,
        status: statusMap[order.status] || order.status,
      }));

      setOrders(normalized);
    } catch (err: any) {
      console.error(err);
      toast.error("Error fetching live orders, displaying cached mock data.");
      // Fallback mock orders
      setOrders(getFallbackMockOrders());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  function getFallbackMockOrders(): Order[] {
    return [
      {
        orderId: "MV-2026-0001",
        customerName: "Rahul Sharma",
        customerEmail: "rahul@example.com",
        customerPhone: "+91 98718 74041",
        customerAddress: "Flat 402, Block A, Green Meadows Apartments",
        customerCity: "Gurugram",
        customerState: "Haryana",
        customerPincode: "122018",
        productSlug: "custom-magazine",
        productName: "Custom Magazine",
        quantity: 1,
        occasion: "Anniversary",
        pages: 12,
        printingType: "Water Resistant Lamination",
        personalDetails: {
          name: "Rahul & Priya",
          age: 5,
          relationship: "Spouse",
          aboutPerson: "Married for 5 years. Loves traveling, drinking chai and eating together.",
          specialMessage: "Happy 5th Anniversary to the love of my life!",
        },
        uploadedPhotos: [
          "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
          "https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_crop,g_face/sample.jpg",
        ],
        frontCoverPhoto: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        totalAmount: 1199,
        advanceAmount: 600,
        status: "Pending",
        createdAt: "2026-06-14T03:00:00.000Z",
      },
    ];
  }

  // Handle Order status & final PDF updates using Spring Boot PUT endpoints
  async function handleUpdateOrder() {
    if (!selectedOrder) return;
    setActionLoading(true);
    try {
      const statusMap: Record<string, Order["status"]> = {
        PENDING: "Pending",
        DESIGNING: "Designing",
        REVIEW: "Review",
        PRINTING: "Printing",
        SHIPPED: "Shipped",
        DELIVERED: "Delivered",
      };

      let updatedOrder = { ...selectedOrder };

      // Update status if it changed
      if (updatingStatus !== selectedOrder.status) {
        const res = await api.put(`/api/admin/orders/${selectedOrder.orderId}/status`, {
          status: updatingStatus.toUpperCase(),
        });
        updatedOrder = res.data;
      }

      // Update final PDF URL if it changed
      if (pdfUrlInput !== (selectedOrder.finalPdfUrl || "")) {
        const res = await api.put(`/api/admin/orders/${selectedOrder.orderId}/pdf`, {
          pdfUrl: pdfUrlInput,
        });
        updatedOrder = res.data;
      }

      // Normalize status back to Title Case
      updatedOrder.status = statusMap[updatedOrder.status] || updatedOrder.status;

      toast.success("Order updated successfully!");
      setSelectedOrder(updatedOrder);
      
      // Refresh local orders list
      setOrders((prev) =>
        prev.map((o) => (o.orderId === selectedOrder.orderId ? updatedOrder : o))
      );
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message || "Failed to update order details.");
    } finally {
      setActionLoading(false);
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.includes(searchTerm) ||
      (order.personalDetails?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.productName || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-stone-900 mb-2">Orders Management</h1>
          <p className="font-sans-clean text-stone-500">Manage and track custom configurator order files</p>
        </div>
        <Button onClick={fetchOrders} variant="outline" size="sm" className="flex items-center gap-1.5 bg-white">
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3.5 text-stone-400" size={18} />
          <input
            type="text"
            placeholder="Search by Order ID, Product name, or Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 bg-white font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 transition-all"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 rounded-lg border border-stone-200 bg-white font-sans-clean text-sm text-stone-800 outline-none focus:border-amber-400 transition-all"
        >
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Designing">Designing</option>
          <option value="Review">Design Review</option>
          <option value="Printing">Printing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
            <Loader2 size={32} className="text-amber-500 animate-spin" />
            <p className="text-stone-450 font-sans-clean text-sm">Fetching orders from Spring Boot...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 text-left font-sans-clean font-semibold text-stone-700 text-sm">Order ID</th>
                  <th className="px-6 py-4 text-left font-sans-clean font-semibold text-stone-700 text-sm">Customer</th>
                  <th className="px-6 py-4 text-left font-sans-clean font-semibold text-stone-700 text-sm">Keepsake Details</th>
                  <th className="px-6 py-4 text-left font-sans-clean font-semibold text-stone-700 text-sm">Total / Advance</th>
                  <th className="px-6 py-4 text-left font-sans-clean font-semibold text-stone-700 text-sm">Status</th>
                  <th className="px-6 py-4 text-center font-sans-clean font-semibold text-stone-700 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, i) => (
                  <tr key={order.orderId} className="border-b border-stone-200 hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-sans-clean font-bold text-stone-900">{order.orderId}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-sans-clean font-semibold text-stone-900">
                          {order.customerName || "Guest Customer"}
                        </p>
                        <p className="font-sans-clean text-xs text-stone-400">{order.customerEmail || "N/A"}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-sans-clean text-stone-600">
                        <p className="font-bold text-stone-800">{order.productName}</p>
                        <p className="text-xs text-stone-500">
                          {order.pages} Pages • {order.printingType}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-sans-clean font-bold text-stone-900">₹{order.totalAmount.toLocaleString()}</p>
                        <p className="font-sans-clean text-xs text-green-600 font-medium">
                          Paid: ₹{order.advanceAmount.toLocaleString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        onClick={() => {
                          setSelectedOrder(order);
                          setUpdatingStatus(order.status);
                          setPdfUrlInput(order.finalPdfUrl || "");
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-amber-600 hover:text-amber-700 font-bold"
                      >
                        <Eye size={16} className="mr-1" /> View Config
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="font-sans-clean text-stone-500">No custom orders found.</p>
          </div>
        )}
      </div>

      {/* DETAIL MODAL PANEL */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl h-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col m-4"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute right-6 top-6 p-2 bg-stone-100 hover:bg-stone-200 text-stone-500 rounded-full"
              >
                <X size={18} />
              </button>

              {/* Title Header */}
              <div className="p-6 md:p-8 border-b border-stone-100 bg-stone-50">
                <span className="text-xs text-amber-600 font-bold uppercase tracking-widest block mb-1">
                  Order Details Configuration
                </span>
                <h2 className="font-display text-2xl font-bold text-stone-900">
                  {selectedOrder.orderId} — {selectedOrder.productName}
                </h2>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 font-sans-clean text-sm text-stone-700">
                {/* Status and Action bar */}
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="font-bold text-stone-800 mb-1.5 block">Update Status</label>
                    <select
                      value={updatingStatus}
                      onChange={(e) => setUpdatingStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-xl bg-white outline-none focus:border-amber-400 text-stone-800"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Designing">Designing</option>
                      <option value="Review">Design Review</option>
                      <option value="Printing">Printing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-stone-800 mb-1.5 block">Upload Final Keepsake PDF Link</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="https://cloudinary.com/.../output.pdf"
                        value={pdfUrlInput}
                        onChange={(e) => setPdfUrlInput(e.target.value)}
                        className="flex-1 px-3 py-2 border border-stone-200 rounded-xl bg-white outline-none focus:border-amber-400 text-xs text-stone-800 placeholder-stone-300"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <Button
                      onClick={handleUpdateOrder}
                      disabled={actionLoading}
                      size="sm"
                      className="bg-amber-500 hover:bg-amber-600 text-white"
                    >
                      {actionLoading ? "Saving..." : "Save Status & PDF Link"}
                    </Button>
                  </div>
                </div>

                {/* Customer / Buyer & Shipping Details */}
                <div className="space-y-3 bg-stone-50 p-5 rounded-2xl border border-stone-250">
                  <h3 className="font-display text-sm font-bold text-stone-900 uppercase tracking-wider">
                    👤 Buyer & Shipping Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-stone-400 block text-xs font-semibold">Account Buyer Name:</span>
                      <span className="font-bold text-stone-800">{selectedOrder.customerName || "Guest Customer"}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-xs font-semibold">Contact Email:</span>
                      <span className="font-bold text-stone-800">{selectedOrder.customerEmail || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-xs font-semibold">Contact Phone:</span>
                      <span className="font-bold text-stone-800">{selectedOrder.customerPhone || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-xs font-semibold">Shipping Destination:</span>
                      <span className="font-bold text-stone-800 text-xs block leading-relaxed">
                        {selectedOrder.customerAddress || "N/A"}
                        {selectedOrder.customerCity && `, ${selectedOrder.customerCity}`}
                        {selectedOrder.customerState && `, ${selectedOrder.customerState}`}
                        {selectedOrder.customerPincode && ` - ${selectedOrder.customerPincode}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="space-y-3">
                  <h3 className="font-display text-base font-bold text-stone-900 border-b pb-2">Keepsake Story Target Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-stone-400 block text-xs">Gift Target Name:</span>
                      <span className="font-bold text-stone-800">{selectedOrder.personalDetails?.name}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-xs">Age:</span>
                      <span className="font-bold text-stone-800">{selectedOrder.personalDetails?.age || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-xs">Relationship:</span>
                      <span className="font-bold text-stone-800">{selectedOrder.personalDetails?.relationship || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-xs">Selected Occasion/Reason:</span>
                      <span className="font-bold text-amber-600">{selectedOrder.occasion || "N/A"}</span>
                    </div>
                  </div>

                  {selectedOrder.personalDetails?.aboutPerson && (
                    <div className="pt-2">
                      <span className="text-stone-400 block text-xs">About the Person:</span>
                      <p className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs text-stone-600 whitespace-pre-wrap leading-relaxed mt-1">
                        {selectedOrder.personalDetails.aboutPerson}
                      </p>
                    </div>
                  )}

                  {selectedOrder.personalDetails?.specialMessage && (
                    <div>
                      <span className="text-stone-400 block text-xs">Special Dedication Message:</span>
                      <p className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs text-stone-600 whitespace-pre-wrap leading-relaxed mt-1">
                        {selectedOrder.personalDetails.specialMessage}
                      </p>
                    </div>
                  )}
                </div>

                {/* Front Cover Image */}
                {selectedOrder.frontCoverPhoto && (
                  <div className="space-y-3">
                    <h3 className="font-display text-base font-bold text-stone-900 border-b pb-2">Front Cover Page Photo</h3>
                    <div className="relative w-44 h-56 rounded-xl overflow-hidden border border-stone-200 shadow-sm">
                      <img src={selectedOrder.frontCoverPhoto} alt="Cover Preview" className="w-full h-full object-cover" />
                      <a
                        href={selectedOrder.frontCoverPhoto}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-2 right-2 p-1.5 bg-stone-900/80 hover:bg-stone-950 text-white rounded-lg text-xs flex items-center gap-1 transition-colors"
                      >
                        <Download size={10} /> View Full
                      </a>
                    </div>
                  </div>
                )}

                {/* Uploaded Photo Gallery */}
                <div className="space-y-3">
                  <h3 className="font-display text-base font-bold text-stone-900 border-b pb-2 flex justify-between items-center">
                    <span>Uploaded Photo Gallery ({selectedOrder.uploadedPhotos.length} files)</span>
                    <Button
                      onClick={() => downloadPhotosAsZip(selectedOrder)}
                      disabled={zipping}
                      variant="outline"
                      size="sm"
                      className="text-xs bg-amber-500 hover:bg-amber-600 text-white border-0 font-bold px-4 py-1.5 rounded-xl h-auto"
                    >
                      {zipping ? (
                        <>
                          <Loader2 size={12} className="animate-spin mr-1" /> Zipping...
                        </>
                      ) : (
                        "📥 Download All as ZIP"
                      )}
                    </Button>
                  </h3>
                  {selectedOrder.uploadedPhotos.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {selectedOrder.uploadedPhotos.map((url, index) => (
                        <div
                          key={index}
                          className="relative aspect-square bg-stone-50 rounded-lg overflow-hidden border border-stone-200 shadow-sm group"
                        >
                          <img src={url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                          >
                            <Download size={16} />
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-stone-400 text-xs italic">No photos uploaded.</p>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 md:p-8 border-t border-stone-100 flex justify-end gap-3 bg-stone-50">
                <Button onClick={() => setSelectedOrder(null)} variant="secondary">
                  Close Window
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
