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
        <div className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-4">
          <ChatWindow onClose={() => setIsOpen(false)} />
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-16 w-16 rounded-full shadow-2xl transition-all duration-300",
          isOpen
            ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
            : "bg-brand-primary text-white hover:bg-brand-primary/90"
        )}
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
      </Button>
    </div>
  );
}
