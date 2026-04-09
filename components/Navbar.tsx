"use client";

import Link from "next/link";
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
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
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

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeAll = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setMobileDropdownOpen(false);
  };

  return (
    <>
      {/* ── FIXED NAVBAR BAR ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          height: "64px",
          display: "flex",
          alignItems: "center",
          transition: "background 0.3s, box-shadow 0.3s",
          background: scrolled ? "rgba(15,37,32,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {/* Logo */}
          <Link href="/" onClick={closeAll} style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
            <img
              src="/SarkinMotaLogolight.webp"
              alt="SarkinMota Autos"
              style={{ height: "32px", width: "auto" }}
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav
            style={{
              display: "none",
              alignItems: "center",
              gap: "1.75rem",
            }}
            className="lg-nav-show"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
              >
                {l.label}
              </Link>
            ))}

            {/* Who We Are Dropdown */}
            <div style={{ position: "relative" }} ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  padding: 0,
                }}
              >
                Who We Are
                <ChevronDown
                  style={{
                    width: 16,
                    height: 16,
                    transition: "transform 0.2s",
                    transform: dropdownOpen ? "rotate(180deg)" : "none",
                  }}
                />
              </button>
              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: 0,
                    minWidth: "180px",
                    background: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                    padding: "6px",
                    zIndex: 10000,
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  {WHO_WE_ARE.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={closeAll}
                      style={{
                        display: "block",
                        padding: "10px 14px",
                        fontSize: "0.875rem",
                        color: "#374151",
                        textDecoration: "none",
                        borderRadius: "8px",
                        transition: "background 0.15s",
                        fontWeight: 500,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "#f3f4f6";
                        e.currentTarget.style.color = "#d4af37";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#374151";
                      }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* ── Right Actions ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {/* Search */}
            <Link
              href="/search"
              style={{ color: "#fff", padding: "8px", display: "flex", alignItems: "center" }}
            >
              <Search style={{ width: 20, height: 20 }} />
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#fff",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
              aria-label="Open cart"
            >
              <ShoppingCart style={{ width: 20, height: 20 }} />
              {mounted && totalItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    background: "#ef4444",
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: 700,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Desktop CTA — hidden on mobile */}
            <Link
              href="/shop"
              className="desktop-cta-btn"
              style={{
                display: "none",
                alignItems: "center",
                background: "#fff",
                color: "#d4af37",
                fontSize: "0.875rem",
                fontWeight: 700,
                padding: "8px 18px",
                borderRadius: "8px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "opacity 0.2s",
              }}
            >
              Explore Vehicles
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="hamburger-btn"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#fff",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen
                ? <X style={{ width: 24, height: 24 }} />
                : <Menu style={{ width: 24, height: 24 }} />
              }
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER BACKDROP ── */}
      <div
        onClick={closeAll}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.3s",
        }}
      />

      {/* ── MOBILE DRAWER PANEL ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          width: "min(300px, 85vw)",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          overflowY: "auto",
        }}
      >
        {/* Drawer header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.25rem",
            height: "64px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            flexShrink: 0,
          }}
        >
          <img src="/sarkinmota_logo_dark.svg" alt="SarkinMota" style={{ height: "28px" }} />
          <button
            onClick={closeAll}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.7)",
              padding: "6px",
              display: "flex",
            }}
          >
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>

        {/* Drawer nav links */}
        <nav style={{ flex: 1, padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "4px" }}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeAll}
              style={{
                display: "block",
                color: "rgba(255,255,255,0.85)",
                fontSize: "1rem",
                fontWeight: 500,
                padding: "12px 14px",
                borderRadius: "10px",
                textDecoration: "none",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(255,255,255,0.85)";
              }}
            >
              {l.label}
            </Link>
          ))}

          {/* Who We Are accordion */}
          <button
            onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "rgba(255,255,255,0.85)",
              fontSize: "1rem",
              fontWeight: 500,
              padding: "12px 14px",
              borderRadius: "10px",
              transition: "background 0.15s",
            }}
          >
            <span>Who We Are</span>
            <ChevronDown
              style={{
                width: 16,
                height: 16,
                color: "rgba(255,255,255,0.6)",
                transition: "transform 0.2s",
                transform: mobileDropdownOpen ? "rotate(180deg)" : "none",
              }}
            />
          </button>

          {mobileDropdownOpen && (
            <div
              style={{
                marginLeft: "14px",
                paddingLeft: "14px",
                borderLeft: "2px solid rgba(255,255,255,0.15)",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              {WHO_WE_ARE.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeAll}
                  style={{
                    display: "block",
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "0.9rem",
                    fontWeight: 400,
                    padding: "10px 12px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    transition: "color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* Drawer bottom CTA */}
        <div
          style={{
            padding: "1.25rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            flexShrink: 0,
          }}
        >
          <Link
            href="/shop"
            onClick={closeAll}
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              background: "#fff",
              color: "#d4af37",
              fontWeight: 700,
              fontSize: "0.95rem",
              padding: "14px",
              borderRadius: "12px",
              textDecoration: "none",
              transition: "opacity 0.2s",
              boxSizing: "border-box",
            }}
          >
            🚗 Explore Vehicles
          </Link>
        </div>
      </div>

      {/* Responsive style injection — avoids Webflow CSS conflicts */}
      <style>{`
        @media (min-width: 1024px) {
          .hamburger-btn { display: none !important; }
          .lg-nav-show { display: flex !important; }
          .desktop-cta-btn { display: inline-flex !important; }
        }
        @media (max-width: 1023px) {
          .hamburger-btn { display: flex !important; }
          .lg-nav-show { display: none !important; }
          .desktop-cta-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
