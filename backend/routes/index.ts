import Fastify from "fastify";
import mercurius from "mercurius";
import usersRoute from "./users.js";
import authRoute from "./auth.js";
import aiRoute from "./ai.js";
import { schema, resolvers } from "../schemas/index.js";

const fastify = Fastify();

fastify.register(usersRoute, { prefix: "/api/users" });
fastify.register(authRoute, { prefix: "/api/auth" });
fastify.register(aiRoute, { prefix: "/api/ai" });

fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
});

fastify.get("/", async () => ({ status: "ok" }));

export default fastify;
