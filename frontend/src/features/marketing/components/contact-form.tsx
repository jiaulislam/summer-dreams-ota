"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { submitContactForm } from "../api";

export function ContactForm() {
  const t = useTranslations("Contact");

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: (data) => {
      toast.success(data.message || t("success"));
    },
    onError: () => {
      toast.error(t("error"));
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    };

    mutation.mutate(data);
    (e.target as HTMLFormElement).reset();
  };

  const loading = mutation.isPending;

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
