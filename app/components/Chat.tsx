"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  Terminal,
  Send,
  Bot,
  User,
  X,
  Maximize2,
  Minimize2,
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
  "What is CivicAI?",
];

/* ────────────────────────────────────────────────────
   Component — the assistant, queried from anywhere
──────────────────────────────────────────────────── */
export default function Chat() {
  const [open, setOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasOpened, setHasOpened] = useState(false);
  const chatPanelRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    const listener = () => setOpen(true);
    window.addEventListener("open-assistant", listener);
    return () => window.removeEventListener("open-assistant", listener);
  }, []);

  useEffect(() => {
    if (open) setHasOpened(true);
  }, [open]);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
          content: `⚠ ${err instanceof Error ? err.message : "Unknown error. Please try again."}`,
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
      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <AnimatePresence>
          {!open && !hasOpened && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: 3, duration: 0.5 }}
              className="hidden sm:flex items-center gap-2 forge-panel px-3 py-2 rounded-sm"
            >
              <span className="pulse-dot" />
              <span className="font-mono text-[10px] text-ink-muted whitespace-nowrap">
                Query the AI assistant
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          id="chat-fab"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.5, type: "spring" }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpen}
          className={`w-14 h-14 rounded-full bg-accent-orange text-board-black flex items-center justify-center shadow-orange-glow transition-all ${open ? "hidden" : "flex"}`}
          aria-label="Open the AI assistant"
        >
          <Terminal size={22} />
        </motion.button>
      </div>

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
            className={`fixed bottom-6 right-6 z-50 flex flex-col forge-panel rounded-sm shadow-orange-glow transition-all duration-300 ${
              isMaximized
                ? "w-[800px] max-w-[calc(100vw-2rem)] h-[80vh] max-h-[calc(100vh-2rem)]"
                : "w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)]"
            }`}
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2.5 border-b border-board-line">
              <Terminal size={13} className="text-accent-orange" />
              <span className="font-sans text-[11px] text-ink-muted uppercase tracking-widest flex-1">
                System Query — Ask Vandan
              </span>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="text-ink-subtle hover:text-accent-orange transition-colors p-1"
                aria-label={isMaximized ? "Restore chat" : "Maximize chat"}
              >
                {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-ink-subtle hover:text-accent-orange transition-colors p-1"
                aria-label="Close chat"
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-scroll">
              {messages.length === 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-accent-orange/15 border border-accent-orange/40 flex items-center justify-center flex-shrink-0">
                      <Bot size={12} className="text-accent-orange" />
                    </div>
                    <div className="bg-board-black border border-board-line rounded-sm rounded-tl-none p-3 text-sm text-ink-body/90 max-w-[85%]">
                      <p className="font-mono text-xs text-accent-orange mb-1">
                        query accepted.
                      </p>
                      <p>
                        Hi! I&apos;m Vandan&apos;s AI assistant. Ask me anything about his
                        projects, experience, or skills.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="font-mono text-xs text-ink-subtle mb-2">
                      suggested queries:
                    </p>
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="w-full text-left font-mono text-xs px-3 py-2 rounded-sm border border-board-line text-ink-muted hover:border-accent-orange/40 hover:text-accent-orange hover:bg-accent-orange/5 transition-all"
                      >
                        <span className="text-accent-orange mr-2">›</span>
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

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
                        ? "bg-board-black border border-board-line"
                        : "bg-accent-orange/15 border border-accent-orange/40"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={12} className="text-ink-muted" />
                    ) : (
                      <Bot size={12} className="text-accent-orange" />
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] min-w-0 break-words rounded-sm p-3 text-sm ${
                      msg.role === "user"
                        ? "bg-board-black border border-board-line text-ink-body rounded-tr-none"
                        : "bg-board-black border border-accent-orange/20 text-ink-body/90 rounded-tl-none"
                    }`}
                  >
                    <div className="chat-message-content">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                    <div className="font-mono text-xs text-ink-subtle mt-1.5">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent-orange/15 border border-accent-orange/40 flex items-center justify-center flex-shrink-0">
                    <Bot size={12} className="text-accent-orange" />
                  </div>
                  <div className="bg-board-black border border-board-line rounded-sm rounded-tl-none p-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 rounded-full bg-accent-orange"
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
              className="flex-shrink-0 border-t border-board-line p-3 flex items-center gap-2"
            >
              <Terminal size={13} className="text-accent-orange flex-shrink-0" />
              <input
                id="chat-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ask me anything..."
                maxLength={500}
                disabled={loading}
                className="flex-1 bg-transparent font-mono text-sm text-ink-body placeholder-ink-subtle outline-none disabled:opacity-40"
                autoComplete="off"
              />
              <button
                id="chat-send"
                type="submit"
                disabled={!input.trim() || loading}
                className="text-accent-orange disabled:text-ink-subtle transition-colors hover:text-accent-heat"
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
