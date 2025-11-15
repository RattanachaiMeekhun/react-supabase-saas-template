import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import type { ChatRequest, ChatResponse } from "../types/aiTypes";

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;
const genAI = process.env.GOOGLE_API_KEY 
  ? new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY })
  : null;

export async function callOpenAI(
  messages: ChatRequest["messages"],
  temperature?: number,
  max_tokens?: number
): Promise<ChatResponse> {
  if (!openai) {
    throw new Error("OpenAI API key not configured");
  }
  
  const response = await openai.chat.completions.create({
    model: "gemini-2.5-flash",
    messages: messages,
    temperature: temperature || 0.7,
    max_tokens: max_tokens,
  });

  return {
    message: response.choices[0]?.message?.content || "",
    usage: {
      prompt_tokens: response.usage?.prompt_tokens || 0,
      completion_tokens: response.usage?.completion_tokens || 0,
      total_tokens: response.usage?.total_tokens || 0,
    },
  };
}

export async function callGemini(
  messages: ChatRequest["messages"],
  temperature?: number,
  max_tokens?: number
): Promise<ChatResponse> {
  if (!genAI) {
    throw new Error("Google API key not configured");
  }
  
  // แปลง messages format จาก OpenAI เป็น Gemini
  const prompt = messages
    .map(
      (msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
    )
    .join("\n");

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash", // หรือโมเดลอื่น ๆ
    contents: prompt,
  });

  const text = response.text;

  return {
    message: text || "",
    usage: {
      prompt_tokens: 0, // Gemini ไม่ return usage details
      completion_tokens: 0,
      total_tokens: 0,
    },
  };
}

// เพิ่ม provider อื่น ๆ เช่น Anthropic, HuggingFace
export async function callAI(request: ChatRequest): Promise<ChatResponse> {
  switch (request.provider) {
    case "openai":
      return callOpenAI(
        request.messages,
        request.temperature,
        request.max_tokens
      );
    case "gemini":
      return callGemini(
        request.messages,
        request.temperature,
        request.max_tokens
      );
    // case "anthropic":
    //   return callAnthropic(request.messages);
    // case "huggingface":
    //   return callHuggingFace(request.messages);
    default:
      throw new Error(`Provider ${request.provider} not supported`);
  }
}
