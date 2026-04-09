"use client";

import { useCartStore } from "@/store/cartStore";
import { X, Trash2, Plus, Minus, MessageCircle } from "lucide-react";
import Image from "next/image";
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

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[9999] flex flex-col transform transition-transform duration-300 translate-x-0">
        
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
          <div className="text-2xl font-bold text-gray-800">Your Cart</div>
          <button 
            onClick={closeCart} 
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Content - Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden relative flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                
                <div className="flex flex-col flex-1 justify-between">
                  <div className="flex justify-between items-start">
                    <div className="font-semibold text-lg text-gray-800 line-clamp-2 pr-4 leading-snug">{item.title}</div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-primary font-bold text-base mt-1">{item.price}</div>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer - Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t bg-gray-50 flex flex-col gap-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium text-gray-600">Total Vehicle Cost</span>
              <span className="text-2xl font-bold text-gray-900">{formattedSubtotal}</span>
            </div>
            
            <p className="text-xs text-gray-500 mb-2">
              To reserve these vehicles, pay a secure ₦50,000 deposit online, or contact us directly on WhatsApp to negotiate.
            </p>

            <input 
              type="email" 
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#1b3b36] focus:border-[#1b3b36] mb-2 text-sm"
            />

            <PaystackButton email={email} />
            
            <div className="relative flex items-center justify-center my-1">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
              <span className="relative bg-gray-50 px-2 text-xs text-gray-500">OR</span>
            </div>

            <button 
              onClick={handleWhatsAppCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition-colors flex justify-center items-center gap-2"
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
