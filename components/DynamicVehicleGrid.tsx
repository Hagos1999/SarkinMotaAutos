"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

import FeaturedCarousel from "./FeaturedCarousel";

export default function DynamicVehicleGrid({ asCarousel = false, categoryId = null }: { asCarousel?: boolean, categoryId?: string | null }) {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchVehicles() {
      setLoading(true);
      let query = supabase.from('vehicles').select('*');
      
      if (categoryId && categoryId !== "all") {
        query = query.eq('category_id', categoryId);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
        
      if (!error && data) {
        setVehicles(data);
      } else {
        console.error("Error fetching vehicles:", error);
      }
      setLoading(false);
    }
    fetchVehicles();
  }, [supabase, categoryId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 w-full">
        <div className="animate-pulse flex space-x-4">
          <div className="h-6 w-6 bg-[#1b3b36] rounded-full"></div>
          <div className="h-6 w-6 bg-[#1b3b36] rounded-full"></div>
          <div className="h-6 w-6 bg-[#1b3b36] rounded-full"></div>
        </div>
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-xl w-full border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800">New Inventory Coming Soon</h3>
        <p className="text-gray-500 mt-2">We are currently updating our fleet. Please check back later!</p>
      </div>
    );
  }

  const cards = vehicles.map((car) => (
    <div
      key={car.id}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col w-full"
    >
      {/* Image */}
      <div className="relative bg-gray-100 overflow-hidden w-full" style={{ aspectRatio: "16/9" }}>
        <Link href={`/product/${car.slug}`} className="block w-full h-full">
          <img
            loading="lazy"
            src={car.main_image_url || car.images?.[0] || "/sarkinmota_logo_dark.svg"}
            alt={car.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow">
        <Link
          href={`/product/${car.slug}`}
          className="text-base font-bold text-gray-900 mb-1 hover:text-[#1b3b36] line-clamp-2"
        >
          {car.title}
        </Link>

        <div className="flex gap-3 text-xs text-gray-500 mb-3">
          {car.year && <span>{car.year}</span>}
          {car.mileage && <span>{car.mileage.toLocaleString()} mi</span>}
        </div>

        <div className="mt-auto">
          <div className="text-[#1b3b36] font-bold text-lg">
            ₦{Number(car.price).toLocaleString()}
          </div>
          {car.msrp && (
            <div className="text-gray-400 text-sm line-through">
              MSRP: ₦{Number(car.msrp).toLocaleString()}
            </div>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem({
                id: car.slug,
                title: car.title,
                price: `₦${Number(car.price).toLocaleString()}`,
                image: car.main_image_url || car.images?.[0] || "/sarkinmota_logo_dark.svg",
                quantity: 1,
              });
            }}
            className="w-full py-2.5 rounded-lg border-2 border-[#1b3b36] text-[#1b3b36] text-sm font-semibold hover:bg-[#1b3b36] hover:text-white transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  ));

  if (asCarousel) {
    return <FeaturedCarousel slidesPerView={1}>{cards}</FeaturedCarousel>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {cards}
    </div>
  );
}
