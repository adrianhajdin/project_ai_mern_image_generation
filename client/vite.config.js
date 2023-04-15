import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api":
        "https://nginx-ingress-cgqhbdtt998c97mfukmg.apps.playground.napptive.dev",
    },
  },
  plugins: [react()],
});
