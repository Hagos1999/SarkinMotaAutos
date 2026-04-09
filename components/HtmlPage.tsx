"use client";

import React, { useEffect } from "react";
import parse, { attributesToProps, domToReact, HTMLReactParserOptions } from "html-react-parser";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import FeaturedCarousel from "./FeaturedCarousel";
import DynamicVehicleGrid from "./DynamicVehicleGrid";
import ShopInventoryRenderer from "./ShopInventoryRenderer";
import ModelViewer from "./ModelViewer";

interface HtmlPageProps {
  html: string;
  vehicle?: any;
}

export default function HtmlPage({ html, vehicle }: HtmlPageProps) {
  const options: HTMLReactParserOptions = {
    replace(domNode: any) {
      if (domNode.type === "tag") {
        const classList = domNode.attribs?.class || "";
        
        // --- 1. Product Detail Overrides (If vehicle is passed) ---
        if (vehicle) {
          if (classList.includes("shop-details-title")) {
            return <h1 className={classList}>{vehicle.title}</h1>;
          }
          if (classList.includes("car-price-wrapper")) {
            return (
              <div className="car-price-wrapper shop-details">
                <h5 className="price-car">$ {Number(vehicle.price).toLocaleString()} USD</h5>
              </div>
            );
          }
          if (classList.includes("shop-item-info-wrapper")) {
            return <div className={classList}><p className="no-margin">{vehicle.description.substring(0, 150)}...</p></div>;
          }
          if (classList.includes("rich-text-style")) {
             return <div className={classList} style={{ whiteSpace: "pre-wrap" }}>{vehicle.description}</div>;
          }
          // Replace the massive Webflow Slider with our Image & 3D Viewer stack
          if (classList.includes("shop-details-slider")) {
            const modelSrc = vehicle.model_url || "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
            const isPlaceholder = !vehicle.model_url;
            return (
              <div className="flex flex-col gap-6 w-full">
                <img 
                  src={vehicle.images?.[0] || "/sarkinmota_logo_dark.svg"} 
                  className="w-full h-auto aspect-video rounded-xl shadow-md object-cover"
                  alt={vehicle.title}
                />
                <ModelViewer
                  src={modelSrc}
                  alt={`3D model of ${vehicle.title}`}
                  isPlaceholder={isPlaceholder}
                />
              </div>
            );
          }
        }

        // --- 2. Convert Webflow opacity animations to AOS elements ---
        if (domNode.attribs) {
          if (
            (domNode.attribs.style && (domNode.attribs.style.includes("opacity: 0") || domNode.attribs.style.includes("opacity:0"))) ||
            domNode.attribs["data-w-id"]
          ) {
            // Strip opacity 0 so AOS can handle it
            if (domNode.attribs.style) {
              domNode.attribs.style = domNode.attribs.style.replace(/opacity:\s*0;?/gi, "");
            }
            // Inject AOS tags!
            domNode.attribs["data-aos"] = "fade-up";
            domNode.attribs["data-aos-duration"] = "800";
            domNode.attribs["data-aos-once"] = "true";
          }
        }

        // --- 3. Replace Shop Tabs completely with React Filtering Tabs Component ---
        if (classList.includes("shop-tabs")) {
          return <ShopInventoryRenderer />;
        }

        // --- 4. Intercept Webflow Sliders and replace with Embla Carousel OR Static Grid ---
        if (classList.split(/\s+/).includes("w-slider")) {
          const slides: any[] = [];
          const extractSlides = (node: any) => {
            if (node.type === "tag" && node.attribs && node.attribs.class && node.attribs.class.split(/\s+/).includes("w-slide")) {
              slides.push(node);
            } else if (node.children) {
              node.children.forEach(extractSlides);
            }
          };
          extractSlides(domNode);
          
          if (slides.length > 0) {
            const isTestimonial = classList.includes("slider-testimonials");

            // User specifically requested Testimonials not to be a carousel
            if (isTestimonial) {
              const pureCards = slides.map(slide => {
                const cardNode = slide.children?.find((c: any) => c.type === "tag" && c.attribs?.class?.includes("card") || c.attribs?.class?.includes("slide"));
                return cardNode ? cardNode : slide;
              });

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 items-stretch w-full">
                  {domToReact(pureCards, options) as React.ReactNode[]}
                </div>
              );
            }

            // Determine if it's the featured cars slider
            if (classList.includes("home-testimonials-slider")) {
              return <DynamicVehicleGrid asCarousel={true} />;
            }
            
            let views: 1 | 2 | 3 | 4 | "auto" = 1;
            if (classList.includes("shop")) {
              views = 3;
            } else {
              views = "auto";
            }

            return (
               <FeaturedCarousel slidesPerView={views}>
                 {domToReact(slides, options) as React.ReactNode[]}
               </FeaturedCarousel>
            );
          }
        }

        // --- 5. Inject Dynamic Supabase Inventory ---
        if (
          classList.includes("shop-collection-list") && 
          classList.includes("w-dyn-items")
        ) {
          return (
            <div className={classList}>
              <DynamicVehicleGrid />
            </div>
          );
        }

        // --- 6. Handle optimal SPA linking ---
        if (domNode.name === "a") {
          const props = attributesToProps(domNode.attribs);
          const href = domNode.attribs.href;

          const isExternal = href?.startsWith("http");
          const isAnchorElement = href?.startsWith("#");

          if (href && !isExternal && !isAnchorElement) {
            return (
              <Link {...props} href={href}>
                {domNode.children ? domToReact(domNode.children, options) : null}
              </Link>
            );
          }
        }
      }
    },
  };

  useEffect(() => {
    const attachCartListeners = () => {
      const buttons = document.querySelectorAll('input[data-node-type="commerce-add-to-cart-button"]');
      
      const handleAddToCart = (e: Event) => {
        e.preventDefault(); 
        
        const target = e.target as HTMLElement;
        const gridItem = target.closest('.shop-collection-item, .car-item-style');
        const detailItem = target.closest('.shop-details-wrapper');
        
        let title = "Unknown Vehicle";
        let price = "$0.00";
        let image = "https://cdn.prod.website-files.com/63f482d5d15815d700cb1c76/64132a98932dbe1acc55146c_Car%20dealershipw.svg"; 

        if (gridItem) {
          title = gridItem.querySelector('.shop-item-link, .car-title')?.textContent?.trim() || title;
          price = gridItem.querySelector('.shop-item-price, .price-car')?.textContent?.trim() || price;
          image = gridItem.querySelector('img')?.getAttribute('src') || image;
        } else if (detailItem) {
          title = detailItem.querySelector('.shop-details-title')?.textContent?.trim() || title;
          price = detailItem.querySelector('.price-car')?.textContent?.trim() || price;
          image = detailItem.querySelector('.shop-details-image')?.getAttribute('src') || image;
        }

        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        useCartStore.getState().addItem({
          id,
          title,
          price,
          image,
          quantity: 1
        });
      };

      buttons.forEach((btn) => {
        btn.removeEventListener('click', handleAddToCart);
        btn.addEventListener('click', handleAddToCart);
      });

      return () => {
        buttons.forEach((btn) => btn.removeEventListener('click', handleAddToCart));
      };
    };

    const attachTabListeners = () => {
      const tabLinks = document.querySelectorAll('.w-tab-link');
      
      const handleTabClick = (e: Event) => {
        e.preventDefault();
        const tabLink = e.currentTarget as HTMLElement;
        const tabId = tabLink.getAttribute('data-w-tab');
        const tabsContainer = tabLink.closest('.w-tabs');
        
        if (tabsContainer && tabId) {
          // 1. Update links
          const allLinks = tabsContainer.querySelectorAll('.w-tab-link');
          allLinks.forEach(link => link.classList.remove('w--current'));
          tabLink.classList.add('w--current');

          // 2. Update panes
          const allPanes = tabsContainer.querySelectorAll('.w-tab-pane');
          allPanes.forEach(pane => {
            pane.classList.remove('w--tab-active');
            (pane as HTMLElement).style.opacity = '0';
          });

          // Show specific pane
          const activePane = tabsContainer.querySelector(`.w-tab-pane[data-w-tab="${tabId}"]`) as HTMLElement;
          if (activePane) {
            activePane.classList.add('w--tab-active');
            setTimeout(() => {
              activePane.style.opacity = '1';
            }, 10);
          }
        }
      };

      tabLinks.forEach(link => {
        link.removeEventListener('click', handleTabClick);
        link.addEventListener('click', handleTabClick);
      });

      return () => {
        tabLinks.forEach(link => link.removeEventListener('click', handleTabClick));
      };
    };

    const cleanupCart = attachCartListeners();
    const cleanupTabs = attachTabListeners();
    
    return () => {
      cleanupCart();
      cleanupTabs();
    };
  }, [html]);

  return <>{parse(html, options)}</>;
}
