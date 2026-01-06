//auth routes
import { FastifyInstance } from "fastify";
import { authService } from "../services/authService";
import { LoginResponse } from "../types/AuthTypes";

export default async function authRoute(fastify: FastifyInstance) {
  fastify.post("/signup", async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };
    const { data, error } = await authService.signup(email, password);
    if (error) return reply.status(400).send({ error: error.message });
    return data;
  });

  fastify.post("/login", async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };
    const { data, error } = await authService.login(email, password);

    if (error) return reply.status(400).send({ error: error.message });
    const responseData: LoginResponse = {
      access_token: data?.access_token || "",
      refresh_token: data?.refresh_token || "",
      user: {
        id: data?.user?.id || "",
        email: data?.user?.email || "",
        created_at: data?.user?.created_at || "",
        updated_at: data?.user?.updated_at || "",
      },
    };
    return responseData;
  });

  fastify.post("/logout", async (request, reply) => {
    const { refresh_token } = request.body as { refresh_token: string };
    if (!refresh_token) {
      return reply.status(400).send({ error: "Refresh token is required" });
    }
    const { data, error } = await authService.logout(refresh_token);
    if (error) return reply.status(400).send({ error: error.message });
    return data;
  });

  fastify.get("/check", async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply.status(401).send({ message: "No authorization header" });
    }
    const token = authHeader.replace("Bearer ", "");
    const { data, error } = await authService.verifyToken(token);

    if (error) return reply.status(401).send({ error: error.message });
    if (!data?.user)
      return reply.status(401).send({ message: "Not authenticated" });
    return { user: { id: data.user.id, email: data.user.email } };
  });

  fastify.post("/refresh", async (request, reply) => {
    const { refresh_token } = request.body as { refresh_token: string };
    if (!refresh_token) {
      return reply.status(400).send({ error: "Refresh token is required" });
    }
    const { data, error } = await authService.refreshAccessToken(refresh_token);
    if (error) return reply.status(401).send({ error: error.message });
    return data;
  });
}
