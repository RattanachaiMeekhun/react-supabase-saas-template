import Fastify from "fastify";
import usersRoute from "./users";
import authRoute from "./auth";

const fastify = Fastify();

fastify.register(usersRoute, { prefix: "/api/users" });
fastify.register(authRoute, { prefix: "/api/auth" });

fastify.get("/", async () => ({ status: "ok" }));

export default fastify;
