"use client";

import { useCartStore } from "@/store/cartStore";
import { X, Trash2, Plus, Minus, MessageCircle } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

const PaystackButton = dynamic(() => import("./PaystackButton"), { ssr: false });

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, removeItem, updateQuantity } = useCartStore();
  const [email, setEmail] = useState("");

  if (!isCartOpen) return null;

  // Calculate Subtotal (Strip non-numeric characters from price strings except dot)
  const subtotal = items.reduce((total, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return total + (isNaN(numericPrice) ? 0 : numericPrice) * item.quantity;
  }, 0);

  // Format back to USD (or desired currency formatting)
  const formattedSubtotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(subtotal);

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "2348012345678"; // Dealership WhatsApp Number (Dummy)
    
    let message = "Hello SarkinMota Autos! I am interested in purchasing the following vehicles:\n\n";
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.title} (Qty: ${item.quantity}) - ${item.price}\n`;
    });
    message += `\n*Estimated Total: ${formattedSubtotal}*\n\nPlease let me know the next steps!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998] transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer — white background; all text pinned with inline styles to beat the global dark override */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[9999] flex flex-col transform transition-transform duration-300 translate-x-0">

        {/* ── Header ── */}
        <div
          className="px-6 py-4 flex justify-between items-center flex-shrink-0"
          style={{ borderBottom: "1px solid #e5e7eb", backgroundColor: "#f9fafb" }}
        >
          <span className="text-2xl font-bold" style={{ color: "#111827" }}>
            Your Cart
          </span>
          <button
            onClick={closeCart}
            className="p-2 rounded-full transition-colors"
            style={{ backgroundColor: "#e5e7eb" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d1d5db")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e5e7eb")}
          >
            <X className="w-5 h-5" style={{ color: "#374151" }} />
          </button>
        </div>

        {/* ── Cart Items ── */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6" style={{ backgroundColor: "#ffffff" }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-sm" style={{ color: "#6b7280" }}>
                Your cart is empty.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-4"
                style={{ borderBottom: "1px solid #e5e7eb" }}
              >
                {/* Thumbnail */}
                <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0" style={{ backgroundColor: "#f3f4f6" }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col flex-1 justify-between">
                  <div className="flex justify-between items-start">
                    {/* Vehicle title */}
                    <span
                      className="font-semibold text-base line-clamp-2 pr-3 leading-snug"
                      style={{ color: "#1f2937" }}
                    >
                      {item.title}
                    </span>
                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex-shrink-0 p-1 transition-colors"
                      style={{ color: "#ef4444" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#b91c1c")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#ef4444")}
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Price — gold for brand consistency and visibility */}
                  <div className="font-bold text-base mt-1" style={{ color: "#d4af37" }}>
                    {item.price}
                  </div>

                  {/* Quantity stepper */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded transition-colors"
                      style={{ border: "1px solid #d1d5db", color: "#374151", backgroundColor: "#ffffff" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-semibold w-4 text-center" style={{ color: "#111827" }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded transition-colors"
                      style={{ border: "1px solid #d1d5db", color: "#374151", backgroundColor: "#ffffff" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Footer / Checkout ── */}
        {items.length > 0 && (
          <div
            className="p-6 flex flex-col gap-3 flex-shrink-0"
            style={{ borderTop: "1px solid #e5e7eb", backgroundColor: "#f9fafb" }}
          >
            {/* Total row */}
            <div className="flex justify-between items-center mb-1">
              <span className="text-base font-medium" style={{ color: "#4b5563" }}>
                Total Vehicle Cost
              </span>
              <span className="text-xl font-bold" style={{ color: "#111827" }}>
                {formattedSubtotal}
              </span>
            </div>

            {/* Helper text */}
            <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
              To reserve these vehicles, pay a secure ₦50,000 deposit online, or contact us directly on WhatsApp to negotiate.
            </p>

            {/* Email input */}
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md text-sm focus:outline-none transition-colors"
              style={{
                border: "1px solid #d1d5db",
                color: "#111827",
                backgroundColor: "#ffffff",
              }}
            />

            {/* Paystack deposit button */}
            <PaystackButton email={email} />

            {/* OR divider */}
            <div className="relative flex items-center justify-center my-0.5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full" style={{ borderTop: "1px solid #d1d5db" }} />
              </div>
              <span
                className="relative px-3 text-xs font-semibold"
                style={{ color: "#9ca3af", backgroundColor: "#f9fafb" }}
              >
                OR
              </span>
            </div>

            {/* WhatsApp button */}
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-3 rounded-md font-semibold transition-colors flex justify-center items-center gap-2 text-white"
              style={{ backgroundColor: "#16a34a" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#15803d")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#16a34a")}
            >
              <MessageCircle className="w-5 h-5" />
              Checkout via WhatsApp
            </button>
          </div>
        )}

      </div>
    </>
  );
}
