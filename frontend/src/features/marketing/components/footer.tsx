"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  Globe,
  Send,
  Camera,
  Play,
  Phone,
  Map,
  ArrowUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function Footer() {
  const t = useTranslations("Footer");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-secondary text-white py-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tighter">
                SUMMER<span className="text-brand-accent">DREAMS</span>
              </span>
            </Link>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start space-x-3">
                <Map size={20} className="text-brand-accent shrink-0 mt-1" />
                <p>123 Travel Tower, Dhaka, Bangladesh</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-brand-accent shrink-0" />
                <p>+880 1234 567890</p>
              </div>
            </div>
            <div className="flex space-x-4">
              {[Globe, Send, Camera, Play].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-accent transition-colors duration-300"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Discover */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-widest text-brand-accent border-l-4 border-brand-accent pl-3">
              {t("discover")}
            </h3>
            <ul className="space-y-4 text-gray-400">
              {["aboutUs", "blogs", "contact"].map((key) => (
                <li key={key}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-widest text-brand-accent border-l-4 border-brand-accent pl-3">
              {t("support")}
            </h3>
            <ul className="space-y-4 text-gray-400">
              {["faq", "privacy", "refund"].map((key) => (
                <li key={key}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Travel */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-widest text-brand-accent border-l-4 border-brand-accent pl-3">
              {t("travel")}
            </h3>
            <ul className="space-y-4 text-gray-400">
              {["flightBooking", "hotelBooking", "emi"].map((key) => (
                <li key={key}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Summer Dreams Travel Agency SAC. All rights reserved.
        </div>
      </div>

      {/* Back to Top Button */}
      <Button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 h-12 w-12 rounded-full bg-brand-primary hover:bg-brand-accent text-white shadow-2xl transition-all duration-500 z-50 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ArrowUp size={24} />
      </Button>
    </footer>
  );
}
