import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Contact */}
          <div>
            <h6 className="text-[#d4af37] font-bold text-lg mb-6 uppercase tracking-wider">Contact Us</h6>
            <div className="flex flex-col gap-4">
              <a href="https://www.google.com/maps" className="flex items-start text-gray-400 hover:text-white transition-colors group">
                <MapPin className="w-5 h-5 text-[#d4af37] mr-3 flex-shrink-0 group-hover:text-white transition-colors mt-0.5" />
                <span className="text-sm leading-relaxed">2715 Ash Dr. San Jose, South Dakota 83475</span>
              </a>
              <a href="tel:(316)555-0116" className="flex items-center text-gray-400 hover:text-white transition-colors group">
                <Phone className="w-5 h-5 text-[#d4af37] mr-3 flex-shrink-0 group-hover:text-white transition-colors" />
                <span className="text-sm">(316) 555-0116</span>
              </a>
            </div>
            <div className="flex gap-4 mt-8">
              <a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>
          
          {/* Column 2: Inventory */}
          <div>
            <h6 className="text-[#d4af37] font-bold text-lg mb-6 uppercase tracking-wider">Inventory</h6>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/shop" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">All Vehicles</Link>
              <Link href="/shop?category=sedan" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Sedan</Link>
              <Link href="/shop?category=suv" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">SUV</Link>
              <Link href="/shop?category=truck" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Trucks</Link>
            </div>
          </div>
          
          {/* Column 3: Company */}
          <div>
            <h6 className="text-[#d4af37] font-bold text-lg mb-6 uppercase tracking-wider">Company</h6>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/about-us" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">About us</Link>
              <Link href="/services" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Our services</Link>
              <Link href="/team" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Our Team</Link>
              <Link href="/contact-us" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Contact us</Link>
            </div>
          </div>

          {/* Column 4: Big Logo */}
          <div className="flex items-center justify-start lg:justify-end">
            <Link href="/" className="block opacity-90 hover:opacity-100 transition-opacity">
              <img
                src="/SarkinMotaLogolight.webp"
                loading="lazy"
                alt="SarkinMota Autos Logo"
                className="w-full max-w-[240px] lg:max-w-[300px] object-contain drop-shadow-2xl"
              />
            </Link>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} Sarkin Mota Autos. All Rights Reserved.
          </div>
          <div>
            Developed by Premium Web Solutions
          </div>
        </div>
      </div>
    </footer>
  );
}
