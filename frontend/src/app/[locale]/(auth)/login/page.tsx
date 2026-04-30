"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("Auth");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-6 border rounded-xl shadow-lg bg-white">
        <h1 className="text-3xl font-bold text-center">{t("loginTitle")}</h1>
        <div className="space-y-4">
          <Button
            className="w-full"
            onClick={() => signIn("credentials", { email: "admin@example.com", password: "password", redirectTo: "/" })}
          >
            {t("loginAsAdmin")}
          </Button>
        </div>
      </div>
    </div>
  );
}
