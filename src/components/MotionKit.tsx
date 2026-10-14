import { useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useLocation } from "react-router-dom";

export const SITE_NAME = "Outreachr";

/** Thin scroll-linked progress bar pinned to the top of the viewport. */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-brand origin-left z-[60]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};

/** Reset scroll on route change, but leave in-page hash links alone. */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

type SeoProps = {
  title: string;
  description: string;
  schema?: unknown;
};

/** Swaps document title / description / JSON-LD per route and restores on unmount. */
export const Seo = ({ title, description, schema }: SeoProps) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | ${SITE_NAME}`;

    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute("content") ?? null;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    let ld: HTMLScriptElement | null = null;
    if (schema) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.text = JSON.stringify(schema);
      document.head.appendChild(ld);
    }

    return () => {
      document.title = prevTitle;
      if (prevDesc !== null) metaDesc?.setAttribute("content", prevDesc);
      if (ld) document.head.removeChild(ld);
    };
  }, [title, description, schema]);

  return null;
};
