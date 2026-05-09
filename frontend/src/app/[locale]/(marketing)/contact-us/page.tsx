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
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Navbar />

      {/* Themed Header */}
      <header className="bg-brand-secondary pt-40 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-accent rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase">
              {t("title")}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </header>

      <main className="grow py-16 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
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
