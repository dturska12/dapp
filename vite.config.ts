import react from "@vitejs/plugin-react";
import { Buffer } from "buffer";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin("all", {
      prefix: "VITE_",
    }),
  ],
  define: {
    global: {
      Buffer,
    },
  },
});
