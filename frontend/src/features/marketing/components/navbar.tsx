"use client";

import { Link } from "@/i18n/routing";
import { LoginModal } from "@/features/auth/components/login-modal";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tighter text-white">
            SUMMER<span className="text-brand-accent">DREAMS</span>
          </span>
        </Link>

        <LoginModal />
      </div>
    </nav>
  );
}
