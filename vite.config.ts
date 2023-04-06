import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [svelte(), createHtmlPlugin({
    inject: {
      data: {
        additionalCode: (process?.env?.ADDITIONAL_CODE) || ""
      }
    }
  })],
});
