import { FastifyInstance } from "fastify";
import { supabase } from "../supabase/supabaseClient";

export default async function usersRoute(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) return reply.status(500).send({ error: error.message });
    return data;
  });
}
