import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {},
    }),
  ],
  server: {
    proxy: {
      '/auth': {
        target: 'http://43.203.226.45:3000',
        changeOrigin: true,
      },
    },
  },
});
