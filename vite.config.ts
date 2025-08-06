import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
      workbox: {
        globDirectory: "dist",
        globPatterns: ["**/*.{html,js,css,png,jpg,webp,json}"],
      },
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      injectRegister: "auto",
      manifest: {
        name: "Polaris Record",
        theme_color: "#ffffff",
        icons: [
          {
            src: "images/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "images/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "images/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "images/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  base: "/polaris-record-standalone",
});
