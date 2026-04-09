import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] pt-16 pb-12 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start">
          
          {/* Column 1: Contact */}
          <div className="flex flex-col gap-6">
            <h6 className="text-white font-semibold text-[17px] tracking-wide m-0">Contact Us</h6>
            <div className="flex flex-col gap-4">
              <a href="https://www.google.com/maps" className="flex items-start text-gray-300 hover:text-[#d4af37] transition-all duration-300 group no-underline">
                <MapPin className="w-[18px] h-[18px] text-white group-hover:text-[#d4af37] mr-3 mt-1 flex-shrink-0 transition-colors" />
                <span className="text-[15px] leading-relaxed">2715 Ash Dr. San Jose, South Dakota 83475</span>
              </a>
              <a href="tel:(316)555-0116" className="flex items-center text-gray-300 hover:text-[#d4af37] transition-all duration-300 group no-underline">
                <Phone className="w-[18px] h-[18px] text-white group-hover:text-[#d4af37] mr-3 flex-shrink-0 transition-colors" />
                <span className="text-[15px]">(316) 555-0116</span>
              </a>
            </div>
            {/* Social Icons */}
            <div className="flex gap-4 mt-2">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="text-white hover:text-[#d4af37] transition-all duration-300 hover:-translate-y-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="text-white hover:text-[#d4af37] transition-all duration-300 hover:-translate-y-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="text-white hover:text-[#d4af37] transition-all duration-300 hover:-translate-y-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" className="text-white hover:text-[#d4af37] transition-all duration-300 hover:-translate-y-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.97-1.561 4.795 4.795 0 0 1-1.034-3.125h-3.693v13.626a3.692 3.692 0 1 1-6.108-2.795 3.691 3.691 0 0 1 4.887-.14v-4.66a7.382 7.382 0 1 0 4.914 6.963V8.847c1.332.6 2.81 1.01 4.414 1.139v-3.3z"></path></svg>
              </a>
            </div>
          </div>
          
          {/* Column 2: Inventory */}
          <div className="flex flex-col gap-6">
            <h6 className="text-white font-semibold text-[17px] tracking-wide m-0">Inventory</h6>
            <div className="flex flex-col gap-3">
              <Link href="/shop" className="text-[15px] text-gray-300 hover:text-[#d4af37] transition-colors duration-300 no-underline">All Vehicles</Link>
              <Link href="/shop?category=sedan" className="text-[15px] text-gray-300 hover:text-[#d4af37] transition-colors duration-300 no-underline">Sedans</Link>
              <Link href="/shop?category=suv" className="text-[15px] text-gray-300 hover:text-[#d4af37] transition-colors duration-300 no-underline">SUVs</Link>
              <Link href="/shop?category=truck" className="text-[15px] text-gray-300 hover:text-[#d4af37] transition-colors duration-300 no-underline">Trucks</Link>
            </div>
          </div>
          
          {/* Column 3: Company */}
          <div className="flex flex-col gap-6">
            <h6 className="text-white font-semibold text-[17px] tracking-wide m-0">Company</h6>
            <div className="flex flex-col gap-3">
              <Link href="/about-us" className="text-[15px] text-gray-300 hover:text-[#d4af37] transition-colors duration-300 no-underline">About Us</Link>
              <Link href="/services" className="text-[15px] text-gray-300 hover:text-[#d4af37] transition-colors duration-300 no-underline">Our Services</Link>
              <Link href="/team" className="text-[15px] text-gray-300 hover:text-[#d4af37] transition-colors duration-300 no-underline">Our Team</Link>
              <Link href="/contact-us" className="text-[15px] text-gray-300 hover:text-[#d4af37] transition-colors duration-300 no-underline">Contact Us</Link>
            </div>
          </div>

          {/* Column 4: Big Logo (Aligned right on desktop, left on mobile) */}
          <div className="flex items-center justify-start lg:justify-end mt-4 lg:mt-0">
            <Link href="/" className="block opacity-90 hover:opacity-100 transition-opacity duration-300">
              <img
                src="/SarkinMotaLogolight.webp"
                loading="lazy"
                alt="SarkinMota Autos Logo"
                className="w-full max-w-[200px] md:max-w-[240px] lg:max-w-[300px] object-contain drop-shadow-[0_4px_24px_rgba(212,175,55,0.08)]"
              />
            </Link>
          </div>
          
        </div>
        
        {/* Bottom Bar: Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[14px]">
          <div className="text-gray-400">
            © {new Date().getFullYear()} Sarkin Mota Autos. All Rights Reserved.
          </div>
          <div className="text-gray-500 hover:text-[#d4af37] transition-colors duration-300 cursor-pointer">
            Developed by Premium Web Solutions
          </div>
        </div>
        
      </div>
    </footer>
  );
}
