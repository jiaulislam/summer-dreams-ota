"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { API_URL } from "@/lib/constants";
import { Eye, EyeOff } from "lucide-react";

export function SignupForm() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("first_name") as string;
    const lastName = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch(`${API_URL}/auth/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password
        }),
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
    <div className="w-full max-w-md p-8 space-y-6 border rounded-xl shadow-lg bg-white">
      <h1 className="text-3xl font-bold text-center">{t("signupTitle")}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">{t("firstNameLabel")}</Label>
            <Input id="first_name" name="first_name" type="text" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">{t("lastNameLabel")}</Label>
            <Input id="last_name" name="last_name" type="text" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("emailLabel")}</Label>
          <Input id="email" name="email" type="email" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{t("passwordLabel")}</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
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
  );
}
