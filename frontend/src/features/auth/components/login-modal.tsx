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

export function LoginModal() {
  const t = useTranslations("Hero");

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-white hover:bg-white/20 border border-white/30 rounded-full px-6 transition-all"
            )}
          >
            {t("signIn")}
          </button>
        }
      />
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white border-none rounded-2xl">
        <LoginForm isModal={true} className="p-6 md:p-8" />
      </DialogContent>
    </Dialog>
  );
}
