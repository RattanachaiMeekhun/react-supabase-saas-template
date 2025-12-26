import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import aiService from "../../services/aiCallService";
import { MessageOutlined } from "@ant-design/icons";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const AIChatBotContainer = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "สวัสดีครับ! ผมคือ AI Assistant พร้อมช่วยเหลือคุณแล้ว",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // TODO: Call AI API here
    // setTimeout(() => {
    //   const aiMessage: Message = {
    //     id: (Date.now() + 1).toString(),
    //     role: "assistant",
    //     content: "ขอบคุณสำหรับคำถาม! ผมจะช่วยคุณได้เร็วๆ นี้",
    //     timestamp: new Date(),
    //   };
    //   setMessages((prev) => [...prev, aiMessage]);
    //   setIsLoading(false);
    // }, 1000);
    aiService
      .chat("gemini", [{ role: "user", content: input }])
      .then((data) => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      })
      .catch(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "ขออภัย เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      });
  };

  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <div className="relative bottom-4 right-4 h-full w-full flex items-end justify-end pointer-events-none z-50">
        <button
          onClick={onOpen}
          className="pointer-events-auto w-14 h-14 bg-surface text-primary rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform border-2 border-border"
        >
          <MessageOutlined style={{ fontSize: "24px" }} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-surface rounded-lg shadow-2xl border border-border overflow-hidden z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-surface text-primary border-b border-border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 bg-success rounded-full animate-ping opacity-75"></div>
          </div>
          <h3 className="font-bold text-lg tracking-wide">AI Assistant</h3>
        </div>

        <button
          onClick={onClose}
          className="text-primary hover:bg-background/20 hover:text-white rounded-full p-1.5 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background scroll-smooth">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3.5 rounded-2xl shadow-md ${
                msg.role === "user"
                  ? "bg-primary text-background rounded-br-none"
                  : "bg-surface text-primary rounded-bl-none border border-border/50"
              }`}
            >
              {msg.role === "user" ? (
                <p className="text-sm whitespace-pre-wrap font-medium">
                  {msg.content}
                </p>
              ) : (
                <div className="prose prose-sm max-w-none prose-invert">
                  <ReactMarkdown
                    components={{
                      code({ className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.375rem",
                            }}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code
                            className="bg-background/50 px-1.5 py-0.5 rounded text-xs text-primary font-mono"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              )}
              <span
                className={`text-[10px] opacity-70 mt-1.5 block text-right ${
                  msg.role === "user" ? "text-background/80" : "text-secondary"
                }`}
              >
                {msg.timestamp.toLocaleTimeString("th-TH", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-surface p-4 rounded-2xl rounded-bl-none border border-border/50 shadow-md">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-surface border-t border-border">
        <div className="flex gap-2 items-center bg-background rounded-xl border border-border px-2 py-2 shadow-inner focus-within:ring-2 focus-within:ring-primary/50 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="พิมพ์ข้อความ..."
            className="flex-1 px-3 py-1 bg-transparent text-primary placeholder-secondary focus:outline-none text-sm"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2 bg-primary text-background rounded-lg hover:bg-primary/90 disabled:bg-secondary/20 disabled:text-secondary disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 transform rotate-[-45deg] translate-x-0.5 -translate-y-0.5"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatBotContainer;
