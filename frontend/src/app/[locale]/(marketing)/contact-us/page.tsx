"use client";

import { useTranslations } from "next-intl";
import { Navbar } from "@/features/marketing/components/navbar";
import { Footer } from "@/features/marketing/components/footer";
import { FloatingChatWidget } from "@/features/marketing/components/floating-chat-widget";
import { ContactForm } from "@/features/marketing/components/contact-form";
import { ContactInfo } from "@/features/marketing/components/contact-info";
import { useQuery } from "@tanstack/react-query";
import { getLandingPageData } from "@/features/marketing/api";
import { Loader2 } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("Contact");

  const { data, isLoading } = useQuery({
    queryKey: ["landing-page"],
    queryFn: () => getLandingPageData(),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 mb-6 uppercase">
              {t("title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
            {/* Contact Form Section */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
               <ContactForm />
            </div>

            {/* Contact Info Section */}
            <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
               <ContactInfo agency={data?.agency} />
            </div>
          </div>
        </div>
      </main>
      <Footer agency={data?.agency} />
      <FloatingChatWidget />
    </div>
  );
}
