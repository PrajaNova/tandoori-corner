"use client";

import { CalendarDays, MessageSquare, Send, Utensils, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function FloatingChatBot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    [
      {
        text: "Hi! How can I help you today? I can help you place an order or book a table.",
        isUser: false,
      },
    ],
  );
  const [inputValue, setInputValue] = useState("");

  const constraintsRef = useRef(null);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [...prev, { text: inputValue, isUser: true }]);

    // Simple mock responses
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let reply =
        "I can transfer you to our human agent, or you can use the quick actions above.";

      if (
        lowerInput.includes("book") ||
        lowerInput.includes("table") ||
        lowerInput.includes("reserve")
      ) {
        reply =
          "I can help with that! Would you like to book a table for today?";
      } else if (
        lowerInput.includes("order") ||
        lowerInput.includes("food") ||
        lowerInput.includes("menu")
      ) {
        reply =
          "Sure! I can help you place an order. What are you craving today?";
      }

      setMessages((prev) => [...prev, { text: reply, isUser: false }]);
    }, 1000);

    setInputValue("");
  };

  return (
    <div
      ref={constraintsRef}
      className="fixed inset-0 z-50 pointer-events-none pb-safe"
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        className="absolute bottom-6 right-6 pointer-events-auto"
        style={{ touchAction: "none" }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="bg-brand-gold text-brand-dark p-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              <MessageSquare className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-80 cursor-default sm:w-96"
              style={{ maxHeight: "70vh", height: "500px" }}
            >
              <Card className="flex h-full flex-col overflow-hidden rounded-2xl border-brand-gold/30 bg-cream shadow-2xl">
                <div
                  className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between cursor-grab active:cursor-grabbing"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-leaf animate-pulse" />
                    <span className="font-bold font-space">
                      Tandoori Assistant
                    </span>
                  </div>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-accent"
                    size="icon"
                    variant="ghost"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="bg-accent border-b border-border p-3 flex gap-2 overflow-x-auto custom-scrollbar">
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/experience");
                    }}
                    className="shrink-0 rounded-full normal-case tracking-normal"
                    size="sm"
                    variant="outline"
                  >
                    <CalendarDays className="w-3 h-3" /> Book Table
                  </Button>
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/menu");
                    }}
                    className="shrink-0 rounded-full normal-case tracking-normal"
                    size="sm"
                    variant="outline"
                  >
                    <Utensils className="w-3 h-3" /> Order Food
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isUser ? "bg-primary text-primary-foreground rounded-br-none" : "bg-muted text-foreground rounded-bl-none"}`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-accent border-t border-border flex gap-2 items-center">
                  <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="border-none"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    size="icon"
                    variant="ghost"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
