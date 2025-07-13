//auth routes
import { FastifyInstance } from "fastify";
import { supabase } from "../supabase/supabaseClient";
import { LoginResponse } from "../types/AuthTypes";

export default async function authRoute(fastify: FastifyInstance) {
  fastify.post("/signup", async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return reply.status(400).send({ error: error.message });
    return data;
  });

  fastify.post("/login", async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return reply.status(400).send({ error: error.message });
    const responseData: LoginResponse = {
      access_token: data.session?.access_token || "",
      refresh_token: data.session?.refresh_token || "",
      user: {
        id: data.user?.id || "",
        email: data.user?.email || "",
        created_at: data.user?.created_at || "",
        updated_at: data.user?.updated_at || "",
      },
    };
    return responseData;
  });

  fastify.post("/logout", async (request, reply) => {
    const { error } = await supabase.auth.signOut();
    if (error) return reply.status(400).send({ error: error.message });
    return { message: "Logged out successfully" };
  });

  fastify.get("/check", async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply.status(401).send({ message: "No authorization header" });
    }
    const token = authHeader.replace("Bearer ", "");
    const { data, error } = await supabase.auth.getUser(token);

    if (error) return reply.status(400).send({ error: error.message });
    if (!data.user)
      return reply.status(401).send({ message: "Not authenticated" });
    return { user: { id: data.user.id, email: data.user.email } };
  });
}
