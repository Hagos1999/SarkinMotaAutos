import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="base-container w-container">
        
        {/* We restore the top logo perfectly as it was in the original template */}
        <div className="footer-top-wrapper">
          <Link href="/" className="footer-brand w-nav-brand">
            <img
              src="/SarkinMotaLogolight.webp"
              loading="lazy"
              alt="SarkinMota Autos Logo"
              height="30"
              className="footer-logo h-[30px] object-contain"
            />
          </Link>
        </div>

        {/* 
          We restore the original Webflow "footer-wrapper" class, but gently tell it to be 4 columns 
          on large screens to accommodate the new big logo, without disrupting any old Webflow CSS.
        */}
        <div className="footer-wrapper lg:!grid lg:!grid-cols-4 lg:!gap-8">
          
          <div className="footer-brand-wrapper">
            <a href="https://www.google.com/maps" className="footer-contact-elements w-inline-block hover:text-[#d4af37] transition-colors duration-300">
              <MapPin className="w-5 h-5 text-white mr-2 flex-shrink-0" />
              <div>2715 Ash Dr. San Jose, South Dakota 83475</div>
            </a>
            <a href="tel:(316)555-0116" className="footer-contact-elements phone w-inline-block hover:text-[#d4af37] transition-colors duration-300">
              <Phone className="w-5 h-5 text-white mr-2 flex-shrink-0" />
              <div>(316) 555-0116</div>
            </a>
            <div className="footer-social-icons-wrapper flex gap-4 mt-4 text-white">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="hover:text-[#d4af37] transition-colors duration-300 hover:-translate-y-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:text-[#d4af37] transition-colors duration-300 hover:-translate-y-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="hover:text-[#d4af37] transition-colors duration-300 hover:-translate-y-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" className="hover:text-[#d4af37] transition-colors duration-300 hover:-translate-y-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.97-1.561 4.795 4.795 0 0 1-1.034-3.125h-3.693v13.626a3.692 3.692 0 1 1-6.108-2.795 3.691 3.691 0 0 1 4.887-.14v-4.66a7.382 7.382 0 1 0 4.914 6.963V8.847c1.332.6 2.81 1.01 4.414 1.139v-3.3z"></path></svg>
              </a>
            </div>
          </div>
          
          <div className="footer-links-wrapper">
            <h6 className="footer-title">Inventory</h6>
            <div className="flex flex-col gap-2 mt-4">
              <Link href="/shop" className="footer-link hover:text-[#d4af37] transition-colors duration-300">All Vehicles</Link>
              <Link href="/shop?category=sedan" className="footer-link hover:text-[#d4af37] transition-colors duration-300">Sedan</Link>
              <Link href="/shop?category=suv" className="footer-link hover:text-[#d4af37] transition-colors duration-300">SUV</Link>
              <Link href="/shop?category=truck" className="footer-link hover:text-[#d4af37] transition-colors duration-300">Trucks</Link>
            </div>
          </div>
          
          <div className="footer-links-wrapper">
            <h6 className="footer-title">Company</h6>
            <div className="flex flex-col gap-2 mt-4">
              <Link href="/about-us" className="footer-link hover:text-[#d4af37] transition-colors duration-300">About us</Link>
              <Link href="/services" className="footer-link hover:text-[#d4af37] transition-colors duration-300">Our services</Link>
              <Link href="/team" className="footer-link hover:text-[#d4af37] transition-colors duration-300">Our Team</Link>
              <Link href="/contact-us" className="footer-link hover:text-[#d4af37] transition-colors duration-300">Contact us</Link>
            </div>
          </div>

          {/* New 4th Column for Desktop right-side gap */}
          <div className="hidden lg:flex items-center justify-end">
            <img src="/SarkinMotaLogolight.webp" loading="lazy" alt="SarkinMota Autos Logo" className="w-[200px] xl:w-[260px] object-contain opacity-90 drop-shadow-md" />
          </div>

        </div>
        
        <div className="footer-bottom-wrapper">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Sarkin Mota Autos. All Rights Reserved.
          </div>
          <div className="footer-rights-wrapper">
            <div className="footer-rights">
              Developed by Premium Web Solutions
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
