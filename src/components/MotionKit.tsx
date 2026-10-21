import { useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useLocation } from "react-router-dom";

export { SITE_NAME } from "./Seo";

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
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // links like /#services: scroll once the page has rendered
    const t = setTimeout(() => {
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({ behavior: "smooth" });
    }, 120);
    return () => clearTimeout(t);
  }, [pathname, hash]);

  return null;
};

export { Seo } from "./Seo";
