import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    cors: {
      origin: "https://www.owlbear.rodeo",
    },
    headers: {
      "Access-Control-Allow-Private-Network": "true",
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        background: resolve(__dirname, "background.html"),
        overlay: resolve(__dirname, "overlay.html"),
      },
    },
  },
});
