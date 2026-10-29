import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { Plugin } from "vite";

// Static apps in public/ (e.g. public/ai-learning/) are served by GitHub Pages at
// their folder path; make the dev server do the same instead of falling back to the SPA.
const staticFolderPages = (folders: string[]): Plugin => ({
  name: "static-folder-pages",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url?.split("?")[0];
      for (const folder of folders) {
        if (url === `/${folder}`) {
          res.writeHead(301, { Location: `/${folder}/` });
          res.end();
          return;
        }
        if (url === `/${folder}/`) req.url = `/${folder}/index.html`;
      }
      next();
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    staticFolderPages(["ai-learning"]),
  ].filter(Boolean),
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
