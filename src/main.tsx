import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

/* When the site is served from a subfolder (e.g. yourdomain.com/app/), the
   host page sets window.__TM_BASE_PATH__ so the router knows its prefix.
   See index.html and HOSTING.md. */
const basename =
  (typeof window !== "undefined" && (window as any).__TM_BASE_PATH__) || "/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
