"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "The Story Celler",
    siteEmail: "team@storyceller.in",
    supportPhone: "+91 98718 74041",
    taxRate: 18,
    shippingCost: 0,
    advancePercentage: 50,
    maxRevisions: 4,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string | number) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold text-stone-900 mb-2">
          Settings
        </h1>
        <p className="font-sans-clean text-stone-500">
          Configure your The Story Celler platform
        </p>
      </motion.div>

      {/* General Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-white border border-stone-200 p-8"
      >
        <h2 className="font-display text-xl font-bold text-stone-900 mb-6">
          General Settings
        </h2>

        <div className="space-y-6">
          <div>
            <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleChange("siteName", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 outline-none focus:border-amber-400 focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                Support Email
              </label>
              <input
                type="email"
                value={settings.siteEmail}
                onChange={(e) => handleChange("siteEmail", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                Support Phone
              </label>
              <input
                type="tel"
                value={settings.supportPhone}
                onChange={(e) => handleChange("supportPhone", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Business Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl bg-white border border-stone-200 p-8"
      >
        <h2 className="font-display text-xl font-bold text-stone-900 mb-6">
          Business Settings
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                Tax Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={settings.taxRate}
                  onChange={(e) =>
                    handleChange("taxRate", parseFloat(e.target.value))
                  }
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 outline-none focus:border-amber-400 focus:bg-white transition-all"
                />
                <span className="absolute right-4 top-3.5 text-stone-500">%</span>
              </div>
            </div>

            <div>
              <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                Free Shipping Threshold (₹)
              </label>
              <input
                type="number"
                value={settings.shippingCost}
                onChange={(e) =>
                  handleChange("shippingCost", parseFloat(e.target.value))
                }
                className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                Advance Payment (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={settings.advancePercentage}
                  onChange={(e) =>
                    handleChange("advancePercentage", parseFloat(e.target.value))
                  }
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 outline-none focus:border-amber-400 focus:bg-white transition-all"
                />
                <span className="absolute right-4 top-3.5 text-stone-500">%</span>
              </div>
            </div>

            <div>
              <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                Max Revisions Allowed
              </label>
              <input
                type="number"
                value={settings.maxRevisions}
                onChange={(e) =>
                  handleChange("maxRevisions", parseFloat(e.target.value))
                }
                className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Email Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl bg-white border border-stone-200 p-8"
      >
        <h2 className="font-display text-xl font-bold text-stone-900 mb-6">
          Email Templates
        </h2>

        <div className="space-y-4">
          {[
            { label: "Order Confirmation", status: "Configured" },
            { label: "Shipped Notification", status: "Configured" },
            { label: "Delivery Confirmation", status: "Configured" },
            { label: "Review Request", status: "Not Configured" },
          ].map((template) => (
            <div
              key={template.label}
              className="flex items-center justify-between p-4 rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-all"
            >
              <p className="font-sans-clean font-semibold text-stone-900">
                {template.label}
              </p>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  template.status === "Configured"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {template.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-4"
      >
        <Button
          onClick={handleSave}
          size="lg"
          variant="default"
          className="gap-2"
        >
          <Save size={18} />
          Save Settings
        </Button>

        {saved && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-100 text-green-700 font-sans-clean font-semibold"
          >
            ✓ Settings saved successfully
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
