import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionGlobalConfig } from "motion/react";
import App from "./App";
import { preloadRoute } from "./routes";
import "./index.css";

/* When the site is served from a subfolder (e.g. yourdomain.com/app/), the
   host page sets window.__TM_BASE_PATH__ so the router knows its prefix.
   See index.html and HOSTING.md. */
const basename =
  (typeof window !== "undefined" && (window as any).__TM_BASE_PATH__) || "/";

const root = document.getElementById("root")!;

/* Pages arrive prerendered (scripts/prerender.mjs): the HTML is already on
   screen. When React takes over, motion's entrance animations would hide and
   replay what the visitor is already reading, so they are skipped for the
   first render. Animations further down the page still play on scroll. */
const prerendered = root.childElementCount > 0;

const start = async () => {
  const path =
    window.location.pathname.slice(basename.replace(/\/$/, "").length) || "/";
  await preloadRoute(path);
  if (prerendered) MotionGlobalConfig.skipAnimations = true;
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
  if (prerendered) {
    setTimeout(() => {
      MotionGlobalConfig.skipAnimations = false;
    }, 400);
  }
};

start();
