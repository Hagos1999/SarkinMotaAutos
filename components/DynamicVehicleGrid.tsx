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
    <div key={car.id} role="listitem" className="w-dyn-item h-full">
      <div className="main-shop-list-item home bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col mx-2">
        
        <div className="shop-links-wrapper relative bg-gray-100 overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <Link href={`/product/${car.slug}`} className="shop-link-block w-inline-block block w-full h-full">
            <img 
              loading="lazy" 
              src={car.main_image_url || car.images?.[0] || "/sarkinmota_logo_dark.svg"} 
              alt={car.title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </Link>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <Link href={`/product/${car.slug}`} className="shop-item-link text-xl font-bold text-gray-900 block mb-2 hover:text-[#1b3b36]">
              {car.title}
            </Link>
            <div className="shop-price-wrapper home-style flex flex-col gap-1">
              <div className="shop-item-price home text-[#1b3b36] font-bold text-lg">
                $ {Number(car.price).toLocaleString()} USD
              </div>
              {car.msrp && (
                <div className="shop-item-price home text-gray-500 text-sm line-through">
                  MSRP: ${Number(car.msrp).toLocaleString()}
                </div>
              )}
            </div>
          </div>

          {/* Specs */}
          <div className="flex gap-4 text-xs text-gray-600 mb-6 font-medium">
            {car.year && <div>Year: {car.year}</div>}
            {car.mileage && <div>{car.mileage.toLocaleString()} mi</div>}
          </div>

          <div className="add-to-cart mt-auto pt-4 border-t border-gray-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem({
                  id: car.slug,
                  title: car.title,
                  price: `$ ${Number(car.price).toLocaleString()} USD`,
                  image: car.main_image_url || car.images?.[0] || "https://cdn.prod.website-files.com/63f482d5d15815d700cb1c76/64132a98932dbe1acc55146c_Car%20dealershipw.svg",
                  quantity: 1
                });
              }}
              className="w-commerce-commerceaddtocartbutton primary-button outline-dark w-full py-3 rounded text-center text-sm font-semibold hover:bg-[#1b3b36] hover:text-white transition-colors"
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  ));

  if (asCarousel) {
    return <FeaturedCarousel slidesPerView={1}>{cards}</FeaturedCarousel>;
  }

  return <>{cards}</>;
}
