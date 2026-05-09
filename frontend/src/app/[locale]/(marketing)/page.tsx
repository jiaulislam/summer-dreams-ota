"use client";

import { useQuery } from "@tanstack/react-query";
import { getLandingPageData } from "@/features/marketing/api";
import { Hero } from "@/features/marketing/components/hero";
import { TourPackages } from "@/features/marketing/components/tour-packages";
import { PopularDestinations } from "@/features/marketing/components/popular-destinations";
import { WhyChooseUs } from "@/features/marketing/components/why-choose-us";
import { Footer } from "@/features/marketing/components/footer";
import { Navbar } from "@/features/marketing/components/navbar";
import { FloatingChatWidget } from "@/features/marketing/components/floating-chat-widget";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["landing-page"],
    queryFn: () => getLandingPageData(),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
        <p className="mt-4 text-gray-500 font-medium">Loading your dream vacation...</p>
      </div>
    );
  }

  if (error || !data) {
    // Fallback if API fails
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        <main className="grow">
          <TourPackages />
          <PopularDestinations />
          <WhyChooseUs />
        </main>
        <Footer />
        <FloatingChatWidget />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero data={data.hero} />
      <main className="grow">
        <TourPackages tours={data.tours} />
        <PopularDestinations destinations={data.destinations} />
        <WhyChooseUs data={data.why_choose_us} />
      </main>
      <Footer agency={data.agency} />
      <FloatingChatWidget />
    </div>
  );
}
