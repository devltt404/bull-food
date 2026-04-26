import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Suggest featured events next week",
  "Any lunch events tomorrow?",
  "Are there any events happening right now?",
  "Upcoming sport events with food",
];

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const openChat = () => { setIsVisible(true); setIsOpen(true); };
  const closeChat = () => { setIsOpen(false); };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeChat();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const sendMessage = async (override?: string) => {
    const text = override ?? input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages([...newMessages, { role: "assistant", content: "" }]);
    if (!override) setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok || !response.body) throw new Error("Request failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value).split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const { content } = JSON.parse(data) as { content: string };
            if (content) {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  content: updated[updated.length - 1].content + content,
                };
                return updated;
              });
            }
          } catch {
            // ignore malformed chunks
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={containerRef}>
      {/* FAB */}
      <button
        onClick={() => (isOpen ? closeChat() : openChat())}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <span className={cn("absolute transition-all duration-200", isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0")}>
          <X className="size-5" />
        </span>
        <span className={cn("absolute transition-all duration-200", isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100")}>
          <MessageCircle className="size-5" />
        </span>
      </button>

      {/* Panel */}
      {isVisible && (
        <div
          onAnimationEnd={() => { if (!isOpen) setIsVisible(false); }}
          style={{ animation: `${isOpen ? "chat-in" : "chat-out"} 0.2s ease-out forwards` }}
          className="fixed inset-0 z-50 flex flex-col overflow-hidden border-border bg-background shadow-2xl sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[520px] sm:w-[400px] sm:rounded-2xl sm:border"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
            <div className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Bot className="size-5 text-primary" />
              <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-card bg-green-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-tight font-display">BullFood Assistant</p>
              <p className="truncate text-xs text-muted-foreground">Ask about food events at USF</p>
            </div>
            <button
              onClick={closeChat}
              aria-label="Close chat"
              className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-between py-4">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="size-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Hi there! 👋</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      I can help you find food events on campus.
                    </p>
                  </div>
                </div>
                <div className="w-full space-y-2">
                  <p className="text-center text-xs font-medium text-muted-foreground">Try asking</p>
                  <div className="grid grid-cols-2 gap-2">
                    {SUGGESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        disabled={isLoading}
                        className="rounded-xl border border-border bg-card px-3 py-2 text-left text-xs text-foreground transition-colors hover:bg-muted disabled:opacity-50"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn("flex items-end gap-2", msg.role === "user" ? "justify-end" : "justify-start")}
                  >
                    {msg.role === "assistant" && (
                      <div className="mb-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Bot className="size-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                        msg.role === "user"
                          ? "rounded-br-sm bg-primary text-white"
                          : "rounded-bl-sm bg-muted text-foreground",
                      )}
                    >
                      {msg.role === "user" ? (
                        msg.content
                      ) : msg.content ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                            ul: ({ children }) => <ul className="mb-1 list-disc pl-4">{children}</ul>,
                            ol: ({ children }) => <ol className="mb-1 list-decimal pl-4">{children}</ol>,
                            li: ({ children }) => <li className="mb-0.5">{children}</li>,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      ) : (
                        isLoading && i === messages.length - 1 && (
                          <span className="flex items-center gap-1 py-0.5">
                            {[0, 1, 2].map((n) => (
                              <span
                                key={n}
                                className="size-1.5 rounded-full bg-current"
                                style={{
                                  animation: "typing-dot 1s ease-in-out infinite",
                                  animationDelay: `${n * 0.2}s`,
                                }}
                              />
                            ))}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-stretch gap-2 border-t border-border bg-card p-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask about food events..."
              className="flex-1 text-sm"
              disabled={isLoading}
            />
            <Button
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              className="shrink-0 self-stretch"
            >
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
