"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Mail, Phone, ShieldCheck, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import toast from "react-hot-toast";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  city: string;
  state: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchUsers() {
    try {
      const response = await api.get("/api/admin/users");
      setUsers(response.data || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      toast.error("Could not retrieve user list");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: number, userName: string) => {
    const confirmed = window.confirm(`Are you sure you want to remove user "${userName}"? This action cannot be undone.`);
    if (!confirmed) return;

    toast.loading("Removing user account...", { id: "user-delete" });
    try {
      await api.delete(`/api/admin/users/${userId}`);
      toast.success("User account removed successfully", { id: "user-delete" });
      setUsers(users.filter((u) => u.id !== userId));
    } catch (err: any) {
      console.error("Failed to delete user:", err);
      const errMsg = err.response?.data?.error || "Could not delete user account.";
      toast.error(errMsg, { id: "user-delete" });
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toString().includes(searchTerm)
    );
  });

  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === "ADMIN").length,
    customers: users.filter((u) => u.role !== "ADMIN").length,
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-amber-500 mr-2" size={28} />
        <span className="font-sans-clean text-sm text-stone-500">Retrieving system accounts...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold text-stone-900 mb-2">
          Users Management
        </h1>
        <p className="font-sans-clean text-stone-500">
          View and manage registered user accounts. Administrators are protected from deletion.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { label: "Total Registered", value: stats.total, color: "bg-blue-50 text-blue-800" },
          { label: "Administrators", value: stats.admins, color: "bg-purple-50 text-purple-800" },
          { label: "Standard Customers", value: stats.customers, color: "bg-orange-50 text-orange-800" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl ${stat.color.split(" ")[0]} p-5 border border-stone-200`}
          >
            <p className="font-sans-clean text-xs text-stone-600 mb-1">
              {stat.label}
            </p>
            <p className="font-display text-2xl font-bold text-stone-900">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <Search className="absolute left-4 top-3.5 text-stone-400" size={18} />
        <input
          type="text"
          placeholder="Search by name, email, or user ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 bg-white font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 transition-all"
        />
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl bg-white border border-stone-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 text-left font-sans-clean font-semibold text-stone-700 text-sm">
                  User ID
                </th>
                <th className="px-6 py-4 text-left font-sans-clean font-semibold text-stone-700 text-sm">
                  Name
                </th>
                <th className="px-6 py-4 text-left font-sans-clean font-semibold text-stone-700 text-sm">
                  Contact Details
                </th>
                <th className="px-6 py-4 text-left font-sans-clean font-semibold text-stone-700 text-sm">
                  Location
                </th>
                <th className="px-6 py-4 text-center font-sans-clean font-semibold text-stone-700 text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-stone-200 hover:bg-stone-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-sans-clean font-semibold text-stone-900">
                      #{user.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-sans-clean font-semibold text-stone-900">
                      {user.name}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-sans-clean text-sm text-stone-600">
                        <Mail size={14} className="text-stone-400" />
                        {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-2 font-sans-clean text-sm text-stone-600">
                          <Phone size={14} className="text-stone-400" />
                          {user.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-sans-clean text-sm text-stone-600">
                      {user.city ? `${user.city}, ${user.state || ""}` : "Not Specified"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {user.role === "ADMIN" ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold rounded-full select-none">
                        <ShieldCheck size={14} className="text-purple-600" />
                        System Administrator
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleDeleteUser(user.id, user.name)}
                        variant="destructive"
                        size="sm"
                        className="gap-1.5 rounded-xl"
                      >
                        <Trash2 size={14} />
                        Remove User
                      </Button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="font-sans-clean text-stone-500">No matching user accounts found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
