"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { ShieldCheck, CalendarClock, Zap } from "lucide-react";

export function WhyChooseUs() {
  const t = useTranslations("WhyChooseUs");

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Column A: Featured Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-[40px] overflow-hidden border-8 border-brand-primary/10 shadow-[0_0_50px_rgba(128,0,0,0.15)] group">
              <Image
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8df6?auto=format&fit=crop&q=80&w=2070"
                alt="Why Choose Us"
                width={800}
                height={1000}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Glowing Accent */}
            <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-[80px]" />
            <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-[80px]" />
          </div>

          {/* Column B: Accordion */}
          <div className="space-y-8 order-1 lg:order-2 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
                {t("title")}
              </h2>
              <div className="h-1.5 w-20 bg-brand-primary rounded-full mx-auto lg:mx-0" />
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4 border-none">
              <AccordionItem value="trusted" className="border rounded-2xl px-6 py-2 shadow-sm data-[state=open]:border-brand-primary/30 data-[state=open]:bg-brand-primary/5 transition-all duration-300">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      <ShieldCheck size={24} />
                    </div>
                    <span className="text-xl font-bold text-gray-800">{t("trustedBrand")}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 text-lg leading-relaxed pb-6 pl-14">
                  {t("trustedBrandDesc")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="booknow" className="border rounded-2xl px-6 py-2 shadow-sm data-[state=open]:border-brand-primary/30 data-[state=open]:bg-brand-primary/5 transition-all duration-300">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      <CalendarClock size={24} />
                    </div>
                    <span className="text-xl font-bold text-gray-800">{t("bookNowPayLater")}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 text-lg leading-relaxed pb-6 pl-14">
                  {t("bookNowPayLaterDesc")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="checkout" className="border rounded-2xl px-6 py-2 shadow-sm data-[state=open]:border-brand-primary/30 data-[state=open]:bg-brand-primary/5 transition-all duration-300">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      <Zap size={24} />
                    </div>
                    <span className="text-xl font-bold text-gray-800">{t("seamlessCheckout")}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 text-lg leading-relaxed pb-6 pl-14">
                  {t("seamlessCheckoutDesc")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
