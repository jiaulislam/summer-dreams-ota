"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChatWindow } from "./chat-window";

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-48px)] sm:w-[380px] h-[550px] max-h-[calc(100vh-120px)] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden transition-all duration-500 animate-in fade-in zoom-in-95 slide-in-from-bottom-10">
          <ChatWindow onClose={() => setIsOpen(false)} />
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-16 w-16 rounded-full shadow-[0_10px_30px_rgba(128,0,0,0.3)] transition-all duration-500 hover:scale-110 active:scale-95",
          isOpen
            ? "bg-white text-gray-900 hover:bg-gray-50 rotate-90"
            : "bg-brand-primary text-white hover:bg-brand-primary/90"
        )}
      >
        {isOpen ? <X size={28} strokeWidth={2.5} /> : <MessageCircle size={32} strokeWidth={2.5} />}
      </Button>    </div>
  );
}
