import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAction } from "convex/react";
import { ArrowUp, RotateCcw, Sparkles, X } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const GREETING_ID = "greeting";

const GREETING: ChatMessage = {
  id: GREETING_ID,
  role: "assistant",
  content:
    "Hey, I'm TR — Techrudra Studio's assistant. Ask me about services, pricing, timelines or how to start a project.",
};

const STARTERS = [
  "What can you build for me?",
  "How much does an AI chatbot cost?",
  "How do I book a call?",
];

function Bubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
          isUser
            ? "rounded-br-md bg-[#A78BFA] text-[#120C22] font-medium"
            : "rounded-bl-md border border-white/10 bg-white/[0.04] text-white/85",
        )}
      >
        {message.content}
      </div>
    </div>
  );
}

function TypingDot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="size-1.5 rounded-full bg-[#A78BFA]"
      animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
    />
  );
}

/**
 * Floating studio assistant.
 *
 * The browser never holds an API key: every turn goes through the Convex
 * `chat.reply` action, which calls the AI gateway server-side.
 */
export function StudioChat() {
  const sendReply = useAction(api.chat.reply);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, pending, error, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = async (raw: string) => {
    const text = raw.trim();
    if (!text || pending) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };
    const next = [...messages, userMessage];

    setMessages(next);
    setDraft("");
    setError(null);
    setPending(true);

    try {
      const result = await sendReply({
        messages: next
          .filter((m) => m.id !== GREETING_ID)
          .map((m) => ({ role: m.role, content: m.content })),
      });

      if (result.ok) {
        setMessages((prev) => [
          ...prev,
          { id: `assistant-${Date.now()}`, role: "assistant", content: result.text },
        ]);
      } else {
        setError(result.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("The assistant is unreachable right now. Email TRStudio@gmail.com and we'll reply personally.");
    } finally {
      setPending(false);
    }
  };

  const reset = () => {
    setMessages([GREETING]);
    setDraft("");
    setError(null);
    inputRef.current?.focus();
  };

  const showStarters = messages.length === 1 && !pending;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Techrudra Studio assistant"
            className="fixed bottom-24 right-4 z-[90] flex h-[min(560px,72vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0F]/95 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:right-6"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#A78BFA]/12 to-transparent" />

            <header className="relative flex items-center gap-3 border-b border-white/[0.07] px-4 py-3.5">
              <span className="relative flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#A78BFA] to-[#60A5FA] text-[#0B0B0F]">
                <Sparkles className="size-4" strokeWidth={2.2} />
                <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-[#0B0B0F] bg-emerald-400" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">TR Assistant</p>
                <p className="text-[11px] text-white/45">Powered by AI · replies in seconds</p>
              </div>
              <button
                type="button"
                onClick={reset}
                aria-label="Start a new chat"
                className="rounded-full p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white/80"
              >
                <RotateCcw className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="rounded-full p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white/80"
              >
                <X className="size-4" />
              </button>
            </header>

            <div ref={scrollRef} className="relative flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <Bubble key={message.id} message={message} />
              ))}

              {pending && (
                <div className="flex w-full justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-3.5 py-3">
                    <TypingDot delay={0} />
                    <TypingDot delay={0.15} />
                    <TypingDot delay={0.3} />
                  </div>
                </div>
              )}

              {error && (
                <p
                  role="status"
                  className="rounded-xl border border-rose-400/20 bg-rose-400/[0.06] px-3 py-2 text-[12px] leading-relaxed text-rose-200/90"
                >
                  {error}
                </p>
              )}

              {showStarters && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {STARTERS.map((starter) => (
                    <button
                      key={starter}
                      type="button"
                      onClick={() => void ask(starter)}
                      className="rounded-full border border-[#A78BFA]/25 bg-[#A78BFA]/[0.07] px-3 py-1.5 text-[11.5px] text-[#C4B5FD] transition-colors hover:border-[#A78BFA]/50 hover:bg-[#A78BFA]/15 hover:text-white"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                void ask(draft);
              }}
              className="relative border-t border-white/[0.07] p-3"
            >
              <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-1.5 focus-within:border-[#A78BFA]/40">
                <textarea
                  ref={inputRef}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void ask(draft);
                    }
                  }}
                  rows={1}
                  maxLength={1200}
                  placeholder="Ask about services, pricing, timelines…"
                  aria-label="Message the studio assistant"
                  className="max-h-28 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-[13px] text-white/90 outline-none placeholder:text-white/30"
                />
                <button
                  type="submit"
                  disabled={pending || draft.trim().length === 0}
                  aria-label="Send message"
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#A78BFA] text-[#120C22] transition-opacity disabled:opacity-35"
                >
                  <ArrowUp className="size-4" strokeWidth={2.6} />
                </button>
              </div>
              <p className="mt-2 px-1 text-[10.5px] text-white/25">
                AI can make mistakes — confirm details before booking.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        aria-expanded={open}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-5 right-4 z-[90] flex h-12 items-center gap-2 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#7C5CFA] px-4 text-[13px] font-semibold text-[#120C22] shadow-[0_12px_40px_-12px_rgba(167,139,250,0.9)] sm:right-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
            >
              <X className="size-4" strokeWidth={2.6} />
            </motion.span>
          ) : (
            <motion.span
              key="spark"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
            >
              <Sparkles className="size-4" strokeWidth={2.6} />
            </motion.span>
          )}
        </AnimatePresence>
        <span>{open ? "Close" : "Ask TR"}</span>
      </motion.button>
    </>
  );
}

export default StudioChat;
