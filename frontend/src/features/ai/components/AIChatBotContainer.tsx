import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import aiService from "../services/aiCallService";
import { MessageOutlined } from "@ant-design/icons";
import "./ChatBot.css";

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
      <div className="chatbot-closed-container">
        <button onClick={onOpen} className="chatbot-toggle-btn">
          <MessageOutlined style={{ fontSize: "24px" }} />
        </button>
      </div>
    );
  }

  return (
    <div className="chatbot-main">
      {/* Header */}
      <div className="chatbot-header">
        <div className="flex items-center gap-3">
          <div className="chatbot-status-indicator">
            <div className="status-dot animate-pulse"></div>
            <div className="status-ring animate-ping"></div>
          </div>
          <h3 className="chatbot-title">AI Assistant</h3>
        </div>

        <button onClick={onClose} className="chatbot-close-btn">
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
      <div className="chatbot-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-row ${
              msg.role === "user" ? "message-row-user" : "message-row-assistant"
            }`}
          >
            <div
              className={`message-bubble ${
                msg.role === "user"
                  ? "message-bubble-user"
                  : "message-bubble-assistant"
              }`}
            >
              {msg.role === "user" ? (
                <p className="message-text">{msg.content}</p>
              ) : (
                <div className="prose">
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
                className={`message-timestamp ${
                  msg.role === "user" ? "user" : "assistant"
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
          <div className="message-row message-row-assistant">
            <div className="message-bubble message-bubble-assistant">
              <div className="loading-dots">
                <div className="dot"></div>
                <div className="dot dot-2"></div>
                <div className="dot dot-3"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="chatbot-input-area">
        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="พิมพ์ข้อความ..."
            className="chat-input"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="send-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
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
