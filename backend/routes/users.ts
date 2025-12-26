import { FastifyInstance } from "fastify";
import { userService } from "../services/userService";

export default async function usersRoute(fastify: FastifyInstance) {
  console.log("Registering users route");
  fastify.get("/", async (request, reply) => {
    console.log("GET /api/users called");
    const { data, error } = await userService.getAllUser();
    if (error) return reply.status(500).send({ error: error.message });
    return data;
  });
}
