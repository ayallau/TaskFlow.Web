import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  input: {
    main: resolve(import.meta.dirname, "index.html"),
    playground: resolve(import.meta.dirname, "playground.html"),
  },
});
