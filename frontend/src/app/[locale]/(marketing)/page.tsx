import { useTranslations } from "next-intl";
import { Hero } from "@/features/marketing/components/hero";
import { TourPackages } from "@/features/marketing/components/tour-packages";
import { PopularDestinations } from "@/features/marketing/components/popular-destinations";
import { WhyChooseUs } from "@/features/marketing/components/why-choose-us";
import { Footer } from "@/features/marketing/components/footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <main className="flex-grow">
        <TourPackages />
        <PopularDestinations />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
}
