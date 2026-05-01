"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Home, Map } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-brand-secondary">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=2070"
          alt="404 Background"
          fill
          className="object-cover opacity-20 blur-sm"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-secondary/90 to-brand-secondary" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white/10">
          <div className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
            {/* 404 Visual */}
            <div className="relative">
              <span className="text-9xl font-black text-gray-100 select-none">404</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-xl">
                  <Map size={40} strokeWidth={1.5} className="animate-bounce" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight text-balance">
                Lost in Paradise?
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed max-w-xs mx-auto text-balance">
                The page you are looking for has either drifted away or never existed. Let's get you back on track.
              </p>
            </div>

            <div className="flex flex-col w-full pt-4">
              <Button
                render={<Link href="/" />}
                size="lg"
                className="w-full rounded-full bg-brand-primary hover:bg-brand-primary/90 h-14 text-lg font-bold"
              >
                <Home size={20} className="mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>

        {/* Branding Footer */}
        <div className="mt-8 text-center">
            <span className="text-white/60 font-bold tracking-tighter text-xl uppercase">
                SUMMER<span className="text-brand-accent">DREAMS</span>
            </span>
        </div>
      </div>
    </div>
  );
}
