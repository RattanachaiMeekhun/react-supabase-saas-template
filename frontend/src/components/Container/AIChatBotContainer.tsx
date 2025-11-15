import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import aiService from "../../services/aiCallService";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type Props = {
  onClose?: () => void;
};

const AIChatBotContainer: React.FC<Props> = ({ onClose }) => {
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

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <h3 className="font-semibold">AI Assistant</h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded p-1 transition"
          >
            ✕
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.role === "user" ? (
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              ) : (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                      code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code
                            className="bg-gray-200 px-1 rounded text-xs"
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
              <span className="text-xs opacity-70 mt-1 block">
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
            <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="พิมพ์ข้อความ..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            ส่ง
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatBotContainer;
