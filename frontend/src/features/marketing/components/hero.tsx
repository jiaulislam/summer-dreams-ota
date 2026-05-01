"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

interface HeroProps {
  children?: React.ReactNode;
}

export function Hero({ children }: HeroProps) {
  const t = useTranslations("Hero");

  return (
    <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden">
      {/* Full-bleed Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109c05d?auto=format&fit=crop&q=80&w=2070"
          alt="Travel Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Glassmorphism Header */}
      <header className="relative z-20 w-full backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tighter text-white">
              SUMMER<span className="text-brand-accent">DREAMS</span>
            </span>
          </Link>

          <Button
            asChild
            variant="ghost"
            className="text-white hover:bg-white/20 border border-white/30 rounded-full px-6"
          >
            <Link href="/login">{t("signIn")}</Link>
          </Button>
        </div>
      </header>

      {/* Hero Content / Widget Container */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center pt-16">
        <div className="w-full flex flex-col items-center space-y-8">
          {children}
        </div>
      </div>
    </section>
  );
}
