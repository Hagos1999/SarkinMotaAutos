"use client";

import React, { ReactNode, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface FeaturedCarouselProps {
  children: ReactNode[];
  slidesPerView?: 1 | 2 | 3 | 4 | "auto";
}

export default function FeaturedCarousel({ children, slidesPerView = "auto" }: FeaturedCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="relative overflow-hidden group py-6" ref={emblaRef}>
      <div className="flex touch-pan-y items-stretch" style={{ backfaceVisibility: "hidden" }}>
        {children.map((child, index) => {
          let flexClass = "flex-[0_0_auto] min-w-0"; // Default to natural width
          
          if (slidesPerView === 1) flexClass = "flex-[0_0_100%] min-w-0";
          if (slidesPerView === 2) flexClass = "flex-[0_0_100%] sm:flex-[0_0_50%] min-w-0";
          if (slidesPerView === 3) flexClass = "flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0";
          if (slidesPerView === 4) flexClass = "flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0";

          return (
            <div className={`${flexClass} px-2 sm:px-4 h-full`} key={index}>
              {child}
            </div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "bg-[#1b3b36] scale-110" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
