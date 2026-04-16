"use client";

import { useEffect, useState, useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Search, SlidersHorizontal, X, ChevronRight, RotateCcw } from "lucide-react";
import DynamicVehicleGrid from "./DynamicVehicleGrid";

export default function ShopInventoryRenderer() {
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<string>("");
  const [bodyStyle, setBodyStyle] = useState<string>("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from("categories").select("*").order("name");
      if (data) setCategories(data);
    }
    fetchCategories();
  }, [supabase]);

  const filterOptions = useMemo(() => ({
    categoryId: activeCategory,
    searchQuery,
    minPrice,
    maxPrice,
    year,
    bodyStyle,
  }), [activeCategory, searchQuery, minPrice, maxPrice, year, bodyStyle]);

  const clearAllFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setYear("");
    setBodyStyle("");
  };

  const hasActiveFilters = activeCategory !== "all" || searchQuery || minPrice || maxPrice || year || bodyStyle;

  return (
    <div className="section mt-12 mb-20 w-full" data-aos="fade-up" data-aos-duration="800">
      <div className="base-container w-container mx-auto px-4 max-w-7xl">
        
        {/* TOP SEARCH & TOOLS */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#d4af37] transition-colors" />
            <input
              type="text"
              placeholder="Search by model, feature, or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121416] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] transition-all"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar py-2">
             <button 
               onClick={() => setShowMobileFilters(!showMobileFilters)}
               className="lg:hidden flex items-center gap-2 bg-[#121416] border border-white/10 px-4 py-3 rounded-xl text-white text-sm font-semibold"
             >
               <SlidersHorizontal className="w-4 h-4" />
               Filters
             </button>
             
             {hasActiveFilters && (
               <button 
                 onClick={clearAllFilters}
                 className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors whitespace-nowrap px-2"
               >
                 <RotateCcw className="w-3.5 h-3.5" />
                 Reset All
               </button>
             )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* SIDEBAR FILTERS (Desktop) */}
          <aside className={`lg:w-64 space-y-8 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
            
            {/* Categories */}
            <div>
              <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-5 flex items-center gap-2">
                Categories <ChevronRight className="w-3 h-3 text-[#d4af37]" />
              </h4>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === "all" ? "bg-[#d4af37] text-black" : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  All Vehicles
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === cat.id ? "bg-[#d4af37] text-black" : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-5 flex items-center gap-2">
                Price Range <ChevronRight className="w-3 h-3 text-[#d4af37]" />
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice || ""}
                  onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                  className="bg-[#121416] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#d4af37] outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice || ""}
                  onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                  className="bg-[#121416] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#d4af37] outline-none"
                />
              </div>
            </div>

            {/* Attributes */}
            <div className="space-y-6">
               <div>
                  <label className="text-white text-[11px] uppercase tracking-wider font-bold block mb-2 opacity-50">Launch Year</label>
                  <select 
                    value={year} 
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-[#121416] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-[#d4af37] outline-none cursor-pointer"
                  >
                    <option value="">Any Year</option>
                    {[2025, 2024, 2023, 2022, 2021].map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
               </div>

               <div>
                  <label className="text-white text-[11px] uppercase tracking-wider font-bold block mb-2 opacity-50">Body Style</label>
                  <select 
                    value={bodyStyle} 
                    onChange={(e) => setBodyStyle(e.target.value)}
                    className="w-full bg-[#121416] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-[#d4af37] outline-none cursor-pointer"
                  >
                    <option value="">Any Style</option>
                    {["Sedan", "SUV", "Coupe", "Luxury", "Convertible", "Truck"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
               </div>
            </div>

          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1">
            
            {/* Active Chips Bar */}
            <div className="flex flex-wrap gap-2 mb-6 min-h-[32px]">
               {searchQuery && (
                 <span className="bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
                   Search: {searchQuery}
                   <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                 </span>
               )}
               {year && (
                 <span className="bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
                   Year: {year}
                   <X className="w-3 h-3 cursor-pointer" onClick={() => setYear("")} />
                 </span>
               )}
               {bodyStyle && (
                 <span className="bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
                   Style: {bodyStyle}
                   <X className="w-3 h-3 cursor-pointer" onClick={() => setBodyStyle("")} />
                 </span>
               )}
            </div>

            <div className="shop-collection-list-wrapper w-dyn-list">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <DynamicVehicleGrid options={filterOptions} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
