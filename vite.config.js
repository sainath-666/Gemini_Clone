import path from "path";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import compression from "vite-plugin-compression";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    plugins: [
      tailwindcss(),
      compression({
        algorithm: "gzip",
        ext: ".gz",
        threshold: 10240, // Only compress files bigger than 10KB
        deleteOriginFile: false,
      }),
      compression({
        algorithm: "brotliCompress",
        ext: ".br",
        threshold: 10240,
        deleteOriginFile: false,
      }),
    ],
    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "genai-vendor": ["@google/genai"],
            "markdown-vendor": ["react-markdown", "remark-gfm"],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  };
});
