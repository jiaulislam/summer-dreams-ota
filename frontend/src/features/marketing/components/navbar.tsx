"use client";

import { Link } from "@/i18n/routing";
// import { LoginModal } from "@/features/auth/components/login-modal";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logoImg from "../../../../public/summer_dreams.jpg";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 h-20 flex items-center",
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100 h-16"
          : "bg-transparent border-b border-white/10"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className={cn(
            "relative transition-all duration-300 overflow-hidden rounded-full",
            isScrolled ? "h-10 w-10" : "h-12 w-12"
          )}>
            <Image
              src={logoImg}
              alt="Summer Dreams Logo"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <span className={cn(
            "text-xl font-black tracking-tighter transition-colors duration-300",
            isScrolled ? "text-gray-900" : "text-white"
          )}>
            SUMMER <span className="text-brand-primary">DREAMS</span> <span>TRAVEL</span>
          </span>
        </Link>

        {/* <LoginModal isScrolled={isScrolled} /> */}
      </div>
    </nav>
  );
}
