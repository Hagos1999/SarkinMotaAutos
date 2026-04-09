"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";

export default function EditVehiclePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [bodyStyle, setBodyStyle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isSold, setIsSold] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function loadData() {
      const [{ data: vehicle }, { data: cats }] = await Promise.all([
        supabase.from("vehicles").select("*").eq("id", params.id).single(),
        supabase.from("categories").select("*").order("name"),
      ]);

      if (!vehicle) {
        router.push("/admin");
        return;
      }

      setTitle(vehicle.title || "");
      setPrice(vehicle.price?.toString() || "");
      setYear(vehicle.year?.toString() || "");
      setMileage(vehicle.mileage?.toString() || "");
      setBodyStyle(vehicle.body_style || "");
      setDescription(vehicle.description || "");
      setCategoryId(vehicle.category_id || "");
      setIsSold(vehicle.is_sold || false);
      setIsFeatured(vehicle.is_featured || false);
      if (cats) setCategories(cats);
      setIsLoading(false);
    }
    loadData();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const { error: updateError } = await supabase
      .from("vehicles")
      .update({
        title,
        price: parseFloat(price),
        year: parseInt(year),
        mileage: mileage.toString(),
        body_style: bodyStyle,
        description,
        category_id: categoryId || null,
        is_sold: isSold,
        is_featured: isFeatured,
      })
      .eq("id", params.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess(true);
      router.refresh();
      setTimeout(() => router.push("/admin"), 1200);
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#d4af37]" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Link
        href="/admin"
        className="text-gray-500 hover:text-gray-800 mb-6 flex items-center gap-2 w-fit transform transition-transform hover:-translate-x-1"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-6 border-b border-gray-100 bg-gray-50">
          <h1 className="text-2xl font-bold text-gray-900">Edit Vehicle</h1>
          <p className="text-sm text-gray-500 mt-1">Update the details for this listing.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200">
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}
          {success && (
            <div className="bg-emerald-50 text-emerald-700 p-4 rounded-lg text-sm border border-emerald-200 flex items-center gap-2">
              <Save className="w-4 h-4" /> Saved! Redirecting to dashboard…
            </div>
          )}

          {/* Core Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Title</label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
              <input
                required
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-[#d4af37] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-[#d4af37] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
              <input
                type="text"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-[#d4af37] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Body Style</label>
              <input
                type="text"
                value={bodyStyle}
                onChange={(e) => setBodyStyle(e.target.value)}
                placeholder="Sedan, SUV, Coupe…"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-[#d4af37] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-[#d4af37] outline-none"
              >
                <option value="">-- No Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-[#d4af37] outline-none resize-none"
            />
          </div>

          {/* Toggle Flags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <label className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
              <div>
                <div className="text-sm font-semibold text-gray-800">Mark as Sold</div>
                <div className="text-xs text-gray-400 mt-0.5">Hides this vehicle from storefront</div>
              </div>
              <div
                onClick={() => setIsSold(!isSold)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isSold ? "bg-red-500" : "bg-gray-200"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${isSold ? "translate-x-6" : "translate-x-1"}`} />
              </div>
            </label>
            <label className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
              <div>
                <div className="text-sm font-semibold text-gray-800">Featured</div>
                <div className="text-xs text-gray-400 mt-0.5">Shows this car on the Home carousel</div>
              </div>
              <div
                onClick={() => setIsFeatured(!isFeatured)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isFeatured ? "bg-[#d4af37]" : "bg-gray-200"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${isFeatured ? "translate-x-6" : "translate-x-1"}`} />
              </div>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end gap-3">
            <Link
              href="/admin"
              className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || success}
              className="bg-[#d4af37] hover:bg-[#b8860b] text-white px-8 py-2.5 rounded-lg font-bold transition-all disabled:opacity-70 flex items-center gap-2"
            >
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
              ) : success ? (
                <><Save className="w-4 h-4" /> Saved!</>
              ) : (
                <><Save className="w-4 h-4" /> Save Changes</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
