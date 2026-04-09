import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AosInitializer from "@/components/AosInitializer";
import Script from "next/script";
import "../globals.css";

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <link
        href="https://cdn.prod.website-files.com/63f482d5d15815d700cb1c76/css/car-dealership-128.webflow.f4f1df89a.css"
        rel="stylesheet"
        type="text/css"
      />
      <AosInitializer />
      <Navbar />
      <CartDrawer />
      
      <main className="flex-grow">
        {children}
      </main>

      <Footer />

      {/* Global Scripts */}
      <Script 
        src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js" 
        strategy="beforeInteractive" 
      />
      <Script 
        src="https://cdn.prod.website-files.com/63f482d5d15815d700cb1c76/js/webflow.7579d547b8dc7fcd6233bc2eddbe997f.js"
        strategy="lazyOnload" 
      />
    </>
  );
}
