"use client";

import { useEffect } from "react";
import { CreditCard } from "lucide-react";

interface PaystackButtonProps {
  email: string;
  amount?: number; // in Naira
}

declare global {
  interface Window {
    PaystackPop?: any;
  }
}

export default function PaystackButton({ email, amount = 50000 }: PaystackButtonProps) {
  useEffect(() => {
    // Load Paystack inline script
    if (document.getElementById("paystack-script")) return;
    const script = document.createElement("script");
    script.id = "paystack-script";
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const handlePay = () => {
    if (!email) {
      alert("Please enter your email to proceed with secure card payment.");
      return;
    }

    if (!window.PaystackPop) {
      alert("Payment system is loading, please try again in a moment.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "pk_test_placeholder",
      email,
      amount: amount * 100, // convert Naira to kobo
      currency: "NGN",
      ref: `sm_${Date.now()}`,
      onClose: () => {},
      callback: (response: any) => {
        alert(`Payment successful! Reference: ${response.reference}`);
      },
    });

    handler.openIframe();
  };

  return (
    <button
      onClick={handlePay}
      className="w-full bg-[#1b3b36] hover:bg-[#132a26] text-white py-3 rounded-md font-semibold transition-colors flex justify-center items-center gap-2"
    >
      <CreditCard className="w-5 h-5" />
      Pay Reservation Deposit
    </button>
  );
}
