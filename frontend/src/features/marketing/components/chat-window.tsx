"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getChatSession, setChatSession, generateSessionId, type ChatSession } from "@/lib/session";
import { ChatIntroForm } from "./chat-intro-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sendChatMessage, pollChatMessages } from "../api/telegram";

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
  const queryClient = useQueryClient();

  useEffect(() => {
    setSession(getChatSession());
  }, []);

  // Poll for messages using TanStack Query
  const { data: serverMessages } = useQuery({
    queryKey: ["chat-messages", session?.sessionId],
    queryFn: async () => {
      if (!session) return [];
      const response = await pollChatMessages(session.sessionId);
      
      // Handle the Django backend response structure
      // We expect an array of messages or { success: true, messages: [...] }
      const messageList = Array.isArray(response) ? response : (response.messages || []);
      
      return messageList.map((m: any) => ({
        id: m.id || Math.random(),
        text: m.message_text || m.text || "",
        sender: m.sender === 'agent' ? 'bot' : 'user',
        timestamp: new Date(m.created_at || m.timestamp || Date.now()).getTime()
      })) as Message[];
    },
    enabled: !!session,
    refetchInterval: 3000, // Poll every 3 seconds
  });

  // Send message mutation
  const sendMutation = useMutation({
    mutationFn: (payload: any) => sendChatMessage(payload),
    onSuccess: () => {
      // Invalidate the query to fetch the latest messages immediately
      queryClient.invalidateQueries({ queryKey: ["chat-messages", session?.sessionId] });
    }
  });

  const handleFormSubmit = async (data: { name: string; contact: string }) => {
    const newSession: ChatSession = {
      sessionId: generateSessionId(),
      name: data.name,
      contact: data.contact,
      createdAt: Date.now(),
    };
    setChatSession(newSession);
    setSession(newSession);

    // Send initial lead info to Django
    sendMutation.mutate({
      type: "lead",
      sessionId: newSession.sessionId,
      name: newSession.name,
      contact: newSession.contact,
    });
  };

  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Combine local initial message with server messages
  const messages: Message[] = serverMessages?.length ? serverMessages : [
    {
      id: "initial",
      text: session ? `Hello ${session.name.split(" ")[0]}! How can we help you today?` : "Hello! How can we help you today?",
      sender: "bot",
      timestamp: session ? session.createdAt : Date.now(),
    }
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sendMutation.isPending]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || sendMutation.isPending || !session) return;

    const text = inputValue.trim();
    setInputValue("");

    sendMutation.mutate({
      type: "message",
      message: text,
      sessionId: session.sessionId,
      name: session.name,
    });
  };

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
        <div className="flex-1 flex flex-col min-h-0 animate-in fade-in duration-500">
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
            
            {/* Optimistic UI or Pending State for sent messages */}
            {sendMutation.isPending && sendMutation.variables?.type === "message" && (
              <div className="flex w-full justify-end opacity-50">
                <div className="p-3 rounded-2xl max-w-[85%] text-sm shadow-sm transition-all duration-300 bg-brand-primary text-white rounded-tr-none">
                  <p className="leading-relaxed">{sendMutation.variables.message}</p>
                  <p className="text-[9px] mt-1.5 text-right font-medium">Sending...</p>
                </div>
              </div>
            )}
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
                disabled={sendMutation.isPending}
                className="flex-1 h-11 rounded-full border-gray-200 focus-visible:ring-brand-primary bg-gray-50/30"
              />
              <Button
                type="submit"
                size="icon"
                disabled={sendMutation.isPending || !inputValue.trim()}
                className="rounded-full h-11 w-11 bg-brand-primary hover:bg-brand-primary/90 transition-all active:scale-90 flex-shrink-0"
              >
                {sendMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
