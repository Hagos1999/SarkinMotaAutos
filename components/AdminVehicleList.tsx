"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useState } from "react";
import { Trash2, Pencil, CheckCircle, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Vehicle {
  id: string;
  title: string;
  slug: string;
  price: number;
  year: number;
  mileage: number;
  is_sold?: boolean;
  body_style?: string;
}

export default function AdminVehicleList({ initialVehicles }: { initialVehicles: Vehicle[] }) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

    const { error } = await supabase.from("vehicles").delete().eq("id", id);
    if (error) {
      alert("Failed to delete: " + error.message);
    } else {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
      router.refresh();
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const is_sold = newStatus === "sold";

    const { error } = await supabase
      .from("vehicles")
      .update({ is_sold })
      .eq("id", id);

    if (error) {
      alert("Failed to update status: " + error.message);
    } else {
      setVehicles((prev) =>
        prev.map((v) => (v.id === id ? { ...v, is_sold } : v))
      );
      router.refresh(); // Refresh dashboard stat cards
    }
    setUpdatingId(null);
  };

  if (vehicles.length === 0) {
    return (
      <div className="p-10 text-center text-gray-400">
        <Circle className="w-12 h-12 mx-auto mb-3 opacity-25" />
        <p className="font-medium text-gray-500">No vehicles in the database yet.</p>
        <p className="text-sm mt-1">Click &ldquo;Add Vehicle&rdquo; to get started!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
            <th className="text-left px-6 py-3">Vehicle</th>
            <th className="text-left px-6 py-3">Details</th>
            <th className="text-left px-6 py-3">Price</th>
            <th className="text-left px-6 py-3">Status</th>
            <th className="text-right px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {vehicles.map((vehicle) => {
            const isSold = vehicle.is_sold ?? false;
            return (
              <tr
                key={vehicle.id}
                className={`transition-colors hover:bg-gray-50/70 ${isSold ? "opacity-60" : ""}`}
              >
                {/* Vehicle Name */}
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{vehicle.title}</div>
                  {vehicle.body_style && (
                    <div className="text-xs text-gray-400 mt-0.5">{vehicle.body_style}</div>
                  )}
                </td>

                {/* Details */}
                <td className="px-6 py-4 text-gray-500">
                  {vehicle.year && <span>{vehicle.year}</span>}
                  {vehicle.mileage ? <span> · {Number(vehicle.mileage).toLocaleString()} mi</span> : null}
                </td>

                {/* Price */}
                <td className="px-6 py-4 font-bold text-gray-900">
                  ₦{Number(vehicle.price).toLocaleString()}
                </td>

                {/* Status Dropdown */}
                <td className="px-6 py-4">
                  <div className="relative inline-block">
                    <select
                      value={isSold ? "sold" : "available"}
                      disabled={updatingId === vehicle.id}
                      onChange={(e) => handleStatusChange(vehicle.id, e.target.value)}
                      className={`appearance-none text-xs font-semibold px-3 py-1.5 pr-7 rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all ${
                        isSold
                          ? "bg-red-50 text-red-600 border-red-200 focus:ring-red-300"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-emerald-300"
                      } ${updatingId === vehicle.id ? "opacity-50 cursor-wait" : ""}`}
                    >
                      <option value="available">🟢 Available</option>
                      <option value="sold">🔴 Sold</option>
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                      <svg className="w-3 h-3 text-current opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {updatingId === vehicle.id && (
                    <span className="ml-2 text-xs text-gray-400 animate-pulse">Saving…</span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {/* Edit Button */}
                    <Link
                      href={`/admin/vehicles/${vehicle.id}/edit`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1b3b36] bg-[#1b3b36]/10 hover:bg-[#1b3b36] hover:text-white transition-all px-3 py-1.5 rounded-lg"
                      title="Edit vehicle"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(vehicle.id, vehicle.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-500 hover:text-white transition-all px-3 py-1.5 rounded-lg"
                      title="Delete vehicle"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
