"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { openCart, items } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      className="navbar-absolute w-nav"
      style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <div className="nav-container w-container">
        <div className="nav-menu-wrapper">
          {/* Logo */}
          <Link href="/" className="brand w-nav-brand">
            <img
              src="/sarkinmota_logo_dark.svg"
              loading="lazy"
              alt="SarkinMota Autos Logo"
              height="30"
              className="h-[30px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav role="navigation" className="nav-menu w-nav-menu">
            <div className="menu-wrap">
              <Link href="/" className="nav-link w-nav-link">
                Home
              </Link>
              
              <div className="nav-dropdown w-dropdown group">
                <div className="nav-dropdown-toggle w-dropdown-toggle cursor-pointer">
                  <div className="nav-item-title inline-block">Who We Are</div>
                  <ChevronDown className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:rotate-180 pointer-events-none" />
                </div>
                <nav className="nav-dropdown-list w-dropdown-list hidden group-hover:block absolute bg-white shadow-lg py-2 mt-0">
                  <div className="nav-dropdown-link-wrapper flex flex-col">
                    <Link href="/about-us" className="nav-dropdown-link w-dropdown-link hover:bg-gray-50 flex items-center gap-2">
                      <span className="nav-dropdown-link-line"></span> About Us
                    </Link>
                    <Link href="/services" className="nav-dropdown-link w-dropdown-link hover:bg-gray-50 flex items-center gap-2">
                      <span className="nav-dropdown-link-line"></span> Services
                    </Link>
                    <Link href="/team" className="nav-dropdown-link w-dropdown-link hover:bg-gray-50 flex items-center gap-2">
                      <span className="nav-dropdown-link-line"></span> Team
                    </Link>
                    <Link href="/testimonials" className="nav-dropdown-link w-dropdown-link hover:bg-gray-50 flex items-center gap-2">
                      <span className="nav-dropdown-link-line"></span> Testimonials
                    </Link>
                    <Link href="/faq" className="nav-dropdown-link w-dropdown-link hover:bg-gray-50 flex items-center gap-2">
                      <span className="nav-dropdown-link-line"></span> FAQ
                    </Link>
                    <Link href="/contact-us" className="nav-dropdown-link w-dropdown-link hover:bg-gray-50 flex items-center gap-2">
                      <span className="nav-dropdown-link-line"></span> Contact Us
                    </Link>
                  </div>
                </nav>
              </div>

              <Link href="/shop" className="nav-link w-nav-link">
                Inventory
              </Link>

              <Link href="/blog" className="nav-link w-nav-link">
                Blog
              </Link>
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="search-shop-con flex items-center gap-4">
            <Link href="/search" className="navbar-search-icon">
              <Search className="w-5 h-5 text-white" />
            </Link>
            
            <button 
              className="cart-button w-inline-block flex items-center gap-2"
              onClick={openCart}
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              <div className="cart-quantity text-white">
                {mounted ? totalItems : 0}
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="menu-button w-nav-button block lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6 text-white" />
            </button>

            <Link href="/shop" className="primary-button nav-button w-button hidden lg:inline-block">
              Explore vehicles
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-menu bg-white text-black p-4 absolute top-full left-0 right-0 shadow-lg border-t z-50">
          <div className="flex flex-col gap-4">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/about-us" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link href="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
            <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>Inventory</Link>
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
            <Link href="/contact-us" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </div>
  );
}
