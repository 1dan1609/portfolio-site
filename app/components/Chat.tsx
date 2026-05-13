"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  MessageSquare,
  Send,
  Bot,
  User,
} from "lucide-react";

/* ────────────────────────────────────────────────────
   Types
──────────────────────────────────────────────────── */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  "What projects has Vandan built?",
  "Tell me about his cybersecurity experience",
  "What programming languages does he know?",
  "What is GatorGlide?",
];

/* ────────────────────────────────────────────────────
   Component
──────────────────────────────────────────────────── */
export default function Chat() {
  const [open, setOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);

  // Close chat on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        chatPanelRef.current &&
        !chatPanelRef.current.contains(event.target as Node)
      ) {
        const fab = document.getElementById("chat-fab");
        if (fab && fab.contains(event.target as Node)) return;
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;



      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      try {
        const history = messages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Request failed");

        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } catch (err: unknown) {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `⚠️ ${err instanceof Error ? err.message : "Unknown error. Please try again."}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* FAB button */}
      <motion.button
        id="chat-fab"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-terminal-green text-bg-base flex items-center justify-center shadow-glow-green transition-all ${open ? "hidden" : "flex"}`}
        aria-label="Open chat"
      >
        <MessageSquare size={22} />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="chat-panel"
            ref={chatPanelRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed bottom-6 right-6 z-50 flex flex-col terminal-window shadow-glow-green transition-all duration-300 ${
              isMaximized
                ? "w-[800px] max-w-[calc(100vw-2rem)] h-[80vh] max-h-[calc(100vh-2rem)]"
                : "w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)]"
            }`}
          >
            {/* Title bar */}
            <div className="terminal-titlebar flex-shrink-0">
              <button
                onClick={() => setOpen(false)}
                className="terminal-dot bg-[#FF5F57] hover:opacity-80 transition-opacity border-none p-0 cursor-pointer"
                aria-label="Close chat"
              />
              <button
                onClick={() => setOpen(false)}
                className="terminal-dot bg-[#FEBC2E] hover:opacity-80 transition-opacity border-none p-0 cursor-pointer"
                aria-label="Minimize chat"
              />
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="terminal-dot bg-[#28C840] hover:opacity-80 transition-opacity border-none p-0 cursor-pointer"
                aria-label={isMaximized ? "Restore chat" : "Maximize chat"}
              />
              <div className="flex items-center gap-2 ml-3 flex-1">
                <Bot size={13} className="text-terminal-green" />
                <span className="font-mono text-xs text-terminal-muted">
                  ask-vandan.sh
                </span>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-scroll">
              {/* Welcome message */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-terminal-green/20 border border-terminal-green/40 flex items-center justify-center flex-shrink-0">
                      <Bot size={12} className="text-terminal-green" />
                    </div>
                    <div className="bg-bg-elevated border border-bg-border rounded-lg rounded-tl-none p-3 text-sm text-terminal-white/90 max-w-[85%]">
                      <p className="font-mono text-xs text-terminal-green mb-1">
                        $ ./ask-vandan.sh --init
                      </p>
                      <p>
                        Hi! I&apos;m Vandan&apos;s AI assistant. Ask me anything about his
                        projects, experience, or skills.
                      </p>
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div className="space-y-1.5">
                    <p className="font-mono text-xs text-terminal-subtle mb-2">
                      suggested queries:
                    </p>
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="w-full text-left font-mono text-xs px-3 py-2 rounded border border-bg-border text-terminal-muted hover:border-terminal-green/40 hover:text-terminal-green hover:bg-terminal-green/5 transition-all"
                      >
                        <span className="text-terminal-green mr-2">›</span>
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Message list */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === "user"
                        ? "bg-terminal-blue/20 border border-terminal-blue/40"
                        : "bg-terminal-green/20 border border-terminal-green/40"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={12} className="text-terminal-blue" />
                    ) : (
                      <Bot size={12} className="text-terminal-green" />
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-lg p-3 text-sm ${
                      msg.role === "user"
                        ? "bg-terminal-blue/10 border border-terminal-blue/30 text-terminal-white rounded-tr-none"
                        : "bg-bg-elevated border border-bg-border text-terminal-white/90 rounded-tl-none"
                    }`}
                  >
                    <div className="chat-message-content">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                    <div className="font-mono text-xs text-terminal-subtle mt-1.5">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-terminal-green/20 border border-terminal-green/40 flex items-center justify-center flex-shrink-0">
                    <Bot size={12} className="text-terminal-green" />
                  </div>
                  <div className="bg-bg-elevated border border-bg-border rounded-lg rounded-tl-none p-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            delay: i * 0.2,
                          }}
                          className="w-1.5 h-1.5 rounded-full bg-terminal-green"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>



            {/* Input area */}
            <form
              onSubmit={handleSubmit}
              className="flex-shrink-0 border-t border-bg-border p-3 flex items-center gap-2"
            >
              <span className="font-mono text-terminal-green text-sm flex-shrink-0">
                $
              </span>
              <input
                id="chat-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ask me anything..."
                maxLength={500}
                disabled={loading}
                className="flex-1 bg-transparent font-mono text-sm text-terminal-white placeholder-terminal-subtle outline-none disabled:opacity-40"
                autoComplete="off"
              />
              <button
                id="chat-send"
                type="submit"
                disabled={!input.trim() || loading}
                className="text-terminal-green disabled:text-terminal-subtle transition-colors hover:text-terminal-green-dim"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
