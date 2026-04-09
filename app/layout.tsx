import type { Metadata } from "next";
import { Lato } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AosInitializer from "@/components/AosInitializer";
import Script from "next/script";
import "./globals.css";

const lato = Lato({ 
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ["latin"],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: "SarkinMota Autos | Premium Car Dealership",
  description: "Find your dream car with SarkinMota Autos. We offer premium vehicles, competitive pricing, and unparalleled customer service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js" strategy="lazyOnload"></Script>
      </head>
      <body className={`${lato.className} ${lato.variable} antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
