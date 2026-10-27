import { lazy, type ComponentType } from "react";
import { useParams } from "react-router-dom";

/**
 * Code-split pages that can be loaded *before* the first render.
 *
 * React.lazy alone always suspends on first render, which would blank a
 * prerendered page for a moment. `page()` remembers the loaded module, so once
 * `preloadRoute()` has run, the page renders synchronously with no fallback.
 */
type Loader = () => Promise<{ default: ComponentType }>;

const page = (load: Loader) => {
  let Loaded: ComponentType | null = null;
  const preload = () =>
    load().then((m) => {
      Loaded = m.default;
      return m;
    });
  const Lazy = lazy(preload);
  const Page = () => (Loaded ? <Loaded /> : <Lazy />);
  Page.preload = preload;
  return Page;
};

export const Home = page(() => import("./pages/Home"));
export const About = page(() => import("./pages/About"));
export const CaseStudies = page(() => import("./pages/CaseStudies"));
export const CaseStudy = page(() => import("./pages/CaseStudy"));
export const Blog = page(() => import("./pages/Blog"));
export const BlogPost = page(() => import("./pages/BlogPost"));
export const Contact = page(() => import("./pages/Contact"));
export const Pricing = page(() => import("./pages/Pricing"));
export const NotFound = page(() => import("./pages/NotFound"));
export const Privacy = page(() => import("./pages/legal/Privacy"));
export const Terms = page(() => import("./pages/legal/Terms"));

const SERVICE_PAGES: Record<string, ReturnType<typeof page>> = {
  "link-building": page(() => import("./pages/services/LinkBuilding")),
  "digital-pr": page(() => import("./pages/services/DigitalPR")),
  "brand-mentions": page(() => import("./pages/services/BrandMentions")),
  "haro-links": page(() => import("./pages/services/HaroQuotes")),
};

const INDUSTRY_PAGES: Record<string, ReturnType<typeof page>> = {
  "home-services": page(() => import("./pages/industries/HomeServices")),
};

/** /industries/:slug → that industry's page, or the 404 page. */
export const IndustryPage = () => {
  const { slug = "" } = useParams();
  const Page = INDUSTRY_PAGES[slug] ?? NotFound;
  return <Page />;
};

/** /services/:slug → that service's page, or the 404 page. */
export const ServicePage = () => {
  const { slug = "" } = useParams();
  const Page = SERVICE_PAGES[slug] ?? NotFound;
  return <Page />;
};

/** Load the page for a URL before React first renders it. */
export const preloadRoute = (pathname: string) => {
  const p = pathname.replace(/\/+$/, "") || "/";
  const [, a = "", b] = p.split("/");
  const pick = (() => {
    if (p === "/") return Home;
    if (a === "about" && !b) return About;
    if (a === "services") return b ? (SERVICE_PAGES[b] ?? NotFound) : Home;
    if (a === "industries") return b ? (INDUSTRY_PAGES[b] ?? NotFound) : NotFound;
    if (a === "case-studies") return b ? CaseStudy : CaseStudies;
    if (a === "blog") return b ? BlogPost : Blog;
    if (a === "contact" && !b) return Contact;
    if (a === "pricing" && !b) return Pricing;
    if (a === "privacy" && !b) return Privacy;
    if (a === "terms" && !b) return Terms;
    return NotFound;
  })();
  return pick.preload().catch(() => undefined);
};
