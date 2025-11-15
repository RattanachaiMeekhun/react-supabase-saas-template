export type AIProvider = "openai" | "anthropic" | "huggingface" | "gemini";

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type ChatRequest = {
  provider: AIProvider;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
};

export type ChatResponse = {
  message: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};
