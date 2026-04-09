"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Menu, X, ChevronDown, Search } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-us" },
];

const WHO_WE_ARE = [
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Our Team", href: "/team" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { openCart, items } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeAll = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <>
      {/* ── NAVBAR BAR ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
          scrolled
            ? "bg-[#0f2520]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" onClick={closeAll} className="flex-shrink-0 z-10">
            <img
              src="/sarkinmota_logo_dark.svg"
              alt="SarkinMota Autos"
              className="h-8 w-auto"
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-white/90 hover:text-white text-sm font-medium transition-colors"
              >
                {l.label}
              </Link>
            ))}

            {/* Who We Are Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-white/90 hover:text-white text-sm font-medium transition-colors"
              >
                Who We Are
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50">
                  {WHO_WE_ARE.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={closeAll}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1b3b36] transition-colors"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <Link href="/search" className="p-2 text-white hover:text-white/80 transition-colors">
              <Search className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 text-white hover:text-white/80 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Desktop CTA */}
            <Link
              href="/shop"
              className="hidden lg:inline-flex items-center bg-white text-[#1b3b36] hover:bg-white/90 text-sm font-bold px-4 py-2 rounded-lg transition-all shadow-sm"
            >
              Explore Vehicles
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-white transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeAll}
      />

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[999] w-[280px] bg-[#0f2520] flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <img src="/sarkinmota_logo_dark.svg" alt="SarkinMota" className="h-7 w-auto" />
          <button onClick={closeAll} className="p-2 text-white/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-6 px-5 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeAll}
              className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-3 rounded-lg text-base font-medium transition-all"
            >
              {l.label}
            </Link>
          ))}

          {/* Who We Are accordion */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between text-white/80 hover:text-white hover:bg-white/10 px-3 py-3 rounded-lg text-base font-medium transition-all w-full text-left"
          >
            Who We Are
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>
          {dropdownOpen && (
            <div className="ml-3 border-l border-white/20 pl-4 flex flex-col gap-1">
              {WHO_WE_ARE.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeAll}
                  className="text-white/70 hover:text-white py-2 text-sm transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* Bottom CTA */}
        <div className="p-5 border-t border-white/10">
          <Link
            href="/shop"
            onClick={closeAll}
            className="block w-full text-center bg-white text-[#1b3b36] font-bold py-3 rounded-xl text-sm hover:bg-white/90 transition-all"
          >
            🚗 Explore Vehicles
          </Link>
        </div>
      </div>
    </>
  );
}
