"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import FeaturedCarousel from "./FeaturedCarousel";

interface VehicleCard {
  id: string;
  slug: string;
  title: string;
  price: number;
  msrp?: number;
  year?: number;
  mileage?: string | number;
  images?: string[];
  main_image_url?: string;
  is_sold?: boolean;
}

function VehicleCardUI({ car, addItem }: { car: VehicleCard; addItem: (item: any) => void }) {
  const image = car.main_image_url || car.images?.[0] || "/SarkinMotaLogolight.webp";

  return (
    <div className="bg-[#121416] rounded-2xl overflow-hidden shadow-sm border border-white/10 hover:shadow-[0_0_30px_rgba(198,146,71,0.1)] transition-all duration-300 flex flex-col h-full group">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: "16/9" }}>
        {car.is_sold && (
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              zIndex: 10,
              background: "#ef4444",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: "20px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Sold
          </div>
        )}
        <Link href={`/product/${car.slug}`} className="block w-full h-full">
          <img
            loading="lazy"
            src={image}
            alt={car.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow">
        <Link
          href={`/product/${car.slug}`}
          className="font-bold text-white text-[15px] leading-snug mb-2 hover:text-[#d4af37] transition-colors line-clamp-2 block"
        >
          {car.title}
        </Link>

        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          {car.year && <span className="bg-white/5 px-2 py-1 rounded-md">{car.year}</span>}
          {car.mileage && (
            <span className="bg-white/5 px-2 py-1 rounded-md">
              {Number(car.mileage).toLocaleString()} mi
            </span>
          )}
        </div>

        <div className="mt-auto">
          <div className="text-[#d4af37] font-extrabold text-xl">
            ₦{Number(car.price).toLocaleString()}
          </div>
          {car.msrp && (
            <div className="text-gray-400 text-xs line-through mt-0.5">
              MSRP ₦{Number(car.msrp).toLocaleString()}
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            href={`/product/${car.slug}`}
            className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-sm"
            style={{ backgroundColor: "#d4af37", color: "#000 !important" }}
          >
            View Details
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem({
                id: car.slug,
                title: car.title,
                price: `₦${Number(car.price).toLocaleString()}`,
                image,
                quantity: 1,
              });
            }}
            className="px-3 py-2.5 rounded-xl border-2 border-[#d4af37] text-[#d4af37] text-sm font-semibold hover:bg-[#d4af37] hover:text-black transition-all"
            title="Add to cart"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="bg-[#121416] rounded-2xl overflow-hidden border border-white/10 animate-pulse">
      <div className="bg-white/5" style={{ aspectRatio: "16/9" }} />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/5 rounded w-1/2" />
        <div className="h-6 bg-white/10 rounded w-1/3 mt-4" />
        <div className="h-10 bg-white/5 rounded-xl mt-4" />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DynamicVehicleGrid({
  asCarousel = false,
  options = {},
}: {
  asCarousel?: boolean;
  options?: {
    categoryId?: string | null;
    searchQuery?: string;
    minPrice?: number;
    maxPrice?: number;
    year?: string;
    bodyStyle?: string;
  };
}) {
  const [vehicles, setVehicles] = useState<VehicleCard[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchVehicles() {
      setLoading(true);
      let query = supabase.from("vehicles").select("*");

      // Apply Category Filter
      if (options.categoryId && options.categoryId !== "all") {
        query = query.eq("category_id", options.categoryId);
      }

      // Apply Text Search (Title, Description, or Body Style)
      if (options.searchQuery) {
        query = query.or(`title.ilike.%${options.searchQuery}%,description.ilike.%${options.searchQuery}%,body_style.ilike.%${options.searchQuery}%`);
      }

      // Apply Price Range
      if (options.minPrice !== undefined) {
        query = query.gte("price", options.minPrice);
      }
      if (options.maxPrice !== undefined) {
        query = query.lte("price", options.maxPrice);
      }

      // Apply Year
      if (options.year) {
        query = query.eq("year", parseInt(options.year));
      }

      // Apply Body Style
      if (options.bodyStyle) {
        query = query.eq("body_style", options.bodyStyle);
      }

      const { data, error } = await query.order("created_at", { ascending: false });
      if (!error && data) setVehicles(data);
      setLoading(false);
    }
    fetchVehicles();
  }, [supabase, options.categoryId, options.searchQuery, options.minPrice, options.maxPrice, options.year, options.bodyStyle]);

  // ── Carousel mode ──────────────────────────────────────────────────────────
  if (asCarousel) {
    if (loading) {
      return (
        <div className="flex gap-4 overflow-hidden px-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-[0_0_85%] sm:flex-[0_0_46%] lg:flex-[0_0_30%]">
              <CardSkeleton />
            </div>
          ))}
        </div>
      );
    }
    if (vehicles.length === 0) return null;

    const carouselCards = vehicles.map((car) => (
      <div
        key={car.id}
        // Each slide: peek at next card on mobile (85%), 2-up on tablet, 3-up on desktop
        className="flex-[0_0_85%] sm:flex-[0_0_46%] lg:flex-[0_0_30%] flex-shrink-0 px-2"
      >
        <VehicleCardUI car={car} addItem={addItem} />
      </div>
    ));

    return <FeaturedCarousel>{carouselCards}</FeaturedCarousel>;
  }

  // ── Grid mode (shop page) ──────────────────────────────────────────────────
  if (loading) {
    return (
      <>
        {[1, 2, 3, 4].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="col-span-full text-center py-20 bg-[#121416] rounded-2xl border border-white/10">
        <h3 className="text-xl font-bold text-white">New Inventory Coming Soon</h3>
        <p className="text-gray-400 mt-2">We are currently updating our fleet.</p>
      </div>
    );
  }

  // Grid mode returns individual cards — the parent (ShopInventoryRenderer) owns the grid wrapper
  return (
    <>
      {vehicles.map((car) => (
        <VehicleCardUI key={car.id} car={car} addItem={addItem} />
      ))}
    </>
  );
}
