import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Every page's <head>: title, description, canonical, robots, Open Graph,
 * Twitter card and JSON-LD (site-wide Organization + WebSite, a breadcrumb
 * trail, and the page's own schema).
 *
 * The same tags end up in the prerendered HTML (scripts/prerender.mjs), so
 * search engines and AI crawlers see them without running JavaScript.
 *
 * Absolute URLs use window.__SITE_URL__ when the host sets it, otherwise the
 * current origin. During prerendering it is the token "__SITE_URL__", which
 * the WordPress theme / static build swaps for the real domain.
 */

export const SITE_NAME = "Editorial HQ";
const DEFAULT_IMAGE = "/images/og-default.jpg";

const siteUrl = () =>
  (
    (typeof window !== "undefined" && (window as any).__SITE_URL__) ||
    window.location.origin
  ).replace(/\/+$/, "");

/** names for breadcrumb segments */
const CRUMB: Record<string, string> = {
  about: "About",
  services: "Services",
  "case-studies": "Results",
  blog: "Blog",
  contact: "Contact",
  pricing: "Pricing",
};

type SeoProps = {
  title: string;
  description: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
  /** keep the page out of Google (404, thank-you pages) */
  noindex?: boolean;
  /** "article" for blog posts */
  type?: "website" | "article";
  /** absolute or site-relative social image */
  image?: string;
};

/** add or update one managed tag, keyed by data-seo */
const upsert = (
  key: string,
  tag: "meta" | "link",
  attrs: Record<string, string>,
) => {
  let el = document.head.querySelector<HTMLElement>(`[data-seo="${key}"]`);
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute("data-seo", key);
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
};

const setJsonLd = (key: string, data: unknown) => {
  let el = document.head.querySelector<HTMLScriptElement>(
    `script[data-seo="${key}"]`,
  );
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-seo", key);
    document.head.appendChild(el);
  }
  el.text = JSON.stringify(data);
};

export const Seo = ({
  title,
  description,
  schema,
  noindex = false,
  type = "website",
  image = DEFAULT_IMAGE,
}: SeoProps) => {
  const { pathname } = useLocation();
  const schemaKey = JSON.stringify(schema ?? null);

  useEffect(() => {
    const base = siteUrl();
    const path = pathname.replace(/\/+$/, "") || "/";
    const url = path === "/" ? `${base}/` : `${base}${path}`;
    // images live with the theme on WordPress, at the site root elsewhere
    const assetBase =
      ((window as any).__TM_ASSET_BASE__ as string | undefined) || base;
    const img = /^https?:/.test(image) ? image : `${assetBase}${image}`;
    const fullTitle = `${title} | ${SITE_NAME}`;

    document.title = fullTitle;
    upsert("description", "meta", {
      name: "description",
      content: description,
    });
    upsert("robots", "meta", {
      name: "robots",
      content: noindex
        ? "noindex, follow"
        : "index, follow, max-image-preview:large, max-snippet:-1",
    });
    if (noindex) {
      document.head.querySelector('[data-seo="canonical"]')?.remove();
    } else {
      upsert("canonical", "link", { rel: "canonical", href: url });
    }
    upsert("og:type", "meta", { property: "og:type", content: type });
    upsert("og:site_name", "meta", {
      property: "og:site_name",
      content: SITE_NAME,
    });
    upsert("og:title", "meta", { property: "og:title", content: fullTitle });
    upsert("og:description", "meta", {
      property: "og:description",
      content: description,
    });
    upsert("og:url", "meta", { property: "og:url", content: url });
    upsert("og:image", "meta", { property: "og:image", content: img });
    upsert("twitter:card", "meta", {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsert("twitter:title", "meta", {
      name: "twitter:title",
      content: fullTitle,
    });
    upsert("twitter:description", "meta", {
      name: "twitter:description",
      content: description,
    });
    upsert("twitter:image", "meta", { name: "twitter:image", content: img });

    const orgId = `${base}/#organization`;
    setJsonLd("ld-site", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": orgId,
          name: SITE_NAME,
          url: `${base}/`,
          logo: `${assetBase}/images/logo.png`,
          description:
            "Link building and digital PR agency. Editorial links, digital PR, expert quotes and brand mentions that move Google rankings and get brands named in AI answers.",
          areaServed: "Worldwide",
          founder: { "@type": "Person", name: "Talha Mahmood" },
        },
        {
          "@type": "WebSite",
          "@id": `${base}/#website`,
          name: SITE_NAME,
          url: `${base}/`,
          publisher: { "@id": orgId },
          inLanguage: "en",
        },
      ],
    });

    // breadcrumb: Home › Section › Page
    const parts = path.split("/").filter(Boolean);
    setJsonLd(
      "ld-breadcrumb",
      parts.length && !noindex
        ? {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${base}/`,
              },
              // /services and /industries have no index page, so that level is skipped
              ...parts
                .map((p, i) => ({ p, i }))
                .filter(
                  ({ p, i }) =>
                  !((p === "services" || p === "industries") && i < parts.length - 1),
                )
                .map(({ p, i }, k) => ({
                  "@type": "ListItem",
                  position: k + 2,
                  name:
                    i === parts.length - 1 && (i > 0 || !CRUMB[p])
                      ? title
                      : (CRUMB[p] ?? title),
                  item: `${base}/${parts.slice(0, i + 1).join("/")}`,
                })),
            ],
          }
        : null,
    );

    // the page's own schema, tied to this URL and to the organisation
    const own = schema
      ? (Array.isArray(schema) ? schema : [schema]).map((s) => {
          const o: Record<string, unknown> = { url, ...s };
          const prov = o.provider as { name?: string } | undefined;
          if (prov?.name === SITE_NAME) o.provider = { "@id": orgId };
          if (o["@type"] === "Article") {
            o.mainEntityOfPage = url;
            o.image = o.image ?? img;
            o.publisher = { "@id": orgId };
          }
          return o;
        })
      : null;
    setJsonLd("ld-page", own && (own.length === 1 ? own[0] : own));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, title, description, schemaKey, noindex, type, image]);

  return null;
};
