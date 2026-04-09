import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] pt-20 pb-12 overflow-hidden border-t border-[#1a1a1a] shadow-inner font-sans relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8 items-start">
          
          {/* Column 1: Contact (spans 3 cols on desktop) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h6 className="!text-white font-bold text-[18px] tracking-wider m-0 uppercase drop-shadow-md">Contact Us</h6>
            <div className="flex flex-col gap-5 mt-2">
              <a href="https://www.google.com/maps" className="flex items-start !text-[#e5e5e5] hover:!text-[#d4af37] transition-all duration-300 group no-underline">
                <MapPin className="w-[20px] h-[20px] !text-[#d4af37] mr-4 mt-0.5 flex-shrink-0 transition-colors" />
                <span className="text-[15px] leading-relaxed font-medium">2715 Ash Dr. San Jose, South Dakota 83475</span>
              </a>
              <a href="tel:(316)555-0116" className="flex items-center !text-[#e5e5e5] hover:!text-[#d4af37] transition-all duration-300 group no-underline">
                <Phone className="w-[20px] h-[20px] !text-[#d4af37] mr-4 flex-shrink-0 transition-colors" />
                <span className="text-[15px] font-medium">(316) 555-0116</span>
              </a>
            </div>
            
            {/* Social Icons natively spaced */}
            <div className="flex gap-5 mt-4">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="!text-white hover:!text-[#d4af37] transition-transform duration-300 hover:scale-110 p-2 rounded-full bg-[#1a1a1a] hover:bg-[#d4af37]/10 border border-transparent hover:border-[#d4af37]/30">
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="!text-white hover:!text-[#d4af37] transition-transform duration-300 hover:scale-110 p-2 rounded-full bg-[#1a1a1a] hover:bg-[#d4af37]/10 border border-transparent hover:border-[#d4af37]/30">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="!text-white hover:!text-[#d4af37] transition-transform duration-300 hover:scale-110 p-2 rounded-full bg-[#1a1a1a] hover:bg-[#d4af37]/10 border border-transparent hover:border-[#d4af37]/30">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              {/* TikTok Icon Added */}
              <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" className="!text-white hover:!text-[#d4af37] transition-transform duration-300 hover:scale-110 p-2 rounded-full bg-[#1a1a1a] hover:bg-[#d4af37]/10 border border-transparent hover:border-[#d4af37]/30">
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.97-1.561 4.795 4.795 0 0 1-1.034-3.125h-3.693v13.626a3.692 3.692 0 1 1-6.108-2.795 3.691 3.691 0 0 1 4.887-.14v-4.66a7.382 7.382 0 1 0 4.914 6.963V8.847c1.332.6 2.81 1.01 4.414 1.139v-3.3z"></path></svg>
              </a>
            </div>
          </div>
          
          {/* Column 2: Inventory (spans 2 cols on desktop) */}
          <div className="lg:col-span-2 flex flex-col gap-6 lg:ml-8">
            <h6 className="!text-white font-bold text-[18px] tracking-wider m-0 uppercase drop-shadow-md">Inventory</h6>
            <div className="flex flex-col gap-4 mt-2">
              <Link href="/shop" className="text-[15px] font-medium !text-[#e5e5e5] hover:!text-[#d4af37] transition-all duration-300 no-underline hover:pl-1">All Vehicles</Link>
              <Link href="/shop?category=sedan" className="text-[15px] font-medium !text-[#e5e5e5] hover:!text-[#d4af37] transition-all duration-300 no-underline hover:pl-1">Sedans</Link>
              <Link href="/shop?category=suv" className="text-[15px] font-medium !text-[#e5e5e5] hover:!text-[#d4af37] transition-all duration-300 no-underline hover:pl-1">SUVs</Link>
              <Link href="/shop?category=truck" className="text-[15px] font-medium !text-[#e5e5e5] hover:!text-[#d4af37] transition-all duration-300 no-underline hover:pl-1">Trucks</Link>
            </div>
          </div>
          
          {/* Column 3: Company (spans 2 cols on desktop) */}
          <div className="lg:col-span-2 flex flex-col gap-6 lg:ml-4">
            <h6 className="!text-white font-bold text-[18px] tracking-wider m-0 uppercase drop-shadow-md">Company</h6>
            <div className="flex flex-col gap-4 mt-2">
              <Link href="/about-us" className="text-[15px] font-medium !text-[#e5e5e5] hover:!text-[#d4af37] transition-all duration-300 no-underline hover:pl-1">About Us</Link>
              <Link href="/services" className="text-[15px] font-medium !text-[#e5e5e5] hover:!text-[#d4af37] transition-all duration-300 no-underline hover:pl-1">Our Services</Link>
              <Link href="/team" className="text-[15px] font-medium !text-[#e5e5e5] hover:!text-[#d4af37] transition-all duration-300 no-underline hover:pl-1">Our Team</Link>
              <Link href="/contact-us" className="text-[15px] font-medium !text-[#e5e5e5] hover:!text-[#d4af37] transition-all duration-300 no-underline hover:pl-1">Contact Us</Link>
            </div>
          </div>

          {/* Column 4: Big Logo (Aligned fully right, spans 5 cols to take massive empty space) */}
          <div className="lg:col-span-5 flex items-center justify-center mt-8 md:mt-0 pt-6 lg:pt-0 border-t border-[#1a1a1a] lg:border-t-0">
            <Link href="/" className="inline-block opacity-90 hover:opacity-100 transition-opacity duration-500 hover:scale-[1.02]">
              {/* Massive Logo Implementation per User Request - Scaled via fixed exact widths */}
              <img
                src="/SarkinMotaLogolight.webp"
                loading="lazy"
                alt="SarkinMota Autos Logo"
                className="w-[200px] sm:w-[220px] lg:w-[265px] xl:w-[285px] h-auto object-contain drop-shadow-[0_10px_30px_rgba(212,175,55,0.12)]"
              />
            </Link>
          </div>
          
        </div>
        
        {/* Bottom Bar: Copyright */}
        <div className="mt-20 pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="!text-[#a0a0a0] text-[14px] font-medium tracking-wide">
            © {new Date().getFullYear()} Sarkin Mota Autos. All Rights Reserved.
          </div>
          <div className="!text-[#666666] hover:!text-[#d4af37] focus:!text-[#d4af37] text-[13px] font-bold tracking-widest uppercase transition-colors duration-300 cursor-pointer">
            Developed by Premium Web Solutions
          </div>
        </div>
        
      </div>
    </footer>
  );
}
