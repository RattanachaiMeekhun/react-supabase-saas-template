import "dotenv/config";
import fastify from "./routes/index";
import cors from "@fastify/cors";

const PORT = process.env.PORT || 8000;

async function start() {
  await fastify.register(cors, {
    origin: "*", // หรือระบุ origin เฉพาะเช่น ["http://localhost:30001"]
  });

  fastify.listen({ port: Number(PORT), host: "0.0.0.0" }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

start();
