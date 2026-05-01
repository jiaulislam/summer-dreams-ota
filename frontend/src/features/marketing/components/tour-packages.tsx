"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            {t("title")}
          </h2>
          <div className="h-1.5 w-20 bg-brand-primary rounded-full" />
        </div>

        {/* Carousel / Slider */}
        <div className="relative group">
          <div className="flex space-x-6 overflow-x-auto pb-8 snap-x no-scrollbar">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="flex-none w-72 md:w-80 h-96 relative rounded-3xl overflow-hidden snap-start shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />

                {/* Red Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-brand-primary/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1">
                  <h3 className="text-xl font-bold">{pkg.name}</h3>
                  <p className="text-sm font-medium opacity-90">
                    {t("startsFrom")} <span className="text-lg font-bold">${pkg.price}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            className="rounded-full px-8 py-6 border-brand-primary text-brand-primary font-bold uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all"
          >
            {t("viewAll")}
          </Button>
        </div>
      </div>
    </section>
  );
}
