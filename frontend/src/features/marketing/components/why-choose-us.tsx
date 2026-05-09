"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { ShieldCheck, CalendarClock, Zap, HelpCircle } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  "icon-1": ShieldCheck,
  "icon-2": CalendarClock,
  "icon-3": Zap,
};

interface WhyChooseUsProps {
  data?: {
    section_title: string;
    featured_image: string;
    items: Array<{
      icon_slug: string;
      title: string;
      description: string;
    }>;
  };
}

export function WhyChooseUs({ data }: WhyChooseUsProps) {
  const t = useTranslations("WhyChooseUs");

  const title = data?.section_title || t("title");
  const featuredImage = data?.featured_image || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2070";
  const items = data?.items || [
    { icon_slug: "icon-1", title: t("trustedBrand"), description: t("trustedBrandDesc") },
    { icon_slug: "icon-2", title: t("bookNowPayLater"), description: t("bookNowPayLaterDesc") },
    { icon_slug: "icon-3", title: t("seamlessCheckout"), description: t("seamlessCheckoutDesc") },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Column A: Featured Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-[40px] overflow-hidden border-8 border-brand-primary/10 shadow-[0_0_50px_rgba(128,0,0,0.15)] group">
              <Image
                src={featuredImage}
                alt="Why Choose Us"
                width={800}
                height={1000}
                sizes="(max-width: 1024px) 100vw, 50vw"
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
                {title}
              </h2>
              <div className="h-1.5 w-20 bg-brand-primary rounded-full mx-auto lg:mx-0" />
            </div>

            <Accordion className="w-full space-y-4">
              {items.map((item, idx) => {
                const Icon = ICON_MAP[item.icon_slug] || HelpCircle;
                return (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    className="border rounded-2xl px-6 py-2 shadow-sm data-[state=open]:border-brand-primary/30 data-[state=open]:bg-brand-primary/5 transition-all duration-300"
                  >
                    <AccordionTrigger className="hover:no-underline py-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                          <Icon size={24} />
                        </div>
                        <span className="text-xl font-bold text-gray-800">{item.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500 text-lg leading-relaxed pb-6 pl-14">
                      {item.description}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
