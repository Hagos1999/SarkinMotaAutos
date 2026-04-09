import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="base-container w-container">
        {/* We place the Webflow styling on a parent and override its layout with Tailwind Grid */}
        <div className="footer-wrapper !block md:!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-4 !gap-12 lg:!gap-8">
          
          <div className="footer-brand-wrapper">
            <a href="https://www.google.com/maps" className="footer-contact-elements w-inline-block hover:text-[#d4af37] transition-colors group">
              <MapPin className="w-5 h-5 text-white mr-3 flex-shrink-0 group-hover:text-[#d4af37] transition-colors" />
              <div>2715 Ash Dr. San Jose, South Dakota 83475</div>
            </a>
            <a href="tel:(316)555-0116" className="footer-contact-elements phone w-inline-block hover:text-[#d4af37] transition-colors group">
              <Phone className="w-5 h-5 text-white mr-3 flex-shrink-0 group-hover:text-[#d4af37] transition-colors" />
              <div>(316) 555-0116</div>
            </a>
            <div className="footer-social-icons-wrapper flex gap-4 mt-6 text-white">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="hover:text-[#d4af37] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:text-[#d4af37] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="hover:text-[#d4af37] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>
          
          <div className="footer-links-wrapper">
            <h6 className="footer-title">Inventory</h6>
            <div className="flex flex-col gap-2 mt-4">
              <Link href="/shop" className="footer-link hover:text-[#d4af37] transition-colors">All Vehicles</Link>
              <Link href="/shop?category=sedan" className="footer-link hover:text-[#d4af37] transition-colors">Sedan</Link>
              <Link href="/shop?category=suv" className="footer-link hover:text-[#d4af37] transition-colors">SUV</Link>
              <Link href="/shop?category=truck" className="footer-link hover:text-[#d4af37] transition-colors">Trucks</Link>
            </div>
          </div>
          
          <div className="footer-links-wrapper">
            <h6 className="footer-title">Company</h6>
            <div className="flex flex-col gap-2 mt-4">
              <Link href="/about-us" className="footer-link hover:text-[#d4af37] transition-colors">About us</Link>
              <Link href="/services" className="footer-link hover:text-[#d4af37] transition-colors">Our services</Link>
              <Link href="/team" className="footer-link hover:text-[#d4af37] transition-colors">Our Team</Link>
              <Link href="/contact-us" className="footer-link hover:text-[#d4af37] transition-colors">Contact us</Link>
            </div>
          </div>

          {/* Big Logo strictly on the right grid column */}
          <div className="flex py-6 md:py-0 items-center justify-start lg:justify-end">
            <Link href="/" className="footer-brand block w-nav-brand opacity-95 hover:opacity-100 transition-opacity">
              <img
                src="/SarkinMotaLogolight.webp"
                loading="lazy"
                alt="SarkinMota Autos Logo"
                className="w-full max-w-[200px] lg:max-w-[280px] object-contain drop-shadow-[0_8px_20px_rgba(212,175,55,0.05)]"
              />
            </Link>
          </div>
          
        </div>
        
        <div className="footer-bottom-wrapper">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Sarkin Mota Autos. All Rights Reserved.
          </div>
          <div className="footer-rights-wrapper">
            <div className="footer-rights hover:text-[#d4af37] transition-colors cursor-pointer">
              Developed by Premium Web Solutions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
