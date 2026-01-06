import "dotenv/config";
import fastify from "./routes/index";
import cors from "@fastify/cors";
import { pool } from "./postgreSQL/postgrePool";
import fs from "fs";
import path from "path";

const PORT = process.env.PORT || 8000;
const USE_HTTPS = process.env.USE_HTTPS === "true";

async function start() {
  await fastify.register(cors, {
    origin: "*", // หรือระบุ origin เฉพาะเช่น ["http://localhost:30001"]
  });

  try {
    if (process.env.DB_PROVIDER === "postgres") {
      const client = await pool.connect();
      console.log("Connected to PostgreSQL");
      client.release();
    } else {
      console.log("Using Supabase Client");
    }
  } catch (err) {
    console.error("Error connecting to Database", err);
  }

  const httpsOptions =
    USE_HTTPS &&
    fs.existsSync(path.resolve(__dirname, "../certs/localhost-cert.pem"))
      ? {
          key: fs.readFileSync(
            path.resolve(__dirname, "../certs/localhost-key.pem")
          ),
          cert: fs.readFileSync(
            path.resolve(__dirname, "../certs/localhost-cert.pem")
          ),
        }
      : undefined;

  fastify.listen(
    {
      port: Number(PORT),
      host: "0.0.0.0",
      ...(httpsOptions && { https: httpsOptions }),
    },
    (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    }
  );
}

start();
