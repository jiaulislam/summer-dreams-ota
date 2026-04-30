"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";

export function LoginForm() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error(t("authError"));
      setLoading(false);
    } else {
      toast.success(t("loginTitle"));
      router.push("/");
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 border rounded-xl shadow-lg bg-white">
      <h1 className="text-3xl font-bold text-center">{t("loginTitle")}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">{t("emailLabel")}</Label>
          <Input id="email" name="email" type="email" required placeholder="admin@example.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{t("passwordLabel")}</Label>
          <Input id="password" name="password" type="password" required />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "..." : t("submitLogin")}
        </Button>
      </form>

      <div className="text-center text-sm text-gray-600">
        {t("noAccount")}{" "}
        <Link href="/signup" className="text-primary font-medium hover:underline">
          {t("gotoSignup")}
        </Link>
      </div>
    </div>
  );
}
