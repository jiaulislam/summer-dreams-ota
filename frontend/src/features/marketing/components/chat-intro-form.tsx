"use client";

import { useState } from "react";
import { User, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ChatIntroFormProps {
  onSubmit: (data: { name: string; contact: string }) => void;
}

export function ChatIntroForm({ onSubmit }: ChatIntroFormProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && contact.trim()) {
      onSubmit({ name, contact });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">Welcome to Summer Dreams!</h3>
        <p className="text-sm text-gray-500">Please provide your details to start chatting with our support team.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-500">Your Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="pl-10 h-12 bg-gray-50/50 border-gray-200 focus-visible:ring-brand-primary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact" className="text-xs font-bold uppercase tracking-wider text-gray-500">Contact Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="contact"
              placeholder="+51 987 654 321"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              className="pl-10 h-12 bg-gray-50/50 border-gray-200 focus-visible:ring-brand-primary"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-xl shadow-lg shadow-brand-primary/20 transition-all active:scale-[0.98]"
          disabled={!name.trim() || !contact.trim()}
        >
          Start Chatting
          <Send className="ml-2" size={18} />
        </Button>
      </form>

      <div className="pt-4 text-center mt-auto">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">
          Secure & Private Messaging
        </p>
      </div>
    </div>
  );
}
