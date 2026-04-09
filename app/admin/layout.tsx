"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Car, Tags, LogOut, Settings } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans z-[100000] relative">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="h-full flex flex-col px-4 py-6">
          <div className="flex items-center space-x-2 text-xl font-bold text-[#d4af37]">
            <span>SarkinMota Admin</span>
          </div>

          <nav className="mt-8 flex-1 space-y-2">
            <Link
              href="/admin"
              className="flex items-center px-4 py-2 text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100"
            >
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/vehicles"
              className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <Car className="mr-3 h-5 w-5" />
              Vehicles
            </Link>
            <Link
              href="/admin/categories"
              className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <Tags className="mr-3 h-5 w-5" />
              Categories
            </Link>
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
        {children}
      </main>
    </div>
  );
}
