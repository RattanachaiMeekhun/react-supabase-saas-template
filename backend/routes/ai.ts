import { FastifyInstance } from "fastify";
import { callAI } from "../services/aiService";
import type { ChatRequest } from "../types/aiTypes";

export default async function aiRoute(fastify: FastifyInstance) {
  // Chat endpoint
  fastify.post<{ Body: ChatRequest }>("/chat", async (request, reply) => {
    try {
      const { provider, messages, temperature, max_tokens } = request.body;

      if (!messages || messages.length === 0) {
        return reply.status(400).send({ error: "Messages are required" });
      }

      const response = await callAI({
        provider,
        messages,
        temperature,
        max_tokens,
      });

      return response;
    } catch (error: any) {
      return reply.status(500).send({ error: error.message });
    }
  });

  // Suggest dashboard endpoint
  fastify.post("/dashboard-suggest", async (request, reply) => {
    try {
      const { dataset, description } = request.body as {
        dataset?: any;
        description?: string;
      };

      const prompt = `จากข้อมูล: ${JSON.stringify(dataset)}
คำอธิบาย: ${description}

ช่วยแนะนำ chart type, insight, และ layout สำหรับ dashboard โดยส่งออกเป็น JSON ตามโครงสร้างนี้:
{
  "charts": [
    {
      "key": "bar",
      "title": "...",
      "chartType": "bar",
      "insight": "...",
      "description": "...",
      "chartData": {...}
    }
  ]
}`;

      const response = await callAI({
        provider: "gemini", // เปลี่ยนเป็น gemini
        messages: [{ role: "user", content: prompt }],
      });

      return { suggestion: response.message };
    } catch (error: any) {
      return reply.status(500).send({ error: error.message });
    }
  });

  // Health check
  fastify.get("/", async (request, reply) => {
    return { message: "AI route is working" };
  });
}
