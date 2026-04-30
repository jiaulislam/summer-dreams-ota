"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export default function SignupPage() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch(`${API_BASE_URL}/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        toast.success(t("signupTitle"));
        router.push("/login");
      } else {
        const error = await res.json().catch(() => ({}));
        toast.error(error.message || t("signupError"));
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(t("signupError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-6 border rounded-xl shadow-lg bg-white">
        <h1 className="text-3xl font-bold text-center">{t("signupTitle")}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("nameLabel")}</Label>
            <Input id="name" name="name" type="text" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("emailLabel")}</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("passwordLabel")}</Label>
            <Input id="password" name="password" type="password" required />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "..." : t("submitSignup")}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          {t("hasAccount")}{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            {t("gotoLogin")}
          </Link>
        </div>
      </div>
    </div>
  );
}
