"use client";

import Image from "next/image";
import { BookingWidget } from "./booking-widget";

interface HeroProps {
  data?: {
    title: string;
    subtitle: string;
    background_image: string;
  };
  children?: React.ReactNode;
}

export function Hero({ data, children }: HeroProps) {
  // Fallback defaults
  const title = data?.title || "Start Your Dream Vacation Today";
  const subtitle = data?.subtitle || "Explore the world with Summer Dreams Travel Agency. We provide the best flight and holiday deals.";
  const backgroundImage = data?.background_image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2070";

  return (
    <section className="relative w-full h-[600px] md:h-[750px] overflow-visible mb-20 md:mb-32">
      {/* Full-bleed Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Summer Dreams Beach Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Content / Widget Container */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center pt-24 md:pt-32">
        <div className="w-full flex flex-col items-center space-y-8">
          <div className="text-center space-y-4 max-w-3xl mb-8">
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight text-balance">
              {title.split(" Vacation ").length > 1 ? (
                <>
                  {title.split(" Vacation ")[0]} <span className="text-brand-accent italic font-serif">Vacation</span> {title.split(" Vacation ")[1]}
                </>
              ) : title}
            </h1>
            <p className="text-lg text-white/90 font-medium">
              {subtitle}
            </p>
          </div>

          <BookingWidget />
          {children}
        </div>
      </div>
    </section>
  );
}
