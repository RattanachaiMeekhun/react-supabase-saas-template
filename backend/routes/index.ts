import Fastify from "fastify";
import usersRoute from "./users";
import authRoute from "./auth";
import aiRoute from "./ai";

const fastify = Fastify();

fastify.register(usersRoute, { prefix: "/api/users" });
fastify.register(authRoute, { prefix: "/api/auth" });
fastify.register(aiRoute, { prefix: "/api/ai" });

fastify.get("/", async () => ({ status: "ok" }));

export default fastify;
