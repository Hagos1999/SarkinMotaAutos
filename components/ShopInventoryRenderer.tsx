"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import DynamicVehicleGrid from "./DynamicVehicleGrid";

export default function ShopInventoryRenderer() {
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from("categories").select("*").order("name");
      if (data) {
        setCategories(data);
      }
    }
    fetchCategories();
  }, [supabase]);

  return (
    <div className="section mt-12 mb-20 w-full" data-aos="fade-up" data-aos-duration="800">
      <div className="base-container w-container mx-auto px-4 max-w-7xl">
        <div className="shop-tabs w-tabs">
          {/* Scrollable Tab Menu */}
          <div className="shop-tabs-menu w-tab-menu flex border-b border-gray-200 overflow-x-auto no-scrollbar mb-8">
            <button
              onClick={() => setActiveCategory("all")}
              className={`sessions-tab-link w-inline-block w-tab-link pb-4 px-6 font-bold text-[15px] whitespace-nowrap transition-colors border-b-2 ${
                activeCategory === "all" ? "border-[#1b3b36] text-[#1b3b36]" : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`sessions-tab-link w-inline-block w-tab-link pb-4 px-6 font-bold text-[15px] whitespace-nowrap transition-colors border-b-2 ${
                  activeCategory === cat.id ? "border-[#1b3b36] text-[#1b3b36]" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          
          {/* Active Filtering Pane */}
          <div className="shop-category-tabs-content w-tab-content">
            <div className="shop-category-tabs w-tab-pane w--tab-active">
              <div className="shop-collection-list-wrapper w-dyn-list">
                <div role="list" className="shop-collection-list grid-four w-dyn-items gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <DynamicVehicleGrid categoryId={activeCategory} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
