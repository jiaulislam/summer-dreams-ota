"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const PACKAGES = [
  {
    id: 1,
    name: "Santorini, Greece",
    price: 1200,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    price: 850,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Kyoto, Japan",
    price: 1500,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Swiss Alps, Switzerland",
    price: 1800,
    image: "https://images.unsplash.com/photo-1531219432768-9f540ce91ef3?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    name: "Machu Picchu, Peru",
    price: 1100,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=800",
  },
];

export function TourPackages() {
  const t = useTranslations("TourPackages");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const item = container.querySelector(".package-card") as HTMLElement;
    const itemWidth = item?.offsetWidth || 320;
    const gap = 24; // space-x-6 = 1.5rem = 24px

    container.scrollTo({
      left: index * (itemWidth + gap),
      behavior: "smooth",
    });
    setActiveIndex(index);
  }, []);

  const handleNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % PACKAGES.length;
    scrollToIndex(nextIndex);
  }, [activeIndex, scrollToIndex]);

  const handlePrev = useCallback(() => {
    const prevIndex = (activeIndex - 1 + PACKAGES.length) % PACKAGES.length;
    scrollToIndex(prevIndex);
  }, [activeIndex, scrollToIndex]);

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [handleNext, isPaused]);

  // Update active index based on scroll position (for manual scroll)
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const item = container.querySelector(".package-card") as HTMLElement;
    const itemWidth = item?.offsetWidth || 320;
    const gap = 24;
    const index = Math.round(container.scrollLeft / (itemWidth + gap));
    if (index !== activeIndex && index >= 0 && index < PACKAGES.length) {
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight text-balance">
            {t("title")}
          </h2>
          <div className="h-1.5 w-20 bg-brand-primary rounded-full" />
        </div>

        {/* Carousel Wrapper */}
        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -left-4 md:-left-8 z-20 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-none shadow-xl bg-white/90 backdrop-blur-sm text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
              onClick={handlePrev}
            >
              <ChevronLeft size={32} strokeWidth={2.5} />
            </Button>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-8 z-20 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-none shadow-xl bg-white/90 backdrop-blur-sm text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
              onClick={handleNext}
            >
              <ChevronRight size={32} strokeWidth={2.5} />
            </Button>
          </div>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex space-x-6 overflow-x-auto pb-12 snap-x snap-mandatory bg-transparent [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="package-card flex-none w-[85vw] md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] h-[450px] relative rounded-[40px] overflow-hidden snap-center shadow-xl shadow-brand-primary/5 hover:shadow-brand-primary/20 transition-all duration-500 cursor-pointer group/card"
              >
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                />

                {/* Red Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/20 to-transparent pointer-events-none transition-opacity duration-500 group-hover/card:opacity-90" />

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white space-y-2 translate-y-2 group-hover/card:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-black tracking-tight">{pkg.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold uppercase tracking-widest text-white/80">
                      {t("startsFrom")} <span className="text-xl text-white ml-1">${pkg.price}</span>
                    </p>
                    <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover/card:bg-white group-hover/card:text-brand-primary transition-all duration-300">
                        <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Position Indicators (Dots) */}
          <div className="flex justify-center space-x-3 mt-4">
            {PACKAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  activeIndex === idx
                    ? "w-8 bg-brand-primary shadow-lg shadow-brand-primary/30"
                    : "w-2 bg-gray-200 hover:bg-gray-300"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <Button
            variant="outline"
            className="rounded-full px-12 py-7 border-2 border-brand-primary text-brand-primary font-black uppercase tracking-[0.2em] hover:bg-brand-primary hover:text-white hover:shadow-2xl hover:shadow-brand-primary/30 transition-all duration-300 group"
          >
            <span>{t("viewAll")}</span>
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
