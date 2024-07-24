import { defineConfig } from "vite";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
import svgr from "vite-plugin-svgr";
import { vitePluginForArco } from "@arco-plugins/vite-react";

export default defineConfig({
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "http://10.10.101.71:9222", // Office 环境
        // target: "http://online-saas-gateway.k8s.bitea.one", // 正式环境
        changeOrigin: true,
      },
    },
  },
  assetsInclude: ["**/*.mp4"],
  plugins: [nodeResolve(), react(), svgr(), vitePluginForArco()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  envDir: "envDir",
  resolve: {
    alias: [
      {
        find: "~",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
});
