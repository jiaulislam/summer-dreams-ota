"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("Contact");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    // This will be replaced with real API call in Phase 3
    console.log("Contact form submission:", data);

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(t("success"));
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error(t("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">{t("nameLabel")}</Label>
        <Input
          id="name"
          name="name"
          required
          placeholder={t("namePlaceholder")}
          className="bg-gray-50/50"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">{t("emailLabel")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t("emailPlaceholder")}
            className="bg-gray-50/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t("phoneLabel")}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder={t("phonePlaceholder")}
            className="bg-gray-50/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t("messageLabel")}</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder={t("messagePlaceholder")}
          className="min-h-[150px] bg-gray-50/50 resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-12 text-lg font-bold transition-all active:scale-[0.98]"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {t("sending")}
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            {t("submit")}
          </>
        )}
      </Button>
    </form>
  );
}
