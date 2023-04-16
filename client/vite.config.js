import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api":
        "https://nginx-ingress-cgokjjbh51taq9hpjjjg.apps.hackathon.napptive.dev/",
    },
  },
  plugins: [react()],
});
