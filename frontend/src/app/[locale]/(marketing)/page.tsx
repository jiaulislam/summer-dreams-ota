import { Hero } from "@/features/marketing/components/hero";
import { TourPackages } from "@/features/marketing/components/tour-packages";
import { PopularDestinations } from "@/features/marketing/components/popular-destinations";
import { WhyChooseUs } from "@/features/marketing/components/why-choose-us";
import { Footer } from "@/features/marketing/components/footer";
import { Navbar } from "@/features/marketing/components/navbar";
import { FloatingChatWidget } from "@/features/marketing/components/floating-chat-widget";

export default function HomePage() {
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
