import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Where the site will live on the domain.
 *
 *   "/"       -> yourdomain.com            (default)
 *   "/app/"   -> yourdomain.com/app/       (subfolder, e.g. beside WordPress)
 *
 * Set it here, or pass VITE_BASE=/app/ when building. If you change this you
 * must also set window.__TM_BASE_PATH__ / __TM_ASSET_BASE__ in index.html and
 * update RewriteBase in public/.htaccess — see HOSTING.md.
 */
const BASE = process.env.VITE_BASE || "/";

export default defineConfig({
  base: BASE,
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        // hashed: page chunks import the entry by this exact name, so it must not
        // need a ?ver= query to bust caches (that would load it twice)
        entryFileNames: "assets/app-[hash].js",
        // hashed so a redeploy never serves a stale page chunk
        chunkFileNames: "assets/[name]-[hash].js",
        // one shared icon chunk instead of a dozen tiny per-icon files
        manualChunks: (id) =>
          id.includes("node_modules/lucide-react") ? "icons" : undefined,
        assetFileNames: (info) =>
          info.name && /\.css$/.test(info.name)
            ? "assets/app.css"
            : "assets/[name][extname]",
      },
    },
  },
});
