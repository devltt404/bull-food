import { MessageCircle, Send, X } from "lucide-react";
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

      if (!response.ok || !response.body) {
        throw new Error("Request failed");
      }

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
      <button
        onClick={() => (isOpen ? closeChat() : openChat())}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105"
      >
        <span
          className={cn(
            "absolute transition-all duration-150",
            isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
          )}
        >
          <X className="size-6" />
        </span>
        <span
          className={cn(
            "absolute transition-all duration-150",
            isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
          )}
        >
          <MessageCircle className="size-6" />
        </span>
      </button>

      {isVisible && (
        <div
          onAnimationEnd={() => { if (!isOpen) setIsVisible(false); }}
          style={{ animation: `${isOpen ? "chat-in" : "chat-out"} 0.2s ease-out forwards` }}
          className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
        >
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">BullFood Assistant</p>
              <p className="text-xs opacity-80">
                Ask me about free food events at USF
              </p>
            </div>
            <button
              onClick={closeChat}
              aria-label="Close chat"
              className="rounded-full p-1 opacity-80 transition-opacity hover:opacity-100"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="flex h-full flex-col">
                <div className="mt-6 text-center text-sm text-muted-foreground">
                  <p>👋 Hi! Ask me about free food events at USF.</p>
                </div>
                <div className="mt-auto flex flex-wrap justify-center gap-2 pb-2">
                  {[
                    "List some upcoming food events",
                    "Free pizza this week?",
                    "Events at Tampa campus",
                    "Most popular events",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      disabled={isLoading}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-muted disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-white"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.role === "user" ? (
                      msg.content
                    ) : msg.content ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-1 last:mb-0">{children}</p>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold">{children}</strong>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-1 list-disc pl-4">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-1 list-decimal pl-4">{children}</ol>
                          ),
                          li: ({ children }) => (
                            <li className="mb-0.5">{children}</li>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      isLoading &&
                      i === messages.length - 1 && (
                        <span className="flex items-center gap-1 py-0.5">
                          {[0, 1, 2].map((n) => (
                            <span
                              key={n}
                              className="size-1.5 rounded-full bg-current"
                              style={{
                                animation: `typing-dot 1s ease-in-out infinite`,
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
          </div>

          <div className="flex gap-2 border-t border-border p-3">
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
              size="sm"
              className="px-3"
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
