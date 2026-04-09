-- SarkinMota Autos Supabase Schema

-- 1. Create Categories Table
CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Vehicles Table
CREATE TABLE public.vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  price NUMERIC NOT NULL,
  msrp NUMERIC,
  year INTEGER,
  mileage TEXT,
  body_style TEXT,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  category_id UUID REFERENCES public.categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Set up Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- 4. Policies: Anyone can READ (SELECT) vehicles and categories
CREATE POLICY "Public profiles are viewable by everyone." 
  ON public.categories FOR SELECT USING (true);

CREATE POLICY "Public vehicles are viewable by everyone." 
  ON public.vehicles FOR SELECT USING (true);

-- 5. Policies: Only Authenticated Admins can Insert/Update/Delete
-- Note: Assuming you are the only user signed up in Supabase Auth.
CREATE POLICY "Enable insert for authenticated users only"
  ON public.categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only"
  ON public.categories FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete for authenticated users only"
  ON public.categories FOR DELETE TO authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users only"
  ON public.vehicles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only"
  ON public.vehicles FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete for authenticated users only"
  ON public.vehicles FOR DELETE TO authenticated USING (true);

-- ==========================================
-- PHASE 13 UPDATES
-- ==========================================

-- 1. Add model_url to Vehicles for 3D Models
ALTER TABLE public.vehicles ADD COLUMN IF NOT EXISTS model_url TEXT;

-- 2. Add is_sold status tracking
ALTER TABLE public.vehicles ADD COLUMN IF NOT EXISTS is_sold BOOLEAN DEFAULT false;

-- 2. Create Orders Table for Analytics
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  amount NUMERIC NOT NULL,
  customer_email TEXT,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. RLS for Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for authenticated users only"
  ON public.orders FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable select for authenticated users only"
  ON public.orders FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable update for authenticated users only"
  ON public.orders FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete for authenticated users only"
  ON public.orders FOR DELETE TO authenticated USING (true);
