"use client";

import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface ContactInfoProps {
  agency?: {
    address: string;
    phone: string;
    email: string;
    whatsapp?: string;
  };
}

export function ContactInfo({ agency }: ContactInfoProps) {
  const t = useTranslations("Contact");

  const address = agency?.address || "123 Travel Tower, Dhaka, Bangladesh";
  const phone = agency?.phone || "+880 1234 567890";
  const email = agency?.email || "contact@summerdreams.com";
  const whatsapp = agency?.whatsapp || "8801234567890";

  const handleWhatsappRedirect = () => {
    window.open(`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`, "_blank");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("infoTitle")}</h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
              <MapPin className="text-brand-primary" size={20} />
            </div>
            <div>
              <p className="font-bold text-gray-900">{t("addressLabel")}</p>
              <p className="text-gray-600">{address}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
              <Phone className="text-brand-primary" size={20} />
            </div>
            <div>
              <p className="font-bold text-gray-900">{t("phoneLabel")}</p>
              <p className="text-gray-600">{phone}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
              <Mail className="text-brand-primary" size={20} />
            </div>
            <div>
              <p className="font-bold text-gray-900">{t("emailLabel")}</p>
              <p className="text-gray-600">{email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-gray-100">
        <Button
          onClick={handleWhatsappRedirect}
          className="w-full h-14 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg rounded-xl shadow-lg shadow-green-200 transition-all active:scale-[0.98] flex items-center justify-center space-x-3"
        >
          <FaWhatsapp size={24} />
          <span>{t("whatsappButton")}</span>
        </Button>
      </div>
    </div>
  );
}
