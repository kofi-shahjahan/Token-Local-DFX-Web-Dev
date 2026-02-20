import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  root: path.resolve(__dirname, "src/token_assets/src"),

  plugins: [
    react(),
    nodePolyfills(),
  ],

  resolve: {
    alias: {
      declarations: path.resolve(__dirname, "src/declarations")
    }
  },

  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true
  },

  server: {
    port: 3000,
  },

  publicDir: path.resolve(__dirname, "src/token_assets/assets"),
  
  define: {
    global: 'globalThis',
  },
});