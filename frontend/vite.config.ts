import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3001,
    https: fs.existsSync(path.resolve(__dirname, "certs/localhost-cert.pem"))
      ? {
          key: fs.readFileSync(
            path.resolve(__dirname, "certs/localhost-key.pem")
          ),
          cert: fs.readFileSync(
            path.resolve(__dirname, "certs/localhost-cert.pem")
          ),
        }
      : undefined,
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
