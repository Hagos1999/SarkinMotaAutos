"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AddVehiclePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [bodyStyle, setBodyStyle] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let main_image_url = "";
      let model_url = "";

      // 1. Upload Image to Supabase Storage
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `vehicles/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("car_images")
          .upload(filePath, imageFile);

        if (uploadError) {
          throw new Error("Failed to upload image. Make sure you created the 'car_images' public bucket in Supabase! Details: " + uploadError.message);
        }

        const { data: { publicUrl } } = supabase.storage
          .from("car_images")
          .getPublicUrl(filePath);

        main_image_url = publicUrl;
      }

      // 2. Upload 3D Model file to Supabase Storage
      if (modelFile) {
        const modelExt = modelFile.name.split(".").pop();
        const modelName = `${Date.now()}.${modelExt}`;
        const modelPath = `models/${modelName}`;

        const { error: modelUploadError } = await supabase.storage
          .from("car_models")
          .upload(modelPath, modelFile);

        if (modelUploadError) {
          throw new Error("Failed to upload 3D model. Create the 'car_models' public bucket in Supabase. Details: " + modelUploadError.message);
        }

        const { data: { publicUrl: modelPublicUrl } } = supabase.storage
          .from("car_models")
          .getPublicUrl(modelPath);

        model_url = modelPublicUrl;
      }

      // 2. Generate required slug
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // 3. Insert into Vehicles Table
      const { error: insertError } = await supabase.from("vehicles").insert([{
        title,
        slug: generatedSlug,
        price: parseFloat(price),
        year: parseInt(year),
        mileage: mileage.toString(),
        body_style: bodyStyle,
        category_id: categoryId || null,
        description: description + (features ? `\n\nFeatures: ${features}` : ''),
        images: [main_image_url],
        model_url: model_url || null,
        is_featured: false
      }]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      // Redirect back to admin dashboard
      router.push("/admin");
      router.refresh();

    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Link href="/admin" className="text-gray-500 hover:text-gray-800 mb-6 flex items-center gap-2 w-fit transform transition-transform hover:-translate-x-1">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-6 border-b border-gray-200 bg-gray-50">
          <h1 className="text-2xl font-bold text-gray-900">Add New Vehicle</h1>
          <p className="text-sm text-gray-500 mt-1">Upload a new car to your storefront and database.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-200">
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}

          {/* Core Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Title (Ex: Ampera Helix GT)</label>
              <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-[#1b3b36]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
              <input required type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-[#1b3b36]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input required type="number" value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-4 py-2 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-[#1b3b36]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
              <input required type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} className="w-full px-4 py-2 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-[#1b3b36]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Body Style (Ex: Sedan, Coupe)</label>
              <input required type="text" value={bodyStyle} onChange={(e) => setBodyStyle(e.target.value)} className="w-full px-4 py-2 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-[#1b3b36]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Features (Comma separated)</label>
              <input type="text" placeholder="Leather, Sunroof, V6" value={features} onChange={(e) => setFeatures(e.target.value)} className="w-full px-4 py-2 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-[#1b3b36]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full px-4 py-2 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-[#1b3b36]">
                <option value="">-- No Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marketing Description</label>
            <textarea required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-[#1b3b36]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Image <span className="text-red-500">*</span></label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <label className="relative cursor-pointer">
                  <span className="text-sm font-medium text-[#1b3b36] hover:text-[#132a26]">Click to upload photo</span>
                  <input required type="file" className="sr-only" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  {imageFile ? <span className="text-green-600 font-medium">✓ {imageFile.name}</span> : "PNG, JPG up to 10MB"}
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">3D Model <span className="text-gray-400 text-xs">(Optional — .glb or .gltf)</span></label>
              <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/40 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-indigo-50 transition-colors cursor-pointer">
                <svg className="w-8 h-8 text-indigo-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>
                <label className="relative cursor-pointer">
                  <span className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Click to upload 3D model</span>
                  <input type="file" className="sr-only" accept=".glb,.gltf" onChange={(e) => setModelFile(e.target.files?.[0] || null)} />
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  {modelFile ? <span className="text-green-600 font-medium">✓ {modelFile.name}</span> : ".glb / .gltf supported"}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#1b3b36] hover:bg-[#132a26] text-white px-8 py-3 rounded-md font-bold transition-all disabled:opacity-70 flex items-center justify-center gap-2 min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Publish Vehicle"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
