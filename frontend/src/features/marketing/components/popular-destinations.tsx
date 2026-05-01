"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const DESTINATIONS = [
  {
    id: 1,
    name: "Paris",
    desc: "The City of Light, known for its art, fashion, and history.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "New York",
    desc: "The Big Apple, a global center of finance and culture.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Tokyo",
    desc: "A bustling metropolis blending tradition and innovation.",
    image: "https://images.unsplash.com/photo-1540959733332-e94e270bde18?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Cape Town",
    desc: "Stunning coastline and iconic Table Mountain views.",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&q=80&w=800",
  },
];

export function PopularDestinations() {
  const t = useTranslations("Destinations");

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 space-y-12">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight text-center md:text-left">
          {t("title")}
        </h2>

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-4 h-auto md:h-[600px]">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="group relative flex-1 md:hover:flex-[1.5] transition-all duration-700 ease-in-out cursor-pointer rounded-[40px] overflow-hidden shadow-xl min-h-[400px] md:min-h-full"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />

              {/* Content Box */}
              <div className="absolute bottom-6 left-6 right-6 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                <div className="bg-white p-6 rounded-3xl shadow-2xl space-y-3 relative overflow-hidden">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-gray-900">{dest.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{dest.desc}</p>
                  </div>

                  <div className="flex justify-end">
                    <div className="h-12 w-12 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimized label shown when not hovered (optional, but looks better) */}
              <div className="absolute bottom-10 left-10 group-hover:opacity-0 transition-opacity duration-300">
                 <span className="text-white text-3xl font-black drop-shadow-lg">{dest.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
