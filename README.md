# SarkinMota Autos 🚗

Premium vehicle dealership storefront built with Next.js 16 and Supabase.

## Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Database & Auth**: Supabase (PostgreSQL + Row Level Security)
- **Storage**: Supabase Storage (vehicle images & 3D models)
- **Styling**: Tailwind CSS + Webflow template CSS
- **Charts**: Recharts
- **3D Viewer**: Google `<model-viewer>` Web Component

## Features
- 🏪 Dynamic storefront with real-time vehicle inventory
- 🔍 Category-based filtering on the shop page
- 🌐 Full product detail pages with 3D model viewer
- 🔐 Admin dashboard with Supabase Auth protection
- 📦 CRUD inventory management (add, edit, delete vehicles)
- 📊 Analytics dashboard with revenue charts and sold vehicle tracking
- 📁 Supabase Storage integration for image and `.glb` 3D model uploads

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/sarkinmota-autos.git
cd sarkinmota-autos
npm install
```

### 2. Set up environment variables
Create a `.env.local` file in the root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set up the Supabase database
Run the contents of `supabase_schema.sql` in your Supabase SQL Editor.

### 4. Create Storage Buckets
In Supabase Storage, create two **public** buckets:
- `car_images` — for vehicle photos
- `car_models` — for `.glb` / `.gltf` 3D model files

### 5. Run locally
```bash
npm run dev
```

## Deployment (Vercel)
1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add environment variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy ✅

## Admin Access
Navigate to `/login` to sign in. Admin credentials are managed through Supabase Auth.
