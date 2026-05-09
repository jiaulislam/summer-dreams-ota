"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import logoImg from "../../../../public/summer_dreams.jpg";
import {
  Globe,
  Send,
  Camera,
  Play,
  Phone,
  Map,
  ArrowUp,
  Mail,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface FooterProps {
  agency?: {
    address: string;
    phone: string;
    email: string;
    facebook_url: string;
    instagram_url: string;
    linkedin_url: string;
  };
}

export function Footer({ agency }: FooterProps) {
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

  const address = agency?.address || "123 Travel Tower, Dhaka, Bangladesh";
  const phone = agency?.phone || "+880 1234 567890";
  const email = agency?.email || "contact@summerdreams.com";

  return (
    <footer className="bg-brand-secondary text-white py-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative h-12 w-12 rounded-full overflow-hidden bg-white">
                <Image
                  src={logoImg}
                  alt="Summer Dreams Logo"
                  placeholder="blur"
                  className="object-contain p-1"
                />
              </div>
              <span className="text-2xl font-bold tracking-tighter group-hover:text-brand-accent transition-colors">
                SUMMER<span className="text-brand-accent">DREAMS</span> <span>TRAVEL</span>
              </span>
            </Link>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start space-x-3">
                <Map size={20} className="text-brand-accent shrink-0 mt-1" />
                <p>{address}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-brand-accent shrink-0" />
                <p>{phone}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-brand-accent shrink-0" />
                <p>{email}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              {agency?.facebook_url && (
                <Link href={agency.facebook_url} target="_blank" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-accent transition-colors duration-300">
                  <FaFacebookF size={18} />
                </Link>
              )}
              {agency?.instagram_url && (
                <Link href={agency.instagram_url} target="_blank" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-accent transition-colors duration-300">
                  <FaInstagram size={20} />
                </Link>
              )}
              {agency?.linkedin_url && (
                <Link href={agency.linkedin_url} target="_blank" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-accent transition-colors duration-300">
                  <FaLinkedinIn size={18} />
                </Link>
              )}
              {!agency && [Globe, Send, Camera, Play].map((Icon, i) => (
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
                  <Link
                    href={key === "contact" ? "/contact-us" : "#"}
                    className="hover:text-white transition-colors"
                  >
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
