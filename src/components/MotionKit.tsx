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

/**
 * Homepage sections below the fold are skipped until they're near the screen
 * (.cv-auto, see pages/Home.tsx). Their heights are estimates until then, so
 * before any jump to an anchor, lay everything out for real: the jump then
 * lands exactly where it should.
 */
const showAllSections = () => document.documentElement.classList.add("cv-off");

/** Reset scroll on route change, but leave in-page hash links alone. */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  // in-page links (<a href="#contact">): runs before the browser scrolls
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href*='#']");
      if (a) showAllSections();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    showAllSections();
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
