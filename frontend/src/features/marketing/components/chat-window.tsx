"use client";

import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatWindowProps {
  onClose: () => void;
}

export function ChatWindow({ onClose }: ChatWindowProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 bg-brand-primary text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="font-bold">SD</span>
          </div>
          <div>
            <h3 className="font-bold text-sm">Summer Dreams Support</h3>
            <p className="text-[10px] text-white/80 uppercase tracking-widest font-bold">Online</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-white/10 p-1 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        <div className="flex justify-start">
          <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none max-w-[80%] shadow-sm">
            <p className="text-sm text-gray-800">
              Hello! How can we help you today?
            </p>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Type your message..."
            className="flex-1 rounded-full border-gray-200 focus-visible:ring-brand-primary"
          />
          <Button size="icon" className="rounded-full h-10 w-10 bg-brand-primary hover:bg-brand-primary/90">
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
