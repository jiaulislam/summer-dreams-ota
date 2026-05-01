"use client";

import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ShieldAlert } from "lucide-react";
import Image from "next/image";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, { title: string; description: string }> = {
    Configuration: {
      title: "Server Error",
      description: "There is a problem with the server configuration. Please try again later.",
    },
    AccessDenied: {
      title: "Access Denied",
      description: "You do not have permission to sign in. Please contact support if you believe this is an error.",
    },
    Verification: {
      title: "Link Expired",
      description: "The sign-in link has expired or has already been used.",
    },
    Default: {
      title: "Something went wrong",
      description: "An unexpected authentication error occurred. Please try again.",
    },
  };

  const { title, description } = errorMessages[error as string] || errorMessages.Default;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-brand-secondary">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=2070"
          alt="Error Background"
          fill
          className="object-cover opacity-30 blur-sm"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-secondary/80 to-brand-secondary" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white/10">
          <div className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
            {/* Icon Circle */}
            <div className="h-24 w-24 rounded-full bg-red-50 flex items-center justify-center text-brand-primary animate-pulse">
              {error === "AccessDenied" ? (
                <ShieldAlert size={48} strokeWidth={1.5} />
              ) : (
                <AlertCircle size={48} strokeWidth={1.5} />
              )}
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-black text-gray-900 tracking-tight text-balance">
                {title}
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed max-w-xs mx-auto">
                {description}
              </p>
            </div>

            <div className="flex flex-col w-full space-y-3 pt-4">
              <Button
                render={<Link href="/login" />}
                size="lg"
                className="w-full rounded-full bg-brand-primary hover:bg-brand-primary/90 h-14 text-lg font-bold"
              >
                Try Again
              </Button>

              <Button
                render={<Link href="/" />}
                variant="ghost"
                size="lg"
                className="w-full rounded-full h-14 text-gray-500 hover:text-gray-900"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Home size={20} />
                  <span>Back to Home</span>
                </div>
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-4 border-t text-center text-xs text-gray-400 font-medium">
            Error Code: <span className="uppercase text-red-400">{error || "Unknown"}</span>
          </div>
        </div>

        {/* Branding Footer */}
        <div className="mt-8 text-center">
            <span className="text-white/60 font-bold tracking-tighter text-xl uppercase">
                SUMMER<span className="text-brand-accent">DREAMS</span>
            </span>
        </div>
      </div>
    </div>
  );
}
