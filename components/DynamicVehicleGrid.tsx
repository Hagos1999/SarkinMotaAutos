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
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
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
          className="font-bold text-gray-900 text-[15px] leading-snug mb-2 hover:text-[#1b3b36] transition-colors line-clamp-2 block"
        >
          {car.title}
        </Link>

        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          {car.year && <span className="bg-gray-100 px-2 py-1 rounded-md">{car.year}</span>}
          {car.mileage && (
            <span className="bg-gray-100 px-2 py-1 rounded-md">
              {Number(car.mileage).toLocaleString()} mi
            </span>
          )}
        </div>

        <div className="mt-auto">
          <div className="text-[#1b3b36] font-extrabold text-xl">
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
            className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold bg-[#1b3b36] text-white hover:bg-[#132a26] transition-colors"
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
            className="px-3 py-2.5 rounded-xl border-2 border-[#1b3b36] text-[#1b3b36] text-sm font-semibold hover:bg-[#1b3b36] hover:text-white transition-all"
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
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="bg-gray-200" style={{ aspectRatio: "16/9" }} />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
        <div className="h-6 bg-gray-200 rounded w-1/3 mt-4" />
        <div className="h-10 bg-gray-100 rounded-xl mt-4" />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DynamicVehicleGrid({
  asCarousel = false,
  categoryId = null,
}: {
  asCarousel?: boolean;
  categoryId?: string | null;
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
      if (categoryId && categoryId !== "all") {
        query = query.eq("category_id", categoryId);
      }
      const { data, error } = await query.order("created_at", { ascending: false });
      if (!error && data) setVehicles(data);
      setLoading(false);
    }
    fetchVehicles();
  }, [supabase, categoryId]);

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
      <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800">New Inventory Coming Soon</h3>
        <p className="text-gray-500 mt-2">We are currently updating our fleet.</p>
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
