import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import AdminVehicleList from "@/components/AdminVehicleList";
import AdminDashboardClient from "@/components/AdminDashboardClient";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Parallel fetches for maximum perf
  const [
    { count: vehicleCount },
    { data: vehicles },
    { data: orders },
    { count: soldCount },
  ] = await Promise.all([
    supabase.from("vehicles").select("*", { count: "exact", head: true }),
    supabase.from("vehicles").select("*").order("created_at", { ascending: false }),
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase.from("vehicles").select("*", { count: "exact", head: true }).eq("is_sold", true),
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Top Action Bar */}
      <div className="flex items-center justify-end gap-3">
        <Link
          href="/admin/categories"
          className="border border-[#d4af37] text-[#d4af37] px-4 py-2 rounded-lg font-medium hover:bg-[#d4af37] hover:text-black transition-all text-sm"
        >
          Manage Categories
        </Link>
        <Link
          href="/admin/vehicles/new"
          className="bg-[#d4af37]-black px-4 py-2 rounded-lg font-medium hover:bg-[#b8860b] flex items-center gap-2 text-sm transition-all shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          Add Vehicle
        </Link>
      </div>

      {/* Analytics Dashboard */}
      <AdminDashboardClient
        orders={orders || []}
        vehicles={vehicles || []}
        vehicleCount={vehicleCount || 0}
        soldCount={soldCount || 0}
        userEmail={user.email || "Admin"}
      />

      {/* Inventory Management Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Inventory Management</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {vehicleCount} vehicle{vehicleCount !== 1 ? "s" : ""} in database
          </p>
        </div>
        <div className="p-6">
          <AdminVehicleList initialVehicles={vehicles || []} />
        </div>
      </div>
    </div>
  );
}
