import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@console": path.resolve(__dirname, "./src/Console"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@editor": path.resolve(__dirname, "./src/Editor"),
      "@explorer": path.resolve(__dirname, "./src/Explorer"),
      "@header": path.resolve(__dirname, "./src/Header"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
