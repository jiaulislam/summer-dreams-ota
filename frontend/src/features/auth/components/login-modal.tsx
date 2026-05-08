"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "./login-form";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoginModalProps {
  isScrolled?: boolean;
}

export function LoginModal({ isScrolled }: LoginModalProps) {
  const t = useTranslations("Hero");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "rounded-full px-6 transition-all duration-300",
            isScrolled
              ? "text-gray-900 hover:bg-gray-100 border-gray-200"
              : "text-white hover:bg-white/20 border-white/30"
          )}
        >
          {t("signIn")}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white border-none rounded-2xl">
        <LoginForm isModal={true} className="p-6 md:p-8" />
      </DialogContent>
    </Dialog>
  );
}
