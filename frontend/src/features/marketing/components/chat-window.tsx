"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getChatSession, setChatSession, generateSessionId, type ChatSession } from "@/lib/session";
import { ChatIntroForm } from "./chat-intro-form";

interface Message {
  id: string | number;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
}

interface ChatWindowProps {
  onClose: () => void;
}

export function ChatWindow({ onClose }: ChatWindowProps) {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      text: "Hello! How can we help you today?",
      sender: "bot",
      timestamp: Date.now(),
    },
  ]);

  useEffect(() => {
    setSession(getChatSession());
  }, []);

  const handleFormSubmit = async (data: { name: string; contact: string }) => {
    const newSession: ChatSession = {
      sessionId: generateSessionId(),
      name: data.name,
      contact: data.contact,
      createdAt: Date.now(),
    };
    setChatSession(newSession);
    setSession(newSession);

    // Update initial message to be more personal
    setMessages([
      {
        id: "initial",
        text: `Hello ${data.name.split(" ")[0]}! How can we help you today?`,
        sender: "bot",
        timestamp: Date.now(),
      },
    ]);

    // Send initial lead info to Telegram
    try {
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "lead",
          sessionId: newSession.sessionId,
          name: newSession.name,
          contact: newSession.contact,
        }),
      });
    } catch (error) {
      console.error("Error sending lead notification:", error);
    }
  };

  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastUpdateIdRef = useRef<number>(0);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isSending || !session) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsSending(true);

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.text,
          sessionId: session.sessionId,
          name: session.name,
        }),
      });

      if (!response.ok) throw new Error("Failed to send");
    } catch (error) {
      console.error("Error sending message:", error);
      // Optional: Add an error message to the UI
    } finally {
      setIsSending(false);
    }
  };

  const fetchUpdates = useCallback(async () => {
    if (!session) return;

    try {
      const response = await fetch(`/api/telegram?sessionId=${session.sessionId}`);
      const data = await response.json();

      if (data.success && data.messages) {
        const newBotMessages: Message[] = data.messages
          .filter((update: any) => update.update_id > lastUpdateIdRef.current)
          .map((update: any) => {
            lastUpdateIdRef.current = Math.max(lastUpdateIdRef.current, update.update_id);

            // Strip the prefix from the display text if present
            let text = update.message.text || "";
            const prefix = `[ID: ${session.sessionId}]`;
            if (text.includes(prefix)) {
              text = text.split(prefix).pop()?.trim() || text;
            }

            return {
              id: update.update_id,
              text,
              sender: "bot",
              timestamp: update.message.date * 1000,
            };
          });

        if (newBotMessages.length > 0) {
          setMessages((prev) => [...prev, ...newBotMessages]);
        }
      }
    } catch (error) {
      console.error("Error fetching updates:", error);
    }
  }, [session]);


  // Poll for updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(fetchUpdates, 5000);
    return () => clearInterval(interval);
  }, [fetchUpdates]);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 bg-brand-primary text-white flex items-center justify-between shadow-lg z-10">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center border border-white/10">
            <span className="font-bold">SD</span>
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-tight">Summer Dreams Support</h3>
            <div className="flex items-center space-x-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                <p className="text-[10px] text-white/80 uppercase tracking-widest font-black">Live Support</p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-white/10 p-1.5 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {!session ? (
        <ChatIntroForm onSubmit={handleFormSubmit} />
      ) : (
        <>
          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scroll-smooth custom-scrollbar"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex w-full",
                  msg.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "p-3 rounded-2xl max-w-[85%] text-sm shadow-sm transition-all duration-300",
                    msg.sender === "user"
                      ? "bg-brand-primary text-white rounded-tr-none"
                      : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
                  )}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <p className={cn(
                    "text-[9px] mt-1.5 opacity-60 font-medium",
                    msg.sender === "user" ? "text-right" : "text-left"
                  )}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isSending}
                className="flex-1 h-11 rounded-full border-gray-200 focus-visible:ring-brand-primary bg-gray-50/30"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isSending || !inputValue.trim()}
                className="rounded-full h-11 w-11 bg-brand-primary hover:bg-brand-primary/90 transition-all active:scale-90 flex-shrink-0"
              >
                {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
