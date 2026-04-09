"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // We could log error to an error reporting service here (like Sentry)
    // console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-6 mx-auto" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Something went wrong!
          </h1>
          <p className="text-gray-500 mb-8 max-w-md">
            We've encountered a fatal system error. Please don't worry, our team has been notified. 
            Try reloading the interface to resume.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-[#d4af37] hover:bg-[#b8860b] text-white rounded-md font-semibold transition-colors"
          >
            Reload Platform
          </button>
        </div>
      </body>
    </html>
  );
}
